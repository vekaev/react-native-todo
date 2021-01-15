import React, { useContext, useReducer } from 'react'
import {  UPDATE_CURRENT_SCREEN } from '../types';
import { ScreenContext } from './screenContext';
import { ScreenReducer } from './screenReducer';

export const useScreenStore = () => {
	return useContext(ScreenContext);
}

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(ScreenReducer, {
    currentScreen: null,
  })

  const updateCurrentScreen = item => dispatch({type: UPDATE_CURRENT_SCREEN, item}) 

  return (
    <ScreenContext.Provider 
      value={{currentScreen: state.currentScreen,
              updateCurrentScreen}}>
      {children}
    </ScreenContext.Provider>  
      )
}
