import unittest
import json
from app import create_app
from app.models import db, AdminProfile, Event, EventRegistration, TeamMember, TeamCategory, LearningResource, MembershipApplication, ContactMessage

class AcmChapterTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

    def test_health_check(self):
        response = self.client.get('/api/health')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['chapter'], 'MITS ACM STUDENT CHAPTER')
        self.assertEqual(data['institution'], 'Madhav Institute of Technology & Science, Gwalior')

    def test_get_events(self):
        response = self.client.get('/api/events')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        self.assertTrue(len(data['data']) > 0)

    def test_get_team(self):
        response = self.client.get('/api/team')
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(data['success'])
        self.assertTrue(len(data['data']) > 0)

    def test_admin_auth_and_protected_access(self):
        # 1. Unauthorized attempt
        unauth_res = self.client.get('/api/admin/overview')
        self.assertEqual(unauth_res.status_code, 401)

        # 2. Login with valid seed credentials
        login_res = self.client.post('/api/admin/auth/login', json={
            'username': 'admin',
            'password': 'Admin@ACMMits2025!'
        })
        login_data = json.loads(login_res.data)
        self.assertEqual(login_res.status_code, 200)
        self.assertTrue(login_data['success'])
        self.assertIn('token', login_data)

        # 3. Authorized request with Bearer token
        token = login_data['token']
        headers = {'Authorization': f'Bearer {token}'}
        overview_res = self.client.get('/api/admin/overview', headers=headers)
        overview_data = json.loads(overview_res.data)
        self.assertEqual(overview_res.status_code, 200)
        self.assertTrue(overview_data['success'])
        self.assertIn('stats', overview_data)

    def test_event_registration_and_duplicate_check(self):
        # Get first event
        with self.app.app_context():
            event = Event.query.filter_by(status='Upcoming').first()
            self.assertIsNotNone(event)
            event_id = event.id

        reg_data = {
            'name': 'Test Participant',
            'email': 'unique_test_user@mitsgwalior.in',
            'college': 'MITS Gwalior',
            'course_year': 'B.Tech CSE 2nd Year',
            'phone': '9876543210'
        }

        # 1st Submission - Success
        res1 = self.client.post(f'/api/events/{event_id}/register', json=reg_data)
        self.assertEqual(res1.status_code, 200)

        # 2nd Submission with same email - Should detect duplicate
        res2 = self.client.post(f'/api/events/{event_id}/register', json=reg_data)
        self.assertEqual(res2.status_code, 409)

    def test_contact_submission(self):
        msg_data = {
            'name': 'Student Inquirer',
            'email': 'student@example.com',
            'subject': 'Inquiry about Hackathon Registration',
            'message': 'Hello MITS ACM team, could you please clarify team size eligibility?'
        }
        res = self.client.post('/api/contact', json=msg_data)
        self.assertEqual(res.status_code, 200)
        data = json.loads(res.data)
        self.assertTrue(data['success'])

if __name__ == '__main__':
    unittest.main()

