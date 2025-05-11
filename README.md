# 🎯 CRM Frontend

This is the frontend for the CRM (Customer Relationship Management) application, built with **Next.js** and **Tailwind CSS**. It provides an intuitive and responsive user interface for managing campaigns, leads, contacts, and more — all authenticated securely via Google OAuth.

Live: 👉 [CRM Frontend App](https://crm-frontend-one-chi.vercel.app/)

---

## 🚀 Features

- 🔐 **Google OAuth 2.0 Authentication**
- 👤 **Role-based dashboards** (User/Manager)
- 📊 **Campaign and Lead management**
- ✉️ **Inbox with AI-generated smart message suggestions**
- 💬 **DeepSeek AI integration** via OpenRouter for contextual message generation
- ⚙️ **Backend integration** with protected routes
- 🧭 **Responsive UI** using Tailwind CSS and modern design patterns

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Auth**: [Google OAuth 2.0](https://developers.google.com/identity)
- **AI Integration**: [DeepSeek via OpenRouter](https://openrouter.ai/)
- **HTTP Client**: Axios

---

## 📦 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pianist22/CRM-frontend.git
cd CRM-frontend
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Setup Environment Variables
Create a .env.local file and copy the variables from .env.sample.

Fill in the following required variables:
- NEXT_PUBLIC_BACKEND_API_URL
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET
- NEXTAUTH_URL

## CRM ACHITECTURE
<img src="https://github.com/pianist22/Images/blob/main/CRM-achitecture.jpg" alt="crm-acrhitecture" width="400" height='500'>

## 👉 Optional (For AI Integration)

To enable smart message suggestions, 

add: OPENROUTER_API_KEY → [Get it here](https://openrouter.ai/)

You can use the free DeepSeek-R3 model available on OpenRouter.

## 💡 AI Integration (DeepSeek via OpenRouter)
The application uses OpenRouter to call the DeepSeek-R3 language model to generate AI-powered message suggestions for your CRM campaigns.

Example API Usage#
```ts
const res = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "deepseek-chat",
    messages: [{ role: "user", content: "Suggest a follow-up message to a lead." }],
  },
  {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
  }
);
```

## ⚠️ Assumptions & Limitations

- Google Authentication is mandatory; no manual login support is provided.
- AI message suggestion is optional and only works with a valid OpenRouter API Key.
- The backend expects valid Google auth tokens — unauthenticated users cannot access protected routes.
- This is a prototype version — performance and scalability features may be added in future updates.

## 🔗 Backend Repository

👉 [CRM Backend GitHub Repo](https://github.com/pianist22/CRM-Backend)

# 🧑‍💼 Contact & Support
For feedback, issues, or collaboration:
- GitHub: [pianist22](https://github.com/pianist22)
- LinkedIn: [Priyanshu Saha](https://www.linkedin.com/in/priyanshu-saha-339571262/)


## ✅ Summary
This frontend application acts as the visual layer of your CRM platform — complete with Google authentication, user-specific routing, campaign management, and optional smart AI suggestions for business communication. Built with performance and clarity in mind using the modern power of Next.js.






