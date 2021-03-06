import Axios from "axios"
import * as actions from './allActions'

const authKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjE3MSwiZXhwIjoxNjM5NDY2NjE1fQ.9vE-glLQtV2NT3gNMkqeRkrWWZAhYCqX-_ibs7lC8GY"

export const setLoading = (loading) => {
    return {
        type : actions.SET_LOADING,
        payload : loading
    }
}
export const setContacts = (US, data) => {
    return {
        type : US ? actions.SET_US_CONTACTS:actions.SET_ALL_CONTACTS,
        payload : {
            data
        }
    }
}
export const fetchContactsUS = (data) => {
    return {
        type :actions.FETCH_US,
        payload : {
            data
        }
    }
}
export const fetchContactsAll = (data) => {
    return {
        type :actions.FETCH_ALL,
        payload : {
            data
        }
    }
}

export const fetchUSContacts = () => {
    let response = []
    
    return (dispatch=>{
        dispatch(setLoading(true))
        Axios.get("https://api.dev.pastorsline.com/api/contacts.json",
        {
          headers: {
            Authorization: `Bearer ${authKey}`
          },
          params:{
            companyId:171,
            countryId:226,
            page:1
          }
        })
        .then(async (resp)=>{
            console.log(resp)
            if(resp.status === 200) {
                dispatch(setContacts(true, resp.data))
            }
        })
        .catch((err)=>{
            console.log("USA data fetching error", err)
        })
        dispatch(setLoading(false))
        console.log(response)
    })
}

export const fetchAllContacts = () => {
    let response = []
    return (dispatch=>{
        Axios.get("https://api.dev.pastorsline.com/api/contacts.json",
        {
          headers: {
            Authorization: `Bearer ${authKey}`
          },
          params:{
            companyId:171,
            page:1
          }
        })
        .then(async (resp)=>{
            console.log(resp)
            if(resp.status === 200) {
                dispatch(setContacts(false, resp.data))
            }
        })
        .catch((err)=>{
            console.log("All data fetching error", err)
        })
        console.log(response)
    })
}
export const searchQuery = (US, text) => {
    let response = []
    return (dispatch=>{
        Axios.get("https://api.dev.pastorsline.com/api/contacts.json",
        {
          headers: {
            Authorization: `Bearer ${authKey}`
          },
          params:{
            companyId:171,
            page:1,
            countryId:US ? 226 : null,
            query:text
          }
        })
        .then(async (resp)=>{
            console.log(resp)
            if(resp.status === 200) {
                dispatch(setContacts(US, resp.data))
            }
        })
        .catch((err)=>{
            console.log("Search data fetching error", err)
        })
        console.log(response)
    })
}

export const fetchMoreDataUS = (page) => {
    let response = []
    return (dispatch=>{
        Axios.get("https://api.dev.pastorsline.com/api/contacts.json",
        {
          headers: {
            Authorization: `Bearer ${authKey}`
          },
          params:{
            companyId:171,
            page:page,
            countryId:226,
          }
        })
        .then(async (resp)=>{
            console.log(resp)
            if(resp.status === 200) {
                dispatch(fetchContactsUS(resp.data))
            }
        })
        .catch((err)=>{
            console.log("USA more data fetching error", err)
        })
        console.log(response)
    })
}
export const fetchMoreDataAll = (page) => {
    let response = []
    return (dispatch=>{
        Axios.get("https://api.dev.pastorsline.com/api/contacts.json",
        {
          headers: {
            Authorization: `Bearer ${authKey}`
          },
          params:{
            companyId:171,
            page:page,
          }
        })
        .then(async (resp)=>{
            console.log(resp)
            if(resp.status === 200) {
                dispatch(fetchContactsAll(resp.data))
            }
        })
        .catch((err)=>{
            console.log("All more data fetching error", err)
        })
        console.log(response)
    })
}