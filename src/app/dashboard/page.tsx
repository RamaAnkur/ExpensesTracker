'use client';

import { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'react-datepicker/dist/react-datepicker.css';
import { transactions, paymentMethods, categories } from '@/data/transactions';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <div className="container mx-auto p-6 min-h-screen animate-fade-in relative">
      {/* Dark Blue Background */}
      <div className="absolute inset-0 -z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_60%)] animate-gradient-pulse" />
      </div>

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-12 text-white"
      >
        Expense Dashboard
      </motion.h1>

      {/* All White Cards */}
      <div className="space-y-8">
        {/* Filter Card */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
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
        </motion.div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: totalExpense, label: 'Total Expenses' },
            { value: averageTransaction, label: 'Average Transaction' },
            { value: largestTransaction, label: 'Largest Transaction' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-gray-600 text-sm mb-1">{metric.label}</h3>
              <p className="text-2xl font-bold text-gray-800">
                ₹{metric.value.toLocaleString('en-IN')}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chart Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              type: 'trend',
              title: 'Expense Trend',
              chart: (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      fill="url(#gradient)"
                      fillOpacity={0.2} 
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              )
            },
            {
              type: 'category',
              title: 'Category Distribution',
              chart: (
                <ResponsiveContainer width="100%" height={300}>
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
              )
            },
            {
              type: 'payment',
              title: 'Payment Methods',
              chart: (
                <ResponsiveContainer width="100%" height={300}>
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
              )
            }
          ].map((chart, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
            >
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                {chart.title}
              </h2>
              {chart.chart}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add these styles for animations */}
      <style jsx global>{`
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gradient-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }
        .animate-gradient-rotate {
          animation: gradient-rotate 20s linear infinite;
        }
        .animate-gradient-pulse {
          animation: gradient-pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;