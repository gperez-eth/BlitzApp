import React, {useState, useEffect, Component} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground } from 'react-native';
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
        var bd = new Fire((error, user) => {
          if (error) {
            return alert("Oh oh, something went wrong" + error)
          } else {
            bd.getLikedTutoriales(likedTutorial => {
              this.setState({likedTutorial}, () => {
                this.setState({loading: false})
              })
            })
          }
        })
      }

      renderTutoriales = (navigation, tutoriales) => {
        if(tutoriales) {
          return <TutorialCard navigation={navigation} list={tutoriales} />
        }
      }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                {this.state.likedTutorial.map((item) => {
                    return (
                        this.renderTutoriales(navigation, item)
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        padding: 15
    }
})