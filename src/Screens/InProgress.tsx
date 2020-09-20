import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InProgress = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Ionicons name="ios-code-working" size={100} color="black" />
        <Text style={styles.texto}>En desarrollo...</Text>
    </View>
  );
};

export default InProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
      fontFamily: 'Bold',
      fontSize: 20,
  }
});
