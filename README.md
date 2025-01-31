User Gallery Hub

Project Overview

User Gallery Hub is a web application that allows users to view, manage, and interact with a collection of user-uploaded photos. The platform provides an intuitive interface for browsing images, adding new photos, and editing existing ones.

Features

View a gallery of user photos

Upload new images

Edit image details

Responsive design for seamless experience across devices

Deployed on Vercel for live access

Technologies Used

Frontend: Angular

Backend: JSON Placeholder API (for demo data)

Styling: SCSS, Bootstrap

State Management: Angular Services

Deployment: Vercel

Installation and Setup

To run the project locally, follow these steps:

Prerequisites

Node.js (v14+ recommended)

Angular CLI

Steps

Clone the repository:

git clone https://github.com/jeremiahongwenyi/User_Gallery_Hub.git

Navigate to the project folder:

cd User_Gallery_Hub

Install dependencies:

npm install

Start the development server:

ng serve

Open the application in a browser:

http://localhost:4200/

Deployment

The project is deployed on Vercel. You can access it live at:
User Gallery Hub

Folder Structure

User_Gallery_Hub/
│── src/
│ ├── app/
│ │ ├── components/ # Reusable UI components
│ │ ├── services/ # API and data services
│ │ ├── models/ # Data models
│ │ ├── pages/ # Main application pages
│ ├── assets/ # Static assets (images, styles)
│ ├── styles/ # Global stylesheets
│── angular.json # Angular configuration
│── package.json # Dependencies and scripts
│── README.md # Documentation

API Integration

The application uses the JSON Placeholder API to fetch and manage images:

GET /photos - Fetch all photos

POST /photos - Add a new photo

PUT /photos/:id - Edit a photo

Testing

Run unit tests using:

ng test

Contribution

If you wish to contribute:

Fork the repository

Create a new branch (feature-branch)

Commit your changes

Push to your fork and create a pull request

Contact

For any questions or support, feel free to reach out at:

Email: jeremiahongwenyi@gmail.com

GitHub: Jeremiah Ongwenyi Omare
