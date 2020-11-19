import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AirbnbRating, Rating } from 'react-native-ratings';
import firebase from 'firebase'

const screenHeight = Dimensions.get('window').height;

const ReviewCard = ({ navigation, list }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => navigation.navigate('Explore', {screen: 'ViewTutorial', params: {tutorial: list}})}>
        <View style={styles.topContainer}>
            <Rating
                readonly
                ratingCount={7}
                startingValue={list.reviews.filter(tut => tut.user === firebase.auth().currentUser.uid)[0].rating}
                imageSize={35}
                style={styles.ratingStyle}
            />
            <Text style={styles.reviewTitle}>{list.reviews.filter(tut => tut.user === firebase.auth().currentUser.uid)[0].review}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'column',
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  ratingStyle:{
      padding: 10,
  },
  reviewTitle: {
      fontFamily: 'Semibold',
      fontSize: 15,
      textAlign: 'center'
  },
  topContainer: {
      display: 'flex',
  }
});
