import React from 'react'
import { StyleSheet, View, Platform } from 'react-native';
import { THEME } from '../theme';
import { AppText, AppTextBold } from './ui/AppText';

export const Navbar = ({position}) => {
  return(
    <View style={{...styles.navbar, ...Platform.select({
      ios: styles.navbarIOS,
      android: styles.navbarAndroid
    })}}> 
      <AppTextBold style={styles.text}>{position}</AppTextBold>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: THEME.COLOR_BLACK,
    paddingBottom: 7,
    
  },
  navbarIOS: {
    
  },
  navbarAndroid: {
    justifyContent: 'center',
    paddingBottom: 0
  },
  text: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase'
  }
})