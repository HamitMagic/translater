import React, { useEffect, useState } from 'react';
import ticketsService from '../API/ticketsService';
import { useFetch } from '../hooks/useFetch';
import { useTicket } from '../hooks/useTicket';
import Tickets from '../components/Tickets';
import Form from '../components/UI/Form';
import dictionary from '../../assets/dictinary.json';


function Home({language}) {
    const [fromLanguage, setFromLanguage] = useState('kk');
    const [toLanguage, setToLanguage] = useState('es');
    const [page, setPage] = useState(1)
    const [tickets, setTickets] = useState([]);
    const [fetchTickets, isTicketLoaded, ticketError] = useFetch(async () => {
        const response = await ticketsService();
        setTickets(response.data)
    })
    const [postTicket, errorPosting] = useTicket(async () => {
        const ticket = await ticketsService(fromLanguage, toLanguage);
        console.log(ticket)
    })

    useEffect(() => {
        fetchTickets();
    }, [page])

    return (
        <>
            <Form callback={postTicket}/>
            {isTicketLoaded
                ? <h1>{dictionary[language].loading}</h1>
                : <Tickets tickets={tickets} />}
            {ticketError && <h1>{`${dictionary[language].error}: ${ticketError}`}</h1>}
            s<br />
            k<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lkk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />
            lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />lk<br />oj<br />uuh<br />hu<br />hg<br />jgvhcfvf<br />f<br />ghvg<br />gf<br />h<br />
        </>
    );
}

export default Home;