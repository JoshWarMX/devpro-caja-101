import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Image, ListItem, withBadge, Badge, Avatar } from '@rneui/base'


export default function ListOrderEnterMerch({ orders, navigation }) {
    return (
        <View>
            <FlatList
                data={orders}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(order) => (
                    <EnterOrder order={order} navigation={navigation} />
                )}
            />
        </View>
    )
}

function EnterOrder({ order, navigation }) {
    const { images, reference, createdAt, items, price } = order.item
    const imageReference = images[0]
    const timeStampDate = createdAt;
    const dateInMillis = timeStampDate.seconds * 1000
    var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()
    const BadgedIcon = withBadge(items.length)(Icon);
    const sumall = items.map(item => item.quantity * item.price).reduce((prev, curr) => prev + curr, 0);

    return (
        <TouchableOpacity>
            <View style={styles.viewReference}>
                <View style={styles.viewReferenceImage}>
                    <Image
                        //resizeMode='cover'
                        //PlaceholderContent={<ActivityIndicator />}
                        source={{ uri: imageReference }}
                        style={styles.imageReference} />
                </View>
                <View style={styles.viewInfo}>
                    <Text style={styles.productName}>{reference}</Text>
                    <Text style={styles.productName}>{date}</Text>
                    {
                        items.map((items, i) => (
                            //<ListItem key={i}>
                            <View key={i} style={styles.viewItems}>
                                <Text style={styles.productItems}>{items.quantity} pzas</Text>
                                <Text style={styles.productItems}>{items.name}</Text>
                            </View>
                            //</ListItem>
                        ))
                    }
                    <View style={{ height: 50, position: 'absolute', bottom: 0, flexDirection: 'row' }} >
                        <View style={{ height: 50, width: 50 }}>
                            <Icon
                                name='file-document-multiple'
                                type='material-community'
                                size={40}
                                color='#000'
                            />
                            <Badge
                                status="primary"
                                value={items.length}
                                containerStyle={{ position: 'absolute', top: -10, left: 2 }}
                            />
                        </View>
                        <View style={{ height: 50, width: 50 }}>
                            <Icon
                                name='cash-multiple'
                                type='material-community'
                                size={40}
                                color='#000'
                            />
                            <Badge
                                status="primary"
                                value={sumall}
                                containerStyle={{ position: 'absolute', top: -10, left: 2 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewReference: {
        flexDirection: "row",
        margin: 5,
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
    viewReferenceImage: {
        margin: 5,
        borderRadius: 10,
    },
    imageReference: {
        width: 114,
        height: 152,
        borderRadius: 10,
    },
    productName: {
        fontWeight: "bold",
        marginLeft: 10,
    },
    productItems: {
        color: "grey",
        marginLeft: 10,
    },
    productStock: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    },
    viewInfo: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        elevation: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    viewItems: {
        flexDirection: "row",
        margin: 2,
        backgroundColor: 'lightgray',
        borderRadius: 10,
    },
})

