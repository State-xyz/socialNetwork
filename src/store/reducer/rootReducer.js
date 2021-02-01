import { combineReducers } from 'redux';

import chat from './chat';
import statusForm from './statusForm';
import auth_user from './auth.user';

export default combineReducers({
    chat,
    statusForm,
    auth_user,
})