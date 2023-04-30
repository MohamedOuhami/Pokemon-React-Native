import React from 'react';
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native';

const PokemonDetails = ({ pokemon, onClose }) => {
  const { name, num, type, weaknesses, img, height, weight } = pokemon;

  return (
    <Modal animationType="slide" visible={true}>
      <View style={styles.container}>
        <Image source={{ uri: img }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>Number: {num}</Text>
        <Text style={styles.details}>Type: {type.join(', ')}</Text>
        <Text style={styles.details}>Weaknesses: {weaknesses.join(', ')}</Text>
        <Text style={styles.details}>Height: {height}</Text>
        <Text style={styles.details}>Weight: {weight}</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 20,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#d35400',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PokemonDetails;
