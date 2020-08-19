import * as React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Categoria } from '../Components'
import { Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const screenWidth = Math.round(Dimensions.get('window').width);

function renderStatus(status) {
  if (status.steps || status.images) {
    return (
      <View style={styles.content}>
        <Ionicons name="ios-checkmark-circle" size={100} color="#B9B3FF" />
        <Text style={styles.text}>El tutorial se ha subido correctamente!</Text>
      </View>
    )
    
  } else if (status.error) {
    return (
      <View style={styles.content}>
        <AntDesign name="minuscircle" size={100} color="#B9B3FF" />
        <Text style={styles.text}>Error! compruebe que las imagenes tienen un formato correcto</Text>
      </View>
    )
  } else {
    return (
      <View style={styles.content}>
        <AntDesign name="questioncircle" size={100} color="#B9B3FF" />
        <Text style={styles.text}>Ha ocurrido un error inesperado :(</Text>
      </View>
    )
  }
}

const UploadingTransition = ({ route, navigation }) => {
  const { status } = route.params;
  console.log(status)
  return (
    <View style={styles.container}>
        {renderStatus(status)}
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
  },
  text: {
    fontFamily: 'Semibold',
    fontSize: 25,
    textAlign: 'center'
  }
});
