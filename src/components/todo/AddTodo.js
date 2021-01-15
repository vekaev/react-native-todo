import React, { useRef, useState } from 'react'
import { StyleSheet, View, TextInput, Keyboard, Alert, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { THEME } from '../../theme';

export const AddTodo = ({addTodo}) => {
  const ref = useRef(null)
  const [value, setValue] = useState('')

  const handleClick = () => {
    if(value?.trim()){
      addTodo(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Cann`t be empty')
    }
    ref.current?.focus()
  }

  return(
    <View style={styles.block}>
      <TextInput 
        ref={ref}
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
    width: Dimensions.get('window').width / (12 / 8),
    borderBottomWidth: 2,
    borderColor: THEME.COLOR_BLACK,
    borderStyle: 'solid',
    padding: 10,
  },
  btn: {
    width: Dimensions.get('window').width / (12 / 3),
    backgroundColor: THEME.COLOR_RED,
    textAlign: 'center'
  }
})