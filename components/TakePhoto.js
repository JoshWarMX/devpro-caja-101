import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { Icon, Button } from '@rneui/base';

export default function TakePhoto( { navigation } ) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined)
        navigation.goBack()
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.buttons}>
          <Button title="Compartir" onPress={sharePic} buttonStyle={styles.bodyButton} titleStyle={styles.buttonText} />
          {hasMediaLibraryPermission ? <Button title="Guardar" onPress={savePhoto} buttonStyle={styles.bodyButton} titleStyle={styles.buttonText} /> : undefined}
          <Button title="Eliminar" onPress={() => setPhoto(undefined)} buttonStyle={styles.bodyButton} titleStyle={styles.buttonText} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Icon reverse type='material-community' name="camera-iris" size={30} color="#442484" onPress={takePic} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon reverse type='material-community' name="arrow-left" size={30} color="#442484" onPress={() => navigation.goBack()} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 5,
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  buttons: {
    height: '7%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  bodyButton: {
    borderRadius: 15,
    backgroundColor: "#442484",
  },
  buttonText: {
    color: "white",
    fontWeight: "normal",
    fontSize: 16,
  },
});