import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { AddTodo } from '../components/todo/AddTodo';
import { TodoList } from '../components/todo/TodoList';
import { AppText } from '../components/ui/AppText';
import { useScreenStore } from '../context/screen/screenState';
import { useTodoStore } from '../context/todo/TodoState';

export const MainScreen = () => {
  const { list, addTodo, removeTodo  } = useTodoStore()
  const { updateCurrentScreen} = useScreenStore()

  return(
    <View style={styles.main}>
      <AddTodo addTodo={addTodo}/>
      {list?.length > 0 ? 
        <TodoList list={list} removeTodo={removeTodo} openTodo={updateCurrentScreen}/> : 
        <View style={styles.imgWrapper}>
          <Image style={styles.image} resizeMode={'contain'} source={require('../../assets/favicon.png')}/>
          <AppText>No todos</AppText>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
  imgWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 80
  },
  image: {
    margin: 10,
    width: '100%',
    height: '100%'
  }
})
