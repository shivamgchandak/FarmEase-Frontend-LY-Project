import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import BuyerButton from '../../buyerButton'

const SeasonalProductAlert = () => {
  return (
    <View style={styles.container}>
        
      <View style={styles.containerLeft}>

        <View>
            <Text style={styles.containerLeftTitle}>Seasonal Product Alert</Text>
        </View>

        <View style={styles.containerLeftSubtitle}>
            <Text style={styles.containerLeftSubtitleText}>Just In! Fresh Custard Apples (Sitaphal) from Farmer Ramesh in the Konkan region. Get them before they're gone!</Text>
        </View>

        <View>
            <BuyerButton
                height={20}
                width={65}
                backgroundColor='#169E1C'
                borderColor='#169E1C'
                borderRadius={3}
                text='Shop Now'
                textStyle={{ color: "#fff", fontSize: 10, fontWeight: '500', fontFamily: 'Poppins-Medium' }}
                onPress={() => console.log('abc')}
            />
        </View>
        
      </View>

        <Image source={require("@/assets/images/SesonalProductAlertImage.png")} style={styles.containerLeftRightImage}/>        

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height: 170,
        width: 330,
        backgroundColor: '#169E1C1A',
        borderRadius: 15,
    },
    containerLeft:{
        flex: 1,
        alignItems:'flex-start',
        justifyContent: 'flex-start',
        gap: 10,
        padding: 15,
    },
    containerLeftTitle:{
        fontSize: 20,
        fontWeight: "500",
        color: "#1F1F1F",
        fontFamily: "Poppins-Medium"
    },
    containerLeftSubtitle:{
        maxWidth: 150,
    },
    containerLeftSubtitleText:{
        fontSize: 10,
        fontWeight: "400",
        color: "#1F1F1F9E",
        fontFamily: "Poppins-Regular"
    },
    containerLeftRightImage:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderRadius: 15,
        width: 180,
        height: 150,
    }
})

export default SeasonalProductAlert