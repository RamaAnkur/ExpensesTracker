'use client';

import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'react-datepicker/dist/react-datepicker.css';
import { transactions, paymentMethods, categories } from '@/data/transactions';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedApp, setSelectedApp] = useState('all');
  const [startDate, endDate] = dateRange;

  const filteredData = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const dateInRange = (!startDate || transactionDate >= startDate) && 
                         (!endDate || transactionDate <= endDate);
      const appMatches = selectedApp === 'all' || transaction.paymentMethod === selectedApp;
      return dateInRange && appMatches;
    });
  }, [dateRange, selectedApp]);

  // Payment method expenses
  const paymentMethodExpenses = useMemo(() => {
    return Object.entries(
      filteredData.reduce((acc, transaction) => {
        acc[transaction.paymentMethod] = (acc[transaction.paymentMethod] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // Category distribution
  const categoryDistribution = useMemo(() => {
    return Object.entries(
      filteredData.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>)
    ).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  // Total metrics calculations
  const totalExpense = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageTransaction = filteredData.length > 0 ? totalExpense / filteredData.length : 0;
  const largestTransaction = Math.max(...filteredData.map(t => t.amount));

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Expense Dashboard</h1>

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Date Range:</label>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update)}
            isClearable={true}
            placeholderText="Select date range"
            className="p-2 border rounded w-64"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Payment Method:</label>
          <select
            className="p-2 border rounded w-40"
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
          >
            <option value="all">All Methods</option>
            {Object.keys(paymentMethods).map(method => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
          <p className="text-2xl font-bold text-indigo-600">
            ₹{totalExpense.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
          <h3 className="text-gray-500 text-sm">Average Transaction</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{averageTransaction.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
          <h3 className="text-gray-500 text-sm">Largest Transaction</h3>
          <p className="text-2xl font-bold text-purple-600">
            ₹{largestTransaction.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expense Trend Chart */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Expense Trend</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#6366f1" 
                fill="#818cf8" 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell 
                    key={index} 
                    fill={categories[entry.name as keyof typeof categories].color} 
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Method Distribution */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={paymentMethodExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="value" 
                fill="#6366f1" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;