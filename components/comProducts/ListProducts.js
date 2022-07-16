import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from '@rneui/base'

export default function ListProducts({ products, navigation }) {
    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(product) => (
                    <Product product={product} navigation={navigation} />
                )}
            />
        </View>
    )
}

function Product({ product, navigation }) {
    const { id, images, name, price, stock1, description } = product.item
    const imageProduct = images[0]
    return (
        <TouchableOpacity>
            <View style={styles.viewProduct}>
                <View style={styles.viewProductImage}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator />}
                        source={{ uri: imageProduct }}
                        style={styles.imageProduct} />
                </View>
                <View>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.productPrice}>$ {price}</Text>
                    <Text style={styles.productStock}>stock: {stock1}</Text>
                    <Text style={styles.productDescription}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewProduct: {
        flexDirection: "row",
        margin: 10
    },
    viewProductImage: {
        marginRight: 15
    },
    imageProduct: {
        width: 110,
        height: 110,
    },
    productName: {
        fontWeight: "bold"
    },
    productPrice: {
        paddingTop: 2,
        color: "grey"
    },
    productStock: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    }
})

