export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Tickets: undefined;
  Accounts: undefined;
  Documents: undefined;
  MarketingAssets: undefined;
  Ticket: { title: string; detail: string };
};

export type MenuTab = 'Home' | 'Tickets' | 'Accounts' | 'Documents' | 'MarketingAssets';
