import postsByCatalog from './postsByCatalog';
import selectedCatalog from './selectedCatalog';
import {combineReducers} from 'redux';
import selectedCopys from './selectedCopys';
const rootReducer = combineReducers({
  postsByCatalog,
  selectedCatalog,
  selectedCopys
});

export default  rootReducer;