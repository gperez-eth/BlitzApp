import * as React from 'react';
import { View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Categoria } from '../Components'
import { Dimensions } from "react-native";
import styles from '../styles/HomeScreen/home.screen.styles'

const categorias = [
  {icon: 'ios-fitness', title: 'Deporte', color: '#FF7070', key: '1'},
  {icon: 'ios-restaurant', title: 'Cocina', color: '#FFAD61', key: '2'},
  {icon: 'ios-musical-notes', title: 'Música', color: '#55CA4B', key: '3'},
  {icon: 'ios-camera', title: 'Fotografía', color: '#5297FF', key: '4'},
  {icon: 'ios-book', title: 'Literatura', color: '#926CFF', key: '5'},
  {icon: 'ios-brush', title: 'Arte', color: '#D55FFF', key: '6'},
  {icon: 'ios-flask', title: 'Ciencias', color: '#FF62D3', key: '7'},
  {icon: 'ios-code', title: 'Coding', color: '#807D7D', key: '8'},
  {icon: 'logo-game-controller-b', title: 'Gaming', color: '#0029B9', key: '9'},
]

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <FlatList
          data={categorias}
          numColumns={3}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <TouchableOpacity key={item.key} activeOpacity={0.8} onPress={() => navigation.navigate('Explore', { screen: 'ExploreCategory', params: { title: item.title, key: item.key }})}>
              <Categoria navigation={navigation} icon={item.icon} title={item.title} color={item.color}/>
            </TouchableOpacity>
        )}/>
      </View>
    </View>
  );
};

export default Home;
