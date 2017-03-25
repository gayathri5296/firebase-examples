import * as firebase from 'firebase';
import React, { Component } from 'react';
import _ from 'lodash'

import { config } from '../firebase-config'
firebase.initializeApp(config);

export function connect(ComposedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);

            this.state = {
                todos: {}
            }

            this.fillTodos = this.fillTodos.bind(this);
            this.removeTodos = this.removeTodos.bind(this);
        }

        componentWillMount() {
            this.database = firebase.database();

            this.todosRef = this.database.ref('todos');
            this.todosRef.off();

            this.todosRef.on('child_added', this.fillTodos);
            this.todosRef.on('child_changed', this.fillTodos);
            this.todosRef.on('child_removed', this.removeTodos);
        }

        componentWillUnmount() {
            this.todosRef.off();
        }

        fillTodos(data) {
            let todo = {
                [data.key]: data.val()
            }

            this.setState({
                todos: Object.assign(this.state.todos, todo)
            })
        }

        removeTodos(data) {
            const todos = this.state.todos;
            let newTodos = {};

            _.forEach(todos, (todo, key) => {
                if (key !== data.key) {
                    newTodos[key] = todo;
                }
            })

            this.setState({
                todos: newTodos
            })
        }

        addTodo(todo) {
            var newTodoRef = this.todosRef.push();
            newTodoRef.set(todo);

            var topUserPostsRef = this.todosRef.orderByChild('completed');
        }

        updateTodo(key, field, value) {
            this.todosRef.child(key).update({ [field]: value });
        }

        removeTodo(key) {
            this.todosRef.child(key).remove();
        }

        render() {
            return <ComposedComponent
                {...this.props}
                todos={this.state.todos}
                updateTodo={this.updateTodo.bind(this)}
                addTodo={this.addTodo.bind(this)}
                removeTodo={this.removeTodo.bind(this)}
            />
        }
    }
}
