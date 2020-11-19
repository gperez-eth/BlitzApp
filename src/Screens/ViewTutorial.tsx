import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Platform, StatusBar, ImageBackground, Modal, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated'
import Fire from '../database/Fire'
import firebase from 'firebase'
import LikeButton from '../Components/LikeButton';
import ActionButton from 'react-native-action-button';
import { Modalize } from 'react-native-modalize';
import { Rating, AirbnbRating } from 'react-native-ratings';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const ViewTutorial = ({ navigation, route }) => {

    let tutorial = route.params.tutorial

    const [canLike, setCanLike] = React.useState(tutorial.likes.includes(firebase.auth().currentUser.uid) ? false : true)
    const [review, setReview] = React.useState('')
    const [rating, setRating] = React.useState(4)
    const modalizeRef = React.useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const screenHeight = Dimensions.get('window').height;
    const slideHeight = (screenHeight / 2.5)

    const scrollY = new Animated.Value(0)

    const AnimateHeaderHeight = scrollY.interpolate(
    {
        inputRange: [ 0, 250, 450 ],
        outputRange: [ slideHeight, slideHeight / 1.2, slideHeight / 1.4 ],
        extrapolate: 'clamp'
    });

    const giveLike = () => {
        var bd = new Fire()
        if(canLike) {
            tutorial.likes.push(firebase.auth().currentUser.uid)
            tutorial.totalLikesCount = tutorial.totalLikesCount + 1
            bd.updateTutorial(tutorial)
            setCanLike(false)
        } else {
            var index = tutorial.likes.indexOf(firebase.auth().currentUser.uid);
            if (index !== -1) {
                tutorial.likes.splice(index, 1);
            }
            tutorial.totalLikesCount = tutorial.totalLikesCount - 1
            bd.updateTutorial(tutorial)
            setCanLike(true)
        }
    }

    const giveReview = () => {
        var bd = new Fire()
        if(review === '') {
            Alert.alert('Error al escribir la review', 'Tienes que escribir que te ha parecido la review')
        } else {
            bd.updateReview(tutorial,
            {
                user: firebase.auth().currentUser.uid,
                review: review,
                rating: rating
            })
        }
        modalizeRef.current.close()
    }

  return (
    <>
        <View style={styles.content}>
            <Animated.View style={[styles.topContainer, {height: AnimateHeaderHeight, minHeight: slideHeight / 2 }]}>
                <ImageBackground  resizeMode="cover" source={tutorial.image[0].url && { uri: tutorial.image[0].url }} style={styles.image} blurRadius={1} imageStyle={{backgroundColor:'#D55FFF', opacity: 0.8, borderBottomRightRadius: 100, borderBottomLeftRadius: 100,}}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{tutorial.title.slice(0, 50)}</Text>
                    <Text style={styles.title}><Ionicons name={'ios-stats'} color={'green'} size={20} style={{marginRight: 10}}/> {tutorial.dificulty}</Text>
                    <Text style={styles.title}><Ionicons name={'ios-heart'} color={'red'} size={20} style={{marginRight: 10}}/> {tutorial.likes.length}</Text>
                    <View style={styles.likeButtonContainer}>
                        {
                            (
                                canLike ?
                                    <LikeButton onPress={giveLike} title={'Añadir como favorito'} icon={'ios-heart'} color={'#8DBAE7'}/>
                                :
                                    <LikeButton onPress={giveLike} title={'Quitar como favorito'} icon={'ios-heart-dislike'} color={'#E78DA3'}/>
                            )
                        }
                    </View>
                </View>
            </Animated.View>
            <Animated.ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false} bounces={false} style={styles.bottomContainer}
                onScroll={Animated.event([{
                    nativeEvent: { contentOffset: { y: scrollY }}
                }])}
            >
                {tutorial.steps.map((item, index) => {
                    return (
                        <View style={styles.stepCard}>
                            <View style={{height: 150}}>
                                <Image resizeMode="cover" source={tutorial.image[index].url && { uri: tutorial.image[index].url }} style={{width: '100%', height: '100%', borderRadius: 20}}/>
                            </View>
                            <Text style={styles.numeroPaso}>Paso: {index + 1}</Text>
                            <View style={{padding: 20}}>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    )
                })}
            </Animated.ScrollView>
            <ActionButton buttonColor={'black'} onPress={onOpen} renderIcon={() => <MaterialIcons name={'edit'} color={'white'} size={25}/>}/>  
        </View>
        <Modalize ref={modalizeRef} adjustToContentHeight >
            <View style={styles.modalContainer}>
                <AirbnbRating
                    count={7}
                    reviews={["Terrible", "Malo", "Meh", "Ok", "Bueno", "Muy Bueno", "Perfecto"]}
                    defaultRating={4}
                    size={30}
                    onFinishRating={(rating) => setRating(rating)}
                />
                <TextInput placeholder="Cuentanos que te ha parecido..." style={styles.input} multiline value={review} placeholderTextColor={"black"} onChangeText={review => setReview(review)} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={giveReview} >
                        <Text style={styles.buttonText}>Escribir Review</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modalize>
    </>
  );
};

export default ViewTutorial;

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    topContainer: {
        justifyContent: 'flex-end',
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
    bottomContainer: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20
    },
    title: {
        fontFamily: 'Bold',
        fontSize: 22,
        color: 'white',
        marginLeft: 40,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        width: '100%',
        paddingBottom: 10,
        position: "absolute",
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
    likeButtonContainer: {
        padding: 10,
        alignItems: 'center'
    },
    stepCard: {
        marginBottom: 20,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    numeroPaso: {
        fontFamily: 'Semibold',
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 20
    },
    description: {
        fontFamily: 'Regular'
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    buttonContainer: {
        paddingHorizontal: 40,
        paddingTop: 20
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
    input: {
        color: 'black',
        minHeight: 50,
        borderColor: 'black',
        borderWidth: 1.5,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 15,
        padding: 10,
        marginTop: 15
    },
    modalContainer: {
        justifyContent: 'center',
        paddingBottom: 20,
        paddingHorizontal: 20,
    }
});
