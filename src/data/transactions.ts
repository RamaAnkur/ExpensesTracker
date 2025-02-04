export type Transaction = {
  id: string;
  date: string;
  paymentMethod: 'PhonePe' | 'CRED' | 'GooglePay' | 'Paytm' | 'AmazonPay';
  category: 'Shopping' | 'Bills' | 'Food' | 'Entertainment' | 'Travel' | 'Healthcare' | 'Education';
  amount: number;
  merchant: string;
  location: string;
};

export const paymentMethods = {
  PhonePe: { color: '#5e5ce6', icon: '📱' },
  CRED: { color: '#00c805', icon: '💳' },
  GooglePay: { color: '#4285f4', icon: 'Ⓜ️' },
  Paytm: { color: '#20336b', icon: '🏦' },
  AmazonPay: { color: '#ff9900', icon: '📦' }
};

export const categories = {
  Shopping: { color: '#ff6b6b', icon: '🛍️' },
  Bills: { color: '#4dabf7', icon: '🧾' },
  Food: { color: '#ff922b', icon: '🍔' },
  Entertainment: { color: '#be4bdb', icon: '🎬' },
  Travel: { color: '#20c997', icon: '✈️' },
  Healthcare: { color: '#f06595', icon: '🏥' },
  Education: { color: '#6741d9', icon: '🎓' }
};

export const transactions: Transaction[] = [
  {
    id: '1',
    date: '2023-03-01',
    paymentMethod: 'PhonePe',
    category: 'Shopping',
    amount: 4500,
    merchant: 'Myntra',
    location: 'Mumbai'
  },
  {
    id: '2',
    date: '2023-03-02',
    paymentMethod: 'CRED',
    category: 'Bills',
    amount: 12000,
    merchant: 'Electricity Board',
    location: 'Delhi'
  },
  // Add 48 more entries with varied data
  ...Array.from({ length: 48 }, (_, i) => ({
    id: (i + 3).toString(),
    date: `2023-${String(Math.floor(i/8) + 3).padStart(2, '0')}-${String((i % 8) + 1).padStart(2, '0')}`,
    paymentMethod: ['PhonePe', 'CRED', 'GooglePay', 'Paytm', 'AmazonPay'][i % 5] as Transaction['paymentMethod'],
    category: ['Shopping', 'Bills', 'Food', 'Entertainment', 'Travel', 'Healthcare', 'Education'][i % 7] as Transaction['category'],
    amount: Math.floor(Math.random() * 20000) + 500,
    merchant: `Merchant ${i + 1}`,
    location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'][i % 5]
  }))
]; 