import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'loaders.css/loaders.css'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import WebApp from "@twa-dev/sdk";

if (WebApp.initData !== '' && WebApp.initData !== undefined) {
    console.log(WebApp.initData)
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
            <App/>
        </Provider>,
    )
}
