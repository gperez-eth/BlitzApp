import React, { Component, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Alert, Dimensions, AsyncStorage} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase'
import { Path, Svg } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const screenHeight = Dimensions.get('window').height;

const Register = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onBoarding = () => {
        if(password == confirmPassword) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
                AsyncStorage.setItem('NEWACCOUNT', 'true')
            })
            .catch(error => {
                var errorCode = error.code;
                if (errorCode == 'auth/weak-password') {
                    Alert.alert('Error durante el registro', 'La contraseña es muy debil.');
                } else if (errorCode == 'auth/invalid-email') {
                    Alert.alert('Error durante el registro', 'El email no tiene un formato correcto');
                } else if (errorCode == 'auth/email-already-in-use') {
                    Alert.alert('Error durante el registro', 'El email introducido ya esta en uso');
                }
                console.log(error);
            })
        } else {
            Alert.alert('Error al confirmar la contraseña', 'Asegurese de escribir la misma contraseña')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewAbove}>
                <Svg height="100%" width="100%" viewBox="0 0 1440 320" style={styles.svg}>
                    <Path fill="#2450E7" fill-opacity="1" d="M0,128L26.7,128C53.3,128,107,128,160,138.7C213.3,149,267,171,320,181.3C373.3,192,427,192,480,176C533.3,160,587,128,640,106.7C693.3,85,747,75,800,101.3C853.3,128,907,192,960,202.7C1013.3,213,1067,171,1120,138.7C1173.3,107,1227,85,1280,74.7C1333.3,64,1387,64,1413,64L1440,64L1440,0L1413.3,0C1386.7,0,1333,0,1280,0C1226.7,0,1173,0,1120,0C1066.7,0,1013,0,960,0C906.7,0,853,0,800,0C746.7,0,693,0,640,0C586.7,0,533,0,480,0C426.7,0,373,0,320,0C266.7,0,213,0,160,0C106.7,0,53,0,27,0L0,0Z">
                    </Path>
                </Svg>
            </View>
            <Text style={styles.heading}>Blitz</Text>

            <Text style={styles.regularText}>Registrate</Text>
            <Text style={[styles.regularText, {fontSize: 15, color: '#617EE0', textAlign: 'center'}]}>Aprende, enseña, comparte {"\n"} En menos de 5 minutos</Text>

            <View style={styles.inputContainer}>
                <View style={styles.mailContainer}>
                    <Ionicons style={[styles.formIcons]} name={'ios-mail'} color={'#2450E7'} size={30} />
                    <TextInput placeholder="Introduce tu email" style={styles.input} value={email} placeholderTextColor={"#2450E7"} onChangeText={ email => setEmail(email) } />
                </View>
                <View style={styles.mailContainer}>
                    <Ionicons style={{paddingRight: 15}} name={'ios-lock'} color={'#2450E7'} size={30} />
                    <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry value={password} placeholderTextColor={"#2450E7"} onChangeText={password => setPassword(password)} />
                </View>
                <View style={styles.mailContainer}>
                    <Ionicons style={{paddingRight: 15}} name={'ios-lock'} color={'#2450E7'} size={30} />
                    <TextInput placeholder="Confirmar contraseña" style={styles.input} secureTextEntry value={confirmPassword} placeholderTextColor={"#2450E7"} onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onBoarding} >
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
                
        </View>
    );
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    heading: {
        position: 'absolute',
        color: 'white',
        fontSize: 55,
        fontFamily: 'Bold',
        alignSelf: 'center',
        top: (screenHeight / 10) 
    },
    viewAbove: {
        backgroundColor: '#2450E7',
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
        color: 'white',
        fontFamily: 'Bold',
        fontSize: 20
    },
    button:{
        padding: 15,
        backgroundColor: '#2450E7',
        borderRadius: 50
    },
    logo: {
        color: '#2450E7',
        fontFamily: 'Bold',
        letterSpacing: 1,
        fontSize: 40,
        alignSelf: 'center',
    },
    regularText: {
        color: '#2450E7',
        fontFamily: 'Semibold',
        fontSize: 30,
        alignSelf: 'center',
    },
    registerText: {
        color: '#2450E7',
        fontFamily: 'Regular',
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 30
    }
});