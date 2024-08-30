# Task Management System

## Project Overview

The Task Management System is a full-stack web application that allows users to manage their tasks efficiently. Users can register, log in, and create, read, update, and delete tasks. Each task consists of a title, description, status, and due date. The application is built using React and TypeScript for the frontend and Node.js with TypeScript for the backend. The system ensures secure user authentication and provides a responsive design for mobile and desktop users.

## Objective

To develop a Task Management System where users can:

- Register and log in to their accounts.
- Manage their tasks, including adding, editing, deleting, and marking tasks as completed.
- View a task dashboard with a list of tasks.
- Experience a responsive design suitable for mobile and desktop devices.

## Requirements

### Frontend (React + TypeScript)

- **Authentication Pages**: Login and registration pages for user authentication.
- **Task Dashboard**: A dashboard displaying a list of tasks.
- **Task Management**:
  - Add a new task.
  - Edit an existing task.
  - Delete a task.
  - Mark a task as completed.
- **Responsive Design**: The application is responsive on mobile and desktop devices (tablet support not required).

### Backend (Node.js + TypeScript)

- **Authentication**:
  - JWT-based authentication with endpoints for user registration and login.
  - Implement a Refresh Token mechanism for persistent sessions.
- **Task Endpoints**:
  - CRUD (Create, Read, Update, Delete) operations for tasks.
- **Database Schema**:
  - SQL schema for users and tasks, implemented using a relational database like PostgreSQL or MySQL.

### Advanced Concepts

- **Frontend**:
  - Effective use of React Hooks.
  - TypeScript interfaces and types for props and state.
- **Backend**:
  - Request validation and error handling.
  - TypeScript for type safety.
  - Environment variables for configuration.
- **Database**:
  - Use transactions where necessary.
  - Optimize queries for performance.
  - Implement indexing for faster data retrieval.

## Setup Instructions

### 1. Clone the Repository

Clone the frontend and backend branches of this repository to your local machine.

```bash
git clone https://github.com/AkshaysProjects/tasks
cd tasks
```

### 2. Backend Setup

#### Install Dependencies

Navigate to the backend directory and install the required dependencies:

```bash
cd backend
npm install
```

#### Environment Variables

Create a `.env` file in the backend directory and add the following environment variables:

```plaintext
DATABASE_URL=your_database_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

#### Build and Start the Backend

For production deployment:

```bash
npm run build
npm run start
```

For development:

```bash
npm run dev
```

### 3. Frontend Setup

#### Install Dependencies

Navigate to the frontend directory and install the required dependencies:

```bash
cd frontend
npm install
```

#### Environment Variables

Create a `.env` file in the frontend directory and add the following environment variable:

```plaintext
NEXT_PUBLIC_API_URL=your_backend_api_url
```

#### Build and Start the Frontend

For production deployment:

```bash
npm run build
npm run start
```

For development:

```bash
npm run dev
```

### 4. Deployed Application

The application is deployed and can be accessed at [https://tasks-rho-umber.vercel.app](https://tasks-rho-umber.vercel.app).

## Conclusion

The Task Management System provides an efficient way for users to manage their tasks with a user-friendly interface, secure authentication, and responsive design. The application is scalable and can be easily deployed on any server.
