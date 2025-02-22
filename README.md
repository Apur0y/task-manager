# Task Management Application

## 📌 Short Description
A feature-rich Task Management Application that allows users to manage their tasks efficiently. Users can add, edit, delete, and reorder tasks within three categories: **To-Do, In Progress, and Done** using a drag-and-drop interface. The app ensures **real-time updates**, seamless user authentication, and persistent task storage.

## 🔥 Live Links
- **Live Application:** [Your Live Link Here](https://task-manager-5fc26.web.app/)
- **Github Repository:** [GitHub Frontend](https://github.com/Apur0y/task-manager)


## 📦 Dependencies
### Frontend:
- **React.js (Vite.js)** – Fast and lightweight development
- **Tailwind CSS** – For a clean and responsive UI
- **React Beautiful DnD** – Drag-and-drop functionality
- **Firebase Authentication** – Google Sign-in

### Backend:
- **Node.js & Express.js** – API development
- **MongoDB & Mongoose** – Database management
- **WebSockets / Change Streams** – Real-time updates

## 🏗️ Installation Steps

### 🔹 Backend Setup
1. Clone the repository:
   ```sh
   git clone your-backend-repo-link
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### 🔹 Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## 🛠️ Technologies Used
- **Frontend:** React.js, Vite.js, Tailwind CSS, React Beautiful DnD, Firebase Authentication
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, WebSockets / Change Streams
- **Deployment:** Vercel (Frontend), Render / Heroku (Backend)

---



