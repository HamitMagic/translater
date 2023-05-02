import React, { useContext, useEffect, useState } from 'react';
import { getTickets, removeTicket, sendTicket } from '../API/ticketsService';
import { useFetch } from '../hooks/useFetch';
import Tickets from '../components/Tickets';
import Form from '../components/UI/Form';
import dictionary from '../../assets/dictinary.json';
import { Context } from '../main';



function Home() {
    const {store} = useContext(Context);
    const [fromLanguage, setFromLanguage] = useState('ru');
    const [toLanguage, setToLanguage] = useState('en');
    const [page, setPage] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState('')
    const [currentTicket, setCurrentTicket] = useState("");

    const [fetchTickets, isTicketLoaded, getError] = useFetch(async () => {
        const response = await getTickets();
        setTickets(response.data);
    });

    const [postTicket, isTicketSend, postError] = useFetch(async () => {
        const ticket = await sendTicket(fromLanguage, toLanguage);
        setTickets([...tickets, ticket]);
    });

    const [deletedTicket, isDeleted, deleteError] = useFetch(async () => {
        console.log(currentTicket, 'remove');
        const deletedTicket = await removeTicket(currentTicket);
        setTickets(tickets.filter((ticket) => ticket._id !== currentTicket));
    });

    useEffect(() => {
        if (currentTicket) {
            deletedTicket();
            return;
        }
        else if (newTicket) {
            postTicket();
            return;
        }
        else {
            fetchTickets();
            return;
        }
    }, [newTicket, currentTicket]);

    return (
        <>
            <Form callback={postTicket} 
                fromLanguage={fromLanguage}
                toLanguage={toLanguage} 
                setFromLanguage={setFromLanguage}
                setToLanguage={setToLanguage}
            />
            {isTicketLoaded
                ? <h1>{dictionary[store.language].loading}</h1>
                : <Tickets tickets={tickets} deleteTicket={(id) => setCurrentTicket(id)} />}
            {getError && <h1>{`${dictionary[store.language].error}: ${getError}`}</h1>}
        </>
    );
}

export default Home;