import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Platform, StatusBar, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated'
import Fire from '../database/Fire'
import firebase from 'firebase'
import LikeButton from '../Components/LikeButton';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const ViewTutorial = ({ navigation, route }) => {

    const [canLike, setCanLike] = React.useState(true)

    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[styles.statusBar, { backgroundColor }]}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    );

    const screenHeight = Dimensions.get('window').height;
    const slideHeight = (screenHeight / 2.5)

    const scrollY = new Animated.Value(0)

    const AnimateHeaderHeight = scrollY.interpolate(
    {
        inputRange: [ 0, 250, 450 ],
        outputRange: [ slideHeight, slideHeight / 1.5, slideHeight / 2 ],
        extrapolate: 'clamp'
    });
    
    let tutorial = route.params.tutorial

    const giveLike = () => {
        var bd = new Fire((error, user) => {
            if (error) {
              return alert("Oh oh, something went wrong" + error)
            } else {
                if(canLike) {
                    tutorial.likes.push(firebase.auth().currentUser.uid)
                    bd.updateTutorial(tutorial)
                    setCanLike(false)
                } else {
                    var index = tutorial.likes.indexOf(firebase.auth().currentUser.uid);
                    if (index !== -1) {
                        tutorial.likes.splice(index, 1);
                    }
                    bd.updateTutorial(tutorial)
                    setCanLike(true)
                }
            }
        })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
            if(tutorial.likes.includes(firebase.auth().currentUser.uid)) {
                setCanLike(false)
            }
        })
        return unsubscribe
    }, [navigation])

  return (
    <View style={styles.content}>
        <MyStatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
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
    </View>
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
});
