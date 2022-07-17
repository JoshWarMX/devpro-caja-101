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
    const { images, reference, createdAt, items } = order.item
    const imageReference = images[0]
    const timeStampDate = createdAt;
    const dateInMillis = timeStampDate.seconds * 1000
    var date = new Date(dateInMillis).toDateString() + ' at ' + new Date(dateInMillis).toLocaleTimeString()
    const BadgedIcon = withBadge(items.length)(Icon);


    return (
        <TouchableOpacity>
            <View style={styles.viewReference}>
                <View style={styles.viewReferenceImage}>
                    <Image
                        resizeMode='cover'
                        PlaceholderContent={<ActivityIndicator />}
                        source={{ uri: imageReference }}
                        style={styles.imageReference} />
                </View>
                <View style={styles.viewInfo}>
                    <Text style={styles.productName}>{reference}</Text>
                    <Text style={styles.productDate}>{date}</Text>
                    {
                        items.map((items, i) => (
                            <ListItem key={i}>
                                <Text style={styles.productName}>{items.name}</Text>
                                <Text style={styles.productName}>{items.quantity} pzas</Text>
                            </ListItem>
                        ))
                    }
                    <View style={{
                        
                        height: 50,                  
                    }} >
                        <View style={{
                        
                        height: 50,
                        width: 50,
                    }}>
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
        margin: 15,
        borderRadius: 10,
    },
    imageReference: {
        width: 130,
        height: 140,
    },
    productName: {
        fontWeight: "bold",
        marginLeft: 10,
    },
    productDate: {
        color: "grey",
        marginLeft: 10,
    },
    productStock: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    },
    viewInfo: {
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
    }
})

