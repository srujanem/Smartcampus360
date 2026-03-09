import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, X, Info, Navigation } from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { Department } from '../types';
import { cn } from '../lib/utils';

export default function MapPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState<Department | null>(null);
  const [isNavigating, setIsNavigating] = React.useState(false);

  const MAIN_GATE = { x: 50, y: 95, name: 'Main Gate' };

  const filteredDepts = DEPARTMENTS.filter(dept =>
    dept.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Find Department</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search CSE, Library..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Access</h3>
            <div className="space-y-2">
              {filteredDepts.map(dept => (
                <button
                  key={dept.id}
                  onClick={() => handleDeptClick(dept)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between group",
                    selectedDept?.id === dept.id ? "bg-blue-600 text-white" : "hover:bg-slate-50 text-slate-700"
                  )}
                >
                  <span>{dept.name}</span>
                  <Navigation className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity", selectedDept?.id === dept.id && "opacity-100")} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-slate-100 rounded-[2.5rem] border-4 border-white shadow-2xl overflow-hidden min-h-[600px]">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-blue-50/50">
            <img
              src="https://picsum.photos/seed/campus-map/1200/800?blur=2"
              alt="Campus Map"
              className="w-full h-full object-cover opacity-30"
              referrerPolicy="no-referrer"
            />
            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
            <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-md animate-pulse" />
            <div className="mt-1 px-2 py-0.5 bg-emerald-500 text-[8px] font-bold text-white rounded shadow-sm whitespace-nowrap">
              MAIN GATE
            </div>
          </div>

          {/* Markers */}
          {DEPARTMENTS.map(dept => (
            <motion.button
              key={dept.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              onClick={() => handleDeptClick(dept)}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${dept.coordinates.x}%`, top: `${dept.coordinates.y}%` }}
            >
              {/* Pulse Animation */}
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
                  selectedDept?.id === dept.id ? "bg-blue-400" : "bg-blue-200"
                )}
              />

              <div className={cn(
                "relative p-2 rounded-full shadow-lg transition-all",
                selectedDept?.id === dept.id ? "bg-blue-600 text-white scale-125" : "bg-white text-blue-600"
              )}>
                <MapPin className="w-6 h-6" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-bold text-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                {dept.name}
              </div>
            </motion.button>
          ))}

          {/* Legend / Info */}
          <div className="absolute bottom-6 left-6 z-30 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg max-w-xs">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Info className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Campus Guide</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Click on markers to view department details. The blue dashed line represents the suggested route from Main Gate.
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
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 flex items-end justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedDept.name}</h2>
                <button
                  onClick={() => setSelectedDept(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">HOD</h4>
                    <p className="text-slate-900 font-medium">{selectedDept.hod}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-1">Timings</h4>
                    <p className="text-slate-900 font-medium">{selectedDept.timings}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Courses Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDept.courses.map(course => (
                      <span key={course} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full">
                        {course}
                      </span>
                    ))}
                    {selectedDept.courses.length === 0 && <span className="text-slate-400 text-xs italic">No academic courses listed</span>}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Facilities</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedDept.facilities.map(facility => (
                      <li key={facility} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {facility}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedDept(null)}
                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
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
