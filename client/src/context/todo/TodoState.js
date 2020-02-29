import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
    GET_TODO,
    UPDATE_TODO,
    CREATE_TODO,
    DELETE_TODO,
    SET_LOADING
} from '../types';

const TodoState = props => {
    const initialState = {
        todos: [],
        loading: false
    };

    const [ state, dispatch ] = useReducer(todoReducer, initialState);

    // Get todos

    // Update Todos

    // Create Todos

    // Delete Todos

    // Set loading

    return <TodoContext.Provider
    value={{
        todos: state.todos,
        loading: state.loading
    }}
    >
        {props.children}
    </TodoContext.Provider>
};

export default TodoState;