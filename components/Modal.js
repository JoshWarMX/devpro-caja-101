import { StyleSheet } from 'react-native'
import React from 'react'
import { Overlay } from "@rneui/base"

export default function Modal({ isVisible, setVisible, children }) {
  return (
    <Overlay
    isVisible={isVisible}
    overlayStyle={styles.overlay}
    onBackdropPress={() => setVisible(false)}
    >
        {
        children
        }
    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay: {
        width: "80%",
        backgroundColor: "#fff",        
        justifyContent: "center",
    }
})
