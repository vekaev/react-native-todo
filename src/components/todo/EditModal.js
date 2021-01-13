import React, { useState } from 'react'
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native'
import { THEME } from '../../theme'

export const EditModal = ({visible, defaultValue, onSave, onCancel}) => {
  const [value, setValue] = useState(defaultValue)

  const handleCancel= ()=> {
    setValue(defaultValue)
    onCancel()
  }

  const handleSave = () => {
    onSave('title', value)
  }

  return (
    <Modal 
      animationType={'slide'}
      visible={visible}
    >
      <View style={styles.wrapper}> 
        <TextInput style={styles.input} value={value} onChangeText={setValue}/>
        <View style={styles.btnWrapper}>
          <Button onPress={handleSave} color={THEME.COLOR_GREY} title={'Edit'}/>
          <Button onPress={handleCancel} color={THEME.COLOR_RED} title={'Cancel'}/>
        </View>
      </View>
    </Modal>
    
  )
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }, 
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  input: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: THEME.COLOR_BLACK,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 20
  },
})