import React, {useState, useEffect, Component} from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Slide, CategorySlider, TutorialCard } from '../Components'
import Animated from 'react-native-reanimated'
import Fire from '../database/Fire'

const categorias = [
  {icon: 'ios-fitness', title: 'Deporte', color: '#FF7070', key: '1'},
  {icon: 'ios-restaurant', title: 'Cocina', color: '#FFAD61', key: '2'},
  {icon: 'ios-musical-notes', title: 'Música', color: '#55CA4B', key: '3'},
  {icon: 'ios-camera', title: 'Fotografía', color: '#5297FF', key: '4'},
  {icon: 'ios-book', title: 'Literatura', color: '#926CFF', key: '5'},
  {icon: 'ios-brush', title: 'Arte', color: '#D55FFF', key: '6'},
  {icon: 'ios-flask', title: 'Ciencias', color: '#FF62D3', key: '7'},
  {icon: 'ios-code', title: 'Coding', color: '#807D7D', key: '8'},
  {icon: 'logo-game-controller-b', title: 'Gaming', color: '#0029B9', key: '9'},
]

const tutoriales = [
  {title: '6-Pack Abs Routine', image: require('../../assets/images/girl-sport.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '1'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '2'},
  {title: 'Get aim on shooters', image: require('../../assets/images/shooter.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '3'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '4'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '5'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '6'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '7'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '8'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '9'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '10'},
  {title: 'How to do Italian pasta', image: require('../../assets/images/pasta.jpg'), fecha: '26/11/2020', categoria: 'Deporte', likes: '23', dificultad: 7, key: '11'},
]

const screenHeight = Dimensions.get('window').height;
const slideHeight = (screenHeight / 3) + 10

const scrollY = new Animated.Value(0)

const AnimateHeaderHeight = scrollY.interpolate(
  {
      inputRange: [ 0, 250, 450 ],
      outputRange: [ slideHeight, slideHeight / 2, 0 ],
      extrapolate: 'clamp'
  });

  export default class Explore extends Component {

    state = {
      featured: [],
      user: {},
      loading: true
    }

    componentDidMount() {
      var bd = new Fire((error, user) => {
        if (error) {
          return alert("Oh oh, something went wrong" + error)
        } else {
        bd.getFeatured(featured => {
            this.setState({featured, user}, () => {
              this.setState({loading: false})
            })
          })
          return alert("Logged " + user.uid)
        }
      })
    }

    renderList = featured => {
      return <Slide list={featured}/>
    }

    render() {
      const { navigation } = this.props;
      return (
          <View style={styles.content}>
            <Animated.View style={{height: AnimateHeaderHeight}}>
              <ScrollView decelerationRate={0} snapToInterval={300} showsHorizontalScrollIndicator={false} bounces={true} style={{paddingLeft: 15, marginBottom: 10}}>
                <FlatList horizontal showsHorizontalScrollIndicator={false} data={this.state.featured} renderItem={({item}) => this.renderList(item)}/>
              </ScrollView>
            </Animated.View>
            <View style={styles.categorySelector}>
              <ScrollView horizontal decelerationRate={0} snapToInterval={300} showsHorizontalScrollIndicator={false} bounces={false} style={{paddingLeft: 15, marginTop: 10, marginBottom: 10 }}>
                {categorias.map((item) => {
                  return (
                    <TouchableOpacity key={item.key} activeOpacity={0.8} onPress={() => navigation.navigate('ExploreCategory', { title: item.title, key: item.key })}>
                      <CategorySlider icon={item.icon} color={item.color} />
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
            <View style={styles.tutorialSelector}>
                <Animated.ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false} bounces={false}
                  onScroll={Animated.event([{
                    nativeEvent: { contentOffset: { y: scrollY }}
                  }])}
                >
                  {tutoriales.map((item) => {
                    return (
                      <TutorialCard title={item.title} image={item.image} likes={item.likes} dificultad={item.dificultad} key={item.key}/>
                    )
                  })}
                </Animated.ScrollView>
            </View>
        </View>
      )
    }
  }

const styles = StyleSheet.create({
    content: {
      flex: 1,
      top: 15,
    },
    trendingTutorial: {

    },
    categorySelector: {
      borderTopColor: '#EAEAEA',
      borderTopWidth: 1,
      borderBottomColor: '#EAEAEA',
      borderBottomWidth: 1,
    },
    tutorialSelector: {
      padding: 10,
      flex: 1
    },
    lista: {
      marginBottom: 10
    }
});
