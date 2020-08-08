import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Slide = ({ list }) => {
  return (
    <View style={styles.container}>
        <Image resizeMode="cover" source={list.image && { uri: list.image }} style={styles.image}/>
        <View style={styles.textContainer}>
            <Text style={styles.title}>{list.titulo}</Text>
        </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 15,
    height: screenHeight / 3,
    width: screenWidth / 2.5,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    position: "absolute",
    borderRadius: 20
  },
  title: {
    fontFamily: 'Bold',
    marginHorizontal: 10,
    paddingBottom: 5,
    fontSize: 20,
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  }
});
