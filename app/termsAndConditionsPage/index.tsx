import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Index = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.description}>Welcome to FarmEase! These Terms and Conditions ("Terms") govern your use of the FarmEase mobile application and its related services (collectively, the "Platform"). The Platform is owned and operated by [Your Company Name] ("we," "us," or "our").By creating an account or using our Platform, you agree to be bound by these Terms. Please read them carefully.</Text>
      
        <View style={styles.box}>

            <Text style={styles.title}>1. The FarmEase Platform</Text>

            <View style={styles.subbox}>
                <Text style={styles.description}>FarmEase is a marketplace that connects consumers ("Consumers") seeking to purchase fresh agricultural produce directly with farmers and local producers ("Farmers"). We act as a neutral facilitator to enable these transactions. We are not the seller of the products and are not a party to the transaction between the Farmer and the Consumer. The Farmer is solely responsible for the products they list and sell on the Platform.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>2. User Accounts</Text>

            <View style={styles.subbox}>
                <Text style={styles.title}>Eligibility:</Text>
                <Text style={styles.description}>You must be at least 18 years old to create an account and use the Platform.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Account Creation:</Text>
                <Text style={styles.description}>You agree to provide accurate, current, and complete information during the registration process. You are responsible for safeguarding your password and for all activities that occur under your account.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Farmer Accounts:</Text>
                <Text style={styles.description}>Farmers may be required to undergo a verification process, which may include submitting documentation related to their farm and identity. Listing products on the Platform is contingent upon successful verification.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Consumer Accounts:</Text>
                <Text style={styles.description}>Consumers are responsible for providing accurate delivery and contact information to ensure successful order fulfillment.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>3. Farmer Obligations</Text>

            <View style={styles.subbox}>
                <Text style={styles.title}>Product Listings: </Text>
                <Text style={styles.description}>Farmers are solely responsible for the accuracy and completeness of their product listings. This includes product name, description, price, quantity, and shelf-life/perishability information.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Product Quality:</Text>
                <Text style={styles.description}>Farmers guarantee that all products offered are fresh, safe for consumption, and meet all applicable food safety standards.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Order Fulfillment:</Text>
                <Text style={styles.description}>Farmers are responsible for confirming, packing, and preparing orders for delivery in a timely and professional manner.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>AI Crop Disease Detection Tool:</Text>
                <Text style={styles.description}>The AI tool provided within the Platform is for informational and guidance purposes only. It is not a substitute for professional agricultural advice. We do not guarantee the accuracy of its diagnoses or recommendations.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>4. Consumer Obligations</Text>

            <View style={styles.subbox}>
                <Text style={styles.title}>Payment:</Text>
                <Text style={styles.description}>Consumers agree to pay for the products they order through the Platform's designated payment gateway.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Fair Conduct:</Text>
                <Text style={styles.description}>Consumers agree to provide fair and honest reviews of products and Farmers. Any fraudulent, abusive, or misleading activity is strictly prohibited.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>5. Payments & Fees</Text>

            <View style={styles.subbox}>
                <Text style={styles.title}>Payment Processing:</Text>
                <Text style={styles.description}>All payments are processed through our third-party payment gateway, Stripe. We do not store your credit card or sensitive payment information on our servers.</Text>
            </View>

             <View style={styles.subbox}>
                <Text style={styles.title}>Service Fees:</Text>
                <Text style={styles.description}>Farmers agree to pay FarmEase a service fee (commission) on each sale made through the Platform. This fee will be clearly communicated and automatically deducted from the payout.</Text>
            </View>

             <View style={styles.subbox}>
                <Text style={styles.title}>Cancellations & Refunds:</Text>
                <Text style={styles.description}>Policies regarding order cancellations and refunds will be detailed in a separate Refund Policy, which is incorporated by reference into these Terms.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>6. Prohibited Conduct</Text>

            <View style={styles.subbox}>
                <Text style={styles.reddescription}>You agree not to:</Text>
            </View>

             <View style={styles.subbox}>
                <Text style={styles.description}>Use the Platform for any illegal purpose or in violation of any local, state, national, or international law.</Text>
            </View>

             <View style={styles.subbox}>
                <Text style={styles.description}>Violate or encourage others to violate the rights of third parties, including intellectual property rights.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.description}>Post, upload, or distribute any content that is unlawful, defamatory, abusive, or otherwise objectionable.</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.description}>Interfere with the security or operation of the Platform.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>7. Disclaimers</Text>

            <View style={styles.subbox}>
                <Text style={styles.description}>The Platform is provided "as is" and "as available" without warranties of any kind. We do not warrant that the Platform will be uninterrupted or error-free. We expressly disclaim any warranties regarding the quality, safety, or legality of the products sold by Farmers. Any transaction you enter into with another user is at your own risk.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>8. Limitation of Liability</Text>

            <View style={styles.subbox}>
                <Text style={styles.description}>To the fullest extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use of the Platform or products purchased via the Platform.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>9. Governing Law and Dispute Resolution</Text>

            <View style={styles.subbox}>
                <Text style={styles.description}>These Terms shall be governed by and construed in accordance with the laws of India. Any legal action or proceeding arising under these Terms will be brought exclusively in the courts located in Mumbai, Maharashtra, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.</Text>
            </View>

        </View>

        <View style={styles.box}>

            <Text style={styles.title}>10. Changes to Terms</Text>

            <View style={styles.subbox}>
                <Text style={styles.description}>We reserve the right to modify these Terms at any time. If we make material changes, we will notify you through the Platform or by other means. Your continued use of the Platform after such changes constitutes your acceptance of the new Terms.</Text>
            </View>

        </View>
        
        <View style={styles.box}>

            <Text style={styles.title}>11. Contact Information</Text>

            <View style={styles.subbox}>
                <Text style={styles.reddescription}>If you have any questions about these Terms, please contact us at:</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Email: </Text>
                <Text style={styles.description}>[support@farmease.app]</Text>
            </View>

            <View style={styles.subbox}>
                <Text style={styles.title}>Address:</Text>
                <Text style={styles.description}>[Your Company's Registered Address, Mumbai, Maharashtra]</Text>
            </View>

        </View>

    </ScrollView>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 25,
  },
  description:{
    color: '#1F1F1FA8',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
  box:{
    gap: 10,
  },
  title:{
    color: '#1F1F1F',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
  subbox:{},
  reddescription:{
    color: '#ED543B',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
  },
})
