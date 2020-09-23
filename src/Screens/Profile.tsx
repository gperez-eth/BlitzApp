import React, {useState, useEffect, Component} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Slide, CategorySlider, TutorialCard } from '../Components'
import Animated from 'react-native-reanimated'
import Fire from '../database/Fire'
import firebase from 'firebase'

const screenHeight = Dimensions.get('window').height;
const slideHeight = (screenHeight / 2.5)

const scrollY = new Animated.Value(0)

const AnimateHeaderHeight = scrollY.interpolate(
{
    inputRange: [ 0, 250, 450 ],
    outputRange: [ slideHeight, slideHeight / 1.5, slideHeight / 2 ],
    extrapolate: 'clamp'
});

export default class Explore extends Component {

    state = {
        nombre: firebase.auth().currentUser.displayName,
        imageURL: firebase.auth().currentUser.photoURL,
        loading: true,
        refreshing: false
      }

    constructor(props) {
        super(props)
        this.loadData()
      }

      async loadData() {
      }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.header, {height: AnimateHeaderHeight, minHeight: slideHeight / 2 }]}>
                    <ImageBackground resizeMode="cover" source={this.state.imageURL && { uri: this.state.imageURL }} style={styles.image} blurRadius={1} imageStyle={{backgroundColor:'#3784FF', opacity: 0.8}}>
                        <View style={styles.headerInnerContent}>
                            <Text style={styles.name}>{this.state.nombre}</Text>
                            <Text style={styles.biography}>Feeling the life with your soul ...</Text>
                        </View>
                    </ImageBackground>
                </Animated.View>
                <Animated.ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false} bounces={false} style={styles.menu}
                    onScroll={Animated.event([{
                        nativeEvent: { contentOffset: { y: scrollY }}
                    }])}
                >
                <View>
                </View>
                </Animated.ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    header:{
        backgroundColor: 'black'
    },
    menu:{
        flex: 1,
        backgroundColor: 'white',
    },
    headerInnerContent:{
        padding: 15,
        flex: 1,
        justifyContent: 'flex-end',
    },
    name:{
        color: 'white',
        fontFamily: 'Bold',
        fontSize: 25,
        marginBottom: 5
    },
    biography:{
        color: '#E5E5E5',
        fontFamily: 'Regular',
        fontSize: 13
    },
    image: {
        width: '100%',
        height: '100%',
    },

})