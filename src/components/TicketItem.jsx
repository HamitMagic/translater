import classes from './styles/ticket.Item.module.css'

function TicketItem({ticket, deleteTicket}) {
    return (
        <div className={classes.ticket_item}>
            {ticket._id} <span className={classes.ticket_delete} onClick={() => deleteTicket(ticket._id)}>X</span>
        </div>
    );
}

export default TicketItem;