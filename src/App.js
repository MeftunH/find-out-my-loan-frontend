import logo from './logo.svg';
import './App.css';
import Menu from './components/menu/Menu';
import {Route, Routes} from 'react-router-dom'
import Login from './components/login/Login';
import ErrorPage from './components/error/ErrorPage';
import HomePage from './components/homepage/HomePage';
import Register from './components/register/Register';
import LoanApplication from './loan/LoanApplication';

function App() {
  return (
    <div className="App">
     <Menu></Menu>
     <Routes>
        <Route  path='*' exact element={<ErrorPage/>}></Route>
        <Route  path='/home' exact element={<HomePage/>}></Route>
        <Route  path='/login'exact element={<Login/>}></Route>
        <Route  path='/register' exact element={<Register/>}></Route>
        <Route  path='/apply-loan' exact element={<LoanApplication/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
