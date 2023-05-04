import React, { useEffect, useState } from 'react';
import { getTickets, removeTicket, sendTicket } from '../API/ticketsService';
import { useFetch } from '../hooks/useFetch';
import Tickets from '../components/Tickets';
import Form from '../components/UI/Form';
import dictionary from '../../assets/dictinary.json';
import { observer } from 'mobx-react-lite';
import { authStore } from '../mobx/authStore';


function Home() {
    const [fromLanguage, setFromLanguage] = useState('ru');
    const [toLanguage, setToLanguage] = useState('en');
    const [page, setPage] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState('')
    const [currentTicket, setCurrentTicket] = useState("");

    const [fetchTickets, isTicketLoaded, getError] = useFetch(async () => {
        const response = await getTickets();
        setTickets(response.data);
        authStore.setLogin(true);
    });

    const [postTicket, isTicketSend, postError] = useFetch(async () => {
        const ticket = await sendTicket(fromLanguage, toLanguage);
        setTickets([...tickets, ticket]);
    });

    const [deletedTicket, isDeleted, deleteError] = useFetch(async () => {
        console.log(currentTicket, 'remove');
        const removedTicket = await removeTicket(currentTicket);
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
                ? <h1>{dictionary[authStore.language].loading}</h1>
                : <Tickets tickets={tickets} deleteTicket={(id) => setCurrentTicket(id)} />}
            {getError && <h1>{`${dictionary[authStore.language].error}: ${getError}`}</h1>}
        </>
    );
}

export default observer(Home);