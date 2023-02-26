import logo from './logo.svg';
import './App.css';
import Menu from './components/menu/Menu';
import {Route, Routes} from 'react-router-dom'
import Login from './components/login/Login';
import ErrorPage from './components/error/ErrorPage';
import Register from './components/register/Register';
import LoanApplication from './loan/LoanApplication';
import UpdateCustomer from './profile/UpdateCustomer';
import FindLoans from './loan/FindLoans';
import DeleteAccountButton from './profile/DeleteAccountButton';

function App() {
  return (
    <div className="App">
     <Menu></Menu>
     <Routes>
        <Route  path='*' exact element={<ErrorPage/>}></Route>
        <Route  path='/login'exact element={<Login/>}></Route>
        <Route  path='/register' exact element={<Register/>}></Route>
        <Route  path='/apply-loan' exact element={<LoanApplication/>}></Route>
        <Route  path='update-profile' exact element={<UpdateCustomer/>}></Route>
        <Route  path='find-loans' exact element={<FindLoans/>}></Route>
        <Route  path='delete-account' exact element={<DeleteAccountButton/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
