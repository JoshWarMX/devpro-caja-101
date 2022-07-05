import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from '@rneui/base';

import { loadImageFromGallery } from '../../utils/helper';
import { updateProfile1, uploadImage } from '../../database/action';

export default function InfoUser({ user, setloading, setloadingText }) {

  const [photoUrl, setphotoUr] = useState(user.photoURL);

  const changePhoto = async () => {
    const result = await loadImageFromGallery([1, 1])
    if (!result.status) {
      return
    }
    setloadingText("Actualizando Foto...")
    setloading(true)

    const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
    if (!resultUploadImage.statusResponse) {
      setloading(false)
      Alert.alert("Occurrio un error al subir la foto")
      return
    }
    const resultUpdateProfile = await updateProfile1({ photoURL: resultUploadImage.url })
    setloading(false)
    if (!resultUpdateProfile.statusResponse) {
      setphotoUr(resultUploadImage.url)
    } else {
      Alert.alert("Occurrio un error al actualizar la foto")
    }

  }

  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size="xlarge"
        onPress={changePhoto}
        source={
          photoUrl
            ? { uri: photoUrl }
            : require("../../assets/avatar-default.jpg")
        }
      />
      <View style={styles.info}>
        <Text style={styles.name}>
          {
            user.displayName ? user.displayName : "Anonimo"
          }
        </Text>
        <Text style={styles.name}>{user.email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    paddingVertical: 30,
  },
  info: {
    marginLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#442484',
  }
})