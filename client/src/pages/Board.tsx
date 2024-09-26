import { useEffect, useState, useLayoutEffect } from 'react';
import { retrieveTickets, deleteTicket } from '../api/ticketAPI';
import ErrorPage from './ErrorPage';
import Swimlane from '../components/Swimlane';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import withLoginCheck from '../components/withLoginCheck.js'

interface BoardProps {
  checkLogin: () => boolean;
}

const boardStates = ['Todo', 'In Progress', 'Done'];

const Board: React.FC<BoardProps> = ({ checkLogin }) => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [error, setError] = useState(false);

  const fetchTickets = async () => {
    try {
      const data = await retrieveTickets();
      setTickets(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };

  const deleteIndvTicket = async (ticketId: number): Promise<ApiMessage> => {
    try {
      const data = await deleteTicket(ticketId);
      fetchTickets();
      return data;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  useLayoutEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    fetchTickets();
  }, []);

if (error) {
  return <ErrorPage />;
}

return (
  <>
    <div className='board'>
      <div className='board-display'>
        {boardStates.map((status) => {
          const filteredTickets = tickets.filter(ticket => ticket.status === status);
          return (
            <Swimlane 
              title={status} 
              key={status} 
              tickets={filteredTickets} 
              deleteTicket={deleteIndvTicket}
            />
          );
        })}
      </div>
    </div>
  </>
);
};

export default withLoginCheck(Board);
