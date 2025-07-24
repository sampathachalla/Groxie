import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Modal as RNModal, ActivityIndicator } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { CameraView, Camera } from 'expo-camera';
import { nutritionixAPI, ProductSearchResult } from '../../services/nutritionixApi';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<{data: string, type: string} | null>(null);
  const [searchResults, setSearchResults] = useState<ProductSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['Apple', 'Milk', 'Bread', 'Chicken']);

  // Request camera permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await nutritionixAPI.searchFood(searchQuery);
      setSearchResults(results);
      
      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches(prev => [searchQuery, ...prev.slice(0, 3)]);
      }
    } catch (error) {
      Alert.alert('Search Error', 'Failed to search for food items. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleScan = async () => {
    if (hasPermission === null) {
      Alert.alert('Permission Required', 'Camera permission is required to scan barcodes.');
      return;
    }
    if (hasPermission === false) {
      Alert.alert('No Access', 'No access to camera. Please enable camera permissions in settings.');
      return;
    }
    
    setShowScanner(true);
    setScanned(false);
    setScannedData(null);
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScannedData({ data, type });
    setShowScanner(false);
    
    // Navigate to scanner result page with the scanned data
    router.push(`/(tabs)/scannerresult?data=${encodeURIComponent(data)}&type=${encodeURIComponent(type)}` as any);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData(null);
  };

  const handleCloseScanner = () => {
    setShowScanner(false);
    setScanned(false);
    setScannedData(null);
  };

  // Scanner Modal Component
  const ScannerModal = () => (
    <RNModal
      visible={showScanner}
      animationType="slide"
      onRequestClose={handleCloseScanner}
    >
      <View className="flex-1 bg-black">
        {/* Scanner Header */}
        <SafeAreaView edges={['top']} className="bg-black">
          <View className="flex-row items-center justify-between px-4 py-4">
            <TouchableOpacity
              onPress={handleCloseScanner}
              className="bg-white/20 p-2 rounded-full"
            >
              <FontAwesome name="times" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Scan Barcode</Text>
            <View className="w-8" />
          </View>
        </SafeAreaView>

        {/* Scanner Camera View */}
        <View className="flex-1 relative">
          {hasPermission && (
            <CameraView
              style={{ flex: 1 }}
              facing="back"
              barcodeScannerSettings={{
                barcodeTypes: [
                  'upc_a',
                  'upc_e',
                  'ean13',
                  'ean8',
                  'code128',
                  'code39',
                  'code93',
                  'codabar',
                  'qr',
                  'pdf417',
                ],
              }}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
          )}

          {/* Show message if no permission */}
          {!hasPermission && (
            <View className="flex-1 items-center justify-center bg-gray-800">
              <FontAwesome name="camera" size={48} color="#9CA3AF" />
              <Text className="text-white text-center mt-4 text-lg px-4">
                Camera permission required for barcode scanning
              </Text>
            </View>
          )}

          {/* Scanning Overlay */}
          <View className="absolute inset-0 flex-1 items-center justify-center">
            {/* Focus Frame */}
            <View className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
              <View className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
              <View className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
              <View className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
              <View className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
            </View>

            {/* Scanning Status */}
            <Text className="text-white text-center mt-8 text-lg">
              {scanned ? 'Barcode Scanned!' : 'Position barcode within the frame'}
            </Text>

            {/* Scanned Data Display */}
            {scannedData && (
              <View className="bg-white/90 p-4 rounded-lg mt-4 mx-4">
                <Text className="text-black font-semibold mb-2">Scanned Results:</Text>
                <Text className="text-black mb-1">Type: {scannedData.type}</Text>
                <Text className="text-black mb-3">Data: {scannedData.data}</Text>
                
                <TouchableOpacity
                  onPress={handleScanAgain}
                  className="bg-blue-500 p-3 rounded-lg"
                >
                  <Text className="text-white text-center font-semibold">
                    Scan Again
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Scanner Footer */}
        <SafeAreaView edges={['bottom']} className="bg-black">
          <View className="px-4 py-4">
            <Text className="text-white/70 text-center text-sm">
              {scanned ? 
                `✅ Successfully scanned ${scannedData?.type} barcode` : 
                '📷 Scanning for supported barcode formats...'
              }
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </RNModal>
  );

  return (
    <>
      <ScannerModal />
      
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
        <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
          <TopNavbar />
        </SafeAreaView>
        
        <View className="flex-1 px-4 pt-4">
          <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
            Search Food
          </Text>

          {/* Search input */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-card dark:bg-dark-card">
              <FontAwesome name="search" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <TextInput
                className="flex-1 ml-3 text-text-primary dark:text-dark-text-primary"
                placeholder="Search for food items..."
                placeholderTextColor={theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
            </View>
          </View>

          {/* Scan button */}
          <TouchableOpacity
            onPress={handleScan}
            className="bg-primary dark:bg-dark-primary p-4 rounded-lg mb-6 flex-row items-center justify-center"
          >
            <FontAwesome name="camera" size={24} color="#fff" />
            <Text className="text-white font-semibold text-lg ml-3">
              Scan Food Item
            </Text>
          </TouchableOpacity>

          {/* Scanned Results Section */}
          {scannedData && (
            <View className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
              <View className="flex-row items-center mb-3">
                <FontAwesome name="check-circle" size={20} color="#22c55e" />
                <Text className="text-green-700 dark:text-green-400 font-semibold text-lg ml-2">
                  Barcode Scanned!
                </Text>
              </View>
              <View className="bg-white dark:bg-gray-800 rounded-lg p-3 mb-3">
                <Text className="text-gray-600 dark:text-gray-400 text-sm mb-1">Type:</Text>
                <Text className="text-text-primary dark:text-dark-text-primary font-mono text-sm mb-2">
                  {scannedData.type}
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 text-sm mb-1">Barcode Data:</Text>
                <Text className="text-text-primary dark:text-dark-text-primary font-mono text-sm">
                  {scannedData.data}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setScannedData(null)}
                className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg"
              >
                <Text className="text-gray-700 dark:text-gray-300 text-center text-sm">
                  Clear Results
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Recent searches */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-primary dark:text-dark-primary mb-3">
              Recent Searches
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentSearches.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSearchQuery(item)}
                  className="bg-card dark:bg-dark-card px-4 py-2 rounded-full mr-3 border border-gray-200 dark:border-gray-600"
                >
                  <Text className="text-text-primary dark:text-dark-text-primary">
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Search results */}
          <View className="flex-1">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-primary dark:text-dark-primary">
                Search Results
              </Text>
              {isSearching && (
                <ActivityIndicator size="small" color={theme === 'dark' ? '#00C853' : '#43A047'} />
              )}
            </View>
            
            {isSearching ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={theme === 'dark' ? '#00C853' : '#43A047'} />
                <Text className="text-text-secondary dark:text-dark-text-secondary mt-4">
                  Searching for food items...
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                {searchResults.map((item, index) => (
                  <TouchableOpacity
                    key={`${item.food_name}-${index}`}
                    className="bg-card dark:bg-dark-card p-4 rounded-lg mb-3 border border-gray-200 dark:border-gray-600"
                    onPress={() => {
                      // Navigate to detailed nutrition view
                      router.push(`/(tabs)/scannerresult?foodName=${encodeURIComponent(item.food_name)}&brand=${encodeURIComponent(item.brand_name || '')}&nixItemId=${encodeURIComponent(item.nix_item_id || '')}` as any);
                    }}
                  >
                    <View className="flex-row items-center">
                      <View className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mr-4 items-center justify-center">
                        {item.photo?.thumb ? (
                          <Text className="text-2xl">🍽️</Text>
                        ) : (
                          <FontAwesome name="cutlery" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                        )}
                      </View>
                      <View className="flex-1">
                        <Text className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">
                          {item.food_name}
                        </Text>
                        {item.brand_name && (
                          <Text className="text-text-secondary dark:text-dark-text-secondary mb-2">
                            {item.brand_name}
                          </Text>
                        )}
                        <View className="flex-row">
                          <Text className="text-sm text-text-secondary dark:text-dark-text-secondary mr-4">
                            {Math.round(item.nf_calories)} cal
                          </Text>
                          <Text className="text-sm text-text-secondary dark:text-dark-text-secondary mr-4">
                            {item.serving_qty} {item.serving_unit}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity className="bg-primary dark:bg-dark-primary p-2 rounded-full">
                        <FontAwesome name="plus" size={16} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View className="flex-1 items-center justify-center">
                <FontAwesome name="search" size={48} color={theme === 'dark' ? '#6B7280' : '#9CA3AF'} />
                <Text className="text-text-secondary dark:text-dark-text-secondary mt-4 text-center">
                  {searchQuery ? 'No results found. Try a different search term.' : 'Search for food items to see nutrition information'}
                </Text>
              </View>
            )}
          </View>
        </View>

        <BottomNavbar />
      </SafeAreaView>
    </>
  );
} 