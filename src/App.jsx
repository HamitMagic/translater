import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import dictionary from '../assets/dictinary.json';
import './App.css'
import About from './pages/About';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
// import { fetchTickets } from './pages/Home';
import { getTickets } from './API/ticketsService';


function App({isLogin, setLogin}) {
    const dispatch = useDispatch();
    const language = useSelector(state => {
        return state.toolkit.dictionaryKey;
    });
    const [token, setToken] = useState(localStorage.getItem('access'), '')

    // useEffect(() => {
    //     if (getTickets().status === 200) setLogin(true);
    //     else setLogin(false);
    //     console.log(isLogin, ' = isLogin')

    // },[])
    
    return (
        <BrowserRouter>
            <Header >
                <select defaultValue={language || 'ru'} onChange={(e) => dispatch({type: e.target.value})}>
                    <option value='ru'>russian</option>
                    <option value='en'>english</option>
                    <option value='kk'>kazakh</option>
                    <option value='es'>spanish</option>
                </select>
                <Link to='/about'>{dictionary[language].about}</Link>
                <Link to='/home'>{dictionary[language].home}</Link>
                <Link to='/login'>{isLogin ? dictionary[language].logout: dictionary[language].login}</Link>
            </Header>
            <Routes>
                <Route path="/about" element={<About language={language} />} />
                <Route path='/home' element={<Home token={token} isLogin={isLogin} setLogin={setLogin} language={language} />} />
                <Route path='*' element={<About language={language} />} />
                <Route path="/login" element={<Login setToken={setToken} token={token} isLogin={isLogin} setLogin={setLogin} language={language} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
