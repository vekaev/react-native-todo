import {  UPDATE_CURRENT_SCREEN} from "../types"

export const ScreenReducer = (state, action) => {
	switch (action.type) {
		case UPDATE_CURRENT_SCREEN : 
			return {...state, currentScreen: action.item}
		default : return state 
  }
}
