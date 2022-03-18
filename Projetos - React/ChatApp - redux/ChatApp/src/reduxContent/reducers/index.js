import { combineReducers } from "redux";
import user from "./users";
import channels from "./channels";
import utility from "./utility";

const rootReducers = combineReducers({
    user,
    channels,
    utility
});

export default rootReducers