import * as React from 'react';
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { Formik } from 'formik'
import * as ImagePicker from 'expo-image-picker'
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';
import { PublishButton } from '../Components'
import Fire from '../database/Fire'


const Upload = ({ navigation }) => {

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
            /* OMGGGG FINALLY LO CONSEGUÍ!!!
            Basicamente el problema era que al añadir un nuevo paso en el state este no se actualizaba con los valores
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
                initialValues={{title: '', category: '', dificulty: '', steps: [{description: ''},]}}
                onSubmit={(values) => {
                    console.log(values)
                    addTutorial(values)
                }}>
                    {({ handleChange, handleSubmit, values }) => (
                        <View>
                            <View style={styles.inputFrame}>
                                <Text style={styles.fields}>Titulo*</Text>
                                <TextInput
                                    style={styles.inputs}
                                    onChangeText={handleChange('title')}
                                    placeholder='Construir...'
                                    value={values.title}
                                />
                            </View>

                            <View style={styles.inputFrame}>
                                <Text style={styles.fields}>Categoría*</Text>
                                <TextInput
                                    style={styles.inputs}
                                    onChangeText={handleChange('category')}
                                    placeholder='Gimnasio'
                                    value={values.category}
                                />
                            </View>

                            <View style={styles.inputFrame}>
                                <Text style={styles.fields}>Dificultad*</Text>
                                <TextInput
                                    style={styles.inputs}
                                    onChangeText={handleChange('dificulty')}
                                    placeholder='5'
                                    keyboardType='numeric'
                                    value={values.dificulty}
                                />
                            </View>

                            {values.steps.map((item, index) => {
                                return (
                                    <View style={styles.inputFrame}>
                                        <Text style={styles.fields}>Paso {index+1}*</Text>
                                        <TextInput
                                            style={styles.inputs}
                                            multiline={true}
                                            onChangeText={handleChange(`steps[${index}].description`)}
                                            placeholder='bla bla bla...'
                                            value={values.steps[index].description}
                                        />
                                    </View>
                                )
                            })}

                            <View style={styles.inputFrame}>
                                <Text style={styles.fields}>Imagenes</Text>
                                <FlatList horizontal showsHorizontalScrollIndicator={false} data={nImages}
                                    renderItem={({item}) => 
                                        item.image ?
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => openImagePickerAsync(item.key)} style={styles.imagePicker}>
                                                <Image source={{uri: item.uri}} style={styles.images}/>
                                            </TouchableOpacity>
                                        : 
                                            <TouchableOpacity activeOpacity={0.8} onPress={() => openImagePickerAsync(item.key)} style={styles.imagePicker}>
                                                <Ionicons name={'ios-images'} color={'white'} size={30} />
                                            </TouchableOpacity>
                                    }/>
                            </View>
                        </View>
                    )}
            </Formik>
        </View>
        
        </ScrollView>
        <PublishButton onPress={handleSubmit} color='#B062FF' />
        <ActionButton buttonColor="#C7B3FF"
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
        color: '#B062FF'
    },
    inputs: {
        borderRadius: 2,
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#B062FF'
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
        backgroundColor: '#D9B3FF',
        marginHorizontal: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ActionButton: {
        backgroundColor: 'blue'
        
    }
});
