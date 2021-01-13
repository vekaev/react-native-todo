import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Keyboard, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { THEME } from '../../theme';

export const AddTodo = ({addTodo}) => {
  const [value, setValue] = useState('')

  const handleClick = () => {
    if(value?.trim()){
      addTodo(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Cann`t be empty')
    }
  }

  return(
    <View style={styles.block}>
      <TextInput 
        onSubmitEditing={handleClick}
        placeholder={'Fill new todo'}
        value={value} 
        onChangeText={setValue} 
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}  
        autoFocus
      />
      <AntDesign.Button onPress={handleClick} style={styles.btn} size={30} name={'pluscircleo'}>Add</AntDesign.Button>
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  input: {
    width: '70%',
    borderBottomWidth: 2,
    borderColor: THEME.COLOR_BLACK,
    borderStyle: 'solid',
    padding: 10,
  },
  btn: {
    backgroundColor: THEME.COLOR_RED
  }
})