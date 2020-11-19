import React, {useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { ReviewCard } from '../Components'
import Fire from '../database/Fire'
import firebase from 'firebase'

const MisReviews = ({navigation}) => {

    const [tutoriales, setTutoriales] = useState([])

    const renderTutoriales = (navigation, tutoriales) => {
        if(tutoriales) {
            return <ReviewCard navigation={navigation} list={tutoriales} />
        }
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            var bd = new Fire()
            bd.getReviews(data => {
                setTutoriales(data)
            })
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={[styles.container, {justifyContent: tutoriales.length > 0 ? 'flex-start' : 'center'}]}>
            {
                (tutoriales.length > 0 ? 
                  tutoriales.map((item) => {
                    return (
                        renderTutoriales(navigation, item)
                    )
                  })
                :
                <View style={styles.inspireContainer}>
                  <Image source={require('../assets/Inspire.png')} style={styles.inspireImage} resizeMode={"contain"}/>
                  <Text style={styles.inspireTitle}>No has escrito ninguna review. ¡Ayuda a los demas dejando consejos!</Text>
                </View>
                )
            }
        </View>
    )
}

export default MisReviews

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 15
    },
    inspireContainer: {
        alignItems: 'center',
    },
    inspireImage: {
        height: 300,
    },
    inspireTitle: {
        fontFamily: 'Semibold',
        textAlign: 'center',
        fontSize: 22,
        padding: 10
    }
})