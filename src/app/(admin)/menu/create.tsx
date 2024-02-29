import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/button'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'

const create = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [image, setImage] = useState('');

    // defaultImg
    const defaultImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'


    // validation
    const validation = () => {
        setError('')
        if (!name) {
            setError('Name is required')
            return false
        }
        if (!price) {
            setError('Price is required')
            return false
        }
        if (isNaN(parseFloat(price))) {
            setError('Price is not a number')
            return false
        }
        return true
    }
    // reset field
    const resetField = () => {
        setName('')
        setPrice('')
    }

    // add item
    const onCreate = () => {
        if (!validation()) {
            return
        }
        console.log(name, price)
        resetField()
    }
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
      
    }
    return (
        <View style={styles.create}>
            <Image source={{ uri: image || defaultImg }} style={styles.image} />
            <Text style={styles.textButton} onPress={pickImage}>Select image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                placeholder='Name'
                style={styles.input}
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
                value={price}
                onChangeText={setPrice}
            />
            <Text style={{ color: 'red' }}>{error}</Text>
            <Button text='Create' onPress={() => onCreate()} />
        </View>
    )
}

export default create

const styles = StyleSheet.create({
    create: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    label: {
        fontSize: 14,
        fontWeight: '500'
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    },
    textButton: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: 'center',
        marginVertical: 10,
        color: Colors.light.tint
    }
})