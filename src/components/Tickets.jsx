import React from 'react';
import TicketItem from './TicketItem';

function Tickets({tickets, deleteTicket}) {

    return (
        <div className='tickets'>
            {tickets.map((ticket) => <TicketItem key={ticket._id} deleteTicket={deleteTicket} ticket={ticket} />)}
        </div>
    );
}

export default Tickets;