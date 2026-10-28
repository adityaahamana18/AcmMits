import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "mits-acm-student-chapter-secret-key-2025-prod-ready")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "mits-acm-jwt-secret-key-secure-auth-2025")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
    
    # Supabase PostgreSQL or fallback to persistent local SQLite for testing & portability
    # Example Supabase: postgresql://postgres:[password]@db.[ref].supabase.co:5432/postgres
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///acm_chapter.db")
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Upload folder for media / assets
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "uploads")
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max upload
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif", "pdf", "svg"}

