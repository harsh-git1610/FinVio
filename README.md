# Project Status: Ongoing

## Implemented Features

### Authentication
- Initially implemented **custom authentication**
- Migrated to **Clerk**
- Supports **multiple authentication methods**:
  - Email verification / magic link
  - Email + password login

### Invoice Generation
- Created a **draft invoice generation page**
- Invoice creation flow is functional at a basic level

###  User Management
- Implemented **lazy user creation**
  - User records are created in the database only when required
  - Authentication handled by Clerk
  - User data synced from Clerk to the application database
    
### Invoice Generation 
- Implemented all invoice related features - including pdf

### AI Assistant 
 - Integrated Gemini
 - Bounded it to the current scope of Application
 - Made it context aware 
   
## In Progress / Planned Features
-Landing Page

## Tech Stack
- Next.js
- Clerk (Authentication)
- Database (TBD / PostgreSQL / MongoDB)
- PDF Generation (TBD)

## Current Focus
-Landing Page and minute ui changes 

## Notes
- This project is under active development.
- Features and implementation details may change.
