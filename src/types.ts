export interface Department {
  id: string;
  name: string;
  hod: string;
  courses: string[];
  facilities: string[];
  timings: string;
  coordinates: { x: number; y: number };
  status: 'open' | 'closed';
  occupancy: number;
}

export interface CampusEvent {
  id: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  category: 'academic' | 'cultural' | 'sports' | 'placement';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}
