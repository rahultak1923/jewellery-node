import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import AllJewellery from './components/AllJewellery';


function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message="jewellery add"/>
    <div className="container">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/alljewellery' element={<AllJewellery/>}/>
    </Routes>

    </div>
    

    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;
