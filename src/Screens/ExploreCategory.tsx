import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ExploreCategory = ({ navigation, route }) => {
    const title = route.params.title
    const key = route.params.key
  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>Has presionado la categoría: {title} con el id: {key}</Text>
    </View>
  );
};

export default ExploreCategory;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textBox: {
        fontFamily: 'Bold',
    }
});
