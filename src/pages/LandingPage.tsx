import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, Calendar, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../components/ThemeProvider';

const features = [
  {
    title: 'Smart Navigation',
    description: 'Find your way across campus with real-time route highlighting and department details.',
    icon: MapPin,
    color: 'bg-blue-500',
    lightGlow: 'shadow-blue-200/50',
    darkGlow: 'dark:shadow-blue-900/40',
    path: '/map'
  },
  {
    title: 'AI Chatbot',
    description: 'Get instant answers to your campus queries from our intelligent virtual assistant.',
    icon: MessageSquare,
    color: 'bg-indigo-500',
    lightGlow: 'shadow-indigo-200/50',
    darkGlow: 'dark:shadow-indigo-900/40',
    path: '/chat'
  },
  {
    title: 'Events Dashboard',
    description: 'Stay updated with all academic, cultural, and placement events happening on campus.',
    icon: Calendar,
    color: 'bg-emerald-500',
    lightGlow: 'shadow-emerald-200/50',
    darkGlow: 'dark:shadow-emerald-900/40',
    path: '/events'
  },
  {
    title: 'Emergency Support',
    description: 'Quick access to security, medical, and safety helplines with a single tap.',
    icon: ShieldAlert,
    color: 'bg-rose-500',
    lightGlow: 'shadow-rose-200/50',
    darkGlow: 'dark:shadow-rose-900/40',
    path: '/emergency'
  }
];

export default function LandingPage() {
  const { theme } = useTheme();

  return (
    <div className="pt-16 min-h-screen transition-colors duration-500 w-full">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background Gradients */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)] blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center space-x-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700/50 mb-8 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Welcome to Generation Next</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight"
            >
              Smart Campus{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  360
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200/50 dark:bg-blue-600/30 -z-10 rounded-full blur-sm" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 flex-wrap mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Scan. Navigate. Explore. The future of smart campus living is here. Seamlessly integrated for your convenience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/map"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-semibold text-lg transition-all hover:scale-105 flex items-center justify-center group shadow-xl shadow-blue-500/20 dark:shadow-blue-900/40"
              >
                Explore Campus
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/chat"
                className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-full font-semibold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm hover:shadow-md dark:shadow-slate-900/50 flex items-center justify-center"
              >
                Ask Assistant
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative z-10 border-t border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
            >
              Smart Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Smart Students</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg"
            >
              Everything you need to navigate campus life efficiently, elegantly designed and all in one place.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "p-8 rounded-3xl border border-slate-200/60 dark:border-slate-700/50 transition-all duration-300 group",
                  "bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl",
                  "hover:bg-white dark:hover:bg-slate-800/80",
                  "hover:shadow-2xl hover:-translate-y-1",
                  feature.lightGlow, feature.darkGlow
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg",
                  feature.color
                )}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <Link
                  to={feature.path}
                  className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group/link relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Learn more
                    <ArrowRight className="ml-1.5 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 dark:bg-blue-400 transition-all group-hover/link:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

