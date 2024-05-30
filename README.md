# AnchorWatch

## Overview

AnchorWatch is a web application designed to monitor Bitcoin transaction data. Users can authenticate using email or OAuth providers to view and manage transaction information on a dashboard. This project integrates with the Mempool.space API to fetch real-time Bitcoin transaction data.

## Setup Instructions

### 1. Clone the Repository
First, clone the repository to your local machine and navigate into the project directory:
```
git clone https://github.com/justins11/anchordemo
cd anchorwatch
```

## Set Environment Variables env
```
REACT_APP_NAME=AnchorWatch
REACT_APP_BASE_URL=https://anchorwatch.dempire.co
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
## Configure Firebase
1. Create a Firebase project named AnchorWatch.
2. Enable Email/Password and OAuth sign-in methods in the Firebase console.
3. Copy your Firebase configuration and replace the placeholder values in the .env file with your actual Firebase configuration values.


## API
AnchorWatch integrates with the Mempool.space API to fetch Bitcoin transaction data. For more information on the API, refer to the [Mempool API Documentation](https://mempool.space/docs/api/rest)

## Install Dependencies
```
npm install

npm run dev or yard start
```