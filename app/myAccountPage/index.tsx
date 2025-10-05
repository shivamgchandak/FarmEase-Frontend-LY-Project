import ProfileInput from '@/components/profileInput';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const index = () => {

    const [number, setNumber] = useState("");

    const handleNumberChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, "").slice(0, 10);
        setNumber(cleaned);
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContainer}>

        <View style={styles.container}>
    
            <Image source={require("@/assets/TestImages/TestImage.png")} style={styles.userImage}/>

            <View style={styles.userDetailsContainer}>

                <View style={styles.userDetails}>
                    <ProfileInput 
                        placeholder="Update your number"
                        type="number"
                        value={number}
                        onChangeText={handleNumberChange}
                        height={40}
                        width={240}
                    />
                    <Image source={require('@/assets/images/EditImage.png')} style={styles.EditButton}/>
                </View>

                <View style={styles.userDetails}>
                    <ProfileInput 
                        placeholder="Update your number"
                        type="number"
                        value={number}
                        onChangeText={handleNumberChange}
                        height={40}
                        width={240}
                    />
                    <Image source={require('@/assets/images/EditImage.png')} style={styles.EditButton}/>
                </View>

                <View style={styles.userDetails}>
                    <ProfileInput 
                        placeholder="Update your number"
                        type="number"
                        value={number}
                        onChangeText={handleNumberChange}
                        height={40}
                        width={240}
                    />
                    <Image source={require('@/assets/images/EditImage.png')} style={styles.EditButton}/>
                </View>

                <View style={styles.userDetails}>
                    <ProfileInput 
                        placeholder="Update your number"
                        type="number"
                        value={number}
                        onChangeText={handleNumberChange}
                        height={40}
                        width={240}
                    />
                    <Image source={require('@/assets/images/EditImage.png')} style={styles.EditButton}/>
                </View>
                
            </View>
        
        </View>

        <View style={styles.otherContainer}>
            <Text style={styles.otherContainerText}>Order History</Text>
            <Image source={require('@/assets/images/leftBackArrow.png')} style={styles.otherContainerImage}/>
        </View>
        
        <View style={styles.otherContainer}>
            <Text style={styles.otherContainerText}>Terms and conditions</Text>
            <Image source={require('@/assets/images/leftBackArrow.png')} style={styles.otherContainerImage}/>
        </View>

    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        position: "relative"
    },
    container: {
        width: 330,
        backgroundColor: '#ffffff',
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 12,
        marginTop: 120,
        position: "relative",
    },
    userImage: {
        position: 'relative',
        top: '-30%', 
        height: 170,
        width: 170,
        borderRadius: 85,
        objectFit: "cover"
    },
    userDetailsContainer:{
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: -70,
        marginBottom: 20,
    },
    userDetails:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    EditButton:{
        height: 25,
        width: 25,
        objectFit: 'contain',
    },
    otherContainer:{
        width: 330,
        height: 50,
        backgroundColor: '#ffffff',
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderRadius: 12,
        flexDirection: 'row',
        padding: 10,
    },
    otherContainerText:{
        color: '#1F1F1F',
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        fontSize: 16,
    },
    otherContainerImage: {
        height: 15,
        width: 15,
        transform: [{ rotate: "180deg" }],
        objectFit: 'contain',
    },
})