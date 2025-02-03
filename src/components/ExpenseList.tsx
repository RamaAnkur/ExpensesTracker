'use client';

import { useState, useEffect } from 'react';

interface Expense {
  _id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses');
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === 'all') return true;
    return expense.type === filter;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('expense')}
          className={`px-4 py-2 rounded ${
            filter === 'expense' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setFilter('income')}
          className={`px-4 py-2 rounded ${
            filter === 'income' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Income
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id} className="border-b">
                <td className="px-6 py-4">
                  {new Date(expense.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 capitalize">{expense.type}</td>
                <td className="px-6 py-4">{expense.category}</td>
                <td className="px-6 py-4">{expense.description}</td>
                <td className="px-6 py-4 text-right">
                  ${expense.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 