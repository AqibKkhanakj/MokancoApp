export type Invoice = {
    id: string;
    number: string;
    vendor: string;
    issuedAt: string;
    dueAt: string;
    total: number;
    paid: number;
  };
  
  export type InvoiceStatus = 'open' | 'overdue' | 'paid';
  export type PaymentStatus = 'unpaid' | 'partial' | 'paid';
  
  export type TabKey = 'Insights' | 'Invoices' | 'Reports';
  
  export type DateRange = '30 days' | '90 days' | '365 days' | 'All time';
  
  export type StatusFilter = 'All' | 'Open' | 'Overdue' | 'Paid';
  export type PaymentFilter = 'All' | 'Unpaid' | 'Partial' | 'Paid';