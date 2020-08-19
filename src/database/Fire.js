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

    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                })
            }
        })
    }
    
    get ref() {
        return firebase.firestore().collection('tutoriales')
    }

    getFeatured(callback) {
        let ref = this.ref.where("likes", ">=", 15)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            tutoriales = []

            snapshot.forEach(doc  => {
                tutoriales.push({ 'id': doc.id, ...doc.data() })
            })

            callback(tutoriales)
        })
    }

    getTutoriales(callback) {
        let loaded = true
        let ref = this.ref.limit(15)
        this.unsubscribe = ref.onSnapshot(snapshot => {
            tutoriales = []

            snapshot.forEach(doc  => {
                tutoriales.push({ 'id': doc.id, ...doc.data() })
            })

            tutoriales.forEach(obj => {
                if(!obj.image) {
                    loaded = false
                }
            })

            if(loaded) {
                callback(tutoriales)
            }
        })
    }

    addTutorial(tutorial, images, callback) {
        let id = ''
        let ref = this.ref
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
                            {image: firebase.firestore.FieldValue.arrayUnion(downloadUrl)}
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
        let ref = this.ref
        ref.doc(tutorial.id).update(tutorial)
    }

    detach() {
        this.unsubscribe();
    }
}

export default Fire