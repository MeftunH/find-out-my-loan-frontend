import logo from './logo.svg';
import './App.css';
import Menu from './components/menu/Menu';
import {Route, Routes} from 'react-router-dom'
import Container from './components/Container';
import Login from './components/login/Login';
import ErrorPage from './components/error/ErrorPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
     <Menu></Menu>
     <Routes>
        <Route path='/' exact element={<Container/>}></Route>
        <Route  path='*' exact element={<ErrorPage/>}></Route>
        <Route  path='/home' exact element={<HomePage/>}></Route>
        <Route  path='/login'exact element={<Login/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
