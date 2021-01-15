import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navbar } from './components/Navbar';
import { TodoScreen } from './screens/TodoScreen'
import { MainScreen } from './screens/MainScreen'
import { useTodoStore } from './context/todo/TodoState';
import { AppLoader } from './components/ui/AppLoader'
import { AppTextBold } from './components/ui/AppText';
import { useScreenStore } from './context/screen/screenState';

export default function MainLayout() {
  const { loading, error, fetchTodo} = useTodoStore()
  const { currentScreen } = useScreenStore()
  
  const loadTodoList = useCallback(async () => {await fetchTodo()}, [fetchTodo]) 

  useEffect(() => {
    loadTodoList()
  }, [])

  if (loading) {
    return <AppLoader/>
  }

  if (error) {
    return (
      <View style={styles.center}> <AppTextBold>{error}</AppTextBold> </View>
    )
  } 

  return (
    <View style={styles.container}>
      <Navbar position={'Todo list'}/>
      {currentScreen ? <TodoScreen/> : <MainScreen/> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
