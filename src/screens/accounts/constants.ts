import { Invoice, DateRange } from './types';

export const DATE_RANGES: DateRange[] = [
  '30 days',
  '90 days',
  '365 days',
  'All time',
];

export const STATUS_OPTIONS = ['All', 'Open', 'Overdue', 'Paid'];

export const PAYMENT_OPTIONS = ['All', 'Unpaid', 'Partial', 'Paid'];

export const REPORT_TYPES = [
  'Outstanding invoices',
  'Overdue invoices',
  'Payments received',
];

export const SAMPLE_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'INV-2026-001',
    vendor: 'Coffee Suppliers Ltd.',
    issuedAt: '2026-11-01',
    dueAt: '2026-11-15',
    total: 1250,
    paid: 500,
  },
  {
    id: '2',
    number: 'INV-2026-002',
    vendor: 'Packaging Solutions',
    issuedAt: '2026-10-20',
    dueAt: '2026-11-05',
    total: 850,
    paid: 0,
  },
  {
    id: '3',
    number: 'INV-2026-003',
    vendor: 'Fresh Foods Market',
    issuedAt: '2026-11-05',
    dueAt: '2026-12-05',
    total: 620,
    paid: 620,
  },
  {
    id: '4',
    number: 'INV-2026-004',
    vendor: 'Equipment & Supplies',
    issuedAt: '2026-09-15',
    dueAt: '2026-10-01',
    total: 2100,
    paid: 1000,
  },
  {
    id: '5',
    number: 'INV-2026-005',
    vendor: 'Coffee Roasters Co.',
    issuedAt: '2026-11-10',
    dueAt: '2026-12-10',
    total: 1450,
    paid: 0,
  },
];