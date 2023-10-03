import './App.css';
import './input.css'
import Homepage from './Components/Pages/Homepage';
import React, { useContext } from 'react'
import { StoresContext } from './Context/ActionsContext';
import { useStoresContext } from './Components/Hooks/useContext';
import { ActionsStore } from './mobXStore/ActionStore';


const Stores = {
  actionStore: new ActionsStore()
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
