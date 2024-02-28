import { View, Text, Platform, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../provider/cartProvider'
import CartListItem from '../components/cartListItems'
import Button from '../components/button'

const cart = () => {
    const { items, total } = useCart()
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            {
                items.length > 0 ? <Button text='Checkout' /> : ''

            }
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default cart

const styles = StyleSheet.create({
total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'right'
}
})