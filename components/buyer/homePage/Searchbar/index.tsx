import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/SearchbarImage.png')} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search by product, farmer"
        placeholderTextColor="#B0B0B0"
        value={query}
        onChangeText={setQuery}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF12',
    borderWidth: 1,
    borderColor: '#00000012',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    height: 16,
    width:16,
  },
  input: {
    fontSize: 16,
    color: '#3C3C4373',
    fontWeight: '300',
    fontFamily: 'Poppins-Light',
  },
});

export default SearchBar;
