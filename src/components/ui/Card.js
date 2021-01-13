import React from 'react'
import { StyleSheet, View } from 'react-native'

export const AppCard = props => (
  <View style={{...styles.default, ...props.styles}}>{props.children}</View>
)
const styles = StyleSheet.create({
  default: {
    padding: 20,
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 10
  }
})