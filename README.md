# Task Management Application

A full-stack web application for managing user tasks with a .NET Core backend API, React frontend, and SQL Server database. The application allows users to create, view, update, and delete tasks with associated user information.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Task Management**: Create, read, update, and delete tasks
- **User Information**: Each task includes assignee details (Full Name, Email, Phone)
- **Task Properties**:
  - Title (required)
  - Description (required)
  - Due Date (required)
  - Priority (Low, Medium, High)
  - Status (New, In Progress, Completed)
- **Validation**: Comprehensive validation on all fields (backend and frontend)
- **State Management**: Redux Toolkit for efficient state management
- **Responsive UI**: Modern, user-friendly interface
- **Dashboard**: Statistics overview (Total Tasks, Pending, Completed)

## 🛠 Technology Stack

### Backend
- **.NET 8.0** - Web API framework
- **Entity Framework Core 8.0.22** - ORM for database operations
- **SQL Server** - Database
- **Swagger/OpenAPI** - API documentation

### Frontend
- **React 19.2.0** - UI library
- **Redux Toolkit 2.11.2** - State management
- **Axios 1.13.2** - HTTP client
- **Vite 7.2.4** - Build tool and dev server
- **Lucide React** - Icon library

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/8.0)
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **SQL Server** (Express edition or higher) - [Download](https://www.microsoft.com/sql-server/sql-server-downloads)
- **SQL Server Management Studio (SSMS)** (optional but recommended) - [Download](https://docs.microsoft.com/sql/ssms/download-sql-server-management-studio-ssms)
- **Git** - [Download](https://git-scm.com/downloads)

## 📁 Project Structure

```
TaskManagement/
├── backend/
│   └── TaskManagement/
│       ├── TaskManagement.Api/          # .NET Core Web API
│       │   ├── Controllers/              # API Controllers
│       │   ├── Data/                     # DbContext
│       │   ├── Dtos/                     # Data Transfer Objects
│       │   ├── Models/                   # Entity Models
│       │   ├── Migrations/               # EF Core Migrations
│       │   └── Program.cs                # Application entry point
│       └── TaskManagement.Tests/         # Unit tests
│
└── frontend/
    └── task-management-frontend/         # React Application
        ├── src/
        │   ├── api/                      # API client functions
        │   ├── app/                     # Redux store configuration
        │   ├── components/              # React components
        │   ├── features/                # Redux slices
        │   └── main.jsx                 # Application entry point
        └── package.json
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TaskManagement
```

### 2. Backend Setup

#### Step 1: Navigate to Backend Directory

```bash
cd backend/TaskManagement/TaskManagement.Api
```

#### Step 2: Update Database Connection String

Open `appsettings.json` and update the connection string to match your SQL Server instance:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=TaskManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

**Note**: Adjust the server name if you're using a different SQL Server instance (e.g., `localhost`, `localhost\\MSSQLSERVER`, or a named instance).

#### Step 3: Restore NuGet Packages

```bash
dotnet restore
```

#### Step 4: Apply Database Migrations

```bash
dotnet ef database update
```

This will create the database and all necessary tables.

**Alternative**: If you prefer to create the database manually:
1. Create a database named `TaskManagementDB` in SQL Server
2. Run the migrations: `dotnet ef database update`

### 3. Frontend Setup

#### Step 1: Navigate to Frontend Directory

```bash
cd ../../frontend/task-management-frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Update API URL (if needed)

If your backend runs on a different port, update the API URL in `src/api/tasksApi.js`:

```javascript
const API_URL = 'https://localhost:7090/api/Tasks'
```

## ▶️ Running the Application

### Running the Backend

1. Navigate to the API project:
   ```bash
   cd backend/TaskManagement/TaskManagement.Api
   ```

2. Run the application:
   ```bash
   dotnet run
   ```

3. The API will be available at:
   - **HTTPS**: `https://localhost:7090`
   - **HTTP**: `http://localhost:5000` (if configured)
   - **Swagger UI**: `https://localhost:7090/swagger` (in development mode)

### Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend/task-management-frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The application will be available at:
   - **Frontend**: `http://localhost:5173`

### Accessing the Application

1. Open your browser and navigate to `http://localhost:5173`
2. The application should connect to the backend API automatically
3. If you encounter CORS issues, ensure the backend is running and the CORS policy in `Program.cs` allows `http://localhost:5173`

## 🔌 API Endpoints

### Base URL
```
https://localhost:7090/api/Tasks
```

### Endpoints

#### 1. Get All Tasks
```http
GET /api/Tasks
```

**Response**: Array of task objects
```json
[
  {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "dueDate": "2024-12-31T00:00:00",
    "priority": "High",
    "status": "New",
    "createdAt": "2024-01-01T00:00:00",
    "userFullName": "John Doe",
    "userEmail": "john@example.com",
    "userPhone": "+1234567890"
  }
]
```

#### 2. Create Task
```http
POST /api/Tasks
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description",
  "dueDate": "2024-12-31T00:00:00",
  "priority": "Medium",
  "userFullName": "Jane Doe",
  "userEmail": "jane@example.com",
  "userPhone": "+1234567890"
}
```

**Response**: Created task object (same structure as Get All Tasks)

#### 3. Update Task
```http
PUT /api/Tasks/{id}
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "dueDate": "2024-12-31T00:00:00",
  "priority": "High",
  "status": "InProgress"
}
```

**Response**: Updated task object

#### 4. Delete Task
```http
DELETE /api/Tasks/{id}
```

**Response**: `204 No Content`

### Priority Values
- `Low`
- `Medium`
- `High`

### Status Values
- `New`
- `InProgress`
- `Completed`

## 🗄️ Database Schema

### TaskItem Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key, Identity |
| Title | nvarchar(100) | Required, Not Null |
| Description | nvarchar(4000) | Required, Not Null |
| DueDate | datetime2 | Required, Not Null |
| CreatedAt | datetime2 | Required, Not Null, Default: GETUTCDATE() |
| Priority | int | Required, Not Null (Enum) |
| Status | int | Not Null (Enum, Default: New) |
| UserId | int | Required, Foreign Key |

### User Table
| Column | Type | Constraints |
|--------|------|-------------|
| Id | int | Primary Key, Identity |
| FullName | nvarchar(100) | Required, Not Null |
| Email | nvarchar(150) | Required, Not Null, Unique |
| Phone | nvarchar(20) | Required, Not Null |

### Relationships
- **User** → **TaskItem**: One-to-Many (One user can have many tasks)
- **Cascade Delete**: Deleting a user will delete all associated tasks

## ✅ Validation

### Backend Validation

All DTOs include validation attributes:

- **Title**: Required, Max Length 100 characters
- **Description**: Required, Max Length 4000 characters
- **DueDate**: Required
- **Priority**: Required, Must be valid enum value
- **UserFullName**: Required, Max Length 100 characters
- **UserEmail**: Required, Valid email format, Max Length 150 characters
- **UserPhone**: Required, Valid phone format, Max Length 20 characters

### Frontend Validation

The TaskModal component includes client-side validation:
- Required field validation
- Email format validation
- Phone number format validation
- Visual error indicators (red borders on invalid fields)

## 🧪 Testing

### Backend Tests

Navigate to the test project:
```bash
cd backend/TaskManagement/TaskManagement.Tests
```

Run tests:
```bash
dotnet test
```

### Frontend Tests

Navigate to the frontend directory:
```bash
cd frontend/task-management-frontend
```

Run tests:
```bash
npm test
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Problem**: Cannot connect to SQL Server

**Solutions**:
- Verify SQL Server is running
- Check the connection string in `appsettings.json`
- Ensure SQL Server allows TCP/IP connections
- Verify Windows Authentication or SQL Authentication credentials

#### 2. CORS Errors

**Problem**: Frontend cannot connect to backend API

**Solutions**:
- Ensure backend is running
- Verify CORS policy in `Program.cs` allows `http://localhost:5173`
- Check browser console for specific CORS error messages

#### 3. Port Already in Use

**Problem**: Port 7090 or 5173 is already in use

**Solutions**:
- Stop the application using the port
- Change the port in `launchSettings.json` (backend) or `vite.config.js` (frontend)
- Update the API URL in `tasksApi.js` if backend port changes

#### 4. Migration Errors

**Problem**: Database migrations fail

**Solutions**:
- Ensure database exists or can be created
- Check connection string is correct
- Verify Entity Framework tools are installed: `dotnet tool install --global dotnet-ef`
- Try deleting existing migrations and recreating them

#### 5. Frontend Build Errors

**Problem**: npm install or build fails

**Solutions**:
- Clear node_modules and package-lock.json, then reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Ensure Node.js version is 18 or higher
- Check for version conflicts in package.json

## 📝 Additional Notes

### Development Mode

- Backend runs with Swagger UI enabled in development
- Frontend uses Vite's hot module replacement (HMR) for fast development
- CORS is configured to allow localhost:5173

### Production Considerations

Before deploying to production:
1. Update CORS policy to allow only your production domain
2. Configure proper connection strings for production database
3. Enable HTTPS and configure SSL certificates
4. Set up proper logging and error handling
5. Configure environment-specific appsettings files
6. Build frontend for production: `npm run build`
---

**Happy Task Managing!** 🎉

