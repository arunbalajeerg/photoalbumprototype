import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  const [images, setImages] = useState(Array(10).fill(null)); // Initialize an array for 10 images

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri; // Update the image at the selected index
      setImages(newImages);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(index)}>
      {images[index] ? (
        <Image source={{ uri: images[index] }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Tap to pick an image</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Array.from({ length: 10 })} // Render 10 items
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Two columns for a Pinterest-like layout
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    aspectRatio: 0.8, // Keep the images square
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  placeholderText: {
    color: '#888',
  },
});

export default App;
