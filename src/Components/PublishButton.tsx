import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PublishButton = ({ onPress, color }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{marginBottom: 10, marginHorizontal: 10}}>
        <View style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.text}>Publicar</Text>
            <Ionicons name="ios-paper-plane" size={24} color="white" />
        </View>
    </TouchableOpacity>
  );
};

export default PublishButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row'
  },
  text: {
      color: 'white',
      fontFamily: 'Bold',
      fontSize: 17,
      paddingRight: 10
  }
});
