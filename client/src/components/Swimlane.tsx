import TicketCard from './TicketCard';
import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import withLoginCheck from './withLoginCheck.js';

interface SwimlaneProps {
  title: string;
  tickets: TicketData[];
  deleteTicket: (ticketId: number) => Promise<ApiMessage>;
  checkLogin: () => boolean;
}

const Swimlane = ({ title, tickets, deleteTicket, checkLogin }: SwimlaneProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Todo':
        return 'swim-lane todo';
      case 'In Progress':
        return 'swim-lane inprogress';
      case 'Done':
        return 'swim-lane done';
      default:
        return 'swim-lane';
    }
  };

  return (
    <div className={`swimlane ${getStatusClass(title)}`}>
      <h2>{title}</h2>
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          deleteTicket={deleteTicket}
          checkLogin={checkLogin}
        />
      ))}
    </div>
  );
};

export default withLoginCheck(Swimlane);