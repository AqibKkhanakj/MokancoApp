export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Orders: undefined;
  Products: undefined;
  Account: undefined;
  Ticket: { title: string; detail: string };
};

export type MenuTab = 'Home' | 'Orders' | 'Products' | 'Account';
