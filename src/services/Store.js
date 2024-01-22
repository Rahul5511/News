import { applyMiddleware, combineReducers, createStore } from "redux";
import loginReducer from "./login/reducer";
import thunk from "redux-thunk";
import { NewsApiReducer } from "./NewsApi/ApicallReducer";

const rootReducer = combineReducers({
    login:loginReducer,
    newsApi:NewsApiReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;