import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IStoresContext, StoresContext } from './Components/Hooks/useStoresContext';
import { ActionsStore, StoreV2DataNodes } from './mobXStore/ActionStore';
import mbxActionStore from './mobXStore/Stores';
import mbxStoreLL from './mobXStore/mbxStore';
import dto_Store from './ActionComponents/ActionModels/DTO_Store';
const Stores: IStoresContext = {
  // ActionsStore: new ActionsStore(),
  // StoreV2Nodes: new StoreV2DataNodes(),
  mbxStore: new mbxActionStore(),
  mbxLinkedStore: dto_Store

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

      <App />
    </StoresContext.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
