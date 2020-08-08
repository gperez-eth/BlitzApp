import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TutorialCard = ({ title, image, likes, dificultad }) => {
  return (
    <View style={styles.container}>
        <View style={styles.cardImage}>
          <Image resizeMode="cover" source={image} style={styles.image}/>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.title}><Ionicons name={'ios-stats'} color={'green'} size={20} style={{marginRight: 10}}/> {dificultad}</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1, }}>
              <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Ionicons name={'ios-heart'} color={'red'} size={20} style={{marginRight: 5}}/>
                <Text style={styles.title}>{likes}</Text>
              </View>
            </View>
          </View>
        </View>
    </View>
  );
};

export default TutorialCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    height: screenHeight / 4,
    borderRadius: 10,
    marginBottom: 10
  },
  cardImage: {
    flex: 0.4,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  infoContainer: {
    flex: 0.6,
  },
  textContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingBottom: 10,
    flex: 1,
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});
