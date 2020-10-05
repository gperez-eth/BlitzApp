import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    categoryContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      width: screenWidth,
    }
});