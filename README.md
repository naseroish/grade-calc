# Gradiance Grade Calc

Welcome to the official repository of the Gradiance Grade Calc application. This application is designed to help students calculate their grades efficiently and accurately.

## Application Overview

Gradiance Grade Calc is more than just a grade calculator; it's a tool that helps students plan their study time and prioritize assignments. With its user-friendly interface and secure data storage in user accounts, it provides a seamless experience for students. Explore the application at:

[View Live Application](https://gradiance.azurewebsites.net/)

## Features and Technologies

This application is designed with functionality and user-friendliness in mind, utilizing the latest in web development technologies to ensure a seamless user experience across all devices. Here’s what makes it stand out:

  - Dynamic Content Management: Utilizes Supabase for data storage and retrieval, making grade calculations seamless and efficient.
  - Interactive UI/UX: Built with React and Tailwind CSS, offering a responsive and interactive user experience that makes grade calculation easy and intuitive.

## Tech Stack

  - **Frontend:** React + TypeScript + Vite for dynamic and responsive design.
  - **Backend:** [Supabase](https://supabase.com/) for database management, authentication, and backend functions.
  - **Deployment:** Hosted on [Azure](https://azure.microsoft.com), leveraging its services for optimal performance worldwide.

## Installation and Setup

To run this application locally, follow these steps:
  
  - Clone the repository

        git clone https://github.com/naseroish/grade-calc
        cd grade-calc

  - Install dependencies

        npm install

  - Set up Supabase

     - Create a Supabase account and a new project.
     - Obtain your unique Supabase URL and Anon Key.
     - Create the necessary tables as per the schema mentioned in the supabase-schema.sql file.

  - Configure environment variables

  - Create a **.env.local** file in the root directory and add your Supabase credentials:

        VITE_SUPABASE_URL=yourSupabaseUrl
        VITE_SUPABASE_KEY=yourSupabaseAnonKey

  - Run the application

        npm run dev

  The application should now be running on [localhost 5173](http://localhost:5173).

Thank you for visiting the Gradiance Grade Calc repository

<!-- ## Contributions

We're always open to feedback and contributions to improve the application. If you have ideas or suggestions, please feel free to fork the repository, make your changes, and submit a pull request.

Thank you for visiting the Gradiance Grade Calc repository. Let's create something amazing together! -->