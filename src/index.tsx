import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IStoresContext, StoresContext } from './Hooks/useStoresContext';
import { RootArgsStore_v1 } from './Context/RootStore';
import { OutputViewConfig } from './Context/ThemeView'

import { configure } from "mobx"
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import Homepage from './Components/Pages/Homepage';

configure({
  useProxies: "always",
  enforceActions: 'observed'
});


const Stores: IStoresContext = {
  RootStore: new RootArgsStore_v1(),
  ViewConfig: new OutputViewConfig()
}



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <StoresContext.Provider
      value={{
        ...Stores
      }}
      key={'Store Provider'}
    >
      {/* <RouterProvider router={router} /> */}


      <App />
    </StoresContext.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
