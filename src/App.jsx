import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import dictionary from '../assets/dictinary.json';
import './App.css'
import About from './pages/About';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import { useContext, useEffect, useState} from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';

const html = document.querySelector('html');
const [ru, kaz, en, es] = ['ru', 'kk', 'en', 'es'];

function App() {
    const {store} = useContext(Context);
    const [appLang, setAppLang] = useState(store.language ?? localStorage.getItem('language') ?? ru)
        
    useEffect(() => {
        if (localStorage.getItem('access')) {
            store.checkAuth();
        }
        localStorage.setItem('language', appLang);
        html.lang=appLang;
        store.setLanguage(appLang);
    },[appLang]);

    return (
        <BrowserRouter>
            <Header >
                <select defaultValue={appLang} onChange={(e) => setAppLang(e.target.value)}>
                    <option value={ru}>russian</option>
                    <option value={en}>english</option>
                    <option value={kaz}>kazakh</option>
                    <option value={es}>spanish</option>
                </select>
                <Link to='/about'>{dictionary[appLang].about}</Link>
                <Link to='/home'>{dictionary[appLang].home}</Link>
                <Link to='/login'>{store.isLogin ? dictionary[appLang].logout : dictionary[appLang].login}</Link>
            </Header>
            <Routes>
                <Route path="/about" element={<About language={appLang} />} />
                <Route path='/home' element={<Home />} />
                <Route path='*' element={<About />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default observer(App)
