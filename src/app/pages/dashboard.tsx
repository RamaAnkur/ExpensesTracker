import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const transactionData = [
  { date: '2023-03-01', paymentMethod: 'PhonePe', category: 'Shopping', amount: 1200 },
  { date: '2023-03-02', paymentMethod: 'CRED', category: 'Bills', amount: 800 },
  { date: '2023-03-03', paymentMethod: 'GooglePay', category: 'Food', amount: 300 },
  { date: '2023-03-04', paymentMethod: 'PhonePe', category: 'Entertainment', amount: 450 },
  { date: '2023-03-05', paymentMethod: 'CRED', category: 'Travel', amount: 1200 },
  // Add more data points as needed
];

// Calculate metrics
const totalExpense = transactionData.reduce((sum, item) => sum + item.amount, 0);
const phonePeExpense = transactionData.filter(item => item.paymentMethod === 'PhonePe').reduce((sum, item) => sum + item.amount, 0);
const credExpense = transactionData.filter(item => item.paymentMethod === 'CRED').reduce((sum, item) => sum + item.amount, 0);
const googlePayExpense = transactionData.filter(item => item.paymentMethod === 'GooglePay').reduce((sum, item) => sum + item.amount, 0);

// Category distribution data
const categoryData = transactionData.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + item.amount;
  return acc;
}, {});

const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));

const Dashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Expense Dashboard</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
          <p className="text-2xl font-bold">₹{totalExpense}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">PhonePe Expenses</h3>
          <p className="text-2xl font-bold">₹{phonePeExpense}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">CRED Expenses</h3>
          <p className="text-2xl font-bold">₹{credExpense}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
          <h3 className="text-gray-500 text-sm">GooglePay Expenses</h3>
          <p className="text-2xl font-bold">₹{googlePayExpense}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expense Trend Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Expense Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#6366f1" fill="#818cf8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryChartData.map((entry, index) => (
                  <Cell key={index} fill={['#6366f1', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="paymentMethod" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;