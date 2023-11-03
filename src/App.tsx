import './App.css';
import './input.css'
import Homepage from './Components/Pages/Homepage';
import BentoLayoutPage from './Components/Pages/BentoLayoutPage';
import { _log } from './Helpers/HelpersFns';


function App() {

  return (
    <div>

      {/* <Homepage /> */}
      <BentoLayoutPage key={'Bento Layout'} />

    </div>
  );
}

export default App;
