import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, Calendar, ShieldAlert, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  {
    title: 'Smart Navigation',
    description: 'Find your way across campus with real-time route highlighting and department details.',
    icon: MapPin,
    color: 'bg-blue-500',
    path: '/map'
  },
  {
    title: 'AI Chatbot',
    description: 'Get instant answers to your campus queries from our intelligent virtual assistant.',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    path: '/chat'
  },
  {
    title: 'Events Dashboard',
    description: 'Stay updated with all academic, cultural, and placement events happening on campus.',
    icon: Calendar,
    color: 'bg-emerald-500',
    path: '/events'
  },
  {
    title: 'Emergency Support',
    description: 'Quick access to security, medical, and safety helplines with a single tap.',
    icon: ShieldAlert,
    color: 'bg-rose-500',
    path: '/emergency'
  }
];

export default function LandingPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.1),transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight">
              Smart Campus <span className="text-blue-600">360</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-light">
              Scan. Navigate. Explore. The future of smart campus living is here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/map"
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all hover:scale-105 flex items-center group shadow-lg shadow-blue-200"
              >
                Explore Campus
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/chat"
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:bg-slate-50 transition-all"
              >
                Ask Assistant
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Smart Solutions for Smart Students</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Everything you need to navigate campus life efficiently, all in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform group-hover:scale-110", feature.color)}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{feature.description}</p>
                <Link
                  to={feature.path}
                  className="text-blue-600 font-semibold text-sm flex items-center group/link"
                >
                  Learn more
                  <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
