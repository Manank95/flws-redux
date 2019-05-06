import { combineReducers } from 'redux';
import records from './itemsReducer';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
    records,
    form: reduxFormReducer,
});
