import { useNavigate } from 'react-router-dom';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import { MouseEventHandler } from 'react';

interface TicketCardProps {
  ticket: TicketData;
  deleteTicket: (ticketId: number) => Promise<ApiMessage>
  checkLogin: () => boolean;
}

const TicketCard = ({ ticket, deleteTicket, checkLogin }: TicketCardProps) => {
  const navigate = useNavigate();

  const handleDelete: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const ticketId = Number(event.currentTarget.value);
    if (!checkLogin()) {
      navigate('/login');
      return;
    }
    
    if (!isNaN(ticketId)) {
      try {
        const data = await deleteTicket(ticketId);
        return data;
      } catch (error) {
        console.error('Failed to delete ticket:', error);
      }
    }
  };

  const handleEdit = () => {
    if (checkLogin()) {
      navigate('/edit', {state: {id: ticket.id}});
    } else {
      navigate('/login');
    }
  }

  return (
    <div className='ticket-card'>
      <h3>{ticket.name}</h3>
      <p>{ticket.description}</p>
      <p>{ticket.assignedUser?.username}</p>
      <button type='button' onClick={handleEdit} className='editBtn'>Edit</button>
      <button type='button' value={String(ticket.id)} onClick={handleDelete} className='deleteBtn'>Delete</button>
    </div>
  );
};

export default TicketCard;