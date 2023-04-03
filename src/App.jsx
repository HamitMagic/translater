import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import dictionary from '../assets/dictinary.json';
import './App.css'
import About from './pages/About';
import Header from './components/Header';
import Home from './pages/Home';

function App() {
    const dispatch = useDispatch();
    const language = useSelector(state => {
        return state.toolkit.dictionaryKey;
    });


    return (
        <BrowserRouter>
            
            <Header>
                <select defaultValue={language || 'ru'} onChange={(e) => dispatch({type: e.target.value})}>
                    <option value='ru'>russian</option>
                    <option value='en'>english</option>
                    <option value='kk'>kazakh</option>
                    <option value='es'>spanish</option>
                </select>
                <Link to='/about'>{dictionary[language].about}</Link>
                <Link to='/home'>{dictionary[language].home}</Link>
            </Header>
            <Routes>
                <Route path="/about" element={<About language={language} />} />
                <Route path='/home' element={<Home language={language} />} />
                <Route path='*' element={<About language={language} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
