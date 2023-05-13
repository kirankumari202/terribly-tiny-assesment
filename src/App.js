import './App.css';
import SubmitButtonComponent from './SubmitButtonComponent';
import Histogram from './Histogram';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SubmitButtonComponent/>}/>
        <Route path='/submit' element={<Histogram/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
