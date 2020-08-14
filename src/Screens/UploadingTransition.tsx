import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Categoria } from '../Components'
import { Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const screenWidth = Math.round(Dimensions.get('window').width);

const UploadingTransition = ({ route, navigation }) => {
  const { id } = route.params;
  console.log(id)
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Ionicons name="ios-checkmark-circle" size={100} color="#B9B3FF" />
            <Text>{id}</Text>
        </View>
    </View>
  );
};

export default UploadingTransition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  content: {
    alignItems: 'center',
  }
});
