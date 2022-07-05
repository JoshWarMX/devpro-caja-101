import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@rneui/base"
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'

import { closeSessionFire, getCurrentUser } from '../../database/action'
import Loading from '../../components/Loading'
import InfoUser from '../../components/comAccount/InfoUser'
import AccountOptions from '../../components/comAccount/AccountOptions'

export default function UserLogged() {
  const toastRef = useRef()
  const navigation = useNavigation()

  const [loading, setloading] = useState(false)
  const [loadingText, setloadingText] = useState("")
  const [User, setUser] = useState(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])


  return (
    <View style={styles.container}>
      {
        User && (
          <View>
            <InfoUser
              user={User}
              setloading={setloading}
              setloadingText={setloadingText}
            />
            <AccountOptions
              user={User}
              toastRef={toastRef}
            />
          </View>
        )
      }      
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => {
          closeSessionFire()
          navigation.navigate('screenhome')
          console.log("Cerrar Sesion");
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={loading} text={loadingText} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "#f9f9f9",
  },
  button: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#442484",
    borderBottomWidth: 1,
    borderBottomColor: "#442484",
  },
  buttonText: {
    color: "#442484",
    fontWeight: "bold",
    fontSize: 16,
  },
})