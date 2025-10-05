import BottomNavbar from '@/components/buyer/bottomNavbar';
import CategoriesAllProducts from '@/components/buyer/homePage/CategoriesAllProducts';
import DealsOfTheDay from '@/components/buyer/homePage/DealsOfTheDay';
import FarmersNearYou from '@/components/buyer/homePage/FarmersNearYou';
import SearchBar from '@/components/buyer/homePage/Searchbar';
import SeasonalProductAlert from '@/components/buyer/homePage/SeasonalProductAlert';
import AddressBar from '@/components/buyer/homePage/topAddressBar';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const buyerHomePage = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >

          <SeasonalProductAlert />
          <DealsOfTheDay />
          <SearchBar />
          <CategoriesAllProducts />
          <FarmersNearYou />

        </ScrollView>

      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 10,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default buyerHomePage;
