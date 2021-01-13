import React, { useState } from 'react';
import {  Button, StyleSheet, View } from 'react-native';
import { AppCard } from '../components/ui/Card';
import { EditModal } from '../components/todo/EditModal';
import { AppTextBold } from '../components/ui/AppText';
import { THEME } from '../theme';

export const TodoScreen = ({todo, handleDelete, handleCloseTodo, handleSave}) => {
  const [modal, setModal] = useState(false)

  if(!todo) {
    handleCloseTodo()
    return null
  }

  const onSave = (key, value) => {
    handleSave(todo.id, key, value)
    closeModal()
  }

  const closeModal = () => {
    setModal(false)
  }

  return(
    <View>
      <AppCard>
        <AppTextBold>{todo.title}</AppTextBold>
        <Button onPress={() => setModal(prev => !prev)} color={THEME.COLOR_RED} title={'EDIT'}/>
        <EditModal visible={modal} onSave={onSave} onCancel={closeModal} defaultValue={todo.title}/>
      </AppCard>
      <View style={styles.btnWrapper}>
        <View style={styles.btn}>
          <Button onPress={handleCloseTodo} color={THEME.COLOR_YELLOW} title={'Close'}/>
        </View>
        <View style={styles.btn}>
          <Button onPress={handleDelete.bind(null, todo)} color={THEME.COLOR_RED} title={'Delete'}/>
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
