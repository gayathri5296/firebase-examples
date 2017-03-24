import React, { Component } from 'react'
import * as firebase from 'firebase';

import Header from './Header'
import Main from './Main'

import styles from '../styles/styles.css'

const PROFILE_PLACEHOLDER = '/src/images/profile_placeholder.png';
const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';
var config = {
    apiKey: "AIzaSyAN9Xk9MHp2hPMsDI9_FTKlDB6pcB9ZFdg",
    authDomain: "friendlychat-5e136.firebaseapp.com",
    databaseURL: "https://friendlychat-5e136.firebaseio.com",
    storageBucket: "friendlychat-5e136.appspot.com",
    messagingSenderId: "1077476152465"
};
firebase.initializeApp(config);

class App extends Component {
    constructor(props) {
        super(props);

        this.auth = firebase.auth();
        this.database = firebase.database();
        this.storage = firebase.storage();

        this.state = {
            isLoggedIn: false,
            profilePicUrl: PROFILE_PLACEHOLDER,
            userName: '',
            messages: {},
            shouldDisableSend: true
        }

        this.authChangeHandler = this.authChangeHandler.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.saveImageMessage = this.saveImageMessage.bind(this);
    }

    componentWillMount() {
        this.auth.onAuthStateChanged(this.authChangeHandler);
    }

    authChangeHandler(user) {
        if (user) {
            this.setState({
                isLoggedIn: true,
                profilePicUrl: user.photoURL,
                userName: user.displayName
            })

            this.loadMessages();
            // this.saveMessagingDeviceToken();
        } else {
            this.setState({
                isLoggedIn: false,
                profilePicUrl: PROFILE_PLACEHOLDER,
                userName: '',
                messages: {}
            })
        }
    }

    setMessage(data) {
        let message;
        const imageUrl = data.val().imageUrl;

        const setMessageToState = (newImageUrl) => {
            let message;

            if ( ! newImageUrl ) {
                message = {
                    [data.key]: data.val()
                }
            } else {
                message = {
                    [data.key]: Object.assign(
                        data.val(),
                        { imageUrl: newImageUrl }
                    )
                }
            }

            this.setState({
                messages: Object.assign(
                    this.state.messages,
                    message
                )
            })
        }

        if ( imageUrl && imageUrl.startsWith('gs://') ) {
            setMessageToState(LOADING_IMAGE_URL)

            this.storage
                .refFromURL(imageUrl)
                .getMetadata()
                .then((metadata) => {
                    setMessageToState(metadata.downloadURLs[0])
                });
        } else {
            setMessageToState();
        }
    }

    loadMessages() {
        this.messagesRef = this.database.ref('messages');

        this.messagesRef.off();

        this.messagesRef.limitToLast(12).on('child_added', this.setMessage);
        this.messagesRef.limitToLast(12).on('child_changed', this.setMessage);
    }

    signIn() {
        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider);
    }

    signOut() {
        this.auth.signOut();
    }

    saveMessage(message) {
        if (this.checkSignedInWithMessage()) {
            var currentUser = this.auth.currentUser;

            this.setState({
                shouldDisableSend: false
            })

            this.messagesRef
                .push({
                    name: currentUser.displayName,
                    text: message,
                    photoUrl: currentUser.photoURL || PROFILE_PLACEHOLDER
                })
                .then(() => {
                    this.setState({
                        shouldDisableSend: true
                    })
                })
                .catch((error) => {
                    console.error('Error writing new message to Firebase Database', error);
                });
        }
    }

    saveImageMessage(file) {
        if ( !file.type.match('image.*') ) {
            alert('You can only share images')
            return;
        }

        if (this.checkSignedInWithMessage()) {
            var currentUser = this.auth.currentUser;

            this.messagesRef
                .push({
                    name: currentUser.displayName,
                    imageUrl: LOADING_IMAGE_URL,
                    photoUrl: currentUser.photoURL || PROFILE_PLACEHOLDER
                })
                .then((data) => {
                    var filePath = currentUser.uid + '/' + data.key + '/' + file.name;

                    return this.storage
                        .ref(filePath)
                        .put(file)
                        .then((snapshot) => {

                        // Get the file's Storage URI and update the chat message placeholder.
                        var fullPath = snapshot.metadata.fullPath;

                        return data.update({
                            imageUrl: this.storage.ref(fullPath).toString()
                        });
                    });
                })
                .catch((error) => {
                    console.error('There was an error uploading a file to Cloud Storage:', error);
                });
        }
    }

    checkSignedInWithMessage() {
        if (this.auth.currentUser) {
            return true;
        }

        alert('You must sign-in first');

        return false;
    }

    render() {
        return (
            <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header
                    isLoggedIn={this.state.isLoggedIn}
                    userName={this.state.userName}
                    profilePicUrl={this.state.profilePicUrl}
                    signIn={this.signIn} 
                    signOut={this.signOut} 
                />
                <Main
                    messages={this.state.messages}
                    saveMessage={this.saveMessage}
                    shouldDisableSend={this.state.shouldDisableSend}
                    saveImageMessage={this.saveImageMessage}
                />
            </div>
        )
    }
}

export default App;