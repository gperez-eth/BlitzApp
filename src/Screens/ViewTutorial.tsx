import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ViewTutorial = ({ navigation, route }) => {
    const tutorial = route.params.tutorial
  return (
    <View style={styles.content}>
        <View style={styles.topContainer}>
            <Image resizeMode="cover" source={tutorial.image[0] && { uri: tutorial.image[0] }} style={styles.image}/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{tutorial.title.slice(0, 50)}</Text>
                <Text style={styles.title}><Ionicons name={'ios-stats'} color={'green'} size={20} style={{marginRight: 10}}/> {tutorial.dificulty}</Text>
                <Text style={styles.title}><Ionicons name={'ios-heart'} color={'red'} size={20} style={{marginRight: 10}}/> {tutorial.likes}</Text>
            </View>
        </View>
        <View style={styles.bottomContainer}>
            {tutorial.steps.map((item, index) => {
                return (
                    <View style={styles.stepCard}>
                        <View style={{height: 150}}>
                            <Image resizeMode="cover" source={tutorial.image[index] && { uri: tutorial.image[index] }} style={{width: '100%', height: '100%', borderRadius: 20}}/>
                        </View>
                        <Text style={styles.numeroPaso}>Paso: {index + 1}</Text>
                        <View>
                            <Text>{item.description}</Text>
                        </View>
                    </View>
                )
            })}
        </View>
    </View>
  );
};

export default ViewTutorial;

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    topContainer: {
        flex: 0.5,
        backgroundColor: 'red',
        justifyContent: 'flex-end',
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
    bottomContainer: {
        flex: 0.5,
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
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
    textContainer: {
        width: '100%',
        paddingBottom: 30,
        position: "absolute",
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100
    },
    stepCard: {
        marginTop: 20,
        borderRadius: 20,
    },
    numeroPaso: {
        fontFamily: 'Bold',
        fontSize: 20,
        alignSelf: 'center',
        marginVertical: 5
    }
});
