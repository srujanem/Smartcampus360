import { Department, CampusEvent } from './types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    hod: 'Dr. Alan Turing',
    courses: ['B.Tech CSE', 'M.Tech AI', 'Ph.D. Computing'],
    facilities: ['AI Lab', 'Cloud Computing Center', 'Cyber Security Hub'],
    timings: '9:00 AM - 5:00 PM',
    coordinates: { x: 25, y: 30 },
    status: 'open',
    occupancy: 65
  },
  {
    id: 'ece',
    name: 'Electronics & Communication',
    hod: 'Dr. Nikola Tesla',
    courses: ['B.Tech ECE', 'M.Tech VLSI', 'Embedded Systems'],
    facilities: ['Robotics Lab', 'Antenna Lab', 'Microprocessor Lab'],
    timings: '9:00 AM - 5:00 PM',
    coordinates: { x: 65, y: 35 },
    status: 'open',
    occupancy: 40
  },
  {
    id: 'library',
    name: 'Central Library',
    hod: 'Mrs. Sarah Bookman',
    courses: ['Digital Literacy', 'Research Methodology'],
    facilities: ['Digital Archive', 'Quiet Study Zone', 'Cafeteria'],
    timings: '8:00 AM - 10:00 PM',
    coordinates: { x: 45, y: 55 },
    status: 'open',
    occupancy: 95
  },
  {
    id: 'auditorium',
    name: 'Main Auditorium',
    hod: 'Prof. Stage Master',
    courses: [],
    facilities: ['1000+ Seating', 'Dolby Atmos', 'Green Rooms'],
    timings: 'Event Based',
    coordinates: { x: 80, y: 70 },
    status: 'closed',
    occupancy: 0
  },
  {
    id: 'admin',
    name: 'Admin Office',
    hod: 'Mr. Registrar',
    courses: [],
    facilities: ['Student Records', 'Finance Desk', 'Scholarship Cell'],
    timings: '10:00 AM - 4:00 PM',
    coordinates: { x: 20, y: 75 },
    status: 'closed',
    occupancy: 15
  }
];

export const EVENTS: CampusEvent[] = [
  {
    id: '1',
    name: 'TechXplore 2026',
    date: 'March 15, 2026',
    venue: 'Auditorium',
    description: 'Annual technical symposium featuring paper presentations and coding hackathons.',
    category: 'academic'
  },
  {
    id: '2',
    name: 'Cultural Fest: Rhythm',
    date: 'April 2, 2026',
    venue: 'Open Air Theater',
    description: 'A celebration of music, dance, and art from across the country.',
    category: 'cultural'
  },
  {
    id: '3',
    name: 'Placement Drive: Google',
    date: 'March 20, 2026',
    venue: 'Placement Cell',
    description: 'Recruitment drive for final year students for Software Engineering roles.',
    category: 'placement'
  }
];

export const CHAT_RESPONSES: Record<string, string> = {
  'where is cse block?': 'The CSE Block is located in the North-West quadrant of the campus, near the Admin Office. You can find it marked on the Map page.',
  'what are today\'s events?': 'Today we have "TechXplore 2026" registration starting at 10 AM in the Auditorium.',
  'where is placement cell?': 'The Placement Cell is located inside the Admin Office building on the ground floor.',
  'default': 'I am your CampusVerse Assistant. You can ask me about department locations, events, or general campus info!'
};
