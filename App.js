import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import PokemonDetails from './components/PokemonDetails';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonsByType, setPokemonsByType] = useState({});

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then((response) => response.json())
      .then((json) => {
        setPokemons(json.pokemon);
        setPokemonsByType(groupPokemonsByType(json.pokemon));
      })
      .catch((error) => console.error(error));
  }, []);

  const groupPokemonsByType = (pokemonList) => {
    return pokemonList.reduce((acc, pokemon) => {
      pokemon.type.forEach((type) => {
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(pokemon);
      });
      return acc;
    }, {});
  };

  const renderPokemon = ({ item }) => {
    const { id, name, type, img } = item;
    return (
      <TouchableOpacity style={styles.card} onPress={() => setSelectedPokemon(item)}>
        <Image source={{ uri: img }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.type}>Type: {type.join(', ')}</Text>
          <Text style={styles.id}>#{id}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderPokemonsByType = ({ item: [type, pokemonList] }) => {
    return (
      <View style={styles.typeContainer}>
        <Text style={styles.typeHeader}>{type}</Text>
        <FlatList
          data={pokemonList}
          renderItem={renderPokemon}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.entries(pokemonsByType)}
        renderItem={renderPokemonsByType}
        keyExtractor={([type, _]) => type}
      />
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  typeHeader:{
    fontSize:25,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  details: {
    alignItems: 'center',
    marginVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  type: {
    fontSize: 14,
  },
  id: {
    fontSize: 12,
    color: '#666',
  },
});

export default App;
