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
import { SpreadSheetStore } from './Context/SpreadSheetStore';

configure({
  useProxies: "always",
  enforceActions: 'observed'
});

const tempStore = new ArgStorage<A_Sill>()
tempStore.getSize() === 0 && tempStore.add([
  new A_Sill(900, 190, 1),
  new A_Sill(1650, 90, 1),
  new A_Sill(900, 190, 2),
  new A_Sill(900, 190, 3),
  new A_Sill(1680, 90, 1),
  new A_Sill(1000, 150, 1),
  new A_Sill(1000, 150, 1),
  new A_Sill(800, 190, 1),
])
const Stores: IStoresContext = {
  RootStore: ROOTSTORE,
  ViewConfig: new OutputViewConfig(),
  SillStore: tempStore,
  SheetStore: new SpreadSheetStore(),
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>

    <ThemeProvider theme={ theme }>
      <StoresContext.Provider
        value={ {
          ...Stores
        } }
        key={ 'Store Provider' }
      >
        <CssBaseline enableColorScheme />
        <App />
      </StoresContext.Provider>
    </ThemeProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
