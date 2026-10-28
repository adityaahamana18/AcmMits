import os
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class AdminProfile(db.Model):
    __tablename__ = 'admin_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), default='superadmin') # superadmin, coordinator, editor
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }


class TeamCategory(db.Model):
    __tablename__ = 'team_categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False) # e.g., Faculty Coordinators, Executive Board
    display_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    members = db.relationship('TeamMember', backref='category_rel', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'display_order': self.display_order,
            'member_count': len(self.members)
        }


class TeamMember(db.Model):
    __tablename__ = 'team_members'
    
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('team_categories.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    designation = db.Column(db.String(120), nullable=False) # e.g. Faculty Mentor, President, Tech Lead
    bio = db.Column(db.Text, nullable=True)
    photo_url = db.Column(db.String(255), nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)
    github_url = db.Column(db.String(255), nullable=True)
    portfolio_url = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(120), nullable=True)
    display_order = db.Column(db.Integer, default=0)
    is_published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'category_id': self.category_id,
            'category_name': self.category_rel.name if self.category_rel else None,
            'name': self.name,
            'designation': self.designation,
            'bio': self.bio,
            'photo_url': self.photo_url,
            'linkedin_url': self.linkedin_url,
            'github_url': self.github_url,
            'portfolio_url': self.portfolio_url,
            'email': self.email,
            'display_order': self.display_order,
            'is_published': self.is_published,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(80), nullable=False) # Hackathon, Coding Competition, Workshop, Seminar, etc.
    short_description = db.Column(db.String(300), nullable=False)
    full_description = db.Column(db.Text, nullable=True)
    poster_url = db.Column(db.String(255), nullable=True)
    event_date = db.Column(db.String(100), nullable=False) # e.g., Nov 15, 2025 at 10:00 AM
    venue = db.Column(db.String(150), nullable=False) # e.g., Seminar Hall / Online / Google Meet
    registration_deadline = db.Column(db.String(100), nullable=True)
    registration_type = db.Column(db.String(20), default='internal') # internal or external
    external_registration_url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(30), default='Upcoming') # Upcoming, Ongoing, Completed, Closed, Cancelled
    schedule_agenda = db.Column(db.Text, nullable=True)
    eligibility_rules = db.Column(db.Text, nullable=True)
    team_size = db.Column(db.String(50), default='1-4 Members')
    faqs = db.Column(db.Text, nullable=True) # JSON or markdown text
    results_summary = db.Column(db.Text, nullable=True)
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    registrations = db.relationship('EventRegistration', backref='event_rel', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'short_description': self.short_description,
            'full_description': self.full_description,
            'poster_url': self.poster_url,
            'event_date': self.event_date,
            'venue': self.venue,
            'registration_deadline': self.registration_deadline,
            'registration_type': self.registration_type,
            'external_registration_url': self.external_registration_url,
            'status': self.status,
            'schedule_agenda': self.schedule_agenda,
            'eligibility_rules': self.eligibility_rules,
            'team_size': self.team_size,
            'faqs': self.faqs,
            'results_summary': self.results_summary,
            'is_featured': self.is_featured,
            'registration_count': len(self.registrations),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class EventRegistration(db.Model):
    __tablename__ = 'event_registrations'
    
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    college = db.Column(db.String(180), nullable=False)
    course_year = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(30), nullable=True)
    team_name = db.Column(db.String(100), nullable=True)
    team_members_info = db.Column(db.Text, nullable=True)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (
        db.UniqueConstraint('event_id', 'email', name='unique_event_participant'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'event_title': self.event_rel.title if self.event_rel else None,
            'name': self.name,
            'email': self.email,
            'college': self.college,
            'course_year': self.course_year,
            'phone': self.phone,
            'team_name': self.team_name,
            'team_members_info': self.team_members_info,
            'submitted_at': self.submitted_at.isoformat() if self.submitted_at else None
        }


class LearningResource(db.Model):
    __tablename__ = 'learning_resources'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(180), nullable=False)
    category = db.Column(db.String(100), nullable=False) # DSA, Web Dev, AI/ML, Cybersecurity, etc.
    difficulty = db.Column(db.String(50), default='Beginner') # Beginner, Intermediate, Advanced
    description = db.Column(db.Text, nullable=False)
    resource_url = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(255), nullable=True)
    tags = db.Column(db.String(200), nullable=True) # comma separated
    is_published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'difficulty': self.difficulty,
            'description': self.description,
            'resource_url': self.resource_url,
            'file_path': self.file_path,
            'tags': [t.strip() for t in self.tags.split(',')] if self.tags else [],
            'is_published': self.is_published,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Achievement(db.Model):
    __tablename__ = 'achievements'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    achievement_date = db.Column(db.String(80), nullable=False)
    participant_names = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    external_link = db.Column(db.String(255), nullable=True)
    badge_label = db.Column(db.String(80), default='Honor') # 1st Place, Finalist, Publication, Milestone
    is_published = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'achievement_date': self.achievement_date,
            'participant_names': self.participant_names,
            'image_url': self.image_url,
            'external_link': self.external_link,
            'badge_label': self.badge_label,
            'is_published': self.is_published,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class GalleryAlbum(db.Model):
    __tablename__ = 'gallery_albums'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    category = db.Column(db.String(80), nullable=False) # Workshops, Hackathons, Guest Lectures, Team Activities
    cover_image_url = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(300), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    images = db.relationship('GalleryImage', backref='album_rel', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'cover_image_url': self.cover_image_url,
            'description': self.description,
            'image_count': len(self.images),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class GalleryImage(db.Model):
    __tablename__ = 'gallery_images'
    
    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('gallery_albums.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255), nullable=True)
    date_taken = db.Column(db.String(80), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'image_url': self.image_url,
            'caption': self.caption,
            'date_taken': self.date_taken,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Announcement(db.Model):
    __tablename__ = 'announcements'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(80), default='General') # General, Recruitment, Event, Urgent
    link_url = db.Column(db.String(255), nullable=True)
    is_active = db.Column(db.Boolean, default=True)
    published_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'category': self.category,
            'link_url': self.link_url,
            'is_active': self.is_active,
            'published_at': self.published_at.isoformat() if self.published_at else None
        }


class MembershipApplication(db.Model):
    __tablename__ = 'membership_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    college_email = db.Column(db.String(120), nullable=False)
    course_year = db.Column(db.String(80), nullable=False)
    technical_skills = db.Column(db.String(255), nullable=False)
    areas_of_interest = db.Column(db.String(255), nullable=False)
    preferred_team = db.Column(db.String(100), nullable=False)
    intro_statement = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='Pending') # Pending, Shortlisted, Accepted, Rejected
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'college_email': self.college_email,
            'course_year': self.course_year,
            'technical_skills': self.technical_skills,
            'areas_of_interest': self.areas_of_interest,
            'preferred_team': self.preferred_team,
            'intro_statement': self.intro_statement,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'is_read': self.is_read,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class SiteSetting(db.Model):
    __tablename__ = 'site_settings'
    
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String(100), unique=True, nullable=False)
    value = db.Column(db.Text, nullable=True)
    description = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            'key': self.key,
            'value': self.value,
            'description': self.description
        }

