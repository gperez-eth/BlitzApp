import React, {useState, useEffect, Component} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground } from 'react-native';
import { ScrollView, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Slide, CategorySlider, TutorialCard } from '../Components'
import Fire from '../database/Fire'
import firebase from 'firebase'

const MisTutoriales = ({navigation}) => {

    const [tutoriales, setTutoriales] = useState([])

    const renderTutoriales = (navigation, tutoriales) => {
        if(tutoriales) {
            return <TutorialCard navigation={navigation} list={tutoriales} />
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
        <View style={styles.container}>
            {tutoriales.map((item) => {
                return (
                    renderTutoriales(navigation, item)
                )
            })}
        </View>
    )
}

export default MisTutoriales

const styles = StyleSheet.create({

    container:{
        flex: 1,
        padding: 15
    }
})