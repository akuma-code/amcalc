import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ROOTSTORE } from './Context/RootStore';
import { OutputViewConfig } from './Context/ThemeView';
import { IStoresContext, StoresContext } from './Hooks/useStoresContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { configure } from "mobx";
import { ArgStorage } from './Context/ArgStorage';
import { A_Sill, A_Size } from './Interfaces/CommonTypes';
import { ThemeProvider } from '@mui/material';
import theme from './AppTheme';

configure({
  useProxies: "always",
  enforceActions: 'observed'
});


const Stores: IStoresContext = {
  RootStore: ROOTSTORE,
  ViewConfig: new OutputViewConfig(),
  SizeStore: new ArgStorage<A_Size>(),
  SillStore: new ArgStorage<A_Sill>(),
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
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoresContext.Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
