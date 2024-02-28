import Colors from '@/src/constants/Colors';
import { StyleSheet, Text, View, Image } from 'react-native';

const ProductListItem = ({ product }) => {
    return (
        <View style={styles.container} key={product.id}>
            <Image style={styles.image} source={{ uri: product.image }} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>

    )
}

export default ProductListItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 1
    },
    title: {
        fontSize: 18,
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
