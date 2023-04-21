import React, { useEffect, useState } from 'react';
import { getTickets, removeTicket, sendTicket } from '../API/ticketsService';
import { useFetch } from '../hooks/useFetch';
import Tickets from '../components/Tickets';
import Form from '../components/UI/Form';
import dictionary from '../../assets/dictinary.json';
import { refreshToken } from '../API/ticketsService';



function Home({language, isLogin, setLogin, token}) {
    const [fromLanguage, setFromLanguage] = useState('ru');
    const [toLanguage, setToLanguage] = useState('en');
    const [page, setPage] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState('')
    const [currentTicket, setCurrentTicket] = useState("");

    const [fetchTickets, isTicketLoaded, getError] = useFetch(async () => {
        const response = await getTickets(token);
        setTickets(response.data);
        setLogin(true);
    });

    const [postTicket, isTicketSend, postError] = useFetch(async () => {
        const ticket = await sendTicket(fromLanguage, toLanguage, token);
        console.log(ticket);
        setTickets([...tickets, ticket]);
    });

    const [deletedTicket, isDeleted, deleteError] = useFetch(async () => {
        console.log(currentTicket, 'remove');
        const deletedTicket = await removeTicket(currentTicket, token);
        setTickets(tickets.filter((ticket) => ticket._id !== currentTicket));
        return deletedTicket;
    });

    useEffect (() => {
        if (newTicket) {
            postTicket();
        };
    }, [newTicket]);

    useEffect(() => {
        if (currentTicket) {
            deletedTicket();
            setCurrentTicket('');
        }
    }, [currentTicket]);

    useEffect(() => {
        fetchTickets();
    }, [page, token]);

    return (
        <>
            <Form callback={postTicket} 
                fromLanguage={fromLanguage}
                toLanguage={toLanguage} 
                setFromLanguage={setFromLanguage}
                setToLanguage={setToLanguage}
            />
            <button onClick={() => {
                console.log('вошли? ', isLogin, 'from = ', fromLanguage, ' to = ', toLanguage);
                refreshToken();
            }}>консоль</button>
            {isTicketLoaded
                ? <h1>{dictionary[language].loading}</h1>
                : <Tickets tickets={tickets} deleteTicket={(id) => setCurrentTicket(id)} />}
            {getError && <h1>{`${dictionary[language].error}: ${getError}`}</h1>}
        </>
    );
}

export default Home;