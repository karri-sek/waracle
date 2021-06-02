import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container } from '@material-ui/core';
import { createStore } from 'redux';
import catCatalogue from './reducers';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Upload from '../src/pages/Upload';
const store = createStore(catCatalogue, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Container>
                <Router>
                    <Switch>
                        <Route path="/upload">
                            <Upload />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
reportWebVitals();
