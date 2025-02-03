import { stringify } from 'csv-stringify/sync';

export function exportToCsv(expenses: any[]) {
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
  
  const data = expenses.map(expense => [
    new Date(expense.date).toLocaleDateString(),
    expense.type,
    expense.category,
    expense.description,
    expense.amount.toFixed(2)
  ]);

  const csvContent = stringify([headers, ...data]);
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 