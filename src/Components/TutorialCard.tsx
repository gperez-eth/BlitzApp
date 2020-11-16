import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TutorialCard = ({ navigation, list }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => navigation.navigate('ViewTutorial', {tutorial: list})}>
        <View style={styles.cardImage}>
          <Image resizeMode="cover" source={list.image[0].url && { uri: list.image[0].url }} style={styles.image}/>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{list.title}</Text>
            <Text style={styles.title}><Ionicons name={'ios-stats'} color={'green'} size={20} style={{marginRight: 10}}/> {list.dificulty}</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1, }}>
              <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <Ionicons name={'ios-heart'} color={'red'} size={20} style={{marginRight: 5}}/>
                <Text style={styles.title}>{list.likes.length}</Text>
              </View>
            </View>
          </View>
        </View>
    </TouchableOpacity>
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
