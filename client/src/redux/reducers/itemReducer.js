import { v4 as uuid} from 'uuid'
const initialState = {
   items: [
      { id: uuid(), name: 'Eggs' },
      { id: uuid(), name: 'Milk' },
      { id: uuid(), name: 'Pizza' },
      { id: uuid(), name: 'Mozzarilla' },
   ],
}
const itemReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case 'A': return state
      default: return state
   }
}

export default itemReducer;