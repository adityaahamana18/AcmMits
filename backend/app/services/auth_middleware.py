import jwt
from functools import wraps
from datetime import datetime, timezone
from flask import request, jsonify, current_app
from app.models import AdminProfile

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header:
            parts = auth_header.split(" ")
            if len(parts) == 2 and parts[0].lower() == 'bearer':
                token = parts[1]
                
        if not token:
            return jsonify({'success': False, 'message': 'Authentication token is missing!'}), 401
            
        try:
            data = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
            current_admin = AdminProfile.query.get(data['admin_id'])
            if not current_admin:
                return jsonify({'success': False, 'message': 'Admin account does not exist or has been removed!'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'success': False, 'message': 'Token has expired. Please log in again.'}), 401
        except Exception as e:
            return jsonify({'success': False, 'message': 'Invalid token verification failed.'}), 401
            
        return f(current_admin, *args, **kwargs)
    return decorated

