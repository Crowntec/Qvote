# Demo Login Credentials

This document contains the demo login credentials for testing the Qvote application.

## 🔑 Admin Login
Access the admin portal at `/admin/login`

**Credentials:**
- **Email:** `admin@demo.com`
- **Password:** `password123`

After login, you'll be redirected to the admin dashboard where you can:
- Create voting sessions
- Upload voter lists
- Manage elections
- View voting results

## 🗳️ Voter Login  
Access the voter portal at `/voter/login`

**Credentials:**
- **Voter ID:** `VOTER001`
- **PIN:** `123456`

Additional demo voter accounts:
- **Voter ID:** `VOTER002`, **PIN:** `789012`
- **Voter ID:** `VOTER003`, **PIN:** `345678`

After login, you'll be redirected to the voter dashboard where you can:
- View active voting sessions
- Cast your vote
- Check voting status

## 🚀 Quick Start

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Use the navigation to access either:
   - Admin Portal → Use admin credentials above
   - Voter Portal → Use voter credentials above

## ⚠️ Note

These are demo credentials for development and testing purposes only. In a production environment, proper authentication with secure password hashing and database storage should be implemented.