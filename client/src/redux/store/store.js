import { configureStore } from '@reduxjs/toolkit'
import mainReducer from '../reducer/reducer';

export default configureStore({
  reducer: {mainReducer},
})