import React from 'react';
import ReactDOM from 'react-dom';
import './scss/_normalize.scss'
import 'antd/dist/antd.css';
import App from './App';
import {store} from "./store/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

