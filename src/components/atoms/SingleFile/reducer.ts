import React, { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: { ...state.response, ...action.payload } };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DROP_DEPTH":
      return { ...state, dropDepth: action.dropDepth };
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE":
      return { ...state, file: action.payload };
    case "DELETE_FILE":
      return {
        ...state,
        file: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
