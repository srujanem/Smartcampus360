import { motion } from 'motion/react';
import { Calendar, MapPin, Clock, Tag, ArrowRight } from 'lucide-react';
import { EVENTS } from '../constants';

export default function EventsPage() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Upcoming Campus Events</h1>
        <p className="text-slate-500 max-w-2xl mx-auto">Stay connected with the latest happenings, workshops, and festivals across all campus blocks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={`https://picsum.photos/seed/${event.id}/600/400`}
                alt={event.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {event.name}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-slate-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  {event.date}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  {event.venue}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  10:00 AM onwards
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-2">
                {event.description}
              </p>

              <button className="w-full py-4 bg-slate-50 text-slate-900 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center group/btn">
                Register Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar View Placeholder */}
      <div className="mt-16 p-12 bg-blue-600 rounded-[3rem] text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Never miss an update</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Sync the campus calendar with your personal device to get real-time notifications about event changes and new announcements.</p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all">
            Sync Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
