import { motion } from 'motion/react';
import { ShieldAlert, Phone, HeartPulse, UserCheck, AlertTriangle } from 'lucide-react';

const contacts = [
  {
    title: 'Campus Security',
    number: '+91 12345 67890',
    icon: Phone,
    color: 'bg-blue-500'
  },
  {
    title: 'Medical Emergency',
    number: '+91 98765 43210',
    icon: HeartPulse,
    color: 'bg-emerald-500'
  },
  {
    title: 'Women Safety Helpline',
    number: '1091',
    icon: UserCheck,
    color: 'bg-indigo-500'
  }
];

export default function EmergencyPage() {
  const handlePanic = () => {
    alert("EMERGENCY ALERT SENT! Your location has been shared with campus security. Help is on the way.");
  };

  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Emergency Support</h1>
        <p className="text-slate-500">Your safety is our top priority. Use the panic button for immediate assistance or contact the helplines below.</p>
      </div>

      {/* Panic Button */}
      <div className="mb-16">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePanic}
          className="w-full aspect-square md:aspect-auto md:h-64 bg-rose-600 rounded-[3rem] shadow-2xl shadow-rose-200 flex flex-col items-center justify-center text-white group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />
          <AlertTriangle className="w-16 h-16 mb-4 animate-bounce" />
          <span className="text-3xl font-black uppercase tracking-widest">Panic Button</span>
          <span className="mt-2 text-rose-100 text-sm font-medium">Tap for immediate help</span>
        </motion.button>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all text-center"
          >
            <div className={`w-12 h-12 ${contact.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <contact.icon className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">{contact.title}</h3>
            <p className="text-xl font-bold text-slate-900">{contact.number}</p>
            <button className="mt-6 w-full py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-colors">
              Call Now
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-50 rounded-[2rem] border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
          Safety Tips
        </h4>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0" />
            Always keep your ID card with you for security verification.
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0" />
            Avoid isolated areas of the campus during late hours.
          </li>
          <li className="flex items-start">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 mr-3 flex-shrink-0" />
            Report any suspicious activity to the nearest security post immediately.
          </li>
        </ul>
      </div>
    </div>
  );
}
