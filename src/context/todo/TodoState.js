import React, { useContext, useReducer } from 'react'
import { Alert } from 'react-native';
import { FIREBASE_URL } from '../../consts';
import {  ADD_TODO, 
          CLEAR_ERROR, 
          FETCH_TODOS, 
          HIDE_LOADER, 
          REMOVE_TODO, 
          SHOW_ERROR, 
          SHOW_LOADER, 
          UPDATE_TODO } from '../types';
import { TodoContext } from './todoContext'
import { TodoReducer } from './todoReducer';
import { Http } from '../../http'
import { useScreenStore } from '../screen/screenState';
export const useTodoStore = () => {
	return useContext(TodoContext);
}

export const TodoState = ({ children }) => {
  const initialState = {
    list: [],
    loading: false,
    error: null
  }
  const [state, dispatch] = useReducer(TodoReducer, initialState)
  const { updateCurrentScreen} = useScreenStore()
  const {list, loading, error } = state;

  const showLoader = () => dispatch({type: SHOW_LOADER})
  const clearLoader = () => dispatch({type: HIDE_LOADER})

  const showError = error => dispatch({type: SHOW_ERROR, error})
  const clearError = () => dispatch({type: CLEAR_ERROR})
  
  const updateTodo = async(id, key, value) => {
    clearError()
    try{
      await Http.patch(FIREBASE_URL + `todos/${id}.json`, { [key]: value })
      dispatch({type: UPDATE_TODO, id, key, value}) 
    } catch (e) {
      showError('Something went wrong')
      console.log(e)
    }
  }

  const fetchTodo = async () => {
    showLoader()
    clearError()
    try{
      const data = await Http.get(FIREBASE_URL + 'todos.json')
      const list = Object.keys(data).map(key => ({...data[key], id: key}));
      dispatch({type: FETCH_TODOS, list})
    } catch (e) {
      showError('Something went wrong')
      console.log(e)
    } finally{
      clearLoader()
    }  
  } 

  const addTodo = async title => {
    clearError()
    try{
      const data = await Http.post(FIREBASE_URL + 'todos.json', { title })
      dispatch({type: ADD_TODO, title, id: data.name})
    } catch (e) {
      showError('Something went wrong')
    }
  } 

  const removeTodo = async ({id}) => {
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Delete",
          style: 'destructive',
          onPress: async () => {
            updateCurrentScreen(null)
            await Http.delete(FIREBASE_URL + `todos/${id}.json`)
            dispatch({type: REMOVE_TODO, id}) 
          }
        }
      ],
      { cancelable: true }
    );
  }

  return (
    <TodoContext.Provider 
      value={{list, 
              loading,
              error,
              addTodo, 
              removeTodo, 
              updateTodo,
              fetchTodo,
              showLoader, 
              clearLoader,
            }}>
      {children}
    </TodoContext.Provider>  
      )
}
