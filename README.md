# notes-app

A notes app is a digital tool that allows users to create, organize, and store their notes in one convenient place. It provides a user-friendly interface for jotting down thoughts, ideas, tasks, reminders, and any other information that needs to be remembered or referenced later. Thenotes app helps users stay organized, increase productivity, and easily access their notes whenever and wherever they need them.

## Features

- A fully functioning app where you can create, edit, and delete notes.
- Validation on both the frontend and the backend to keep things in check
- Responsive design

## Stack

### Frontend

- React
- Typescript

### Backend

- Node.js
- Exress
- Typescript
- <details>
    <summary>Prisma</summary>
    <a href="https://www.prisma.io">Prisma</a> is a server-side library that helps developers read and write data to the database in an intuitive, efficient and safe way.
     </details>
- <details>
    <summary>ElephantSQL</summary>
    <a href="https://www.elephantsql.com">ElephantSQL</a> is a PostgreSQL database hosting service that makes it easy to set up, maintain, and scale your PostgreSQL database.
  </details>

  ## Get started

- Clone this repository with `git clone https://github.com/CodeSpellcaster/notes-app.git`
- `cd notes-app`

  ### Frontend

- go to the `frontend` folder
- install dependencies `npm i`
- run frontend part `npm start`

### Backend

- go to the `backend` folder
- install dependencies `npm i`
- run backend part `npm start`

### Postgres Database

- Step 1: Sign Up / Log In
  Navigate to the ElephantSQL website.
  If you don't have an account, you can sign up for free. If you already have one, go ahead and log in.

- Step 2: Create a New Instance
  Once logged in, you'll find yourself on the "Dashboard" page.
  Click on the "Create New Instance" button.
  You'll be taken to a page where you can set the details for your new PostgreSQL database instance.

- Step 3: Choose a Plan
  You can start with a free "Tiny Turtle" plan, which is perfect for small projects and testing.
  Select the plan that best suits your needs and click "Select".

- Step 4: Configure Your Instance
  You'll be asked to name your instance. Choose a name that you'll remember and that describes the purpose of the database.
  You can also select the data center that is geographically closest to you or your users for better performance.
  Click on "Review" and then "Create instance" to finalize the creation.

- Step 5: Access Your Database
  Once the instance is created, click on it in the Dashboard.
  Here, you'll see the "Details" tab which includes all the information you need to connect to your database: URL, User & Default database, Password, and more.
  Make sure to copy the connection URL that appears on your dashboard. This URL includes your username and password to the database, so keep it secure.

- Step 6: Create an `.env` File
  Navigate to your notes-app-server directory and create a new `.env` file.
  Open this file and add the following line to specify the database connection URL:
  `DATABASE_URL="your_connection_url_here"`
  You will not accidentally commit this `.env` file to your Git repository due to `.gitignore` settings so your credentials are secure.

- Step 7: Generate Prisma Client and Database Table
  Run the following command to generate your Prisma client and create the database tables: `npx prisma db push`
