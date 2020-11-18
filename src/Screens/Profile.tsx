import React, {useState} from 'react';
import { Text, View, StyleSheet, Dimensions, RefreshControl, ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated'
import { AsyncStorage } from 'react-native';
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const slideHeight = (screenHeight / 2.5)

const scrollY = new Animated.Value(0)

const AnimateHeaderHeight = scrollY.interpolate(
{
    inputRange: [ 0, 250, 450 ],
    outputRange: [ slideHeight, slideHeight / 1.5, slideHeight / 2 ],
    extrapolate: 'clamp'
});

const Profile = ({ navigation }) => {

    const [nombre, setNombre] = useState(firebase.auth().currentUser.displayName)
    const [imageURL, setImageURL] = useState(firebase.auth().currentUser.photoURL)

    const closeSession = () => {
        AsyncStorage.removeItem('NEWACCOUNT')
        firebase.auth().signOut()
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.header, {height: AnimateHeaderHeight, minHeight: slideHeight / 2 }]}>
                <ImageBackground resizeMode="cover" source={imageURL && { uri: imageURL }} style={styles.image} blurRadius={1} imageStyle={{backgroundColor:'#3784FF', opacity: 0.8}}>
                    <View style={styles.headerInnerContent}>
                        <Text style={styles.name}>{nombre}</Text>
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={closeSession} >
                            <Text style={styles.buttonText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    )
}

export default Profile

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
    buttonContainer: {
        paddingHorizontal: 20
    },
    buttonText:{
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bold',
        fontSize: 20
    },
    button:{
        padding: 15,
        backgroundColor: '#2450E7',
        borderRadius: 50
    },
})