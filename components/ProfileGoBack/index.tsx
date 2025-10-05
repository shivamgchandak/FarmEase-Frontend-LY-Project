import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface GoBackButtonProps {
  path: string;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ 
  path, 
}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
      navigation.navigate(path as never);
  };

  return (
    <TouchableOpacity 
      style={styles.goBackButton}
      onPress={handleGoBack}
    >
        <View style={styles.button}>
            <Image 
                source={require("../../assets/images/GoBack.png")}
                style={styles.buttonimage}
            />
            <Text style={styles.goBackText}>Go back</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  goBackButton: {
    padding: 10,
    alignSelf: 'center',
  },
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  goBackText: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#000000',
  },
  buttonimage:{
    width: 13,
    height:10,
  },
});

export default GoBackButton;