// Import React and render
import  React, {useEffect} from 'react';
import { render } from 'react-dom';
import {Router, Route, Switch, Redirect, withRouter, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import {hot} from 'react-hot-loader/root';

import {StoreContext} from './hooks/use-store';
import store from './Store';
import {useStore} from './hooks/use-store'
import {UserCardList} from './Components/UserCardListComponent/UserCardList'
import {UserList} from './Components/UserListComponent/UserList'
import Modal from './Components/ModalComponent/Modal';
import {Profile} from './Components/ProfileComponent/Profile';
import {NavPanel} from './Components/NavPanelComponent/NavPanel'

const App:React.FC = hot (() => {
    const Store = useStore();
    useEffect(() => {
        Store.load();
    }, [Store])
    
    return (<>
        <NavPanel />
        <Switch>
            <Route 
                history = {history}
                path = '/usercard'
                component = {UserCardList}
            />
            <Route 
                history = {history}
                path = '/userlist'
                component = {UserList}
            />
            <Redirect from = '/' to = '/usercard'/>
        </Switch>
        </>
    )
})

const rootElement = document.getElementById('root')
const history = createBrowserHistory();
render(
    <Router history = {history}>
        <StoreContext.Provider value = {store}>
                <App />
        </StoreContext.Provider>
    </Router>
    ,
    rootElement
)

declare const module: any;
if (module.hot) {
  module.hot.accept('./Store', render);
}