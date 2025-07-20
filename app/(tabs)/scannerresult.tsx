import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import BottomNavbar from '../../components/Navbar/BottomNavbar';
import TopNavbar from '../../components/Navbar/TopNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';

export default function ScannerResultScreen() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const [scannedData, setScannedData] = useState<{data: string, type: string} | null>(null);

  useEffect(() => {
    // Get the scanned data from route params
    if (params.data && params.type) {
      setScannedData({
        data: params.data as string,
        type: params.type as string
      });
    }
  }, [params]);

  const handleScanAgain = () => {
    router.push('/(tabs)/search');
  };

  const handleAddToHistory = () => {
    Alert.alert(
      'Added to History',
      `Barcode ${scannedData?.data} has been added to your scan history.`,
      [{ text: 'OK' }]
    );
  };

  const handleLookupProduct = () => {
    Alert.alert(
      'Product Lookup',
      `Looking up product information for barcode: ${scannedData?.data}`,
      [{ text: 'OK' }]
    );
  };

  const formatBarcodeType = (type: string) => {
    return type.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase();
  };

  const getBarcodeTypeIcon = (type: string) => {
    const typeUpper = type.toUpperCase();
    if (typeUpper.includes('UPC')) return 'barcode';
    if (typeUpper.includes('EAN')) return 'qrcode';
    if (typeUpper.includes('CODE')) return 'barcode';
    return 'barcode';
  };

  if (!scannedData) {
    return (
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
        <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
          <TopNavbar />
        </SafeAreaView>
        
        <View className="flex-1 items-center justify-center px-4">
          <FontAwesome name="exclamation-triangle" size={48} color={theme === 'dark' ? '#F59E0B' : '#D97706'} />
          <Text className="text-xl font-bold text-primary dark:text-dark-primary mt-4 mb-2 text-center">
            No Scanner Data
          </Text>
          <Text className="text-text-secondary dark:text-dark-text-secondary text-center mb-6">
            No barcode data was found. Please scan a barcode first.
          </Text>
          <TouchableOpacity
            onPress={handleScanAgain}
            className="bg-primary dark:bg-dark-primary px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Go to Scanner</Text>
          </TouchableOpacity>
        </View>

        <BottomNavbar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background" edges={['left', 'right', 'bottom']}>
      <SafeAreaView edges={['top']} className="bg-background dark:bg-dark-background">
        <TopNavbar />
      </SafeAreaView>
      
      <View className="flex-1 px-4 pt-4">
        <Text className="text-2xl font-bold text-primary dark:text-dark-primary mb-6">
          Scanner Result
        </Text>

        {/* Success Header */}
        <View className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
          <View className="flex-row items-center mb-3">
            <FontAwesome name="check-circle" size={24} color="#22c55e" />
            <Text className="text-green-700 dark:text-green-400 font-bold text-xl ml-3">
              Barcode Scanned Successfully!
            </Text>
          </View>
          <Text className="text-green-600 dark:text-green-500 text-sm">
            Your barcode has been successfully scanned and processed.
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Barcode Information Card */}
          <View className="bg-card dark:bg-dark-card rounded-xl p-6 mb-6 border border-gray-200 dark:border-gray-600">
            <View className="flex-row items-center mb-4">
              <FontAwesome 
                name={getBarcodeTypeIcon(scannedData.type)} 
                size={24} 
                color={theme === 'dark' ? '#00C853' : '#43A047'} 
              />
              <Text className="text-lg font-bold text-primary dark:text-dark-primary ml-3">
                Barcode Information
              </Text>
            </View>

            {/* Barcode Type */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-text-secondary dark:text-dark-text-secondary mb-1">
                Barcode Type:
              </Text>
              <View className="bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
                <Text className="text-blue-700 dark:text-blue-400 font-mono text-base">
                  {formatBarcodeType(scannedData.type)}
                </Text>
              </View>
            </View>

            {/* Barcode ID */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-text-secondary dark:text-dark-text-secondary mb-1">
                Barcode ID:
              </Text>
              <View className="bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <Text className="text-text-primary dark:text-dark-text-primary font-mono text-lg font-bold">
                  {scannedData.data}
                </Text>
              </View>
            </View>

            {/* Additional Info */}
            <View className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
              <View className="flex-row items-center mb-2">
                <FontAwesome name="info-circle" size={16} color="#F59E0B" />
                <Text className="text-yellow-700 dark:text-yellow-400 font-semibold ml-2">
                  Product Information
                </Text>
              </View>
              <Text className="text-yellow-600 dark:text-yellow-500 text-sm">
                For now, we're displaying the scanned barcode ID. Future updates will include product lookup and nutritional information.
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3 mb-6">
            <TouchableOpacity
              onPress={handleLookupProduct}
              className="bg-primary dark:bg-dark-primary p-4 rounded-lg flex-row items-center justify-center"
            >
              <FontAwesome name="search" size={20} color="#fff" />
              <Text className="text-white font-semibold text-lg ml-3">
                Lookup Product Information
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddToHistory}
              className="bg-blue-500 dark:bg-blue-600 p-4 rounded-lg flex-row items-center justify-center"
            >
              <FontAwesome name="history" size={20} color="#fff" />
              <Text className="text-white font-semibold text-lg ml-3">
                Add to Scan History
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleScanAgain}
              className="bg-gray-500 dark:bg-gray-600 p-4 rounded-lg flex-row items-center justify-center"
            >
              <FontAwesome name="camera" size={20} color="#fff" />
              <Text className="text-white font-semibold text-lg ml-3">
                Scan Another Item
              </Text>
            </TouchableOpacity>
          </View>

          {/* Technical Details */}
          <View className="bg-card dark:bg-dark-card rounded-xl p-4 mb-6 border border-gray-200 dark:border-gray-600">
            <Text className="text-lg font-bold text-primary dark:text-dark-primary mb-3">
              Technical Details
            </Text>
            
            <View className="space-y-2">
              <View className="flex-row justify-between">
                <Text className="text-text-secondary dark:text-dark-text-secondary">Format:</Text>
                <Text className="text-text-primary dark:text-dark-text-primary font-mono">
                  {scannedData.type}
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-text-secondary dark:text-dark-text-secondary">Length:</Text>
                <Text className="text-text-primary dark:text-dark-text-primary font-mono">
                  {scannedData.data.length} digits
                </Text>
              </View>
              
              <View className="flex-row justify-between">
                <Text className="text-text-secondary dark:text-dark-text-secondary">Scanned:</Text>
                <Text className="text-text-primary dark:text-dark-text-primary">
                  {new Date().toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <BottomNavbar />
    </SafeAreaView>
  );
}
