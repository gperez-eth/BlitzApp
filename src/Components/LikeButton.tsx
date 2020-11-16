import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LikeButton = ({ onPress, title, icon, color }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{marginBottom: 10, marginHorizontal: 10}}>
        <View style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.text}>{title}</Text>
            <Ionicons name={icon} size={24} color="white" />
        </View>
    </TouchableOpacity>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    width: 300
  },
  text: {
      color: 'white',
      fontFamily: 'Bold',
      fontSize: 17,
      paddingRight: 10
  }
});
