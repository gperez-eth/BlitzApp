import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const CategorySlider = ({ icon, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Ionicons name={icon} color={'white'} size={30} />
    </View>
  );
};

export default CategorySlider;

const styles = StyleSheet.create({
  container: {
      borderColor: 'white',
      borderWidth: 2,
      height: screenWidth / 6,
      width: screenWidth / 6,
      borderRadius: (screenWidth / 6) /2,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10
  }
});
