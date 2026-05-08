import React, { useContext } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Calendar,
  Activity,
} from "lucide-react";
import Search from "../components/Search";
import { AppContext } from "../context/AppContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const Analytics = () => {
  const { theme, tObj } = useContext(AppContext);
  const dark = theme === "dark";

  // Mock Data
  const appointmentData = [
    { name: "Jan", appointments: 65 },
    { name: "Feb", appointments: 59 },
    { name: "Mar", appointments: 80 },
    { name: "Apr", appointments: 81 },
    { name: "May", appointments: 56 },
    { name: "Jun", appointments: 55 },
    { name: "Jul", appointments: 40 },
  ];

  const medicineSalesData = [
    { name: "Antibiotics", value: 400 },
    { name: "Painkillers", value: 300 },
    { name: "Vitamins", value: 300 },
    { name: "Ointments", value: 200 },
  ];

  const patientGrowthData = [
    { name: "2021", patients: 200 },
    { name: "2022", patients: 400 },
    { name: "2023", patients: 600 },
    { name: "2024", patients: 800 },
    { name: "2025", patients: 1000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className={`p-6 md:p-8 space-y-8 font-sans ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
      <Search title={tObj?.analyticsTitle || "Analytics Dashboard"} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl transition-all duration-300 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${dark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
              <Calendar size={24} />
            </div>
            <span className="text-sm font-medium text-green-500">+12% vs last month</span>
          </div>
          <h4 className="text-3xl font-black mb-1">1,240</h4>
          <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Total Appointments</p>
        </div>

        <div className={`p-6 rounded-3xl transition-all duration-300 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${dark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'}`}>
              <ShoppingCart size={24} />
            </div>
            <span className="text-sm font-medium text-green-500">+8% vs last month</span>
          </div>
          <h4 className="text-3xl font-black mb-1">$12,450</h4>
          <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Medicine Revenue</p>
        </div>

        <div className={`p-6 rounded-3xl transition-all duration-300 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-2xl ${dark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
              <Users size={24} />
            </div>
            <span className="text-sm font-medium text-green-500">+15% vs last year</span>
          </div>
          <h4 className="text-3xl font-black mb-1">3,450</h4>
          <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Total Patients</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className={`p-6 rounded-3xl ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold">Appointments Over Time</h5>
            <TrendingUp size={20} className="text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="name" stroke={dark ? "#9ca3af" : "#4b5563"} />
                <YAxis stroke={dark ? "#9ca3af" : "#4b5563"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: dark ? "#111827" : "#fff", 
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    borderRadius: "12px",
                    color: dark ? "#fff" : "#000"
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className={`p-6 rounded-3xl ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold">Patient Growth</h5>
            <Users size={20} className="text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patientGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="name" stroke={dark ? "#9ca3af" : "#4b5563"} />
                <YAxis stroke={dark ? "#9ca3af" : "#4b5563"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: dark ? "#111827" : "#fff", 
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    borderRadius: "12px",
                    color: dark ? "#fff" : "#000"
                  }} 
                />
                <Legend />
                <Bar dataKey="patients" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className={`p-6 rounded-3xl lg:col-span-2 ${dark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-6">
            <h5 className="text-lg font-bold">Medicine Sales Distribution</h5>
            <Activity size={20} className="text-gray-400" />
          </div>
          <div className="h-80 flex justify-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={medicineSalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {medicineSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: dark ? "#111827" : "#fff", 
                    borderColor: dark ? "#374151" : "#e5e7eb",
                    borderRadius: "12px",
                    color: dark ? "#fff" : "#000"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
