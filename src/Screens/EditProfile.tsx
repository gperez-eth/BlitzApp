import React, {useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, Image, Alert, AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons';
import Fire from '../database/Fire'

const screenWidth = Dimensions.get('window').width;

const EditProfile = ({ modalizeRef, nombreEdit, apellidosEdit, usernameEdit, biographyEdit, avatarEdit, updateUserData }) => {

    const [nombre, setNombre] = useState(nombreEdit)
    const [apellidos, setApellidos] = useState(apellidosEdit)
    const [biography, setBiography] = useState(biographyEdit)
    const [username, setUsername] = useState(usernameEdit)
    const [avatar, setAvatar] = useState(avatarEdit)
    const [isAvatar, setIsAvatar] = useState(avatarEdit == '' ? false : true)

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setAvatar(pickerResult.uri)
        setIsAvatar(true)
    };

    const finishRegister = () => {
        if(nombre.trim() == '' || apellidos.trim() == '' || username.trim() == '' || biography.trim() == '' || avatar.trim() == '') {
            Alert.alert('Error de campos', 'Debes de rellenar todos los campos del formulario')
        } else {
            var bd = new Fire() 
            bd.updateProfile(nombre, apellidos, username, biography, avatar)
            updateUserData()
            modalizeRef.current.close()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.avatarContainer}>
                {
                    (isAvatar) ?
                        <TouchableOpacity activeOpacity={0.8} onPress={() => openImagePickerAsync()} style={styles.imagePicker}>
                            <Image source={{uri: avatar}} style={styles.images}/>
                        </TouchableOpacity>
                    : 
                        <TouchableOpacity activeOpacity={0.8} onPress={() => openImagePickerAsync()} style={styles.imagePicker}>
                            <Ionicons name={'ios-images'} color={'#2450E7'} size={45} />
                        </TouchableOpacity>
                }
                <Text style={styles.subTitle}>Foto de usuario</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.mailContainer}>
                    <TextInput placeholder="Nombre..." style={styles.input} value={nombre} placeholderTextColor={"#2450E7"} onChangeText={ nombre => setNombre(nombre) } />
                </View>
                <View style={styles.mailContainer}>
                    <TextInput placeholder="Apellidos..." style={styles.input} value={apellidos} placeholderTextColor={"#2450E7"} onChangeText={apellidos => setApellidos(apellidos)} />
                </View>
                <View style={styles.mailContainer}>
                    <TextInput placeholder="Nombre de usuario..." style={styles.input} value={username} placeholderTextColor={"#2450E7"} onChangeText={username => setUsername(username)} />
                </View>
                <View style={styles.mailContainer}>
                    <TextInput placeholder="Cuentanos algo de ti..." style={styles.input} multiline value={biography} placeholderTextColor={"#2450E7"} onChangeText={biography => setBiography(biography)} />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={finishRegister} >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 40
    },
    inputContainer: {
        paddingVertical: 20
    },
    mailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
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
    imagePicker: {
        borderColor: '#2450E7',
        borderWidth: 2,
        height: screenWidth / 3,
        width: screenWidth / 3,
        borderRadius: (screenWidth / 3) /2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    avatarContainer: {
        paddingVertical: 20,
        alignItems: 'center'
    },
    subTitle: {
        color: 'blue',
        fontSize: 17,
        fontFamily: 'Semibold',
        marginTop: 4
    },
    images: {
        height: screenWidth / 3.1,
        width: screenWidth / 3.1,
        borderRadius: (screenWidth / 3) / 2,
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