import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, X, Info, Navigation, ToggleLeft, ToggleRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { Department } from '../types';
import { cn } from '../lib/utils';

export default function MapPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState<Department | null>(null);
  const [isNavigating, setIsNavigating] = React.useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = React.useState(false);

  const MAIN_GATE = { x: 50, y: 95, name: 'Main Gate' };

  const filteredDepts = DEPARTMENTS.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAvailability = showAvailableOnly ? dept.status === 'open' : true;
    return matchesSearch && matchesAvailability;
  });

  const handleDeptClick = (dept: Department) => {
    setSelectedDept(dept);
    setIsNavigating(true);
    // Simulate route highlighting
    setTimeout(() => setIsNavigating(false), 2000);
  };

  return (
    <div className="pt-20 pb-10 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Search */}
        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Find Department</h2>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search CSE, Library..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Availability Filter Toggle */}
            <div
              className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Available Only</span>
              </div>
              {showAvailableOnly ? (
                <ToggleRight className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-400 dark:text-slate-600" />
              )}
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
            <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Quick Access</h3>
            <div className="space-y-2">
              {filteredDepts.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => handleDeptClick(dept)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group",
                    selectedDept?.id === dept.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      dept.status === 'open' ? "bg-emerald-500" : "bg-rose-500"
                    )} />
                    <span>{dept.name}</span>
                  </div>
                  <Navigation className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity", selectedDept?.id === dept.id && "opacity-100")} />
                </button>
              ))}
              {filteredDepts.length === 0 && (
                <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm">
                  No departments found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden min-h-[600px] transition-colors duration-300">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-blue-50/50 dark:bg-slate-900/50">
            <img
              src="https://picsum.photos/seed/campus-map/1200/800?blur=2"
              alt="Campus Map"
              className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              referrerPolicy="no-referrer"
            />
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-50 dark:opacity-20" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          {/* Route Simulation */}
          <AnimatePresence>
            {isNavigating && selectedDept && (
              <motion.svg
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              >
                <motion.path
                  d={`M ${MAIN_GATE.x}%,${MAIN_GATE.y}% L ${selectedDept.coordinates.x}%,${selectedDept.coordinates.y}%`}
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeDasharray="10,10"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.circle
                  initial={{ offset: 0 }}
                  animate={{ offset: 1 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  r="6"
                  fill="#3b82f6"
                >
                  <animateMotion
                    path={`M ${MAIN_GATE.x}%,${MAIN_GATE.y}% L ${selectedDept.coordinates.x}%,${selectedDept.coordinates.y}%`}
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </motion.circle>
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Main Gate Marker */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
            style={{ left: `${MAIN_GATE.x}%`, top: `${MAIN_GATE.y}%` }}
          >
            <div className="w-4 h-4 bg-slate-800 dark:bg-slate-200 rounded-full border-2 border-white dark:border-slate-900 shadow-md animate-bounce" />
            <div className="mt-1 px-2 py-0.5 bg-slate-800 dark:bg-slate-200 text-[10px] font-bold text-white dark:text-slate-900 rounded shadow-sm whitespace-nowrap">
              MAIN GATE
            </div>
          </div>

          {/* Markers */}
          {filteredDepts.map(dept => (
            <motion.button
              key={dept.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleDeptClick(dept)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${dept.coordinates.x}%`, top: `${dept.coordinates.y}%` }}
            >
              {/* Pulse Animation Based on Status */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className={cn(
                  "absolute inset-0 rounded-full",
                  dept.status === 'open' ? "bg-emerald-400" : "bg-rose-400"
                )}
              />

              <div className={cn(
                "relative p-2 rounded-full shadow-lg transition-all",
                selectedDept?.id === dept.id
                  ? "bg-blue-600 text-white scale-125 shadow-blue-500/50"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700"
              )}>
                <MapPin className={cn(
                  "w-6 h-6",
                  selectedDept?.id !== dept.id && (dept.status === 'open' ? "text-emerald-500" : "text-rose-500 text-opacity-70")
                )} />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-md text-[10px] font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                {dept.name}
              </div>
            </motion.button>
          ))}

          {/* Legend / Info */}
          <div className="absolute bottom-6 left-6 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-800/50 shadow-lg max-w-xs transition-colors duration-300">
            <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-2">
              <Info className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Campus Guide</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Click on markers to view details. <span className="text-emerald-500 font-semibold">Green</span> pins denote open facilities, while <span className="text-rose-500 font-semibold">Red</span> denotes closed ones.
            </p>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedDept && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDept(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800 transition-colors duration-300"
            >
              <div className="relative h-36 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-8 flex items-end justify-between overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10 w-full pr-8">
                  <div className="flex items-center gap-2 mb-2">
                    {selectedDept.status === 'open' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-900/30 px-2 py-0.5 rounded-full border border-emerald-400/20">
                        <CheckCircle2 className="w-3 h-3" /> OPEN NOW
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-300 bg-rose-900/30 px-2 py-0.5 rounded-full border border-rose-400/20">
                        <AlertCircle className="w-3 h-3" /> CLOSED
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{selectedDept.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-20 backdrop-blur-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Real-Time Occupancy Section - Only for Auditorium */}
                {selectedDept.id === 'auditorium' && (
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-end mb-3">
                      <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Occupancy</h4>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedDept.occupancy}% Full
                      </span>
                    </div>
                    {/* Progress Bar Container */}
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedDept.occupancy}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className={cn(
                          "h-full rounded-full",
                          selectedDept.occupancy > 85 ? "bg-rose-500"
                            : selectedDept.occupancy > 50 ? "bg-amber-500"
                              : "bg-emerald-500"
                        )}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      {selectedDept.status === 'closed' ? "Facility currently closed."
                        : selectedDept.occupancy > 85 ? "Very busy. Expect limited seating/availability."
                          : selectedDept.occupancy > 50 ? "Moderate traffic. Normal operations."
                            : "Low traffic. Plenty of availability!"}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">HOD</h4>
                    <p className="text-slate-900 dark:text-white font-medium">{selectedDept.hod}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Timings</h4>
                    <p className="text-slate-900 dark:text-white font-medium">{selectedDept.timings}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Courses Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDept.courses.map(course => (
                      <span key={course} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 text-xs font-semibold rounded-full">
                        {course}
                      </span>
                    ))}
                    {selectedDept.courses.length === 0 && <span className="text-slate-400 text-xs italic">No academic courses listed</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Facilities</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedDept.facilities.map(facility => (
                      <li key={facility} className="flex items-center text-sm text-slate-700 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 shadow-sm shadow-blue-500/50" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedDept(null)}
                  className="w-full py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-lg"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
