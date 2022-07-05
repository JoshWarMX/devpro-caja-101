import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from "@rneui/base"
import { useNavigation } from '@react-navigation/native'

import LoginForm from '../../components/comAccount/LoginForm'

export default function Login() {
  return (
    <ScrollView>
      <Image
        source={require("../../assets/Botanico.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.container}>
        <LoginForm/>
        <CreateAccount />
        <RecoverPassoword />
      </View>
      <Divider />
    </ScrollView>

  )
}

function RecoverPassoword() {
  const navigation = useNavigation()

  return (
      <Text 
          style={styles.register}
          onPress={() => navigation.navigate("recover-password")}
      >
          ¿Olvidaste tu contraseña?{" "}
          <Text style={styles.btnRegister}>
              Recupérala
          </Text>
      </Text>
  )
} 

function CreateAccount() {
  const navigation = useNavigation()

  return (
    <Text style={styles.register}>
      Quieres Registrar un Nuevo Usuario?{"\n"}
      <Text
        onPress={() => navigation.navigate("stackregister")}
        style={styles.btnRegister}>
        Registrar
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: "100%",
    marginBottom: 20
  },
  container: {
    marginHorizontal: 40,

  },
  divider: {
    backgroundColor: "#442484",
    margin: 40
  },
  register: {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center"
  },
  btnRegister: {
    color: "#442484",
    fontWeight: "bold",
    alignSelf: "center"
  }
})