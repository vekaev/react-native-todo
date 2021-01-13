import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [currentId, setCurrentId] = useState(null)
  const [list, setList] = useState([])

  if (!isReady) {
    return(
      <AppLoading 
        startAsync={loadApplication} 
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}/>
    ) 
  }

  const handleAdd = (title) => {
    setList(list => [ {
      id: Date.now(),
      title,
      done: false
    }, ...list])
  }

  const handleSave = (id, key, value) => {
    setList(list => list.map(todo => {
      if (todo.id === id) {
        todo[key] = value
      }
      return todo
    }))
  }

  const handleDelete = (todo) => {
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
          onPress: () => {
            setCurrentId(null)
            setList(list => list.filter(item => item.id !== todo.id ))
          }
        }
      ],
      { cancelable: true }
    );
    
  }

  const handleOpenTodo = (item) => {
    setCurrentId(item)
  }

  const handleCloseTodo = () => {
    setCurrentId(null)
  }

  return (
    <View style={styles.container}>
      <Navbar position={'todo list'}/>
      {currentId ? 
        <TodoScreen 
          todo={currentId} 
          handleSave={handleSave}
          handleDelete={handleDelete}
          handleCloseTodo={handleCloseTodo}
        /> 
          : 
        <MainScreen 
          list={list} 
          handleOpenTodo={handleOpenTodo}
          handleAdd={handleAdd} 
          handleDelete={handleDelete}/>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
