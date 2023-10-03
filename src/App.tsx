import './App.css';
import './input.css'
import Homepage from './Components/Pages/Homepage';
import React, { useContext } from 'react'
import { IStoresContext, StoresContext } from './Context/ActionsContext';

import { ActionsStore, StoreV2DataNodes } from './mobXStore/ActionStore';


const Stores: IStoresContext = {
  ActionsStore: new ActionsStore(),
  StoreV2Nodes: new StoreV2DataNodes()

}

function App() {


  return (
    <StoresContext.Provider
      value={{
        ...Stores
      }}
      key={'store'}
    >
      <Homepage />
    </StoresContext.Provider>
  );
}

export default App;
