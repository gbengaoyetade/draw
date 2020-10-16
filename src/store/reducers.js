import { 
  CHANGE_TAB,
  CHANGE_CANVAS_COLOR,
  CHANGE_CANVAS_OPACITY,
  CHANGE_CANVAS_ZOOM,
  CHANGE_TOOL_SIZE,
  CHANGE_TOOL_COLOR,
  CHANGE_TOOL_TYPE,
} from '../constants';


export const toolReducer = (state, action) => {
  switch(action.type) {
    case CHANGE_TOOL_COLOR:
      return { ...state, color: action.payload }
    
    case CHANGE_TOOL_SIZE:
      return { ...state, size: action.payload }
    
    case CHANGE_TOOL_TYPE:
      return { ...state, type: action.payload }
    
    default:
      return state;
  }
}


export const tabReducer = (state, action) => {
  switch(action.type){
    case CHANGE_TAB:
      return action.payload
    default: 
      return state
  }
}

export const canvasReducer = (state, action) => {
  switch(action.type) {
    case CHANGE_CANVAS_COLOR:
      return { ...state, color: action.payload }
    
    case CHANGE_CANVAS_OPACITY:
      return { ...state, size: action.payload }
    
    case CHANGE_CANVAS_ZOOM:
      
      return { ...state, zoom: action.payload }
    
    default:
      return state;
  }
}