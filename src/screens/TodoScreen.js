import React, { useState } from 'react';
import {  Button, StyleSheet, View } from 'react-native';
import { AppCard } from '../components/ui/Card';
import { EditModal } from '../components/todo/EditModal';
import { AppTextBold } from '../components/ui/AppText';
import { THEME } from '../theme';
import { useScreenStore } from '../context/screen/screenState';
import { useTodoStore } from '../context/todo/TodoState';

export const TodoScreen = () => {
  const { currentScreen , updateCurrentScreen} = useScreenStore()
  const { removeTodo, updateTodo } = useTodoStore()
  const [modal, setModal] = useState(false)

  if(!currentScreen) {
    handleCloseTodo()
    return null
  }
  const handleCloseTodo = () => updateCurrentScreen(null)

  const onSave = async (key, value) => {
    await updateTodo(currentScreen.id, key, value)
    closeModal()
  }

  const closeModal = () => {
    setModal(false)
  }

  return(
    <View>
      <AppCard>
        <AppTextBold>{currentScreen.title}</AppTextBold>
        <Button onPress={() => setModal(prev => !prev)} color={THEME.COLOR_RED} title={'EDIT'}/>
        <EditModal visible={modal} onSave={onSave} onCancel={closeModal} defaultValue={currentScreen.title}/>
      </AppCard>
      <View style={styles.btnWrapper}>
        <View style={styles.btn}>
          <Button onPress={handleCloseTodo} color={THEME.COLOR_YELLOW} title={'Close'}/>
        </View>
        <View style={styles.btn}>
          <Button onPress={removeTodo.bind(null, currentScreen)} color={THEME.COLOR_RED} title={'Delete'}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    margin: 5,
    backgroundColor: THEME.COLOR_BLACK,
    flex: 1,
  }
})
