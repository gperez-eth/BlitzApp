import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground, Image, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated'
import { AsyncStorage } from 'react-native';
import firebase from 'firebase'
import Fire from '../database/Fire'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const Profile = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState(firebase.auth().currentUser.displayName)
    const [avatar, setAvatar] = useState(firebase.auth().currentUser.photoURL)
    const [apellidos, setApellidos] = useState('')
    const [username, setUsername] = useState('')
    const [biography, setBiography] = useState('')

    const closeSession = () => {
        AsyncStorage.removeItem('NEWACCOUNT')
        firebase.auth().signOut()
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            let isNewAccount = await AsyncStorage.getItem('NEWACCOUNT')
            if(isNewAccount !== null) {
                navigation.navigate('Onboarding')
            } else {
                setLoading(false)
                var bd = new Fire()
                bd.getUser(userData => {
                    setApellidos(userData.lastName)
                    setUsername(userData.username)
                    setBiography(userData.biography)
                })
            }
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
        <>
            {
                (loading) ? 
                    <ActivityIndicator />
                :
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.avatarContainer}>
                            <Image source={{uri: avatar}} style={styles.images}/>
                            <Text style={styles.name}>{nombre} {apellidos}</Text>
                            <Text style={styles.username}>@{username}</Text>
                            <View style={styles.biographyContainer}>
                                <Text style={styles.biography}>- {biography}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity activeOpacity={0.9} style={styles.buttonTutorial} onPress={() => navigation.navigate('MisTutoriales')} >
                                <Ionicons name={'ios-book'} color={'white'} size={30} />
                                <Text style={styles.buttonTextTutorial}>Tutoriales</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity activeOpacity={0.9} style={styles.buttonTutorial} onPress={() => navigation.navigate('MisReviews')} >
                                <MaterialIcons name="rate-review" size={30} color="white" />
                                <Text style={styles.buttonTextTutorial}>Reviews</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={closeSession} >
                                <Text style={styles.buttonText}>Cerrar Sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>        
            }
        </>
    )
}

export default Profile

const styles = StyleSheet.create({

    container:{
        flex: 1,
    },
    avatarContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        paddingHorizontal: 40,
        paddingVertical: 20
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bold',
        fontSize: 20,
    },
    button:{
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center'
    },
    buttonTutorial: {
        padding: 15,
        backgroundColor: '#2450E7',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    images: {
        height: screenWidth / 3.1,
        width: screenWidth / 3.1,
        borderRadius: (screenWidth / 3) / 2,
        borderColor: 'black',
        borderWidth: 3,
    },
    topContainer: {
        paddingTop: 20
    },
    name: {
        fontFamily: 'Semibold',
        fontSize: 20,
        paddingTop: 10
    },
    username: {
        fontFamily: 'Semibold',
        fontSize: 17,
    },
    biography: {
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Semibold',
        fontSize: 17,
        padding: 10,
        backgroundColor: '#F3F3F3',
        borderColor: '#EBEBEB',
        borderWidth: 2
    },
    bottomContainer: {

    },
    buttonTextTutorial: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bold',
        fontSize: 20,
        marginLeft: 10
    },
    biographyContainer: {
        paddingVertical: 10,
        width: '100%'
    }
})