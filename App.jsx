import React, { useState } from 'react';
import {Image} from 'react-native'; 
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // variables de estado para almacenar la imagen del perro y del usuario
  const [DogData, setDogData] = useState(null);
  const [image, setImage] = useState(null);
  // función de llamada a la API para obtener la imagen del perro
  const fetchDogImage = async () => {
    try {
      const res = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      setDogData(data);
      setImage(null);
    } catch (err) {
      console.error(err.message);
    }
  };
  //función para eliminar las imágenes de la pantalla
  const DeleteImage = () => {
    setDogData(null);
    setImage(null);
  };
  //función para tener una imagen de la galería
  const pickImage = async () => {
    //permisos para acceder a la galería
    const { status } = await MediaLibrary.requestPermissionsAsync();  
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    //seleccionar una imagen de la galería
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //edición de la imagen
      allowsEditing: true,
      //aspecto de la imagen
      aspect: [1, 1],
      //calidad de la imagen
      quality: 1,
    });
    //almacenar la imagen seleccionada
    if (!result.cancelled) {
      //se borra la imagen del perro
      setDogData(null);
      //se almacena la imagen del usuario
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* indicaciones de la aplicación */}
      <Text style={styles.title}>Please, generate a dog image or upload your image!</Text>
      {/* Variable de estado donde va la imagen generada por la API*/}
      {DogData && (
        <View>
          <Image source={{uri: DogData.message}} style={styles.Image} />
        </View>
      )}
      {/* Variable de estado donde va la imagen seleccionada por el usuario*/}
      {image && 
        <Image 
          source={{ uri: image }} 
          style={styles.Image} 
        />}
      {/* Botones para generar, subir imagen y borrar imagen*/}
      <TouchableOpacity style = {styles.randomButton} onPress={fetchDogImage}>
        <Text style = {styles.datatext}>Random</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.uploadButton} onPress={pickImage}>
        <Text style = {styles.datatext}>Select Image</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.deleteButton} onPress={DeleteImage}>
        <Text style = {styles.datatext}>Delete Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  datatext: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  Image: {
    borderRadius: 5,
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  randomButton: {
    backgroundColor: '#05c46b',
    width: 140,
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: '#575fcf',
    width: 140,
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: '#ff5e57',
    width: 140,
    padding: 10,
    borderRadius: 100,
    marginTop: 10,
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    width: 250,
    textAlign: 'center',
    marginBottom: 20,
  },
});