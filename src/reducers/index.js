import {combineReducers} from 'redux';
import postsByCatalog from './postsByCatalog';
import selectedCatalog from './selectedCatalog';
import selectedCopys from './selectedCopys';
import borrowResult from './borrowResult'
import {routerReducer} from 'react-router-redux';

const reducer = combineReducers({
  postsByCatalog,
  selectedCatalog,
  selectedCopys,
  borrowResult,
  routing: routerReducer
});

export default  reducer;