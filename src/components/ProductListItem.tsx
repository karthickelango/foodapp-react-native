import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, Image, Pressable } from 'react-native';
import { Product } from '../types';
import { Link, useSegments } from 'expo-router';
import RemoteImage from './RemoteImage';


// add type
type ProductListItemProps = {
    product: Product
}

// default image
const defaultImg = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: ProductListItemProps) => {
    const segment = useSegments()
    return (
        <Link href={`/${segment[0]}/menu/${product.id}`} asChild>
            <Pressable style={styles.container} key={product.id}>
                <RemoteImage
                    path={product.image}
                    fallback={defaultImg}
                    style={styles.image}
                    resizeMode='contain' />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
        </Link>


    )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
        flex: 1,
        maxWidth: '50%'
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
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    price: {
        color: Colors.light.tint,
        fontWeight: 'bold',
    }
});
