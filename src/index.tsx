import * as React from "react";
import {Provider} from 'react-redux';
import { createRoot } from "react-dom/client";
import {store} from 'store/index';
import {lazy} from "react";

const App = lazy(() => import(/* webpackChunkName: "app" */ './App'));

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);