// Centralized offline/standalone database for MITS ACM Student Chapter
const STORAGE_KEYS = {
  EVENTS: 'acm_storage_events',
  REGISTRATIONS: 'acm_storage_registrations',
  MESSAGES: 'acm_storage_messages',
  SETTINGS: 'acm_storage_settings'
};

export const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Pixel Prompt',
    category: 'Design & AI Challenge',
    short_description: 'Flagship prompt-engineering and generative AI visual design contest testing creativity, precision, and futuristic UI synthesis.',
    full_description: 'Pixel Prompt is the premier generative AI and digital design competition organized by MITS ACM STUDENT CHAPTER. Participants are tasked with crafting high-precision prompts, generating photorealistic concepts, and designing cohesive digital user experiences using modern generative AI tools and visual synthesis frameworks.\n\nDemonstrate your ability to steer foundational image models, maintain brand identity, and solve real-world interface prototyping challenges.',
    poster_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    event_date: 'March 14, 2026 at 10:00 AM',
    venue: 'CSE Department Labs & Online Platform',
    registration_deadline: 'March 12, 2026',
    registration_type: 'internal',
    status: 'Upcoming',
    team_size: '1-2 Members',
    schedule_agenda: '10:00 AM - Opening & Prompt Problem Statement Release\n11:30 AM - Round 1: AI Visual Generation & Aesthetic Consistency\n02:00 PM - Round 2: Final UI/UX Synthesis & Interactive Pitching\n04:30 PM - Jury Evaluation & Awards Ceremony',
    eligibility_rules: 'Open to all college students. Personal laptops permitted. Generative tools allowed under specified prompt evaluation guidelines.',
    faqs: 'Q: Do I need prior design experience?\nA: Basic understanding of generative prompts and design aesthetics is sufficient!\nQ: Can we participate individually?\nA: Yes, individual or 2-member teams are permitted.'
  },
  {
    id: 2,
    title: 'TechPulse',
    category: 'Hackathon & Tech Sprint',
    short_description: 'High-intensity national-level coding sprint and software development hackathon solving smart infrastructure and Web3/Cloud challenges.',
    full_description: 'TechPulse is the flagship technical hackathon of MITS ACM STUDENT CHAPTER. Bringing together developers, algorithmic problem-solvers, and innovators for an intensive building marathon.\n\nTracks include Smart Campus Solutions, Decentralized Apps, Full-Stack SaaS, and Sustainable Computing. Build functional prototypes, receive real-time mentor feedback from top industry engineers, and compete for exciting prize pools and certificates.',
    poster_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
    event_date: 'April 4-5, 2026',
    venue: 'MITS Central Auditorium & SAC Hack Arena',
    registration_deadline: 'April 1, 2026',
    registration_type: 'internal',
    status: 'Upcoming',
    team_size: '2-4 Members',
    schedule_agenda: 'Day 1 (10:00 AM): Inauguration & Hackathon Kickoff\nDay 1 (08:00 PM): Mentorship Checkpoint 1\nDay 2 (09:00 AM): Code Freeze & Evaluation Pitch\nDay 2 (03:00 PM): Winner Announcements & Felicitation',
    eligibility_rules: 'Undergraduate & graduate students across all engineering branches. All code must be written during the hackathon sprint.',
    faqs: 'Q: Is there any registration fee?\nA: No, participation is completely free under MITS ACM.\nQ: Will certificates be provided?\nA: Yes, all verified participants will receive official ACM student chapter certificates.'
  }
];

export const INITIAL_SETTINGS = {
  site_name: 'MITS ACM STUDENT CHAPTER',
  institution_name: 'Madhav Institute of Technology & Science, Gwalior',
  tagline: 'Code. Create. Connect.',
  hero_supporting_text: 'Empowering the next generation of computing professionals at MITS Gwalior.',
  about_summary: 'MITS ACM STUDENT CHAPTER is a premier computing community affiliated with the Association for Computing Machinery. We foster innovation, technical excellence, and peer collaboration among engineering students at MITS Gwalior.',
  contact_email: 'acm@mitsgwalior.in',
  stat_members: '250+',
  stat_events: '30+',
  stat_workshops: '18+',
  stat_projects: '45+'
};

export const INITIAL_RESOURCES = [
  {
    id: 1,
    title: 'Comprehensive DSA & Competitive Programming Roadmap',
    category: 'DSA and Competitive Programming',
    difficulty: 'Beginner',
    description: 'Structured step-by-step roadmap covering Arrays, Trees, Dynamic Programming, and Graph algorithms with curated problem sets.',
    resource_url: 'https://github.com/mits-acm',
    tags: ['DSA', 'Algorithms', 'C++', 'Python']
  },
  {
    id: 2,
    title: 'Modern Full-Stack Development Architecture',
    category: 'Web Development',
    difficulty: 'Intermediate',
    description: 'Curated handbook on building reactive web applications using modern React, component architecture, and cloud services.',
    resource_url: 'https://developer.mozilla.org',
    tags: ['React', 'JavaScript', 'Frontend', 'Cloud']
  },
  {
    id: 3,
    title: 'Applied Machine Learning & Neural Networks',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Advanced',
    description: 'Hands-on practical guides to neural networks, computer vision, and building intelligent models.',
    resource_url: 'https://pytorch.org/tutorials/',
    tags: ['AI', 'PyTorch', 'ML', 'Python']
  }
];

export const INITIAL_ACHIEVEMENTS = [
  {
    id: 1,
    title: '1st Runner Up - Smart India Hackathon Regional Round',
    description: 'Student team representing MITS ACM Chapter developed an AI-assisted smart traffic management system using edge computer vision.',
    achievement_date: 'December 2025',
    participant_names: 'Team NeuroGrid (MITS Gwalior)',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    badge_label: '1st Runner Up',
    external_link: 'https://sih.gov.in'
  },
  {
    id: 2,
    title: 'Top 10 Finalist in ACM India Student Chapter Hackathon',
    description: 'Demonstrated an accessible offline-first learning platform for rural education across India.',
    achievement_date: 'October 2025',
    participant_names: 'Student Project Group',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    badge_label: 'National Finalist'
  }
];

export const INITIAL_GALLERY = [
  {
    album: {
      id: 1,
      title: 'Annual Flagship Hackathon',
      category: 'Hackathons',
      description: 'Highlights and team project demonstrations during our 36-hour hackathon.'
    },
    images: [
      {
        id: 1,
        image_url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
        caption: 'Participants collaborating during overnight coding sprint',
        date_taken: '2025'
      },
      {
        id: 2,
        image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        caption: 'Team project demonstration to faculty judges',
        date_taken: '2025'
      }
    ]
  },
  {
    album: {
      id: 2,
      title: 'Hands-on AI & Cloud Computing Workshop',
      category: 'Workshops',
      description: 'Students building full-stack AI applications in the computer science lab.'
    },
    images: [
      {
        id: 3,
        image_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
        caption: 'Live coding and architecture walkthrough',
        date_taken: '2025'
      }
    ]
  }
];
