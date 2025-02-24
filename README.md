# User CRUD Application

This project is a User CRUD (Create, Read, Update, Delete) application built with Django for the backend and React for the frontend. 

## Project Structure

- **user_crud/**: Contains the Django application.
- **user_crud_js_react/**: Contains the React frontend application.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Python 3.x
- Node.js (for the React frontend)
- pip (Python package installer)

### Backend Setup

1. **Create a virtual environment**:
   ```bash
   python -m venv venv
   ```
2. **Activate the virtual environment**:
   On Windows:
    ```bash
   venv\Scripts\activate
   ```
   On Mac:
    ```bash
   source venv/bin/activate
   ```
3. **Install required packages**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```
5. **Start the backend server**:
    ```bash
   python manage.py runserver
   ```
   
### Frontend Setup
1. **Navigate to the frontend directory**:
   ```bash
   cd user-crud-js-react
   ```
2. **Install required packages**:
    ```bash
   yarn
   ```
3. **Start the React application**:
   ```bash
   yarn start
   ```

### Accessing the Application
The React frontend will be available at http://localhost:3000/.