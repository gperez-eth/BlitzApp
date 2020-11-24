import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TutorialCard } from '../Components'
import Fire from '../database/Fire'

const ExploreCategory = ({navigation, route}) => {

  const[tutorialCategory, setTutorialCategory] = useState([])
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {

      let category = route.params.title
      var bd = new Fire()
      bd.getCategoryTutorial(category, tutorialCategory => {
        setTutorialCategory(tutorialCategory)
      })
    });

      return unsubscribe;
  }, [navigation]);

  const renderTutoriales = (navigation, tutoriales) => {
    if(tutoriales) {
      return <TutorialCard navigation={navigation} list={tutoriales} isMisTutoriales={false}/>
    }
  }
  
  return (
    <View style={[styles.container, {justifyContent: tutorialCategory.length > 0 ? 'flex-start' : 'center'}]}>
      {
        (tutorialCategory.length > 0 ? 
          tutorialCategory.map((item) => {
            return (
                renderTutoriales(navigation, item)
            )
          })
        :
          <View style={styles.writingContainer}>
            <Image source={require('../assets/Writing.png')} style={styles.writingImage} resizeMode={"contain"}/>
            <Text style={styles.writingTitle}>No hay tutoriales escritos en esta categoría. ¡Animate a escribir el primero!</Text>
          </View>
        )
      }
    </View>
  )
}

export default ExploreCategory;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 15
  },
  writingContainer: {
    alignItems: 'center',
  },
  writingImage: {
    height: 300,
  },
  writingTitle: {
    fontFamily: 'Semibold',
    textAlign: 'center',
    fontSize: 22,
    padding: 10
  }
});
