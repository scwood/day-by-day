Day by Day
==========

API Design
----------

### Auth

- POST /api/auth/token
  - Attempt to authenticate user and create a token
- POST /api/auth/signUpEmail
  - Send sign up email

### Users

- GET /api/users/me
  - Get the currently authenticated user
- PATCH /api/users/me
  - Update the currently authenticated user
- POST /api/users
  - Create a new user

### Entries

- GET /api/entries
  - Get the entries for the currently authenticated user
  - Possible query params: startDate, endDate
- DEL /api/entries/:id
  - Delete entry
- PATCH /api/entries/:id
  - Edit specific entry
