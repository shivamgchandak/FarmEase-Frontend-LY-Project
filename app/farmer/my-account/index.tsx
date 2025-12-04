import ProfileInput from '@/components/profileInput';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    farmName: '',
    city: '',
  });

  const handleChange =
    (field: keyof typeof form) =>
    (text: string) => {
      if (field === 'phone') {
        // allow only numbers and limit to 10 digits
        const cleaned = text.replace(/[^0-9]/g, '').slice(0, 10);
        setForm(prev => ({ ...prev, [field]: cleaned }));
      } else {
        setForm(prev => ({ ...prev, [field]: text }));
      }
    };

  const fields = [
    {
      key: 'name' as const,
      placeholder: 'Update your Name',
    },
    {
      key: 'phone' as const,
      placeholder: 'Update your Number',
    },
    {
      key: 'password' as const,
      placeholder: 'Update your Password',
    },
    {
      key: 'farmName' as const,
      placeholder: 'Update your Farm Name',
    },
    {
      key: 'city' as const,
      placeholder: 'Update your City',
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screen}
      contentContainerStyle={styles.mainContainer}
    >
      <View style={styles.container}>
        <Image
          source={require('@/assets/TestImages/TestImage.png')}
          style={styles.userImage}
        />

        <View style={styles.userDetailsContainer}>
          {fields.map(field => (
            <View style={styles.userDetails} key={field.key}>
              <ProfileInput
                placeholder={field.placeholder}
                type="number"
                value={form[field.key]}
                onChangeText={handleChange(field.key)}
                height={40}
                width={240}
              />
              <Image
                source={require('@/assets/images/EditImage.png')}
                style={styles.editButton}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.otherContainer}>
        <Text style={styles.otherContainerText}>Bank Details</Text>
        <Image
          source={require('@/assets/images/leftBackArrow.png')}
          style={styles.otherContainerImage}
        />
      </View>

      <TouchableOpacity style={styles.otherContainer} onPress={() => router.push("/terms-condition")}>
        <Text style={styles.otherContainerText}>Terms and conditions</Text>
        <Image
          source={require('@/assets/images/leftBackArrow.png')}
          style={styles.otherContainerImage}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  mainContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 30,
  },
  container: {
    width: 330,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 12,
    paddingTop: 90,
    paddingBottom: 20,
  },
  userImage: {
    position: 'absolute',
    top: -85,
    height: 170,
    width: 170,
    borderRadius: 85,
    // for React Native, use resizeMode instead of objectFit
    resizeMode: 'cover',
  },
  userDetailsContainer: {
    marginTop: 10,
    gap: 12,
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  editButton: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  otherContainer: {
    width: 330,
    height: 50,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  otherContainerText: {
    color: '#1F1F1F',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
  otherContainerImage: {
    height: 15,
    width: 15,
    transform: [{ rotate: '180deg' }],
    resizeMode: 'contain',
  },
});