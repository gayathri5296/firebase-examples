import * as firebase from 'firebase';
import React, { Component } from 'react';

var config = {
    apiKey: "AIzaSyAN9Xk9MHp2hPMsDI9_FTKlDB6pcB9ZFdg",
    authDomain: "friendlychat-5e136.firebaseapp.com",
    databaseURL: "https://friendlychat-5e136.firebaseio.com",
    storageBucket: "friendlychat-5e136.appspot.com",
    messagingSenderId: "1077476152465"
};
firebase.initializeApp(config);

export function connect(ComposedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                todos: {}
            }
        }

        componentWillMount() {
            this.auth = firebase.auth();
            this.database = firebase.database();
            this.storage = firebase.storage();

            this.todosRef = this.database.ref('todos');
            this.todosRef.off();

            this.todosRef.on('child_added', this.fillTodos);
            this.todosRef.on('child_changed', this.fillTodos);
            this.todosRef.on('child_removed', this.removeTodos);
        }

        componentWillUnmount() {
            this.todosRef.off();
        }

        render() {
            return <ComposedComponent
                {...this.props}
            />
        }
    }
}
