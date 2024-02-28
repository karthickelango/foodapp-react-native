import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import Button from '@/src/components/button'
import { useCart } from '@/src/provider/cartProvider'
import { PizzaSize } from '@/src/types'
import { useRouter } from 'expo-router'

const productDetailsPage = () => {
  const { id } = useLocalSearchParams()
  const navigate = useRouter()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const product = products.find(p => p.id.toString() === id)
  const addToCart = () => {
    if (!product) {
      return
    }
    addItem(product, selectedSize)
    navigate.push('/cart')
  }
  // default image
  const defaultImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
  if (!product) {
    return <Text>Item not found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Details' }} />
      <Image style={styles.image} source={{ uri: product.image || defaultImg }} resizeMode='contain' />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

export default productDetailsPage

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: '#C0C0C0',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSize: {
    fontSize: 20,
    fontWeight: '500',
  }
});