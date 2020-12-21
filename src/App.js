import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from './components/Home';
import { ModalComponent } from './components/ModalComponent';
import { connect } from 'react-redux';
import * as actions from './redux/action'

function App(props) {
  const [modalA, setModalA] = useState(false)
  const [modalB, setModalB] = useState(false)
  useEffect(()=>{
    props.fetchUSData()
    props.fetchAllData()
  },[])
  console.log(props)
  return (
    <Router>
      <Switch>
        <Route path="/ModalA">
          <ModalComponent {...props} type="A" data={props.allContacts} search={(US, text)=>props.searchResult(US, text)} show={modalA} fetchMore={(US, page)=>props.fetchMoreData(US, page)} toggle={setModalA} />
        </Route>
        <Route path="/ModalB">
          <ModalComponent {...props} type="B" data={props.UScontacts} search={(US, text)=>props.searchResult(US, text)} show={modalB} fetchMore={(US, page)=>props.fetchMoreData(US, page)} toggle={setModalB} />
        </Route>
      </Switch>
        <Home />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUSData: ()=>dispatch(actions.fetchUSContacts()),
    fetchAllData: ()=>dispatch(actions.fetchAllContacts()),
    fetchMoreData:(US, page)=>dispatch(actions.fetchMoreData(US, page)),
    searchResult:(US, text)=>dispatch(actions.searchQuery(US, text))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
