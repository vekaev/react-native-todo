import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export const AppLoader = () => (
  <View style={styles.loader}>
    <ActivityIndicator/>
  </View>
)

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})