import Allstud from './component/Alluser';
import Navbar from './component/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import View from './component/View';
import Addstud from './component/Add';
import Edit from './component/Edit';
import Home from './component/Home';
function App() {
  return (
  <BrowserRouter>
      <Navbar />
      <Routes >
      <Route  path='/' element={<Home />} />
          <Route  path='/alluser' element={<Allstud />} />
          <Route  path='/add' element={<Addstud />} />
          <Route  path="/view/:id" element={<View />} />
          <Route  path="/edit/:id" element={<Edit />} />


      </Routes>
   
  </BrowserRouter>
  );
}

export default App;
