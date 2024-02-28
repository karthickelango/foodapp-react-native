import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const productDetailsPage = () => {
  const {id}  = useLocalSearchParams()
  return (
    <View>
      <Stack.Screen options={{title: 'Details'}}/>
      <Text>product : {id}</Text>
    </View>
  )
}

export default productDetailsPage

const styles = StyleSheet.create({})