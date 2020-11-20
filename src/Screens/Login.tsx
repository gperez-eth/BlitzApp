import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Alert, Dimensions} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'
import { Path, Svg } from 'react-native-svg';
import Fire from '../database/Fire'
import { Ionicons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';

const screenHeight = Dimensions.get('window').height;

const Login = ({ navigation }) => {

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[restoreEmail, setRestoreEmail] = useState('')
    const modalizeRef = React.useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onBottomPress = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
            Alert.alert('Error de autenticación', 'El email o contraseña introducidos no son correctos')
        })
    }

    const restorePassowrd = () => {
        var bd = new Fire()
        bd.restorePassword(restoreEmail)
        setRestoreEmail('')
        modalizeRef.current.close()
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.viewAbove}>
                    <Svg height="100%" width="100%" viewBox="0 0 1440 320" style={styles.svg}>
                        <Path fill="#FFFFFF" fill-opacity="1" d="M0,128L26.7,128C53.3,128,107,128,160,138.7C213.3,149,267,171,320,181.3C373.3,192,427,192,480,176C533.3,160,587,128,640,106.7C693.3,85,747,75,800,101.3C853.3,128,907,192,960,202.7C1013.3,213,1067,171,1120,138.7C1173.3,107,1227,85,1280,74.7C1333.3,64,1387,64,1413,64L1440,64L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z">
                        </Path>
                    </Svg>
                </View>
                <Text style={styles.heading}>Blitz</Text>

                <Text style={styles.regularText}>Bienvenido,</Text>
                <Text style={[styles.regularText, {fontSize: 15, color: '#D2D6E7'}]}>Inicia sesión para acceder a tu cuenta</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.mailContainer}>
                        <Ionicons style={[styles.formIcons]} name={'ios-mail'} color={'white'} size={30} />
                        <TextInput placeholder="Introduce tu email" style={styles.input} value={email} onChangeText={ email => setEmail(email) } />
                    </View>
                    <View style={styles.mailContainer}>
                        <Ionicons style={{paddingRight: 15}} name={'ios-lock'} color={'white'} size={30} />
                        <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry value={password} onChangeText={password => setPassword(password)} />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onBottomPress} >
                        <Text style={styles.buttonText}>Acceder</Text>
                    </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.registerText}>¿No tienes una cuenta? <Text style={{fontFamily: 'Bold'}} onPress={() => navigation.navigate('Register')}>Regístrate.</Text></Text>
                    <Text style={styles.registerText}>¿No recuerdas tu contraseña? <Text style={{fontFamily: 'Bold'}} onPress={onOpen}>Recuperar.</Text></Text>
            </View>
            <Modalize ref={modalizeRef} adjustToContentHeight>
                <View style={styles.modalContainer}>
                    <View style={styles.mailContainer}>
                        <Ionicons style={{paddingRight: 15}} name={'ios-mail'} color={'#2450E7'} size={30} />
                        <TextInput placeholder="Escribe el email asociado a tu cuenta..." style={styles.inputRestore} value={restoreEmail} placeholderTextColor={"black"} onChangeText={email => setRestoreEmail(email)} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.9} style={styles.buttonRestore} onPress={restorePassowrd} >
                            <Text style={styles.buttonTextRestore}>Restablecer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modalize>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2450E7',
    },
    heading: {
        position: 'absolute',
        color: '#2450E7',
        fontSize: 55,
        fontFamily: 'Bold',
        alignSelf: 'center',
        top: (screenHeight / 10) 
    },
    viewAbove: {
        backgroundColor: 'white',
        height: screenHeight / 4,
        marginBottom: 70
    },
    svg: {
        top: (screenHeight / 6),
    },
    inputContainer: {
        padding: 20
    },
    mailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    formIcons: {
        paddingRight: 10
    },
    input: {
        color: 'white',
        height: 50,
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1
    },
    inputRestore: {
        color: '#2450E7',
        height: 50,
        borderColor: '#2450E7',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 15,
        flex: 1
    },
    buttonContainer: {
        paddingHorizontal: 20
    },
    buttonText:{
        textAlign: 'center',
        color: '#2450E7',
        fontFamily: 'Bold',
        fontSize: 20
    },
    button:{
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 50
    },
    buttonRestore: {
        padding: 15,
        backgroundColor: '#2450E7',
        borderRadius: 50
    },
    buttonTextRestore:{
        textAlign: 'center',
        color: 'white',
        fontFamily: 'Bold',
        fontSize: 20
    },
    logo: {
        color: 'white',
        fontFamily: 'Bold',
        letterSpacing: 1,
        fontSize: 40,
        alignSelf: 'center',
    },
    regularText: {
        color: 'white',
        fontFamily: 'Semibold',
        fontSize: 30,
        alignSelf: 'center',
    },
    registerText: {
        color: 'white',
        fontFamily: 'Regular',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 30
    },
    modalContainer: {
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    }
});

export default Login;