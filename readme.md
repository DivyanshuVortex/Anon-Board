# Anon Board

Anon Board is a simple web application for anonymous feedback. It allows users to securely share and view feedback, promoting open and honest communication without revealing identities.

🚀 **Live Demo**  
You can try a live version of Anon Board here: [https://anon-board-six.vercel.app](https://anon-board-six.vercel.app)

🛠️ **Tech Stack**  
React, React Toast, Node.js, Express, PostgreSQL, Prisma ORM, JWT, bcrypt, Zod

✨ **Key Features**  
- Submit feedback anonymously  
- View all feedback from other users in real-time  
- Secure authentication and password hashing  
- Responsive and user-friendly design

⚙️ **Local Setup**  

Follow these steps to get the project running on your local machine.  

**Clone the Repository**  
`git clone https://github.com/DivyanshuVortex/Anon-Board.git`  
`cd Anon-Board`  

**Install Dependencies**  
Navigate to the server and client directories and install their dependencies:  
`cd server`  
`npm install`  
`cd ../client`  
`npm install`  

**Configure Environment Variables**  
Create `.env` files in the client and server folders.  

*Frontend (`client/.env`)*  
`VITE_API_URL=http://localhost:3000`  
`# VITE_API_URL=https://anon-board.onrender.com (for production)`  

*Backend (`server/.env`)*  
`PORT=3000`  
`JWT_SECRET=DivyanshuChandraVortex`  
`DATABASE_URL="postgresql://neondb_owner:npg_cYjLekg36bHZ@ep-holy-grass-abxb4m6s-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"`  

🚨 **IMPORTANT:** Replace placeholder values with your own unique and secure secrets. Do not use example values in a public repository.  

**Run Database Migrations**  
Make sure you are in the server directory, then run:  
`npx prisma migrate dev --name init`  

**Start the Applications**  
Open two terminal windows:  
In the first terminal (backend): `cd server` and `npm run dev`  
In the second terminal (frontend): `cd ../client` and `npm start`  

**Open the App**  
Once both backend and frontend are running, open your browser and go to [http://localhost:5173](http://localhost:5173)  
