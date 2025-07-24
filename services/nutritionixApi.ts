// services/nutritionixApi.ts
const NUTRITIONIX_API_KEY = '19aaf41095bb199ecee6b245393add84';
const NUTRITIONIX_APP_ID = 'b7e77298'; // Common Nutritionix App ID - you may need to get your own
const BASE_URL = 'https://trackapi.nutritionix.com/v2';

export interface NutritionData {
  food_name: string;
  brand_name?: string;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams?: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat?: number;
  nf_cholesterol?: number;
  nf_sodium?: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber?: number;
  nf_sugars?: number;
  nf_protein: number;
  nf_potassium?: number;
  photo?: {
    thumb?: string;
    highres?: string;
  };
}

export interface ProductSearchResult {
  food_name: string;
  brand_name?: string;
  serving_qty: number;
  serving_unit: string;
  nf_calories: number;
  photo?: {
    thumb?: string;
  };
  nix_brand_id?: string;
  nix_item_id?: string;
}

class NutritionixAPI {
  private headers = {
    'Content-Type': 'application/json',
    'x-app-id': NUTRITIONIX_APP_ID,
    'x-app-key': NUTRITIONIX_API_KEY,
  };

  // Search for food items by name
  async searchFood(query: string): Promise<ProductSearchResult[]> {
    try {
      const response = await fetch(`${BASE_URL}/search/instant`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          query: query,
          detailed: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return [...(data.branded || []), ...(data.common || [])];
    } catch (error) {
      console.error('Error searching food:', error);
      throw error;
    }
  }

  // Get detailed nutrition info by UPC barcode
  async getNutritionByBarcode(upc: string): Promise<NutritionData | null> {
    try {
      const response = await fetch(`${BASE_URL}/search/item`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          upc: upc,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return null; // Product not found
        }
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.foods && data.foods.length > 0 ? data.foods[0] : null;
    } catch (error) {
      console.error('Error getting nutrition by barcode:', error);
      throw error;
    }
  }

  // Get detailed nutrition info by food name
  async getNutritionByName(foodName: string): Promise<NutritionData[]> {
    try {
      const response = await fetch(`${BASE_URL}/natural/nutrients`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          query: foodName,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.foods || [];
    } catch (error) {
      console.error('Error getting nutrition by name:', error);
      throw error;
    }
  }

  // Get nutrition info for branded product by nix_item_id
  async getBrandedNutrition(nixItemId: string): Promise<NutritionData | null> {
    try {
      const response = await fetch(`${BASE_URL}/search/item`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          nix_item_id: nixItemId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.foods && data.foods.length > 0 ? data.foods[0] : null;
    } catch (error) {
      console.error('Error getting branded nutrition:', error);
      throw error;
    }
  }
}

export const nutritionixAPI = new NutritionixAPI();
