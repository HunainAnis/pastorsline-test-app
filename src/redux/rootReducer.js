import { combineReducers } from "redux";
import * as actions from './allActions'

const INITIAL_STATE = {
    loading:false,
    allContacts:[],
    UScontacts:[],
    usDetail:{},
    allDetail:{},
}

const rootReducer = (state=INITIAL_STATE, action)=>{
    switch(action.type) {
        case actions.SET_LOADING:
            return {...state, loading:action.payload}
        case actions.SET_US_CONTACTS:
            return {...state, UScontacts:{...action.payload.data}}
        case actions.SET_ALL_CONTACTS:
            return {...state, allContacts:{...action.payload.data}}
        case actions.FETCH_US:
            return {...state, UScontacts:{...state.UScontacts, contacts:{...state.UScontacts.contacts, ...action.payload.contacts}}}
        case actions.FETCH_ALL:
            return {...state, allContacts:{...state.allContacts, contacts:{...state.allContacts.contacts, ...action.payload.contacts}}}
        default:
            return state
    }
}

export default rootReducer