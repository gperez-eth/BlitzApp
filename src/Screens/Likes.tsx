import React, {useState, useEffect, Component} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground, Image } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Slide, CategorySlider, TutorialCard } from '../Components'
import Fire from '../database/Fire'
import firebase from 'firebase'

export default class Explore extends Component {

    state = {
        uid: firebase.auth().currentUser.uid,
        likedTutorial: [],
        user: {},
        loading: true,
        refreshing: false
      }
    
      constructor(props) {
        super(props)
        console.log(this.state.uid)
        this.loadData()
      }
    
      async loadData() {
        var bd = new Fire()
        bd.getLikedTutoriales(likedTutorial => {
          this.setState({likedTutorial}, () => {
            this.setState({loading: false})
          })
        })
      }

      renderTutoriales = (navigation, tutoriales) => {
        if(tutoriales) {
          return <TutorialCard navigation={navigation} list={tutoriales} isMisTutoriales={false}/>
        }
      }

    render() {
        const { navigation } = this.props
        return (
            <View style={[styles.container, {justifyContent: this.state.likedTutorial.length > 0 ? 'flex-start' : 'center'}]}>
              {
                (this.state.likedTutorial.length > 0 ?
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {
                      this.state.likedTutorial.map((item) => {
                        return (
                            this.renderTutoriales(navigation, item)
                        )
                      })
                    }
                  </ScrollView>
                :
                <View style={styles.likeContainer}>
                  <Image source={require('../assets/Like.png')} style={styles.likeImage} resizeMode={"contain"}/>
                  <Text style={styles.likeTitle}>Aún no le diste like a ningún tutorial, vuelve mas tarde</Text>
                </View>
                )
              }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 15,
    },
    likeContainer: {
      alignItems: 'center',
    },
    likeImage: {
      height: 300,
    },
    likeTitle: {
      fontFamily: 'Semibold',
      textAlign: 'center',
      fontSize: 22,
      padding: 10
    }
})