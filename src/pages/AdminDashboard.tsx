import { motion } from 'motion/react';
import { Users, Search, Calendar, AlertCircle, TrendingUp, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', visitors: 400, searches: 240 },
  { name: 'Tue', visitors: 300, searches: 139 },
  { name: 'Wed', visitors: 200, searches: 980 },
  { name: 'Thu', visitors: 278, searches: 390 },
  { name: 'Fri', visitors: 189, searches: 480 },
  { name: 'Sat', visitors: 239, searches: 380 },
  { name: 'Sun', visitors: 349, searches: 430 },
];

const stats = [
  { title: 'Total Visitors', value: '12,458', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'Top Search', value: 'CSE Block', change: 'Trending', icon: Search, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'Active Events', value: '03', change: 'Today', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Alerts', value: '0', change: 'Stable', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
];

export default function AdminDashboard() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Command Center</h1>
          <p className="text-slate-500">Real-time campus analytics and management overview.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
            Manage Users
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center text-emerald-500 text-xs font-bold">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Visitor Traffic</h3>
            <select className="text-xs font-bold text-slate-400 bg-transparent border-none focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900">Search Trends</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full" />
              <span className="text-xs font-bold text-slate-400">Searches</span>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="searches" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-8 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
        <div className="space-y-6">
          {[
            { user: 'Student #4521', action: 'Searched for Auditorium', time: '2 mins ago' },
            { user: 'Admin', action: 'Updated TechXplore Event', time: '15 mins ago' },
            { user: 'Security', action: 'System Check Complete', time: '1 hour ago' },
            { user: 'Student #9821', action: 'Accessed Emergency Contacts', time: '3 hours ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs">
                  {item.user[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.user}</p>
                  <p className="text-xs text-slate-500">{item.action}</p>
                </div>
              </div>
              <div className="flex items-center text-slate-400 text-xs">
                {item.time}
                <ArrowUpRight className="w-3 h-3 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
