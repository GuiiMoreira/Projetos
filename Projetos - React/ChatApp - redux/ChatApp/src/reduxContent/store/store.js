import { createStore } from "redux";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
import rootReducers from "../reducers";

const store = createStore(rootReducers, composeWithDevTools());


export default store;