# AI Interviewer Platform

An innovative platform that leverages artificial intelligence to conduct realistic, voice-based interviews. This project uses Vapi.ai for the conversational AI agent and Firebase for backend services, providing a seamless experience for generating and conducting AI-powered interviews.

## 🚀 Features

- **AI-Powered Voice Interviews**: Conducts interviews using a sophisticated and interactive voice AI.
- **Custom Interview Generation**: Features a form to generate and customize interview sessions based on specific roles or questions.
- **Real-time, Natural Conversation**: Engages with candidates in a fluid, human-like conversational manner.
- **Firebase Integration**: Utilizes Firebase for robust backend services, including authentication and data storage.

## 🛠️ Tech Stack

- **Frontend**: [e.g., React, Next.js, Vue.js]
- **Conversational AI**: [Vapi.ai](https://vapi.ai/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Authentication, Firestore)
- **Styling**: [e.g., Tailwind CSS, Material-UI]

## 📋 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- A Firebase project with Authentication and Firestore enabled.
- A Vapi.ai account and API key.

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/Hayotunday/ai-interviewer.git
    cd ai-interviewer
    ```

2.  **Install dependencies:**

    ```sh
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following configuration. Replace the placeholder values with your actual credentials from Firebase and Vapi.ai.

    ```env
    # Firebase Configuration
    # Find these in your Firebase project settings
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

    # Vapi.ai Configuration
    # Find this in your Vapi.ai dashboard
    NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
    ```

4.  **Run the development server:**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

    Open http://localhost:3000 with your browser to see the result.

## Usage

Once the application is running:

1.  Navigate to the interview generator page.
2.  Fill out the form to specify the details of the interview you want to conduct.
3.  Start the interview session and interact with the AI interviewer via voice.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Happy interviewing!
