## Post Details Application

This is a React application that allows users to view a list of posts, search for posts by title, and view post details with associated comments.

## Features

- **View All Posts**: Displays a list of posts with titles and bodies.
- **Search by Title**: Users can filter posts by typing in a search bar.
- **View Post Details**: Users can view detailed information about a specific post, including comments.
- **Pagination**: Allows users to navigate between pages of posts.
- **Smooth Animations**: Uses Framer Motion to animate posts and transitions.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For handling routing and navigation between pages.
- **Framer Motion**: For adding animations.
- **JSONPlaceholder API**: Simulates fetching data such as posts and comments.

## Setup Instructions

npm install
npm run dev
Visit http://localhost:5173 in your browser to view the app.

## How to Use

    Search Posts: Type in the search bar to filter posts by title.
    View Post Details: Click on a post to view more details and comments.
    Back Navigation: After viewing a post, click "Back" to return to the list of posts.

## Project Structure

    src/: Main source folder.
        components/: Contains UI components (AllPosts.js, PostDetails.js, etc.).
        context/: Manages fetching and sharing data across components.
        lib/: Contains utility functions to fetch data.
        App.js: Entry point that sets up routes and layout