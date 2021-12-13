import './App.css';
import Main from './components/Main'
import Login from './components/Login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup';
import Women from './components/Women';
import Men from './components/Men';
import Admin from './components/Admin';
import Products from './components/Products';
import Orders from './components/Orders';
import Shoppingbag from './components/Shoppingbag';

function App() {
  return (
    <div className="App">
     <Router>
       <Routes>
         <Route exact path="/" element={<Main/>}/>
         <Route path ="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/women" element={<Women/>}/>
         <Route path="/men" element={<Men/>}/>
         <Route path="/admin" element={<Admin/>}/>
         <Route path="/admin/products" element={<Products/>}/>
         <Route path="/admin/orders" element={<Orders/>}/>
         <Route path="/shoppingbag" element={<Shoppingbag/>}/>
         
        </Routes>
       
     </Router>
    </div>
  );
}

export default App;
