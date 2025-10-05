import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const TodayFreshDealsHeader = (props: NativeStackHeaderProps) => {
    const router = useRouter();
    return (
        <View style={styles.containerHeader}>

            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                    source={require("@/assets/images/leftBackArrow.png")}
                    style={styles.homeBackbutton}
                />
            </TouchableOpacity>
            <Text style={styles.containerheadertitle}>{props.options.title}</Text>

        </View>
    )
}

const styles = StyleSheet.create({

    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 50,
        paddingTop: 40, 
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginBottom: 0
    },
    homeBackbutton: {
        width: 20,
        height: 15,
        objectFit: 'cover',
    },
    containerheadertitle: {
        color: '#1F1F1F',
        fontFamily: 'Poppins-Medium',
        fontSize: 22,
        fontWeight: '500',
    
    },
})
export default TodayFreshDealsHeader