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
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './AppTheme';
import { _log } from './Helpers/HelpersFns';

configure({
  useProxies: "always",
  enforceActions: 'observed'
});

const tempStore = new ArgStorage<A_Sill>()
tempStore.add([
  new A_Sill(1800, 190, 1),
  new A_Sill(800, 140, 3),
  new A_Sill(800, 190, 1),
  new A_Sill(800, 140, 2),
  new A_Sill(750, 140, 1),
])
const Stores: IStoresContext = {
  RootStore: ROOTSTORE,
  ViewConfig: new OutputViewConfig(),
  SillStore: tempStore,
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>

    <ThemeProvider theme={theme}>
      <StoresContext.Provider
        value={{
          ...Stores
        }}
        key={'Store Provider'}
      >
        <CssBaseline />
        <App />
      </StoresContext.Provider>
    </ThemeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
