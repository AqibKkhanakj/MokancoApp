export type TicketStatus = 'New' | 'In queue' | 'In progress' | 'Completed' | 'Cancelled';

export type Ticket = {
  id: string;
  title: string;
  detail: string;
  category: string;
  location: string;
  status: TicketStatus;
  priority: string;
  progress: number;
  requester: string;
  assignee: string;
  created: string;
  updated: string;
  deadline: string;
  description: string;
};

export const tickets: Ticket[] = [
  {
    id: 'TK-1042',
    title: 'Printer offline',
    detail: 'Terminals, printers, and network gear',
    category: 'Device / Hardware',
    location: 'Test 1',
    status: 'In progress',
    priority: 'P1',
    progress: 60,
    requester: 'Test1',
    assignee: 'Sam',
    created: '11/20/2026, 9:15:00 AM',
    updated: '11/27/2026, 4:10:00 PM',
    deadline: '11/28/2026, 5:00:00 PM',
    description: 'The counter printer stopped responding during the lunch rush.',
  },
  {
    id: 'TK-1038',
    title: 'Menu price update',
    detail: 'Menu changes, pricing, and item availability',
    category: 'Menu / Item updates',
    location: 'Test 1',
    status: 'In queue',
    priority: 'P2',
    progress: 10,
    requester: 'Test1',
    assignee: 'Nora',
    created: '11/22/2026, 2:10:00 PM',
    updated: '11/26/2026, 9:00:00 AM',
    deadline: '12/2/2026, 6:00:00 PM',
    description: 'Update seasonal drink prices before the weekend menu goes live.',
  },
  {
    id: 'TK-1031',
    title: 'Card reader decline',
    detail: 'Payment not reflecting',
    category: 'Payment / Transaction',
    location: 'Test 1',
    status: 'Completed',
    priority: 'P1',
    progress: 100,
    requester: 'Test1',
    assignee: 'Sam',
    created: '11/10/2026, 11:04:00 AM',
    updated: '11/18/2026, 3:40:00 PM',
    deadline: '11/18/2026, 4:00:00 PM',
    description: 'Card payments were declining even when the bank approved the charge.',
  },
  {
    id: 'TK-1024',
    title: 'Delivery sync stopped',
    detail: 'Delivery platforms and order sync',
    category: 'Delivery integration',
    location: 'Test 1',
    status: 'Cancelled',
    priority: 'P3',
    progress: 25,
    requester: 'Test1',
    assignee: 'Leah',
    created: '11/8/2026, 8:40:00 AM',
    updated: '11/14/2026, 11:20:00 AM',
    deadline: '11/15/2026, 3:00:00 PM',
    description: 'Delivery orders stopped syncing after the morning menu push.',
  },
  {
    id: 'TK-1019',
    title: 'Drive access request',
    detail: 'Workspace, Gmail, and Drive access',
    category: 'Google',
    location: 'Test 1',
    status: 'New',
    priority: 'P2',
    progress: 0,
    requester: 'Test1',
    assignee: 'Unassigned',
    created: '11/28/2026, 12:39:08 AM',
    updated: '11/28/2026, 12:39:08 AM',
    deadline: '—',
    description: 'Need access to the shared Drive folder for store documents.',
  },
  {
    id: 'TK-1012',
    title: 'KDS ticket delay',
    detail: 'Toast orders and in-store operations',
    category: 'Toast',
    location: 'Test 1',
    status: 'In progress',
    priority: 'P2',
    progress: 45,
    requester: 'Test1',
    assignee: 'Omar',
    created: '11/12/2026, 1:22:00 PM',
    updated: '11/25/2026, 6:15:00 PM',
    deadline: '11/30/2026, 7:00:00 PM',
    description: 'Kitchen tickets are reaching the KDS a few minutes late.',
  },
  {
    id: 'TK-1007',
    title: 'Network drop at counter',
    detail: 'Workstations, network, and hardware',
    category: 'IT / Web',
    location: 'Test 1',
    status: 'Completed',
    priority: 'P1',
    progress: 100,
    requester: 'Test1',
    assignee: 'Leah',
    created: '11/2/2026, 10:05:00 AM',
    updated: '11/9/2026, 11:50:00 AM',
    deadline: '11/9/2026, 12:00:00 PM',
    description: 'The counter register loses the network for a few seconds at a time.',
  },
  {
    id: 'TK-1002',
    title: 'Store hours change',
    detail: 'Appfront ordering and configuration',
    category: 'Appfront',
    location: 'Test 1',
    status: 'Cancelled',
    priority: 'P3',
    progress: 15,
    requester: 'Test1',
    assignee: 'Unassigned',
    created: '11/1/2026, 4:18:00 PM',
    updated: '11/6/2026, 2:05:00 PM',
    deadline: '—',
    description: 'Update the posted store hours for the holiday week.',
  },
];

export function findTicket(id: string) {
  return tickets.find(ticket => ticket.id === id);
}
