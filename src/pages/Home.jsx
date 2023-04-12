import React, { useEffect, useState } from 'react';
import { getTickets, removeTicket, sendTicket } from '../API/ticketsService';
import { useFetch } from '../hooks/useFetch';
import Tickets from '../components/Tickets';
import Form from '../components/UI/Form';
import dictionary from '../../assets/dictinary.json';


function Home({language}) {
    const [fromLanguage, setFromLanguage] = useState('en');
    const [toLanguage, setToLanguage] = useState('kk');
    const [page, setPage] = useState(1);
    const [tickets, setTickets] = useState([]);
    const [currentTicket, setCurrentTicket] = useState("")
    const [fetchTickets, isTicketLoaded, getError] = useFetch(async () => {
        const response = await getTickets();
        setTickets(response.data);
    })
    const [postTicket, isTicketSend, postError] = useFetch(async () => {
        const ticket = await sendTicket(fromLanguage, toLanguage);
        const newTickets = tickets;
        newTickets.push(ticket);
        setTickets(newTickets);
    })
    const [deletedTicket, isDeleted, deleteError] = useFetch(async () => {
        console.log(currentTicket, 'remove');
        const deletedticket = await removeTicket(currentTicket);
        setTickets(tickets.filter((ticket) => ticket._id !== currentTicket));
    })

    useEffect(() => {
        if (currentTicket) deletedTicket();
    },[currentTicket])
    
    useEffect(() => {
        fetchTickets();
    }, [page])

    return (
        <>
            <Form callback={postTicket}/>
            {isTicketLoaded
                ? <h1>{dictionary[language].loading}</h1>
                : <Tickets tickets={tickets} deleteTicket={(id) => setCurrentTicket(id)} />}
            {getError && <h1>{`${dictionary[language].error}: ${getError}`}</h1>}
        </>
    );
}

export default Home;