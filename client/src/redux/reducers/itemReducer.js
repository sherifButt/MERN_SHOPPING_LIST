import { v4 as uuid } from 'uuid'
import { actionTypes } from '../constants/actionTypes'
const initialState = {
   items: [
      { id: uuid(), name: 'Eggs' },
      { id: uuid(), name: 'Milk' },
      { id: uuid(), name: 'Pizza' },
      { id: uuid(), name: 'Candys' },
   ],
}
const itemReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.GET_ITEMS: return { ...state }
      case actionTypes.ADD_ITEM: return {
         ...state,
         items: [...state.items, { id: uuid(), name: payload }]
      }
      case actionTypes.DELETE_ITEM: {
         return {
            ...state,
            items: state.items.filter(item => item.id !== payload)
         }
         
      }

      default: return state
   }
}

export default itemReducer;