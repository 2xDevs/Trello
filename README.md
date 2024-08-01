# Trello Task Management Application

## Overview

This is a web-based task management application similar to Trello. Users can create, manage, and track tasks through a personal board with four columns: "To-Do", "In Progress", "Under Review", and "Completed". The application supports user authentication, task creation, editing, deletion, and drag-and-drop functionality.

## Features

1. **User Authentication:**

   - Signup and login functionality with email and password using NextAuth.
   - Secure password storage and user session management.

2. **Task Board:**

   - Personal task board with columns: "To-Do", "In Progress", "Under Review", and "Completed".

3. **Task Management:**

   - Create, edit, and delete tasks.
   - Tasks have title, description, status, priority, and deadline.

4. **Drag and Drop Functionality:**

   - Move tasks between columns with automatic status update.

5. **Data Persistence:**
   - Store user data and tasks in MongoDB.
   - Ensure tasks are user-specific.

## Technologies Used

- **Frontend & Backend:** Next.js with TypeScript
- **Authentication:** NextAuth
- **Database:** MongoDB
- **State Management:** Redux or React Context API (if used)
- **Styling:** CSS (Methodology or framework of your choice)

## Setup Instructions

### Prerequisites

- Node.js (v18.0.0 or later)
- MongoDB (ensure you have a running MongoDB instance or use MongoDB Atlas)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/2xDevs/Trello
   cd Trello
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Start the Development Server:**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`.

### Deployment

Deploy your application using a platform like Vercel. Ensure that environment variables are configured in the deployment settings.

## Usage

1. **Sign Up / Log In:**

   - Navigate to the login/signup page.
   - Enter your email and password to create an account or log in.

2. **Task Board:**

   - After logging in, you will see your personal task board.
   - Use the "Add Task" button to create new tasks.

3. **Task Management:**
   - Click on tasks to edit or delete them.
   - Use drag-and-drop to move tasks between columns.
