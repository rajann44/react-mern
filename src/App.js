import './App.css';
import Navbar from './component/navbar';
import { Route, Routes } from 'react-router';

function App() {
  return (
    <div className="MernApp">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<div>Homepage</div>} />
        <Route path="/page1" element={<div>Page 1</div>} />
        <Route path="/page3" element={<div>Page 2</div>} />
        <Route path="/page3" element={<div>Page 3</div>} />
      </Routes>
    </div>
  );
}

export default App;
