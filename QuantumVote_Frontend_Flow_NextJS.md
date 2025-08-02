
# QuantumVote Frontend Developer Guide (Next.js)

This document outlines the full flow, routing, and integration points for building the frontend of the QuantumVote app using **Next.js**.

---

## 🌐 App Sections

1. Landing Page / Home
2. Organization Admin Dashboard
3. Voting Session Setup & Management
4. Voter Login & Voting Portal

---

## 🔑 Authentication Roles

| Role     | Access Method                   |
|----------|----------------------------------|
| Admin    | Email + Password                |
| Voter    | Voter ID + PIN (per session)    |

---

## 🧱 Pages and Flows

### 1. Landing Page

- **Route**: `/`
- **Description**: Homepage with intro and navigation to Admin or Voter portals.

### 2. Admin Authentication

#### Registration

- **Route**: `/admin/register`
- **Fields**: Email, Password, Organization Name
- **API**: `POST /api/admin/register`

#### Login

- **Route**: `/admin/login`
- **API**: `POST /api/admin/login`
- Redirect on success to `/admin/dashboard`

### 3. Admin Dashboard

- **Route**: `/admin/dashboard`
- **Components**:
  - Create Voting Session Form
    - Fields: Title, Description, Start/End Time
    - API: `POST /api/voting-sessions`
  - Upload Voters (.csv)
    - File Upload Input
    - API: `POST /api/voters/upload?sessionId={id}`
  - List of Sessions
    - Fetch: `GET /api/voting-sessions`

### 4. Voter Login

- **Route**: `/voter/login`
- **Fields**: Voter ID, PIN, Select Active Session
- **API**: `POST /api/voters/authenticate`
- On success: Redirect to `/voter/vote/[sessionId]`

### 5. Voting Page

- **Route**: `/voter/vote/[sessionId]`
- **Flow**:
  - Fetch candidates: `GET /api/candidates?sessionId={id}`
  - Render candidate list with radio/select buttons
  - Submit vote: `POST /api/votes/cast`
  - Show success: Redirect to `/voter/voted`

### 6. Already Voted Page

- **Route**: `/voter/voted`
- **Content**: "You have already voted" message

---

## 🧾 CSV Upload Format for Admins

Admin should upload a `.csv` with the following format:

```csv
FullName,Email,PhoneNumber
Jane Doe,jane.doe@email.com,+1234567890
John Smith,john.smith@email.com,+1987654321
Amina Yusuf,amina.yusuf@email.com,+1122334455
```

- System will auto-generate unique Voter ID and secure PIN for each voter.
- Voter ID and PIN should be securely shared with voters via email or SMS.

---

## 🔒 Security Note

- Vote tokens are generated using Q# (quantum randomness).
- Tokens are one-time use and not stored permanently.
- Voter’s ability to vote is tracked by `HasVoted` status.

---

## 🧩 Frontend Folder Structure (Next.js)

```text
/pages
  /admin
    - login.tsx
    - register.tsx
    - dashboard.tsx

  /voter
    - login.tsx
    - vote/[sessionId].tsx
    - voted.tsx

/components
  - Navbar.tsx
  - VotingCard.tsx
  - SessionForm.tsx
  - UploadCsv.tsx
```

---

## ✅ Key API Endpoints

| Endpoint                       | Purpose                     |
|-------------------------------|-----------------------------|
| POST /api/admin/register      | Register new organization   |
| POST /api/admin/login         | Admin login                 |
| POST /api/voting-sessions     | Create voting session       |
| POST /api/voters/upload       | Upload voter list CSV       |
| POST /api/voters/authenticate | Voter login with PIN        |
| GET  /api/candidates          | Get candidates in a session |
| POST /api/votes/cast          | Cast a vote                 |

---

## 🧠 UX Suggestions

- Show a progress/loading state during token generation
- Allow voter to copy their voting token on submission success
- Disable inputs and show status once vote is cast

---

For assistance with components, API mocks, or integration help, contact the backend/quantum dev lead.
