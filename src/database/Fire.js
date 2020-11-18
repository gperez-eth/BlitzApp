 import firebase from 'firebase'
 import "@firebase/firestore"
 import { v4 as uuidv4 } from 'uuid';

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

    getFeatured(callback) {
        let ref = this.tutorialesRef.where("likes", ">=", 15)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            tutoriales = []

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

    getTutoriales(callback) {
        let ref = this.tutorialesRef.limit(15)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            tutoriales = []

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
            tutoriales = []

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
            tutoriales = []

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

        tutorial.likes = []

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

    detach() {
        this.unsubscribe();
    }
}

export default Fire