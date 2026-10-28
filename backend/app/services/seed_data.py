import json
from app.models import db, TeamCategory, TeamMember, Event, LearningResource, Achievement, GalleryAlbum, GalleryImage, Announcement, SiteSetting, AdminProfile

def seed_database():
    # 1. Admin account
    if not AdminProfile.query.filter_by(username='admin').first():
        admin = AdminProfile(
            username='admin',
            email='acm@mitsgwalior.in',
            role='superadmin'
        )
        admin.set_password('Admin@ACMMits2025!')
        db.session.add(admin)

    # 2. Site settings
    settings_data = {
        'site_name': 'MITS ACM STUDENT CHAPTER',
        'institution_name': 'Madhav Institute of Technology & Science, Gwalior',
        'tagline': 'Code. Create. Connect.',
        'hero_supporting_text': 'Empowering the next generation of computing professionals at MITS Gwalior.',
        'about_summary': 'MITS ACM STUDENT CHAPTER is a premier computing community affiliated with the Association for Computing Machinery. We foster innovation, technical excellence, and peer collaboration among engineering students at MITS Gwalior.',
        'contact_email': 'acm@mitsgwalior.in',
        'college_location': 'Madhav Institute of Technology & Science, Race Course Road, Gola ka Mandir, Gwalior, Madhya Pradesh 474005',
        'stat_members': '250+',
        'stat_events': '30+',
        'stat_workshops': '18+',
        'stat_projects': '45+',
        'social_linkedin': 'https://www.linkedin.com/company/mits-acm-student-chapter/',
        'social_github': 'https://github.com/mits-acm',
        'social_instagram': 'https://www.instagram.com/mits_acm/',
        'social_twitter': 'https://twitter.com/mits_acm'
    }
    for k, v in settings_data.items():
        if not SiteSetting.query.filter_by(key=k).first():
            db.session.add(SiteSetting(key=k, value=v))

    # 3. Team Categories & Members (Only clear placeholders / faculty / leads)
    if TeamCategory.query.count() == 0:
        cat_faculty = TeamCategory(name='Faculty Coordinators', display_order=1)
        cat_exec = TeamCategory(name='Executive Board', display_order=2)
        cat_tech = TeamCategory(name='Technical & Dev Team', display_order=3)
        cat_dsa = TeamCategory(name='DSA & Competitive Programming', display_order=4)
        cat_design = TeamCategory(name='Creative & Marketing Team', display_order=5)

        db.session.add_all([cat_faculty, cat_exec, cat_tech, cat_dsa, cat_design])
        db.session.commit()

        members = [
            TeamMember(
                category_id=cat_faculty.id,
                name='Dr. Faculty Coordinator',
                designation='Faculty Sponsor & Branch Counselor',
                bio='Guiding the MITS ACM Student Chapter towards academic excellence, research culture, and student-driven technical initiatives.',
                email='faculty_acm@mitsgwalior.in',
                linkedin_url='https://linkedin.com',
                photo_url='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
                display_order=1
            ),
            TeamMember(
                category_id=cat_exec.id,
                name='Chapter President',
                designation='President',
                bio='Passionate about building inclusive tech ecosystems, organizing hackathons, and fostering technical mentorship at MITS Gwalior.',
                email='president.acm@mitsgwalior.in',
                linkedin_url='https://linkedin.com',
                github_url='https://github.com',
                photo_url='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
                display_order=1
            ),
            TeamMember(
                category_id=cat_exec.id,
                name='Chapter Vice President',
                designation='Vice President',
                bio='Overseeing chapter operations, inter-departmental collaborations, and student empowerment initiatives.',
                email='vp.acm@mitsgwalior.in',
                linkedin_url='https://linkedin.com',
                github_url='https://github.com',
                photo_url='https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80',
                display_order=2
            ),
            TeamMember(
                category_id=cat_tech.id,
                name='Technical Lead',
                designation='Lead Architect',
                bio='Full-stack developer and cloud enthusiast leading open-source projects and developer workshops for chapter members.',
                email='tech.acm@mitsgwalior.in',
                linkedin_url='https://linkedin.com',
                github_url='https://github.com',
                photo_url='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
                display_order=1
            ),
            TeamMember(
                category_id=cat_dsa.id,
                name='Competitive Programming Lead',
                designation='Algorithms Mentor',
                bio='Candidate Master on Codeforces and ICPC Regionalist guiding junior engineers in algorithmic problem solving.',
                email='cp.acm@mitsgwalior.in',
                linkedin_url='https://linkedin.com',
                github_url='https://github.com',
                photo_url='https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
                display_order=1
            )
        ]
        db.session.add_all(members)

    # 4. Events
    if Event.query.count() == 0:
        events = [
            Event(
                title='CodeQuest 2026: National Hackathon',
                category='Hackathons',
                short_description='A 36-hour flagship hackathon bringing innovative minds together to solve real-world industry challenges.',
                full_description='CodeQuest 2026 is the annual flagship hackathon organized by MITS ACM STUDENT CHAPTER. Teams will ideate, prototype, and build production-ready software solutions in Artificial Intelligence, FinTech, Web3, and Smart Campus Infrastructure. Mentors from premier tech firms will guide participants throughout.',
                event_date='March 20-22, 2026',
                venue='MITS Central Auditorium & SAC Labs',
                registration_deadline='March 15, 2026',
                registration_type='internal',
                status='Upcoming',
                is_featured=True,
                poster_url='https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
                team_size='2-4 Members',
                schedule_agenda='Day 1: Opening Ceremony & Problem Statement Release\nDay 2: Hacking Marathon & Mid-way Evaluation\nDay 3: Final Pitches & Prize Distribution Ceremony',
                eligibility_rules='Open to all undergraduate engineering and computer science students across recognized universities. Valid student ID card required.',
                faqs='Q: Is there any registration fee?\nA: No, participation is completely free.\nQ: Can we participate individually?\nA: Teams of 2 to 4 members are recommended.'
            ),
            Event(
                title='Mastering Modern Web Architecture: Next.js & Cloud',
                category='Workshops',
                short_description='Hands-on masterclass on building performant full-stack apps with server actions and distributed databases.',
                full_description='Dive deep into the modern JavaScript and TypeScript ecosystem. Learn how to architect scalable applications with edge functions, Supabase PostgreSQL, and clean microservice patterns.',
                event_date='November 10, 2025 at 4:00 PM',
                venue='CSE Seminar Hall, MITS Gwalior',
                registration_deadline='November 9, 2025',
                registration_type='internal',
                status='Upcoming',
                is_featured=True,
                poster_url='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
                team_size='Individual',
                schedule_agenda='Session 1: React 19 Core & Server Components\nSession 2: Supabase Schema Design & RLS\nSession 3: Live Deployment',
                eligibility_rules='Basic understanding of JavaScript and HTML/CSS.'
            ),
            Event(
                title='Algolympics: Algorithmic Showdown',
                category='Coding Competitions',
                short_description='Inter-college competitive programming sprint featuring dynamic programming, graphs, and greedy algorithms.',
                full_description='Put your problem-solving prowess to the test in this intensive 3-hour competitive programming contest hosted on our dedicated testing platform.',
                event_date='October 18, 2025',
                venue='Online (Virtual Judge Platform)',
                registration_deadline='October 17, 2025',
                registration_type='internal',
                status='Completed',
                is_featured=False,
                poster_url='https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
                team_size='Individual',
                results_summary='Top 3 Winners:\n1st Rank: Team BinaryBeasts (Cash Prize + Trophy)\n2nd Rank: AlgoMaster\n3rd Rank: CodeCrafter'
            )
        ]
        db.session.add_all(events)

    # 5. Learning Resources
    if LearningResource.query.count() == 0:
        resources = [
            LearningResource(
                title='Comprehensive DSA & LeetCode Roadmap',
                category='DSA and Competitive Programming',
                difficulty='Beginner',
                description='Structured step-by-step roadmap covering Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming with curated practice problems.',
                resource_url='https://github.com/mits-acm/dsa-roadmap',
                tags='DSA, Algorithms, C++, Python, LeetCode'
            ),
            LearningResource(
                title='Modern Full-Stack Development with React & Flask',
                category='Web Development',
                difficulty='Intermediate',
                description='Curated guide on writing clean REST APIs with Flask SQLAlchemy and building responsive interfaces with React and Tailwind CSS.',
                resource_url='https://developer.mozilla.org',
                tags='React, Flask, REST API, Tailwind, WebDev'
            ),
            LearningResource(
                title='Applied Machine Learning: From Math to PyTorch',
                category='Artificial Intelligence and Machine Learning',
                difficulty='Advanced',
                description='Deep dive into neural networks, tensor operations, computer vision architectures, and deploying models to cloud endpoints.',
                resource_url='https://pytorch.org/tutorials/',
                tags='AI, ML, PyTorch, Deep Learning, Python'
            ),
            LearningResource(
                title='Computer Science Core Fundamentals for Placements',
                category='Interview Preparation',
                difficulty='Intermediate',
                description='Essential notes and revision flashcards for Operating Systems, Computer Networks, DBMS, and Object-Oriented Design.',
                resource_url='https://github.com/mits-acm/cs-fundamentals',
                tags='DBMS, OS, Networks, OOP, Placements'
            )
        ]
        db.session.add_all(resources)

    # 6. Achievements
    if Achievement.query.count() == 0:
        achievements = [
            Achievement(
                title='1st Runner Up - Smart India Hackathon Regional Round',
                description='Student team representing MITS ACM Chapter developed an AI-assisted smart traffic management system using edge computer vision.',
                achievement_date='December 2025',
                participant_names='Team NeuroGrid (MITS Gwalior)',
                image_url='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
                badge_label='1st Runner Up',
                external_link='https://sih.gov.in'
            ),
            Achievement(
                title='Top 10 Finalist in ACM India Student Chapter Hackathon',
                description='Demonstrated an accessible offline-first learning platform for rural education across India.',
                achievement_date='October 2025',
                participant_names='Student Project Group',
                image_url='https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
                badge_label='National Finalist'
            ),
            Achievement(
                title='Research Paper Acceptance in IEEE Conference',
                description='Paper titled "Comparative Analysis of Lightweight Neural Networks for Edge Robotics" authored by chapter members.',
                achievement_date='August 2025',
                participant_names='Research Wing Members',
                image_url='https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
                badge_label='Publication'
            )
        ]
        db.session.add_all(achievements)

    # 7. Gallery
    if GalleryAlbum.query.count() == 0:
        album1 = GalleryAlbum(
            title='Annual Flagship Hackathon',
            category='Hackathons',
            cover_image_url='https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
            description='Highlights and team project demonstrations during our 36-hour hackathon.'
        )
        album2 = GalleryAlbum(
            title='Hands-on AI & Cloud Computing Workshop',
            category='Workshops',
            cover_image_url='https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
            description='Students building full-stack AI applications in the computer science lab.'
        )
        db.session.add_all([album1, album2])
        db.session.commit()

        images = [
            GalleryImage(
                album_id=album1.id,
                image_url='https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80',
                caption='Participants collaborating during the overnight sprint',
                date_taken='2025'
            ),
            GalleryImage(
                album_id=album1.id,
                image_url='https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
                caption='Team project demonstration to faculty judges',
                date_taken='2025'
            ),
            GalleryImage(
                album_id=album2.id,
                image_url='https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80',
                caption='Live coding and architecture walkthrough',
                date_taken='2025'
            )
        ]
        db.session.add_all(images)

    # 8. Announcements
    if Announcement.query.count() == 0:
        announcements = [
            Announcement(
                title='Recruitment Drive 2026-27 Open!',
                content='MITS ACM STUDENT CHAPTER invites enthusiastic students across all years to join our Technical, Creative, PR, and Event Management wings.',
                category='Recruitment',
                link_url='/join-us'
            ),
            Announcement(
                title='Registration Open: CodeQuest 2026',
                content='Early bird registrations are now active. Submit your team details before March 15, 2026.',
                category='Event',
                link_url='/events'
            )
        ]
        db.session.add_all(announcements)

    db.session.commit()
    print("Database seeded successfully!")

