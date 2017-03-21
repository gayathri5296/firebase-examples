import React, { Components } from 'react';
import Router from 'director';
import {
    ALL_TODOS,
    ACTIVE_TODOS,
    COMPLETED_TODOS
} from './src/constants'

console.log(Router);

export default class TodoApp extends Components {
    constructor(props) {
        super(props);

        this.state = {
            nowShowing: app.ALL_TODOS,
            editing: null,
            newTodo: ''
        }
    }

    componentDidMount() {
        // var setState = this.setState;
        // var router = Router({
        //     '/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
        //     '/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
        //     '/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
        // });
        // router.init('/');
    }

    render() {
        return (
            <div>Hello</div>
        )
    }
}