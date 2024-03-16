import { Alert } from "react-native"
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native"

const fetchPaymentSheetParams = async (amount: number) => {
    const {data, error} = await supabase.functions.invoke('payment-sheet', {body: { amount }})
    if(data) {
        console.log(data)
        return data
    }
    Alert.alert('Error fetching payment sheet params')
    return {}

}

export const initialisePaymentSheet = async (amount: number) => {
    console.log('initlizing', amount)
    const {paymentIntent, publishablekey, customer, ephemeralKey} = await fetchPaymentSheetParams(amount)
    if(!paymentIntent || !publishablekey) return
    const result = await initPaymentSheet({
        merchantDisplayName: 'Soru',
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        defaultBillingDetails: {
            name: 'Soru for all'
        },
    })
}

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()
    if(error) {
        Alert.alert('error')
        return false
    }
    return true
}