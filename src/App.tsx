import './App.css';
import './input.css'
import Homepage from './Components/Pages/Homepage';
import React, { useContext } from 'react'
import { StoresContext } from './Context/ActionsContext';

import { ActionsStore, StoreActions } from './mobXStore/ActionStore';


const Stores = {
  ActionsStore: new ActionsStore(),
  storeActions: new StoreActions()
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
