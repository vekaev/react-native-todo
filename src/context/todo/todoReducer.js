import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_CURRENT_TODO, UPDATE_TODO } from "../types"

export const TodoReducer = (state, action) => {
	switch (action.type) {
		case ADD_TODO : return {...state, list: [...state.list, {
      id: action.id,
      title: action.title,
      complete: false
    }]}
		case REMOVE_TODO : return {...state, list: state.list.filter(item => item.id !== action.id )}
		case UPDATE_TODO : 
			return {...state, list: state.list.map(todo => {
				if (todo.id === action.id) {
					todo[action.key] = action.value
				}
				return todo
			})}
		case FETCH_TODOS: 
			return {...state, list: action.list}
		case SHOW_LOADER: 
			return {...state, loading: true}
		case HIDE_LOADER: 
			return {...state, loading: false}
		case CLEAR_ERROR: 
			return {...state, error: null}
		case SHOW_ERROR: 
			return {...state, error: action.error}
		default : return state 
  }
}
