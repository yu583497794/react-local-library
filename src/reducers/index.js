import postsByCatalog from './postsByCatalog';
import selectedCatalog from './selectedCatalog';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  postsByCatalog,
  selectedCatalog
});

export default  rootReducer;