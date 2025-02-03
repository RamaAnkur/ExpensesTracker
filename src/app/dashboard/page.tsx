'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/expenses', {
        method: 'GET',
      });
      const data = await response.json();
      setExpenses(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    const categories = {};
    const monthlyData = {};

    if (Array.isArray(expenses)) {
      expenses.forEach((expense: any) => {
        // Category totals
        if (expense.type === 'expense') {
          categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
        }

        // Monthly totals
        const date = new Date(expense.date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        if (!monthlyData[monthYear]) {
          monthlyData[monthYear] = { income: 0, expense: 0 };
        }
        monthlyData[monthYear][expense.type] += expense.amount;
      });
    }

    return { categories, monthlyData };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { categories, monthlyData } = prepareChartData();

  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyData).map((d: any) => d.income),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Expenses',
        data: Object.values(monthlyData).map((d: any) => d.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Overview</h2>
          <Bar data={barChartData} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
} 