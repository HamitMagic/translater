import React from 'react';
import TicketItem from './TicketItem';

function Tickets({tickets}) {
    console.log(tickets)
    return (
        <div>
            {tickets.map((ticket) => <TicketItem key={ticket._id} ticket={ticket._id} />)}
        </div>
    );
}

export default Tickets;