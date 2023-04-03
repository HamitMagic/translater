import React from 'react';
import classes from './styles/ticket.Item.module.css'

function TicketItem({ticket}) {
    return (
        <div className={classes.ticket_item}>
            {ticket}
        </div>
    );
}

export default TicketItem;