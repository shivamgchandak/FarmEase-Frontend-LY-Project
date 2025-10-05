import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const AddressBar = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.containerLeft}>
        
        <View style={styles.containerLeftTop}>

            <View>
                <Image source={require("@/assets/images/GreenLocationPin.png")} style={styles.containerLeftTopDirection}/>
            </View>

            <View>
                <Text style={styles.containerLeftTopText}>Home</Text>
            </View>

            <View>
                <Image source={require("@/assets/images/DropdownBottomArrow.png")} style={styles.containerLeftTopDropdown}/>
            </View>

        </View>

        <View>
            <Text style={styles.containerLeftBottomText}>42, Greenfield Lane, Shivaji Nagar...</Text>
        </View>

      </View>

      <View style={styles.containerRight}>
        <Text style={styles.containerRightText}>S</Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    containerLeft:{
    },
    containerLeftTop:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10,
    },
    containerLeftTopDirection:{
        height: 20,
        width: 15,
    },
    containerLeftTopText:{
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: "#000",
        fontWeight: "500",
    },
    containerLeftTopDropdown:{
        height: 8,
        width: 15,
    },
    containerLeftBottomText:{
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        color: "#1F1F1F59",
        fontWeight: "400",
        letterSpacing: -0.39,
    },
    containerRight:{
        height: 45,
        width: 45,
        backgroundColor: '#169E1C14',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    containerRightText:{
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: "#169E1C",
        fontWeight: "500",
    },
})

export default AddressBar