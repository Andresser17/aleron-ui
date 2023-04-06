export enum ReducerActionKind {
  SET_MODE = "SET_MODE",
  SET_RESPONSE = "SET_RESPONSE",
  SET_ERROR = "SET_ERROR",
  SET_DROP_DEPTH = "SET_DROP_DEPTH",
  SET_IN_DROP_ZONE = "SET_IN_DROP_ZONE",
  ADD_FILE = "ADD_FILE",
  DELETE_FILE = "DELETE_FILE",
}

export interface ReducerAction {
  type: ReducerActionKind;
  payload: any;
}

export interface ReducerState {
  file?: File;
  mode: number;
  dropDepth: number;
  inDropZone: boolean;
  error: { code: number; message: string };
  response: { percent: number; data: File; err: Error };
}

const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case ReducerActionKind.SET_MODE:
      return { ...state, mode: action.payload };
    case ReducerActionKind.SET_RESPONSE:
      return { ...state, response: { ...state.response, ...action.payload } };
    case ReducerActionKind.SET_ERROR:
      return { ...state, error: action.payload };
    case ReducerActionKind.SET_DROP_DEPTH:
      return { ...state, dropDepth: action.payload };
    case ReducerActionKind.SET_IN_DROP_ZONE:
      return { ...state, inDropZone: action.payload };
    case ReducerActionKind.ADD_FILE:
      return { ...state, file: action.payload };
    case ReducerActionKind.DELETE_FILE:
      return {
        ...state,
        file: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
