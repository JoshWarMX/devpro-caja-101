import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Loading from '../../components/Loading'
import { Button } from "@rneui/base"
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
  const navigation = useNavigation()

  return (
    <ScrollView
      centerContent
      style={styles.viewBody}
    >
      <Image
        source={require("../../assets/Botanico.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View>
        <Text style={styles.title}>Inicia Sesion</Text>
        <Text style={styles.description}>Da click en el Boton para iniciar sesion</Text>

      </View>
      <Button
        title="Iniciar Sesion"
        onPress={() => navigation.navigate("stacklogin")}
        buttonStyle={styles.button}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 60
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
  },
  description: {
    textAlign: "justify",
    marginBottom: 20,
    color: "#a65273"
},
button: {
    backgroundColor: "#442484"
}
})