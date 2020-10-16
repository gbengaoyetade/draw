import React, { createContext, useReducer} from 'react';
import { tabReducer, toolReducer, canvasReducer } from './reducers';

const initialState = {
  tool: { color: '#f00', size: 10, type: 'pen' },
  canvas: { color: '#fff', opacity: 100, zoom: 1 },
  tab: 'draw'
}

const AppContext = createContext({
  state: initialState,
  dispatch: () => null
});

const mainReducer = ({ tool, canvas, tab }, action) => ({
 tool: toolReducer(tool, action),
 tab: tabReducer(tab, action),
 canvas: canvasReducer(canvas, action)
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };