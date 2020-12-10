import React, {useState, useEffect, Component} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground, Image } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Slide, CategorySlider, TutorialCard } from '../Components'
import Fire from '../database/Fire'
import firebase from 'firebase'

const MisTutoriales = ({navigation}) => {

    const [tutoriales, setTutoriales] = useState([])

    const renderTutoriales = (navigation, tutoriales) => {
        if(tutoriales) {
            return <TutorialCard navigation={navigation} list={tutoriales} isMisTutoriales={true}/>
        }
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            var bd = new Fire()
            bd.getMyTutoriales(data => {
                setTutoriales(data)
            })
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={[styles.container, {justifyContent: tutoriales.length > 0 ? 'flex-start' : 'center'}]}>
            {
                (tutoriales.length > 0 ? 
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            tutoriales.map((item) => {
                                return (
                                    renderTutoriales(navigation, item)
                                )
                              })
                        }
                    </ScrollView>
                :
                <View style={styles.writingContainer}>
                  <Image source={require('../assets/Writing.png')} style={styles.writingImage} resizeMode={"contain"}/>
                  <Text style={styles.writingTitle}>No tienes tutoriales escritos. ¡Animate a escribir el primero!</Text>
                </View>
                )
            }
        </View>
    )
}

export default MisTutoriales

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
})