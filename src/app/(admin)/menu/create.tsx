import { StyleSheet, Text, View, TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '@/src/components/button'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products'
import * as FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/src/lib/supabase'
import { decode } from 'base64-arraybuffer'
import RemoteImage from '@/src/components/RemoteImage'

const create = () => {
    const { id } = useLocalSearchParams()

    const isUpdating = !!id
    const router = useRouter()

    // defaultImg
    const defaultImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

    // api call
    const { mutate: insertProduct } = useInsertProduct()
    const { mutate: updateProduct } = useUpdateProduct()
    const { data: updatingProduct } = useProduct(id)
    const { mutate: deleteProduct } = useDeleteProduct()

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name)
            setPrice(updatingProduct.price.toString())
            setImage(updatingProduct.image)
        }
    }, [updatingProduct])

    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [error, setError] = useState('')
    const [imageLocal, setImageLocal] = useState(true)


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
    const onCreate = async () => {
        if (!validation()) {
            return
        }
        const imagePath = await uploadImage()
        insertProduct({ name, price: parseFloat(price), image: imagePath }, {
            onSuccess: () => {
                resetField()
                router.back()
            }
        })
    }

    // update item
    const onUpdate = async () => {
        if (!validation()) {
            return
        }
        const imagePath = await uploadImage()
        updateProduct({ id, name, price: parseFloat(price), image: imagePath }, {
            onSuccess: () => {
                resetField()
                router.back()
            }
        })
    }

    // add image
    const pickImage = async () => {
        setImageLocal(false)
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        } else {
            setImageLocal(true)
        }

    }
    // action
    const onSubmit = () => {
        if (isUpdating) {
            onUpdate()
        } else {
            onCreate()
        }
    }
    // delete
    const onDelete = () => {
        deleteProduct(id, {
            onSuccess: () => {
                resetField()
                router.replace('/(admin)')
            }
        })
    }
    // confirmDelete 
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product', [
            {
                text: 'Cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete
            }
        ])
    }
    // storage
    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('product-images')
            .upload(filePath, decode(base64), { contentType });
        if (data) {
            return data.path;
        }
    };
    return (
        <View style={styles.create}>
            <Stack.Screen options={{ title: isUpdating ? 'Update product' : 'Create product' }} />
            {
                isUpdating && imageLocal ?
                    <RemoteImage
                        path={image}
                        fallback={defaultImg}
                        style={styles.image}
                        resizeMode='contain' /> :
                    <Image source={{ uri: image || defaultImg }} style={styles.image} />

            }
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
            <Button text={isUpdating ? 'Update' : 'Create'} onPress={() => onSubmit()} />
            {isUpdating && <Text style={styles.textButton} onPress={() => confirmDelete()}>Delete</Text>}
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