 import firebase from 'firebase'
 import "@firebase/firestore"
 import { v4 as uuidv4 } from 'uuid';
import { Alert } from 'react-native';

 const firebaseConfig = {
    apiKey: "AIzaSyAbjZ3J6HBB6UPW1013YwOU8wpsjONJ9wQ",
    authDomain: "blitzexpo-3d09d.firebaseapp.com",
    databaseURL: "https://blitzexpo-3d09d.firebaseio.com",
    projectId: "blitzexpo-3d09d",
    storageBucket: "blitzexpo-3d09d.appspot.com",
    messagingSenderId: "776100349571",
    appId: "1:776100349571:web:c0f748655fa7e91f79fdb6"
  };

class Fire {

    constructor() {

    }
    
    get tutorialesRef() {
        return firebase.firestore().collection('tutoriales')
    }

    get userRef() {
        return firebase.firestore().collection('users')
    }

    restorePassword(email) {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            Alert.alert('Email enviado', 'El correo para restablecer la contraseña ha sido enviado')
          }).catch(function(error) {
            var errorCode = error.code;
            if (errorCode == 'auth/user-not-found') {
                Alert.alert('Error al restablecer la contraseña', 'El correo introducido no esta registrado en nuestro sistema')
            } else if (errorCode == 'auth/invalid-email') {
                Alert.alert('Error al restablecer la contraseña', 'El email no tiene un formato correcto');
            }
        });
    }

    getFeatured(callback) {
        let ref = this.tutorialesRef.where("totalLikesCount", ">=", 15)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let tutoriales = []

            snapshot.forEach(doc  => {
                tutoriales.push({ 'id': doc.id, ...doc.data() })
            })

            callback(tutoriales)
        })
    }

    getReviews(callback) {
        let ref = this.tutorialesRef
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let tutoriales = []

            snapshot.forEach(doc  => {
                if (doc.data().image) {
                    doc.data().reviews.forEach(rev => {
                        if(rev.user == firebase.auth().currentUser.uid) {
                            tutoriales.push({ 'id': doc.id, ...doc.data() })
                        }
                    })
                }
            })
            
            tutoriales.forEach(tut => {
                tut.image.sort(function(a, b) {
                    return a.number - b.number;
                });
            })
            callback(tutoriales)
        })
    }

    getTutoriales(callback) {
        let ref = this.tutorialesRef.limit(15)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let tutoriales = []

            snapshot.forEach(doc  => {
                if (doc.data().image) {
                    tutoriales.push({ 'id': doc.id, ...doc.data() })
                }
            })
            
            tutoriales.forEach(tut => {
                tut.image.sort(function(a, b) {
                    return a.number - b.number;
                });
            })
            callback(tutoriales)
        })
    }

    getCategoryTutorial(category, callback) {
        let ref = this.tutorialesRef.where("category", "==", category)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let tutoriales = []

            snapshot.forEach(doc  => {
                tutoriales.push({ 'id': doc.id, ...doc.data() })
            })

            tutoriales.forEach(tut => {
                tut.image.sort(function(a, b) {
                    return a.number - b.number;
                });
            })
            callback(tutoriales)
        })
    }

    getLikedTutoriales(callback) {
        let ref = this.tutorialesRef
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let tutoriales = []

            snapshot.forEach(doc  => {
                if (doc.data().likes.includes(firebase.auth().currentUser.uid)) {
                    tutoriales.push({ 'id': doc.id, ...doc.data() })
                }
            })
            
            tutoriales.forEach(tut => {
                tut.image.sort(function(a, b) {
                    return a.number - b.number;
                });
            })
            callback(tutoriales)
        })
    }

    addTutorial(tutorial, images, callback) {

        tutorial.totalLikesCount = 0
        tutorial.likes = []
        tutorial.reviews = []
        tutorial.averageRating = 0
        tutorial.createdBy = firebase.auth().currentUser.uid

        let id = ''
        let ref = this.tutorialesRef
        let uploadStatus = {steps: false, images: false, error: false}

        ref.add(tutorial).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            id = docRef.id
        })

        images.forEach( async function(obj, i) {
            if (obj.image) {

                var response = await fetch(obj.uri)
                var blob = await response.blob()

                const fileExtension = obj.uri.split('.').pop();
            
                var uuid = uuidv4();
            
                const fileName = `${uuid}.${fileExtension}`;
            
                var storageRef = firebase.storage().ref(`images/${fileName}`);
            
                var uploadTask = storageRef.put(blob);

                uploadTask.on('state_changed', function(snapshot) {
                    
                }, function(error) {
                    // Handle unsuccessful uploads
                    console.log('Error during the upload :(')
                    uploadStatus.steps = false
                    uploadStatus.images = false
                    uploadStatus.error = true
                    callback(uploadStatus)
                    return
                }, () => {
                    storageRef.getDownloadURL().then((downloadUrl) => {
                        console.log("File available at: " + downloadUrl);
                        ref.doc(id).update(
                            {image: firebase.firestore.FieldValue.arrayUnion({url: downloadUrl, number: i})}
                        )
                    })
                    if (i == (images.length -1)) {
                        uploadStatus.images = true
                        callback(uploadStatus)
                    }
                })
            } else {
                console.log("Skipping image upload");
                uploadStatus.steps = true
                callback(uploadStatus)
            }
        })
    }

    updateTutorial(tutorial) {
        console.log(tutorial)
        let ref = this.tutorialesRef
        ref.doc(tutorial.id).update(tutorial)
    }

    updateReview(tutorial, newReview) {
        tutorial.reviews = tutorial.reviews.filter(tut => tut.user !== firebase.auth().currentUser.uid)
        tutorial.reviews.push(newReview)
        tutorial.averageRating = 0
        tutorial.reviews.forEach(rev => {
            tutorial.averageRating += rev.rating
        })
        tutorial.averageRating = Math.round((tutorial.averageRating / tutorial.reviews.length) * 10) / 10
        let ref = this.tutorialesRef
        ref.doc(tutorial.id).update(tutorial)
    }

    async updateProfile(nombre, apellidos, username, biography, avatar) {

        let id = firebase.auth().currentUser.uid
        let ref = this.userRef
        let avatarURLFirebase = ''

        await ref.doc(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            name: nombre,
            lastName: apellidos,
            username: username,
            biography: biography
        })

        var response = await fetch(avatar)
        var blob = await response.blob()
        const fileExtension = avatar.split('.').pop();
        var uuid = uuidv4();
        const fileName = `${uuid}.${fileExtension}`;
        var storageRef = firebase.storage().ref(`images/${fileName}`);
        var uploadTask = storageRef.put(blob);

       await uploadTask.on('state_changed', function(snapshot) {
     
        }, function(error) {
            console.log('Error durante la subida :(')
        }, () => {
            storageRef.getDownloadURL().then((downloadUrl) => {
                console.log("File available at: " + downloadUrl);
                avatarURLFirebase = downloadUrl
                ref.doc(id).update(
                    {avatar: downloadUrl }
                )

                var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: nombre,
                    photoURL: avatarURLFirebase
                }).then(function() {
                    console.log('update completed')
                    console.log('AVATAR ' + user.photoURL)
                }).catch(function(error) {
                    console.log('update error', error)
                });
            })
        })
    }

    getUser(callback) {
        let ref = this.userRef
        let id = firebase.auth().currentUser.uid
        ref.where("uid", "==", id)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                callback(doc.data())
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    getMyTutoriales(callback) {
        let ref = this.tutorialesRef
        let tutoriales = []

        ref.where("createdBy", "==", firebase.auth().currentUser.uid)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                tutoriales.push({ 'id': doc.id, ...doc.data() })
            });

            tutoriales.forEach(tut => {
                tut.image.sort(function(a, b) {
                    return a.number - b.number;
                });
            })
        
            callback(tutoriales)
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire