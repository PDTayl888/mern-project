# yt_subscript_ 📺
yt_subscript_ is a full-stack MERN application that allows users to declutter their digital lives by organizing YouTube channel subscriptions into custom-curated categories. No more scrolling through endless subscription feeds—just the content you want, exactly where you want it.

Frontend deployed at https://yt-subscript.onrender.com/
Backend deployed at https://mern-project-41xe.onrender.com/
------------------------------------------

🚀 Project Description

I created this in hopes of keeping up with the several thousand YouTube channels I am subscribed to. My YouTube subscription notification feed often feels like a firehose of noise, mixing Kotlin tutorials with table tennis highlights and guitar gear reviews. yt_subscript_ is my attempt transforming the chaos into an intentional workspace. 
Here is what a you can do with yt_subscript:
Secure Access: Sign in quickly using a traditional email or your GitHub account to keep your curated lists private and safe.

Custom Categories: Group your favorite creators into custom folders like "Coding," "Music," or "Sports" to find exactly what you need.

Clean Dashboard: A high-contrast "Teal and Cyan" layout that automatically adjusts to look perfect on desktops, tablets, and smartphones.

Direct Links: Use "Channel Cards" to jump straight to a creator’s videos, allowing you to bypass the distracting YouTube homepage.

Validated Links: Easily add or edit channels with a built-in "safety net" that ensures every URL you save is a valid YouTube link.

Full Control: Quickly add, update, or delete categories and channels to keep your subscription feed clutter-free and organized.

------------------------------------------
🛠️ Tech Stack

Frontend: React (Vite), React Router, Context API, CSS3 (Flexbox).
Backend: Node.js, Express.js.
Database: MongoDB Atlas (Mongoose).
Authentication: Passport.js (GitHub Strategy), Bcrypt.js, JSON Web Tokens (JWT).
Deployment: Render (Web Services & Static Sites).

------------------------------------------
💻 Local Setup & Installation
Follow these steps to get a local copy up and running:

1. Clone the Repository:
git clone https://github.com/PDTayl888/mern-project

1. Setup the Backend:

Navigate to the /backend folder.

Run npm install.

Create a .env file and add the following:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173

Start the server: npm run dev.

3. Setup the Frontend:

Navigate to the /frontend folder.

Run npm install.

Start the app: npm run dev.

------------------------------------------
🛣️ API Endpoints

Authentication
Method   Endpoint                            Description
POST     /api/users/register                 Create a new user account
POST     /api/users/login                    Login with email/password
GET      /api/users/auth/github              Initialize GitHub OAuth flow
GET      /api/users/auth/github/callback     GitHub OAuth callback handled by Passport

Categories & Channels
Method   Endpoint                            Description
GET      /api/categories                     Retrieve all categories for the logged-in user
POST     /api/categories                     Create a new category
DELETE   /api/categories/:id                 Remove a category and its contents
POST     /api/categories/:id/channels        Add a YouTube channel to a category



