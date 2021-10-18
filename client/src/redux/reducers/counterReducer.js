import { act } from "react-dom/test-utils"
import actionTypes from "../constants/actionTypes"

const initialState = {
   categories: {
      categoryCount: {},
      totalCount: 0
   },
   items: {
      totalCount:0
   },
   users: {
      totalCount:0
   },
   itemsPerUser: {
      users: {}
   }
}

const counterReducer = (state = initialState, { type, payload }) => {
   switch (type) {
      case actionTypes.ADD_COUNT: return { ...state }
      case actionTypes.GET_COUNT: return {...state}
      default: return state
   }
}

export default counterReducer;