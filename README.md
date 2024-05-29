# AnchorWatch

## Overview

AnchorWatch is a web application designed to monitor Bitcoin transaction data. Users can authenticate using email or OAuth providers to view and manage transaction information on a dashboard. This project integrates with the Mempool.space API to fetch real-time Bitcoin transaction data.

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine and navigate into the project directory:

```bash
git clone https://github.com/justins11/anchordemo
cd anchorwatch

## Install Dependencies

npm install

## Configure Firebase

1. Create a Firebase project named AnchorWatch.
2. Enable Email/Password and OAuth sign-in methods in the Firebase console.
3. Copy your Firebase configuration and replace the placeholder values in the .env file with your actual Firebase configuration values.

## Deploy the Application

Deploy your application using a hosting service like Vercel, Netlify, or Firebase Hosting. Follow the specific instructions for the service you choose:

Vercel: Follow the Vercel deployment guide.
Netlify: Follow the Netlify deployment guide.
Firebase Hosting: Follow the Firebase Hosting deployment guide.


## API
AnchorWatch integrates with the Mempool.space API to fetch Bitcoin transaction data. For more information on the API, refer to the Mempool API Documentation.

##Environment Variables

REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

##Contributing
We welcome contributions to AnchorWatch! Please fork the repository and submit pull requests for any enhancements or bug fixes.

##License
AnchorWatch is open-source software licensed under the MIT license.