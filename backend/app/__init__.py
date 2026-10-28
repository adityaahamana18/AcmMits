import os
from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from app.config import Config
from app.models import db
from app.routes.public import public_bp
from app.routes.admin import admin_bp
from app.services.seed_data import seed_database

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for frontend applications (allowing localhost Vite ports and custom deployments)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    db.init_app(app)

    # Register blueprints
    app.register_blueprint(public_bp, url_prefix='/api')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    # Media file serving
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    @app.route('/api/uploads/<path:filename>')
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    @app.route('/api/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'chapter': 'MITS ACM STUDENT CHAPTER',
            'institution': 'Madhav Institute of Technology & Science, Gwalior'
        })

    with app.app_context():
        db.create_all()
        seed_database()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)

