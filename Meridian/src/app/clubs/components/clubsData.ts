export interface TeamMember {
  name: string;
  role: string;
  year: string;
}

export interface Initiative {
  title: string;
  date: string;
  type: 'Workshop' | 'Competition' | 'Talk' | 'Hackathon' | 'Drive' | 'Fest';
}

export interface Club {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
  tagline: string;
  description: string;
  vision: string;
  members: number;
  founded: string;
  meetingDay: string;
  team: TeamMember[];
  initiatives: Initiative[];
}

export const clubs: Club[] = [
  {
    id: 'codecraft',
    name: 'CodeCraft Society',
    category: 'Technical',
    icon: 'CommandLineIcon',
    color: 'amber',
    tagline: 'Build. Break. Ship.',
    description:
      'CodeCraft Society is the campus\u2019s premier competitive programming and software development club, running weekly problem-solving sessions, open-source sprints, and peer code reviews for students across all years.',
    vision:
      'To cultivate a culture of rigorous engineering and open-source contribution so every member graduates with a portfolio, not just a certificate.',
    members: 186,
    founded: '2019',
    meetingDay: 'Every Wednesday, 5:30 PM · Lab-3',
    team: [
      { name: 'Aravind Kumar', role: 'President', year: 'Final Year' },
      { name: 'Sneha Reddy', role: 'Vice President', year: 'Third Year' },
      { name: 'Rohit Malhotra', role: 'Competitive Programming Lead', year: 'Third Year' },
      { name: 'Divya Iyer', role: 'Open Source Lead', year: 'Second Year' },
    ],
    initiatives: [
      { title: 'CodeStorm \u201926 — 24hr Hackathon', date: 'Sep 12–13, 2026', type: 'Hackathon' },
      { title: 'DSA Bootcamp for Freshers', date: 'Aug 22, 2026', type: 'Workshop' },
      { title: 'Hacktoberfest Contribution Sprint', date: 'Oct 1–31, 2026', type: 'Drive' },
      { title: 'Weekly Codeforces Div-3 Watch Party', date: 'Every Friday', type: 'Competition' },
    ],
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship Cell',
    category: 'Business',
    icon: 'RocketLaunchIcon',
    color: 'blue',
    tagline: 'Turning ideas into ventures.',
    description:
      'E-Cell mentors student founders through ideation, prototyping, and fundraising — connecting them with alumni investors, running pitch bootcamps, and hosting the college\u2019s flagship startup summit.',
    vision:
      'To make Meridian a launchpad where at least one in ten students has attempted building something of their own before graduating.',
    members: 142,
    founded: '2018',
    meetingDay: 'Every Monday, 6:00 PM · Innovation Hub',
    team: [
      { name: 'Priyanka Das', role: 'Chairperson', year: 'Final Year' },
      { name: 'Kabir Singh', role: 'Operations Head', year: 'Final Year' },
      { name: 'Meera Nair', role: 'Partnerships Lead', year: 'Third Year' },
      { name: 'Yash Agarwal', role: 'Design & Media Lead', year: 'Second Year' },
    ],
    initiatives: [
      { title: 'Summit \u201926 — Startup Pitch Fest', date: 'Nov 5, 2026', type: 'Fest' },
      { title: 'Founder Fireside Chat: Series A Journeys', date: 'Aug 28, 2026', type: 'Talk' },
      { title: 'Idea-to-MVP Bootcamp', date: 'Sep 18–19, 2026', type: 'Workshop' },
      { title: 'Campus Business Plan Competition', date: 'Oct 10, 2026', type: 'Competition' },
    ],
  },
  {
    id: 'robotics',
    name: 'Robotics & Automation Club',
    category: 'Technical',
    icon: 'CpuChipIcon',
    color: 'purple',
    tagline: 'Where circuits meet ambition.',
    description:
      'A hands-on club for building autonomous bots, IoT systems, and competing in national robotics championships, backed by a dedicated workshop with 3D printers and a component library.',
    vision:
      'To represent Meridian at national-level robotics competitions every year and make hardware prototyping accessible to every branch, not just ECE/EEE.',
    members: 97,
    founded: '2020',
    meetingDay: 'Every Tuesday & Saturday, 4:00 PM · Robotics Lab',
    team: [
      { name: 'Vikram Chowdary', role: 'Club Head', year: 'Third Year' },
      { name: 'Ananya Bose', role: 'Technical Lead', year: 'Third Year' },
      { name: 'Farhan Ali', role: 'Hardware Lead', year: 'Second Year' },
    ],
    initiatives: [
      { title: 'Line-Follower Bot Challenge', date: 'Sep 6, 2026', type: 'Competition' },
      { title: 'Intro to ROS2 Workshop', date: 'Aug 30, 2026', type: 'Workshop' },
      { title: 'National Robotics Championship — Team Selection', date: 'Sep 25, 2026', type: 'Competition' },
    ],
  },
  {
    id: 'literary',
    name: 'Literary & Debate Society',
    category: 'Cultural',
    icon: 'BookOpenIcon',
    color: 'rose',
    tagline: 'Words that move rooms.',
    description:
      'Hosts weekly open-mic sessions, parliamentary debates, quiz nights, and the annual inter-college literary fest, giving students a platform to sharpen public speaking and creative writing.',
    vision:
      'To make articulate, confident communication a signature trait of every Meridian graduate, in any language they choose to express themselves.',
    members: 118,
    founded: '2017',
    meetingDay: 'Every Thursday, 5:00 PM · Seminar Hall',
    team: [
      { name: 'Ishita Verma', role: 'President', year: 'Final Year' },
      { name: 'Rahul Nambiar', role: 'Debate Captain', year: 'Third Year' },
      { name: 'Sana Sheikh', role: 'Editorial Lead', year: 'Second Year' },
    ],
    initiatives: [
      { title: 'Verbatim \u201926 — Inter-College Lit Fest', date: 'Oct 17–18, 2026', type: 'Fest' },
      { title: 'Parliamentary Debate Championship', date: 'Sep 14, 2026', type: 'Competition' },
      { title: 'Poetry Open Mic Night', date: 'Every last Friday', type: 'Talk' },
    ],
  },
  {
    id: 'photography',
    name: 'Lens & Light Photography Club',
    category: 'Creative',
    icon: 'CameraIcon',
    color: 'teal',
    tagline: 'Framing campus, one shot at a time.',
    description:
      'Covers every major campus event, runs photo-walks around the city, and conducts beginner-to-advanced workshops on DSLR handling, editing, and mobile photography.',
    vision:
      'To build the college\u2019s largest visual archive and mentor students into freelance-ready photographers and editors.',
    members: 76,
    founded: '2021',
    meetingDay: 'Every alternate Sunday, 7:00 AM · Main Gate',
    team: [
      { name: 'Nikhil Menon', role: 'Club Head', year: 'Third Year' },
      { name: 'Tanvi Kulkarni', role: 'Editing Lead', year: 'Second Year' },
    ],
    initiatives: [
      { title: 'City Heritage Photo Walk', date: 'Aug 23, 2026', type: 'Drive' },
      { title: 'Lightroom & Editing Workshop', date: 'Sep 7, 2026', type: 'Workshop' },
      { title: 'Annual Day Official Photography Coverage', date: 'Nov 20, 2026', type: 'Drive' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports Council',
    category: 'Sports',
    icon: 'TrophyIcon',
    color: 'emerald',
    tagline: 'Play hard, represent harder.',
    description:
      'Organizes intramural leagues across cricket, football, badminton, and athletics, and selects and trains teams representing Meridian at zonal and state-level university tournaments.',
    vision:
      'To field competitive teams in every major sport and raise campus-wide participation in fitness and athletics year over year.',
    members: 210,
    founded: '2015',
    meetingDay: 'Every day, 6:00 AM · Sports Complex',
    team: [
      { name: 'Arjun Reddy', role: 'Sports Secretary', year: 'Final Year' },
      { name: 'Kavya Pillai', role: 'Women\u2019s Sports Lead', year: 'Third Year' },
      { name: 'Sameer Khan', role: 'Cricket Captain', year: 'Third Year' },
    ],
    initiatives: [
      { title: 'Meridian Premier League — Cricket', date: 'Sep 1–15, 2026', type: 'Competition' },
      { title: 'Zonal Athletics Trials', date: 'Aug 29, 2026', type: 'Competition' },
      { title: 'Inter-Department Badminton Cup', date: 'Sep 20, 2026', type: 'Competition' },
    ],
  },
];

export const initiativeTypeColor: Record<Initiative['type'], string> = {
  Workshop: 'blue',
  Competition: 'amber',
  Talk: 'purple',
  Hackathon: 'rose',
  Drive: 'emerald',
  Fest: 'teal',
};
