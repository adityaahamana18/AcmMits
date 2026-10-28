import os
import io
import csv
from datetime import datetime, timezone, timedelta
import jwt
from flask import Blueprint, request, jsonify, current_app, Response
from werkzeug.utils import secure_filename
from app.models import (
    db, AdminProfile, TeamCategory, TeamMember, Event, EventRegistration, 
    LearningResource, Achievement, GalleryAlbum, GalleryImage, Announcement, 
    MembershipApplication, ContactMessage, SiteSetting
)
from app.services.auth_middleware import token_required

admin_bp = Blueprint('admin_bp', __name__)

# Authentication
@admin_bp.route('/auth/login', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    password = data.get('password', '')

    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password required.'}), 400

    admin = AdminProfile.query.filter((AdminProfile.username == username) | (AdminProfile.email == username)).first()
    if not admin or not admin.check_password(password):
        return jsonify({'success': False, 'message': 'Invalid administrative credentials.'}), 401

    admin.last_login = datetime.utcnow()
    db.session.commit()

    token_payload = {
        'admin_id': admin.id,
        'username': admin.username,
        'role': admin.role,
        'exp': datetime.now(timezone.utc) + timedelta(hours=24)
    }
    token = jwt.encode(token_payload, current_app.config['JWT_SECRET_KEY'], algorithm='HS256')

    return jsonify({
        'success': True,
        'token': token,
        'admin': admin.to_dict()
    })

@admin_bp.route('/auth/me', methods=['GET'])
@token_required
def admin_me(current_admin):
    return jsonify({'success': True, 'admin': current_admin.to_dict()})

# Overview Stats
@admin_bp.route('/overview', methods=['GET'])
@token_required
def get_admin_overview(current_admin):
    total_events = Event.query.count()
    upcoming_events = Event.query.filter_by(status='Upcoming').count()
    total_team = TeamMember.query.count()
    total_resources = LearningResource.query.count()
    total_registrations = EventRegistration.query.count()
    pending_applications = MembershipApplication.query.filter_by(status='Pending').count()
    unread_messages = ContactMessage.query.filter_by(is_read=False).count()

    recent_registrations = EventRegistration.query.order_by(EventRegistration.submitted_at.desc()).limit(5).all()
    recent_applications = MembershipApplication.query.order_by(MembershipApplication.created_at.desc()).limit(5).all()
    recent_messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).limit(5).all()

    return jsonify({
        'success': True,
        'stats': {
            'total_events': total_events,
            'upcoming_events': upcoming_events,
            'total_team': total_team,
            'total_resources': total_resources,
            'total_registrations': total_registrations,
            'pending_applications': pending_applications,
            'unread_messages': unread_messages
        },
        'recent_registrations': [r.to_dict() for r in recent_registrations],
        'recent_applications': [a.to_dict() for a in recent_applications],
        'recent_messages': [m.to_dict() for m in recent_messages]
    })

# Team Categories CRUD
@admin_bp.route('/team-categories', methods=['GET'])
@token_required
def get_admin_categories(current_admin):
    cats = TeamCategory.query.order_by(TeamCategory.display_order.asc()).all()
    return jsonify({'success': True, 'data': [c.to_dict() for c in cats]})

@admin_bp.route('/team-categories', methods=['POST'])
@token_required
def create_team_category(current_admin):
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    display_order = int(data.get('display_order', 0))
    if not name:
        return jsonify({'success': False, 'message': 'Category name required.'}), 400

    cat = TeamCategory(name=name, display_order=display_order)
    db.session.add(cat)
    db.session.commit()
    return jsonify({'success': True, 'data': cat.to_dict()})

@admin_bp.route('/team-categories/<int:cat_id>', methods=['PUT', 'DELETE'])
@token_required
def manage_team_category(current_admin, cat_id):
    cat = TeamCategory.query.get_or_404(cat_id)
    if request.method == 'DELETE':
        db.session.delete(cat)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Category deleted successfully.'})
    
    data = request.get_json() or {}
    cat.name = data.get('name', cat.name)
    cat.display_order = int(data.get('display_order', cat.display_order))
    db.session.commit()
    return jsonify({'success': True, 'data': cat.to_dict()})

# Team Members CRUD
@admin_bp.route('/team-members', methods=['GET', 'POST'])
@token_required
def manage_team_members(current_admin):
    if request.method == 'GET':
        members = TeamMember.query.order_by(TeamMember.category_id.asc(), TeamMember.display_order.asc()).all()
        return jsonify({'success': True, 'data': [m.to_dict() for m in members]})

    data = request.get_json() or {}
    member = TeamMember(
        category_id=data.get('category_id'),
        name=data.get('name'),
        designation=data.get('designation'),
        bio=data.get('bio'),
        photo_url=data.get('photo_url'),
        linkedin_url=data.get('linkedin_url'),
        github_url=data.get('github_url'),
        portfolio_url=data.get('portfolio_url'),
        email=data.get('email'),
        display_order=int(data.get('display_order', 0)),
        is_published=data.get('is_published', True)
    )
    db.session.add(member)
    db.session.commit()
    return jsonify({'success': True, 'data': member.to_dict()})

@admin_bp.route('/team-members/<int:member_id>', methods=['PUT', 'DELETE'])
@token_required
def update_team_member(current_admin, member_id):
    member = TeamMember.query.get_or_404(member_id)
    if request.method == 'DELETE':
        db.session.delete(member)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Member removed successfully.'})

    data = request.get_json() or {}
    for field in ['category_id', 'name', 'designation', 'bio', 'photo_url', 'linkedin_url', 'github_url', 'portfolio_url', 'email', 'display_order', 'is_published']:
        if field in data:
            setattr(member, field, data[field])
    db.session.commit()
    return jsonify({'success': True, 'data': member.to_dict()})

# Events CRUD
@admin_bp.route('/events', methods=['GET', 'POST'])
@token_required
def admin_events(current_admin):
    if request.method == 'GET':
        events = Event.query.order_by(Event.created_at.desc()).all()
        return jsonify({'success': True, 'data': [e.to_dict() for e in events]})

    data = request.get_json() or {}
    event = Event(
        title=data.get('title'),
        category=data.get('category', 'Technical Events'),
        short_description=data.get('short_description', ''),
        full_description=data.get('full_description', ''),
        poster_url=data.get('poster_url', ''),
        event_date=data.get('event_date', ''),
        venue=data.get('venue', ''),
        registration_deadline=data.get('registration_deadline'),
        registration_type=data.get('registration_type', 'internal'),
        external_registration_url=data.get('external_registration_url'),
        status=data.get('status', 'Upcoming'),
        schedule_agenda=data.get('schedule_agenda'),
        eligibility_rules=data.get('eligibility_rules'),
        team_size=data.get('team_size', '1-4 Members'),
        faqs=data.get('faqs'),
        results_summary=data.get('results_summary'),
        is_featured=data.get('is_featured', False)
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({'success': True, 'data': event.to_dict()})

@admin_bp.route('/events/<int:event_id>', methods=['PUT', 'DELETE'])
@token_required
def manage_admin_event(current_admin, event_id):
    event = Event.query.get_or_404(event_id)
    if request.method == 'DELETE':
        db.session.delete(event)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Event deleted successfully.'})

    data = request.get_json() or {}
    for field in ['title', 'category', 'short_description', 'full_description', 'poster_url', 'event_date', 'venue', 'registration_deadline', 'registration_type', 'external_registration_url', 'status', 'schedule_agenda', 'eligibility_rules', 'team_size', 'faqs', 'results_summary', 'is_featured']:
        if field in data:
            setattr(event, field, data[field])
    db.session.commit()
    return jsonify({'success': True, 'data': event.to_dict()})

# Event Registrations & CSV Export
@admin_bp.route('/registrations', methods=['GET'])
@token_required
def get_registrations(current_admin):
    event_id = request.args.get('event_id')
    query = EventRegistration.query
    if event_id:
        query = query.filter_by(event_id=event_id)
    regs = query.order_by(EventRegistration.submitted_at.desc()).all()
    return jsonify({'success': True, 'data': [r.to_dict() for r in regs]})

@admin_bp.route('/registrations/export-csv', methods=['GET'])
@token_required
def export_registrations_csv(current_admin):
    event_id = request.args.get('event_id')
    query = EventRegistration.query
    event_title = "all-events"
    if event_id:
        query = query.filter_by(event_id=event_id)
        ev = Event.query.get(event_id)
        if ev:
            event_title = secure_filename(ev.title)

    regs = query.order_by(EventRegistration.submitted_at.desc()).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['ID', 'Event Title', 'Participant Name', 'Email', 'College', 'Course & Year', 'Phone', 'Team Name', 'Team Info', 'Submitted At'])
    
    for r in regs:
        writer.writerow([
            r.id,
            r.event_rel.title if r.event_rel else 'N/A',
            r.name,
            r.email,
            r.college,
            r.course_year,
            r.phone or '',
            r.team_name or '',
            r.team_members_info or '',
            r.submitted_at.strftime("%Y-%m-%d %H:%M:%S") if r.submitted_at else ''
        ])
        
    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": f"attachment;filename=registrations_{event_title}.csv"}
    )

# Learning Resources CRUD
@admin_bp.route('/learning-resources', methods=['GET', 'POST'])
@token_required
def admin_resources(current_admin):
    if request.method == 'GET':
        res = LearningResource.query.order_by(LearningResource.created_at.desc()).all()
        return jsonify({'success': True, 'data': [r.to_dict() for r in res]})

    data = request.get_json() or {}
    r = LearningResource(
        title=data.get('title'),
        category=data.get('category'),
        difficulty=data.get('difficulty', 'Beginner'),
        description=data.get('description'),
        resource_url=data.get('resource_url'),
        file_path=data.get('file_path'),
        tags=data.get('tags'),
        is_published=data.get('is_published', True)
    )
    db.session.add(r)
    db.session.commit()
    return jsonify({'success': True, 'data': r.to_dict()})

@admin_bp.route('/learning-resources/<int:res_id>', methods=['PUT', 'DELETE'])
@token_required
def manage_resource(current_admin, res_id):
    r = LearningResource.query.get_or_404(res_id)
    if request.method == 'DELETE':
        db.session.delete(r)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Resource deleted successfully.'})

    data = request.get_json() or {}
    for f in ['title', 'category', 'difficulty', 'description', 'resource_url', 'file_path', 'tags', 'is_published']:
        if f in data:
            setattr(r, f, data[f])
    db.session.commit()
    return jsonify({'success': True, 'data': r.to_dict()})

# Achievements CRUD
@admin_bp.route('/achievements', methods=['GET', 'POST'])
@token_required
def admin_achievements(current_admin):
    if request.method == 'GET':
        items = Achievement.query.order_by(Achievement.created_at.desc()).all()
        return jsonify({'success': True, 'data': [i.to_dict() for i in items]})

    data = request.get_json() or {}
    item = Achievement(
        title=data.get('title'),
        description=data.get('description'),
        achievement_date=data.get('achievement_date'),
        participant_names=data.get('participant_names'),
        image_url=data.get('image_url'),
        external_link=data.get('external_link'),
        badge_label=data.get('badge_label', 'Award'),
        is_published=data.get('is_published', True)
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({'success': True, 'data': item.to_dict()})

@admin_bp.route('/achievements/<int:item_id>', methods=['PUT', 'DELETE'])
@token_required
def manage_achievement(current_admin, item_id):
    item = Achievement.query.get_or_404(item_id)
    if request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Achievement deleted successfully.'})

    data = request.get_json() or {}
    for f in ['title', 'description', 'achievement_date', 'participant_names', 'image_url', 'external_link', 'badge_label', 'is_published']:
        if f in data:
            setattr(item, f, data[f])
    db.session.commit()
    return jsonify({'success': True, 'data': item.to_dict()})

# Gallery Albums & Images
@admin_bp.route('/gallery-albums', methods=['GET', 'POST'])
@token_required
def admin_gallery_albums(current_admin):
    if request.method == 'GET':
        albums = GalleryAlbum.query.order_by(GalleryAlbum.created_at.desc()).all()
        return jsonify({'success': True, 'data': [a.to_dict() for a in albums]})

    data = request.get_json() or {}
    album = GalleryAlbum(
        title=data.get('title'),
        category=data.get('category', 'Workshops'),
        cover_image_url=data.get('cover_image_url'),
        description=data.get('description')
    )
    db.session.add(album)
    db.session.commit()
    return jsonify({'success': True, 'data': album.to_dict()})

@admin_bp.route('/gallery-albums/<int:album_id>', methods=['DELETE'])
@token_required
def delete_gallery_album(current_admin, album_id):
    album = GalleryAlbum.query.get_or_404(album_id)
    db.session.delete(album)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Album deleted.'})

@admin_bp.route('/gallery-images', methods=['POST'])
@token_required
def add_gallery_image(current_admin):
    data = request.get_json() or {}
    img = GalleryImage(
        album_id=data.get('album_id'),
        image_url=data.get('image_url'),
        caption=data.get('caption'),
        date_taken=data.get('date_taken')
    )
    db.session.add(img)
    db.session.commit()
    return jsonify({'success': True, 'data': img.to_dict()})

@admin_bp.route('/gallery-images/<int:image_id>', methods=['DELETE'])
@token_required
def delete_gallery_image(current_admin, image_id):
    img = GalleryImage.query.get_or_404(image_id)
    db.session.delete(img)
    db.session.commit()
    return jsonify({'success': True, 'message': 'Image deleted.'})

# Announcements CRUD
@admin_bp.route('/announcements', methods=['GET', 'POST'])
@token_required
def admin_announcements(current_admin):
    if request.method == 'GET':
        items = Announcement.query.order_by(Announcement.published_at.desc()).all()
        return jsonify({'success': True, 'data': [a.to_dict() for a in items]})

    data = request.get_json() or {}
    item = Announcement(
        title=data.get('title'),
        content=data.get('content'),
        category=data.get('category', 'General'),
        link_url=data.get('link_url'),
        is_active=data.get('is_active', True)
    )
    db.session.add(item)
    db.session.commit()
    return jsonify({'success': True, 'data': item.to_dict()})

@admin_bp.route('/announcements/<int:ann_id>', methods=['PUT', 'DELETE'])
@token_required
def manage_announcement(current_admin, ann_id):
    item = Announcement.query.get_or_404(ann_id)
    if request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Announcement deleted successfully.'})

    data = request.get_json() or {}
    for f in ['title', 'content', 'category', 'link_url', 'is_active']:
        if f in data:
            setattr(item, f, data[f])
    db.session.commit()
    return jsonify({'success': True, 'data': item.to_dict()})

# Membership Applications
@admin_bp.route('/applications', methods=['GET'])
@token_required
def get_applications(current_admin):
    apps = MembershipApplication.query.order_by(MembershipApplication.created_at.desc()).all()
    return jsonify({'success': True, 'data': [a.to_dict() for a in apps]})

@admin_bp.route('/applications/<int:app_id>/status', methods=['PUT'])
@token_required
def update_application_status(current_admin, app_id):
    app = MembershipApplication.query.get_or_404(app_id)
    data = request.get_json() or {}
    app.status = data.get('status', app.status)
    db.session.commit()
    return jsonify({'success': True, 'data': app.to_dict()})

# Contact Messages
@admin_bp.route('/contact-messages', methods=['GET'])
@token_required
def get_contact_messages(current_admin):
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify({'success': True, 'data': [m.to_dict() for m in messages]})

@admin_bp.route('/contact-messages/<int:msg_id>/read', methods=['PUT'])
@token_required
def mark_message_read(current_admin, msg_id):
    msg = ContactMessage.query.get_or_404(msg_id)
    msg.is_read = True
    db.session.commit()
    return jsonify({'success': True, 'data': msg.to_dict()})

# Site Settings CRUD
@admin_bp.route('/settings', methods=['GET', 'POST'])
@token_required
def admin_settings(current_admin):
    if request.method == 'GET':
        settings = SiteSetting.query.all()
        return jsonify({'success': True, 'data': {s.key: s.value for s in settings}})

    data = request.get_json() or {}
    for k, v in data.items():
        s = SiteSetting.query.filter_by(key=k).first()
        if s:
            s.value = str(v)
        else:
            db.session.add(SiteSetting(key=k, value=str(v)))
    db.session.commit()
    return jsonify({'success': True, 'message': 'Site settings updated successfully.'})

# Media Upload Endpoint
@admin_bp.route('/upload', methods=['POST'])
@token_required
def upload_file(current_admin):
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file part found.'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'success': False, 'message': 'No file selected.'}), 400

    if file:
        ext = file.filename.rsplit('.', 1)[-1].lower() if '.' in file.filename else ''
        if ext not in current_app.config['ALLOWED_EXTENSIONS']:
            return jsonify({'success': False, 'message': f'File extension .{ext} is not permitted.'}), 400

        os.makedirs(current_app.config['UPLOAD_FOLDER'], exist_ok=True)
        filename = f"{int(datetime.utcnow().timestamp())}_{secure_filename(file.filename)}"
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        url = f"/api/uploads/{filename}"
        return jsonify({'success': True, 'url': url})

