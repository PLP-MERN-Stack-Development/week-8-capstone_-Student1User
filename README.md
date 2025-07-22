# ✨ MindEase: Your AI-Powered Mental Health Companion ✨

## 🚀 Project Overview

MindEase is a comprehensive, AI-powered mental wellness platform designed to empower individuals on their journey to emotional well-being. It seamlessly blends cutting-edge artificial intelligence with practical self-care tools, offering a private and accessible sanctuary for reflection, tracking, and personalized guidance.

**💡 Important Note:** This project is currently an **MVP (Minimum Viable Product)**. Our grand vision is to transition to a full production application once we secure support from passionate investors, allowing us to scale and unlock its full potential!

**Key Features:**

*   🗣️ **AI-Powered Conversations:** Dive into intelligent chats with our AI companion, powered by Groq's Llama 3 model. Experience empathetic listening, personalized support, and guidance tailored to your unique beliefs and needs.
*   📈 **Mood Tracking:** Chart your emotional landscape with intuitive daily mood logging. Gain profound insights into your emotional patterns through visual analytics and trend reports.
*   ✍️ **Personal Journal:** A secure and private digital haven for your thoughts. Express yourself freely with robust tagging and search capabilities, ensuring your reflections are always at your fingertips.
*   🌍 **Multi-faith Support:** Built with inclusivity at its core, MindEase allows you to specify your religious/spiritual preferences, paving the way for future integration of deeply personalized spiritual content.
*   📊 **Admin Dashboard:** A powerful administrative hub for monitoring simulated user activity, visualizing overall mood trends, analyzing sentiment distribution, and generating AI-driven recommendations for enhanced user support.

## 🤝 UN Sustainable Development Goals (SDGs) Alignment

MindEase proudly contributes to a better world by aligning with the following United Nations Sustainable Development Goals:

### 🎯 **SDG 3: Good Health and Well-being**
MindEase is fundamentally dedicated to fostering mental health and well-being for everyone. By providing accessible AI-powered support, mood tracking, and journaling tools, we aim to:
*   **Break down mental health stigma:** Offer a private, non-judgmental space where individuals can openly address their emotional needs.
*   **Expand access to mental health resources:** Harness technology to make vital mental wellness support more readily available, especially for those facing barriers to traditional services.
*   **Champion self-care and emotional literacy:** Empower users to proactively understand and master their emotions through insightful self-reflection and data-driven awareness.

### 🎯 **SDG 10: Reduced Inequalities**
By democratizing access to mental health support through our innovative AI-driven platform, MindEase actively works to reduce disparities in healthcare access. We strive to:
*   **Bridge gaps in mental health services:** Provide an invaluable supplementary tool for individuals in underserved communities or those with limited financial access to professional therapy.
*   **Cultivate inclusive support:** The platform's thoughtful design, including the option for multi-faith preferences, ensures that mental wellness support is equitable and welcoming for all backgrounds and beliefs.

## 🛠️ Technologies Used

MindEase is forged with a modern, robust technology stack, guaranteeing a responsive, secure, and scalable application experience:

*   **Frontend:**
    *   [Next.js](https://nextjs.org/) (App Router)
    *   [React](https://react.dev/)
    *   [Tailwind CSS](https://tailwindcss.com/) for lightning-fast, utility-first styling
    *   [shadcn/ui](https://ui.shadcn.com/) for crafting beautiful, accessible UI components
    *   [Lucide React](https://lucide.dev/) for crisp, modern icons
*   **Backend/API:**
    *   Next.js Route Handlers
    *   [AI SDK](https://sdk.vercel.ai/) with [Groq](https://groq.com/) provider (leveraging the Llama 3 8B model for blazing-fast inference!)
*   **Authentication & Database:**
    *   [Supabase](https://supabase.com/) for seamless user authentication and robust data management
*   **Charting & Data Visualization:**
    *   [Recharts](https://recharts.org/en-US/) for dynamic mood trends and sentiment distribution charts in the admin dashboard.
*   **Package Manager:** [Bun](https://bun.sh/) (for a speedy development experience!)

## 🧑‍💻 Team & Collaboration

This impactful project was brought to life by a dedicated team of four students as our final capstone for the **PLP (Power Learn Project)** program. After eight weeks of intensive **MERN stack** (MongoDB, Express.js, React, Node.js) development, we had the incredible opportunity to collaborate with an **AI for Software Engineering specialist**. This pivotal collaboration allowed us to pivot from our MERN roots, embracing modern Next.js features and powerful AI models to deliver this comprehensive mental wellness companion.

**Our Brilliant Team:**

*   **Emmanuel M Jesse**: https://github.com/Student1User
*   **Mary Karago**: https://github.com/Syntax-Symphony
*   **Redempta Mwikali**: https://github.com/mwikali29 


## 🚀 Getting Started

Ready to dive into MindEase? Here's how to get it running locally for development:

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-url>
    cd mindease-clone
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    bun install
    \`\`\`
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of your project and populate it with the following:
    \`\`\`env
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
    GROQ_API_KEY=YOUR_GROQ_API_KEY
    \`\`\`
    *   Find your Supabase URL, Anon Key, and Service Role Key in your Supabase project settings (Project Settings > API).
    *   Grab your Groq API Key from the [Groq Console](https://console.groq.com/keys).
4.  **Fire up the development server:**
    \`\`\`bash
    bun run dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) in your browser and embark on your journey!

## 🔐 Authentication Process

MindEase leverages Supabase for a secure and streamlined user authentication experience.

### User Registration
1.  Head over to the `/auth` page.
2.  Click on the "Sign Up" tab.
3.  Fill in your details: Full Name, Username, Email, Password, Confirm Password, Gender, and Religion/Spirituality. You can even upload a profile picture if you like!
4.  Hit "Create Account".
5.  **Crucial Step: Email Validation!** Supabase will send a confirmation email to your provided address. You **must click the verification link** in this email to activate your account. Without it, login won't be possible.

### User Login
1.  Navigate to the `/auth` page.
2.  Ensure the "Sign In" tab is selected.
3.  Enter your registered Email and Password.
4.  Click "Sign In".
5.  Upon successful login, you'll be whisked away to your personalized `/dashboard` page!


## 🌐 Deployment

This project is engineered for seamless, one-click deployment on [Vercel](https://v0-mind-ease-clone.vercel.app/)!

1.  **Connect your Git repository** (e.g., GitHub, GitLab, Bitbucket) to your Vercel account.
2.  **Configure Environment Variables** directly on Vercel:
    *   \`NEXT_PUBLIC_SUPABASE_URL\`
    *   \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`
    *   \`SUPABASE_SERVICE_ROLE_KEY\`
    *   \`GROQ_API_KEY\`
    Make sure these are securely set in your Vercel project settings under "Environment Variables".
3.  Vercel will intelligently detect the Next.js framework and deploy your application with ease.

## 🔮 Future Enhancements

As an MVP, MindEase is on an exciting journey of continuous improvement and expansion! Our roadmap is packed with innovative features:

*   Real-time integration of actual user data from Supabase into the admin dashboard.
*   Full multi-language support (i18n) to reach a global audience.
*   A comprehensive, user-friendly FAQ section.
*   An engaging newsletter signup feature to keep our community connected.
*   Robust data export functionality for users to control their information.
*   Sophisticated legal document versioning for transparency and compliance.
*   A dynamic compliance dashboard for administrative oversight.
*   Instant live chat support for immediate assistance.
*   Expansion of multi-faith spiritual content, deeply personalized to user preferences.
*   Advanced sentiment analysis for richer insights from journal entries and chat conversations.
*   Development of personalized wellness plans and goal tracking features.

---

Thank you for exploring MindEase! We are incredibly excited about its potential to serve as a transformative tool for mental well-being.
