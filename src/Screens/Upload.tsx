import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { PublishButton } from '../Components'
import Fire from '../database/Fire'
import DropDownPicker from 'react-native-dropdown-picker';

const Upload = ({ navigation }) => {

    const [activeColor, setActiveColor] = React.useState(
        {primary: '#55CA4B', secondary: '#92E18B'},
    );

    const changeColors = (category) => {
        switch(category) {
            case 'Deporte':
                setActiveColor({primary: '#FF7070', secondary: '#EE9393'})
                break
            case 'Cocina':
                setActiveColor({primary: '#FFAD61', secondary: '#FFC793'})
                break
            case 'Música':
                setActiveColor({primary: '#55CA4B', secondary: '#92E18B'})
                break
            case 'Fotografía':
                setActiveColor({primary: '#5297FF', secondary: '#90BCFF'})
                break
            case 'Literatura':
                setActiveColor({primary: '#926CFF', secondary: '#BAA2FF'})
                break
            case 'Arte':
                setActiveColor({primary: '#D55FFF', secondary: '#E7A3FF'})
                break
            case 'Ciencias':
                setActiveColor({primary: '#FF62D3', secondary: '#FFB3EA'})
                break
            case 'Coding':
                setActiveColor({primary: '#807D7D', secondary: '#C1C1C1'})
                break
            case 'Gaming':
                setActiveColor({primary: '#0029B9', secondary: '#6477B9'})
                break
        }
    }

    const formRef = React.useRef()

    const handleSubmit = () => {
        if (formRef.current) {
          formRef.current.handleSubmit()
        }
    }
    
    const addTutorial = (values) => {
        var bd = new Fire((error, user) => {
            if (error) {
              return alert("Oh oh, something went wrong" + error)
            } else {
                bd.addTutorial(values, nImages, status => {
                    navigation.navigate('UploadingTransition', {status: status})
                })
                clearFields()
            }
        })
    }

    const clearFields = () => {
         // Clear all fields and images
         if (formRef.current) {
            formRef.current.resetForm()
            setNImages([{image: false, uri: '', key: '1'}])
         }
    }

    const addStep = () => {
        if (formRef.current) {
            formRef.current.values.steps.push({description: ''})
            /* al añadir un nuevo paso en el state este no se actualizaba con los valores
            que cambian dentro de formik por lo que al cambiar los valores y darle a añadir un nuevo paso todos los
            campos de formik se reseteaban a cadena vacia las posibles soluciones son:
            1º Poner el boton de añadir nuevos campos dentro de formik, 
            2º Usar una referencia
            */
        }
    }

    const [nImages, setNImages] = React.useState([
        {image: false, uri: '', key: '1'},
    ]);

    let openImagePickerAsync = async (key) => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        const imagesArray = nImages.slice() //copy the array
        imagesArray[key-1] = {image: true, key: key, uri: pickerResult.uri} //execute the manipulations
        setNImages(imagesArray)
    };

  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
            <Formik
                innerRef={formRef}
                initialValues={{title: '', category: 'Música', dificulty: '', steps: [{description: ''},]}}
                onSubmit={(values) => {
                    console.log(values)
                    addTutorial(values)
                }}>
                    {({ handleChange, handleSubmit, values }) => (
                        <View>
                            <View style={styles.inputFrame}>
                                <Text style={[styles.fields, {color: activeColor.primary}]}>Titulo*</Text>
                                <TextInput
                                    style={[styles.inputs, {borderColor: activeColor.primary}]}
                                    onChangeText={handleChange('title')}
                                    placeholder='Construir...'
                                    value={values.title}
                                />
                            </View>

                            <View style={styles.inputFrame}>
                                <Text style={[styles.fields, {color: activeColor.primary, marginBottom: 10}]}>Categoría*</Text>
                                <DropDownPicker
                                    style={[styles.inputs, {backgroundColor: '#F5F5F5'}]}
                                    items={[
                                        {label: 'Deporte', value: 'Deporte', icon: () => <Ionicons name={'ios-fitness'} color={'#FF7070'} size={30} />},
                                        {label: 'Cocina', value: 'Cocina', icon: () => <Ionicons name={'ios-restaurant'} color={'#FFAD61'} size={30} />},
                                        {label: 'Música', value: 'Música', icon: () => <Ionicons name={'ios-musical-notes'} color={'#55CA4B'} size={30} />},
                                        {label: 'Fotografía', value: 'Fotografía', icon: () => <Ionicons name={'ios-camera'} color={'#5297FF'} size={30} />},
                                        {label: 'Literatura', value: 'Literatura', icon: () => <Ionicons name={'ios-book'} color={'#926CFF'} size={30} />},
                                        {label: 'Arte', value: 'Arte', icon: () => <Ionicons name={'ios-brush'} color={'#D55FFF'} size={30} />},
                                        {label: 'Ciencias', value: 'Ciencias', icon: () => <Ionicons name={'ios-flask'} color={'#FF62D3'} size={30} />},
                                        {label: 'Coding', value: 'Coding', icon: () => <Ionicons name={'ios-code'} color={'#807D7D'} size={30} />},
                                        {label: 'Gaming', value: 'Gaming', icon: () => <Ionicons name={'logo-game-controller-b'} color={'#0029B9'} size={30} />},
                                    ]}
                                    defaultValue='Música'
                                    labelStyle={{ marginLeft: 10, alignSelf: 'center'}}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    dropDownStyle={{backgroundColor: '#F5F5F5', borderBottomWidth: 1, borderColor: activeColor.secondary, height: 300}}
                                    onChangeItem={item => {
                                            values.category = item.value
                                            changeColors(item.value)
                                        }
                                    }
                                />
                            </View>

                            <View style={styles.inputFrame}>
                                <Text style={[styles.fields, {color: activeColor.primary}]}>Dificultad*</Text>
                                <TextInput
                                    style={[styles.inputs, {borderColor: activeColor.primary}]}
                                    onChangeText={handleChange('dificulty')}
                                    placeholder='5'
                                    keyboardType='numeric'
                                    value={values.dificulty}
                                />
                            </View>

                            {values.steps.map((item, index) => {
                                return (
                                    <View style={styles.inputFrame}>
                                        <Text style={[styles.fields, {color: activeColor.primary}]}>Paso {index+1}*</Text>
                                        <TextInput
                                            style={[styles.inputs, {borderColor: activeColor.primary}]}
                                            multiline={true}
                                            onChangeText={handleChange(`steps[${index}].description`)}
                                            placeholder='bla bla bla...'
                                            value={values.steps[index].description}
                                        />
                                    </View>
                                )
                            })}

                            <View style={styles.inputFrame}>
                                <Text style={[styles.fields, {color: activeColor.primary}]}>Imagenes</Text>
                                <FlatList horizontal showsHorizontalScrollIndicator={false} data={nImages}
                                    renderItem={({item}) => 
                                        item.image ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => openImagePickerAsync(item.key)} style={[styles.imagePicker, {backgroundColor: activeColor.secondary}]}>
                                                <Image source={{uri: item.uri}} style={styles.images}/>
                                            </TouchableOpacity>
                                        : 
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => openImagePickerAsync(item.key)} style={[styles.imagePicker, {backgroundColor: activeColor.secondary}]}>
                                                <Ionicons name={'ios-images'} color={'white'} size={30} />
                                            </TouchableOpacity>
                                    }/>
                            </View>
                        </View>
                    )}
            </Formik>
        </View>
        
        </ScrollView>
        <PublishButton onPress={handleSubmit} color={activeColor.primary} />
        <ActionButton buttonColor={activeColor.secondary}
            onPress={() => {
                setNImages((prevImages) => {
                    return [
                        ...prevImages,
                        {image: false, uri: '', key: (prevImages.length + 1).toString()}
                    ]
                })
                addStep()
            }}
        />  
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    fields: {
        fontFamily: 'Regular',
        fontSize: 14,
    },
    inputs: {
        borderRadius: 2,
        padding: 5,
        borderBottomWidth: 1,
    },
    inputFrame: {
        marginBottom: 10
    },
    images: {
        height: 110,
        width: 80,
        borderRadius: 15,
    },
    imagePicker: {
        height: 110,
        width: 80,
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
