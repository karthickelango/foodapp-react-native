import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import Button from '@/src/components/button'
import { useCart } from '@/src/provider/cartProvider'
import { PizzaSize } from '@/src/types'
import { useRouter } from 'expo-router'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'


const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']
const productDetailsPage = () => {
  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, isLoading } = useProduct(id)

  const navigate = useRouter()
  const { addItem } = useCart()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  // additem to cart
  const addToCart = () => {
    if (!product) {
      return
    }
    addItem(product, selectedSize)
    navigate.push('/cart')
  }
  // default image
  const defaultImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
  //loading state
  if (isLoading) {
    return <ActivityIndicator />
  }

  if (!product) {
    return <Text>Item not found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Details' }} />
      <RemoteImage
        path={product.image}
        fallback={defaultImg}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.title}>Select Size</Text>
      <View style={styles.sizes}>
        {
          sizes.map(size => (
            <Pressable
              onPress={() => setSelectedSize(size)}
              style={[styles.size, { backgroundColor: selectedSize === size ? '#F2F2F2' : 'white' }]} key={size}>
              <Text style={[styles.textSize, { color: selectedSize === size ? 'black' : '#C0C0C0' }]}>{size}</Text>
            </Pressable>
          ))
        }
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={() => addToCart()} text='Add to cart' />
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
    marginTop: 'auto'
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