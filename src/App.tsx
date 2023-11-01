import './App.css';
import './input.css'
import Homepage from './Components/Pages/Homepage';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import { _log } from './Helpers/HelpersFns';


function App() {
  BentoLayoutPage.displayName = "BENTO"
  return (
    <div>

      {/* <Homepage /> */}
      <BentoLayoutPage key={BentoLayoutPage.displayName} />

    </div>
  );
}

export default App;
