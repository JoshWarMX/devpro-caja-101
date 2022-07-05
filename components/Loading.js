import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from "@rneui/base"
import { ActivityIndicator } from 'react-native'

export default function Loading({ isVisible, text }) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}>
            <View style={styles.view}>
                <ActivityIndicator
                    size="large"
                    color="#442484"                    
                    />
                {
                    text && <Text style={styles.text}>{text}</Text>
                }
            </View>
        </Overlay>
        )
}

const styles = StyleSheet.create({
    overlay: {
        width: "80%",
        height: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#442484",
        borderWidth: 2
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        color: "#442484",
        marginTop: 10,
    }

})