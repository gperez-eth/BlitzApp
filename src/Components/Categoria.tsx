import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Categoria = ({ navigation, icon, title, color}) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]} >
      <Ionicons name={icon} color={'white'} size={50} />
      <Text style={styles.title}>{ title }</Text>
    </View>
  );
};

export default Categoria;

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
    height: screenHeight / 5,
    width: screenWidth / 4,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 15,
    color: 'white'
  }
});
