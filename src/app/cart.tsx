import { View, Text, Platform, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useCart } from '../provider/cartProvider'
import CartListItem from '../components/cartListItems'
import Button from '../components/button'
import { Link } from 'expo-router'
import Colors from '../constants/Colors'

const cart = () => {
    const { items, total } = useCart()
    return (
        <View style={{ padding: 10 }}>
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
            {
                items.length > 0 ?
                    <>
                        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                        <Button text='Checkout' />
                    </>
                    :
                    <>
                        <View style={styles.container}>
                            <Text style={styles.text}>Your cart is emptyt, add items</Text>
                            <Link href='/(user)/menu'>
                                <Text style={styles.textButton}>Go to menu</Text>
                            </Link>
                        </View>
                    </>


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
    },
    container: {
        height:'100%',
        alignItems: 'center'
    },
    textButton: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: 'center',
        marginVertical: 10,
        color: Colors.light.tint
    },
    text: {
        fontSize: 16,
        fontWeight: '500'
    }
})