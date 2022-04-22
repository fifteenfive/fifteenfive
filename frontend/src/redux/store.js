import { createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
// import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage: storageSession,
}

const userReducerState = { 
  userId: '', 
  userNickName: '',
  userProfileUrl: '',
}; 

const userReducer = (state=userReducerState, action) => { 
  switch (action.type) { 
    case 'LOGIN': 
      return { 
        ...state, 
        userId: action.user.userId,
        userNickName: action.user.userNickName,
        userProfileUrl: action.user.userProfileUrl
      }; 
    case 'LOGOUT':
      return {
        userId: '',
        userNickName: '',
        userProfileUrl: ''
      };
    default: 
      return state; 
  } 
};

const rootReducer = combineReducers({
  user: userReducer,
})

export const configureStore = () => { 
  const store = createStore( 
    persistReducer(
      persistConfig, 
      rootReducer
    )
  ); 
  return store; 
};

