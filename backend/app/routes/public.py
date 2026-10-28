from flask import Blueprint, request, jsonify
from app.models import db, TeamCategory, TeamMember, Event, EventRegistration, LearningResource, Achievement, GalleryAlbum, GalleryImage, Announcement, MembershipApplication, ContactMessage, SiteSetting

public_bp = Blueprint('public_bp', __name__)

# Site Settings / Stats
@public_bp.route('/settings', methods=['GET'])
def get_site_settings():
    settings = SiteSetting.query.all()
    data = {s.key: s.value for s in settings}
    return jsonify({'success': True, 'data': data})

# Announcements
@public_bp.route('/announcements', methods=['GET'])
def get_announcements():
    announcements = Announcement.query.filter_by(is_active=True).order_by(Announcement.published_at.desc()).all()
    return jsonify({'success': True, 'data': [a.to_dict() for a in announcements]})

# Team Categories & Members
@public_bp.route('/team', methods=['GET'])
def get_team():
    categories = TeamCategory.query.order_by(TeamCategory.display_order.asc()).all()
    result = []
    for cat in categories:
        members = TeamMember.query.filter_by(category_id=cat.id, is_published=True)\
                                  .order_by(TeamMember.display_order.asc(), TeamMember.id.asc()).all()
        result.append({
            'id': cat.id,
            'name': cat.name,
            'members': [m.to_dict() for m in members]
        })
    return jsonify({'success': True, 'data': result})

# Events
@public_bp.route('/events', methods=['GET'])
def get_events():
    category = request.args.get('category')
    status = request.args.get('status')
    featured = request.args.get('featured')
    
    query = Event.query
    if category:
        query = query.filter_by(category=category)
    if status:
        query = query.filter_by(status=status)
    if featured == 'true':
        query = query.filter_by(is_featured=True)
        
    events = query.order_by(Event.created_at.desc()).all()
    return jsonify({'success': True, 'data': [e.to_dict() for e in events]})

@public_bp.route('/events/<int:event_id>', methods=['GET'])
def get_event_detail(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify({'success': True, 'data': event.to_dict()})

# Internal Event Registration
@public_bp.route('/events/<int:event_id>/register', methods=['POST'])
def register_for_event(event_id):
    event = Event.query.get_or_404(event_id)
    if event.status in ['Completed', 'Registration Closed', 'Cancelled']:
        return jsonify({'success': False, 'message': f'Registration is not accepted for this event (Status: {event.status}).'}), 400
        
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    college = data.get('college', '').strip()
    course_year = data.get('course_year', '').strip()
    phone = data.get('phone', '').strip()
    team_name = data.get('team_name', '').strip()
    team_members_info = data.get('team_members_info', '').strip()

    if not name or not email or not college or not course_year:
        return jsonify({'success': False, 'message': 'Please provide all mandatory fields (Name, Email, College, Course/Year).'}), 400

    # Duplicate submission check
    existing = EventRegistration.query.filter_by(event_id=event_id, email=email).first()
    if existing:
        return jsonify({'success': False, 'message': 'This email address has already been registered for this event.'}), 409

    registration = EventRegistration(
        event_id=event_id,
        name=name,
        email=email,
        college=college,
        course_year=course_year,
        phone=phone,
        team_name=team_name,
        team_members_info=team_members_info
    )
    db.session.add(registration)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Successfully registered for ' + event.title, 'registration_id': registration.id})

# Learning Resources
@public_bp.route('/learning-resources', methods=['GET'])
def get_learning_resources():
    category = request.args.get('category')
    difficulty = request.args.get('difficulty')
    search = request.args.get('search')

    query = LearningResource.query.filter_by(is_published=True)
    if category and category != 'All':
        query = query.filter_by(category=category)
    if difficulty and difficulty != 'All':
        query = query.filter_by(difficulty=difficulty)
    if search:
        query = query.filter(LearningResource.title.ilike(f'%{search}%') | LearningResource.description.ilike(f'%{search}%'))

    resources = query.order_by(LearningResource.created_at.desc()).all()
    return jsonify({'success': True, 'data': [r.to_dict() for r in resources]})

# Achievements
@public_bp.route('/achievements', methods=['GET'])
def get_achievements():
    achievements = Achievement.query.filter_by(is_published=True).order_by(Achievement.created_at.desc()).all()
    return jsonify({'success': True, 'data': [a.to_dict() for a in achievements]})

# Gallery Albums & Images
@public_bp.route('/gallery', methods=['GET'])
def get_gallery():
    albums = GalleryAlbum.query.order_by(GalleryAlbum.created_at.desc()).all()
    res = []
    for album in albums:
        res.append({
            'album': album.to_dict(),
            'images': [img.to_dict() for img in album.images]
        })
    return jsonify({'success': True, 'data': res})

# Membership Application
@public_bp.route('/join-us', methods=['POST'])
def submit_membership_application():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    college_email = data.get('college_email', '').strip().lower()
    course_year = data.get('course_year', '').strip()
    technical_skills = data.get('technical_skills', '').strip()
    areas_of_interest = data.get('areas_of_interest', '').strip()
    preferred_team = data.get('preferred_team', '').strip()
    intro_statement = data.get('intro_statement', '').strip()

    if not name or not college_email or not course_year or not preferred_team:
        return jsonify({'success': False, 'message': 'Please fill out all required fields.'}), 400

    # Duplicate submission check
    existing = MembershipApplication.query.filter_by(college_email=college_email).first()
    if existing:
        return jsonify({'success': False, 'message': 'An application has already been submitted with this college email.'}), 409

    app = MembershipApplication(
        name=name,
        college_email=college_email,
        course_year=course_year,
        technical_skills=technical_skills,
        areas_of_interest=areas_of_interest,
        preferred_team=preferred_team,
        intro_statement=intro_statement,
        status='Pending'
    )
    db.session.add(app)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Your application to join MITS ACM STUDENT CHAPTER has been submitted successfully!'})

# Contact Message
@public_bp.route('/contact', methods=['POST'])
def submit_contact_message():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    subject = data.get('subject', '').strip()
    message = data.get('message', '').strip()

    if not name or not email or not subject or not message:
        return jsonify({'success': False, 'message': 'All contact form fields are required.'}), 400

    msg = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message
    )
    db.session.add(msg)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Thank you for reaching out to MITS ACM STUDENT CHAPTER! We will get back to you shortly.'})

