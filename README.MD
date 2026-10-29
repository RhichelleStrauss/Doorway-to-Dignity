# Doorway To Dignity 

<img alt="Doorway To Dignity banner" src="./documentation/image_assets/DoorwayToDignityGithubBanner.png" />

> **This is a student concept website, not the official Doorway To Dignity site.** No real donations are taken and no real volunteers are managed. For the real organisation, please visit [doorwaytodignity.org](https://doorwaytodignity.org).

## Live Links

**Presentation Video/Demo Link 
https://drive.google.com/drive/folders/1uFLuPtIjSZ_roOVFSiJ-c1Os3ApYE9iC?usp=sharing


| Platform | Frontend | Backend (API) |
|---|---|---|
| **Platform 1: Microsoft Azure (Platform 1 was used to collect Analytics** | [www.doorwaytodignityow251169.co.za](https://www.doorwaytodignityow251169.co.za/) | Azure App Service | Static Web App | Azure Web App
| **Platform 2: Render + AWS** | [doorway-to-dignity.onrender.com](https://doorway-to-dignity.onrender.com) | AWS Elastic Beanstalk |

Both deployments share the same MongoDB Atlas database, so an account created on one works on the other.

## Table of Contents

1. [About the Project](#1-about-the-project)
   - 1.1 [Overview](#11-overview)
   - 1.2 [Design Reference](#12-design-reference)
   - 1.3 [Built With](#13-built-with)
2. [Features](#2-features)
   - [Screenshots](#screenshots)
3. [Getting Started (Local Setup)](#3-getting-started-local-setup)
4. [Deployment Summary](#4-deployment-summary)
5. [Architecture](#5-architecture)
6. [SEO and Analytics](#6-seo-and-analytics)
7. [Challenges and Solutions](#7-challenges-and-solutions)
8. [Roadmap: Future Improvements](#8-roadmap-future-improvements)
9. [License](#9-license)
10. [Author](#10-author)
11. [Acknowledgements](#11-acknowledgements)

---

## 1. About the Project

### 1.1 Overview

**Doorway To Dignity** is a non-profit in Randburg, South Africa, that restores dignity and renews hope for vulnerable, displaced and homeless people through outreach initiatives such as **Jars Of Hope**, **Shelter Bags** and **Pots Of Hope**.

This project is a full-stack **MERN** website for the organisation. It has two sides:

- **A public website** that explains who the organisation is, what it does and how people can help, with pages for contacting the team, donating and common questions.
- **A volunteer platform** where people create an account, browse upcoming outreach events, sign up for a specific role at an event and track the hours they've given. A **coordinator (admin)** view lets the organisation create events and see who has signed up.

The goal is to replace informal sign-ups (messages and spreadsheets) with one place where volunteers can see what's coming up and coordinators can see who's coming.

### 1.2 Design Reference

The interface is implemented from **UX200** students design for Doorway To Dignity, created in Figma.

**Designers:** 
- Shanae Van Eeden, 251010
- Lesedi Chocho, 252073
- Dihan Janse van Rensburg, 251030
- Justin Dubbelman, 251227
- René Mtshatsheni, 251126

The Dashboard design was initially designed by the designers above, and updated by me. I designed the public pages with inspiration from the other existing designs using text from the NGO's original website.


The colour palette (Topaz Blue, Soft Amber, Green Teal and Gunmetal Grey) and type scale were carried over from the Figma styles into Tailwind theme tokens, so classes in the code use the same names as the design (for example `bg-topaz-blue-700`).

### 1.3 Built With

#### Frontend

![React](https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![daisyUI](https://img.shields.io/badge/-daisyUI_5-1AD1A5?style=for-the-badge&logo=daisyui&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

- **react-day-picker:** dashboard calendar and event date picker
- **canvas-confetti:** celebration effect on the donate page

#### Backend

![Node.js](https://img.shields.io/badge/-Node.js_22-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/-Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![Mongoose](https://img.shields.io/badge/-Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

- **bcryptjs:** password hashing
- **jsonwebtoken + cookie-parser:** login sessions stored in an httpOnly cookie
- **express-rate-limit:** limits repeated login attempts

#### Database

![MongoDB](https://img.shields.io/badge/-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

#### Hosting and Tools

![Azure](https://img.shields.io/badge/-Microsoft_Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Render](https://img.shields.io/badge/-Render-000000?style=for-the-badge&logo=render&logoColor=white)
![AWS](https://img.shields.io/badge/-AWS_Elastic_Beanstalk-FF9900?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Google Analytics](https://img.shields.io/badge/-Google_Analytics_4-E37400?style=for-the-badge&logo=googleanalytics&logoColor=white)

---

## 2. Features

### Public Pages

- **Home:** hero with calls to action, about the organisation, values, the three outreach initiatives, stories and a volunteer sign-up banner.
- **Contact:** contact form with custom-styled fields and dropdown, plus the organisation's contact details.
- **Donate:** a functional-looking but **fake** donation page with a confetti celebration. A notice makes clear that no real money is taken.
- **FAQ:** an accordion of common questions about the organisation and this project.
- **Student project notices:** a pop-up on first visit and a scrolling disclaimer bar, so visitors aren't misled into thinking this is the official site.

### Accounts

- **Sign up / Log in:** one page that swaps between the two forms, with show/hide password toggles and inline error messages.
- **Secure sessions:** logins are kept in an **httpOnly cookie** (not localStorage), so page scripts can't read the token.
- **Role-aware navigation:** the Dashboard link only appears when logged in and points volunteers and admins to their own dashboards. Protected pages redirect to log in.

### Volunteer Dashboard

- **Upcoming sign-ups:** the events you've signed up for, with your role.
- **Calendar:** colour-coded days for your events, full events, events still needing volunteers and passed events. Clicking a day opens that event.
- **Available events:** event cards with a volunteers progress bar, filterable by *All events*, *This month* and *Needs volunteers*.
- **Event details pop-up:** full date, time and location, then a choice of role with live "spots left" counts. Full roles can't be chosen.
- **Cancel a sign-up:** allowed up to **24 hours** before the event.

### Profile

- Initials avatar, **events completed** and **hours given** (calculated from past sign-ups).
- **Profile details:** edit name, email, phone and preferred role.
- **Change password:** requires the current password.
- **Past events** tab, and log out.

### Admin (Coordinator)

- **Admin dashboard:** profile card, calendar of all events, a list of upcoming events and a details panel with a progress bar and **who's signed up** (role and name only, so contact details stay private).
- **Create event:** event details, a styled calendar date picker, start and end time dropdowns, roles from a fixed list with a number of spots each, and an image picker. It's validated on both the frontend and the backend (for example, the end time must be after the start time).

### Interface Details

- Fully responsive layouts, with a mobile navigation menu.
- Custom-styled dropdowns (`appearance: base-select`), radio cards and focus states.
- Filled fields switch to a light topaz style, including browser-autofilled fields.

### Screenshots

#### Mockups

**Sign Up**

<img alt="Sign up page on laptop and phone" src="./documentation/image_assets/NGO_Mockup_SignUp.png" />

**Donate**

<img alt="Donate page with confetti on laptop and phone" src="./documentation/image_assets/NGO_Mockup_Donate.png" />

**Volunteer Dashboard**

<img alt="Volunteer dashboard on laptop and phone" src="./documentation/image_assets/NGO_Mockup_Dash.png" />

**Admin Dashboard**

<img alt="Admin dashboard on laptop and phone" src="./documentation/image_assets/NGO_Mockup_AdminDash.png" />

#### Desktop

**Home Page**

The full homepage: hero, who the organisation is, its values, the three outreach initiatives, stories and the volunteer call to action.

<img alt="Home page" src="./documentation/image_assets/NGO_HomePage.png" />

**Home Page (Logged In)**

Once logged in, the Dashboard link appears in the navigation.

<img alt="Home page hero while logged in" src="./documentation/image_assets/NGO_Hero_LoggedIn.png" />

**Contact Page**

The contact form, with custom-styled fields and subject dropdown, alongside the contact details and a shortcut to the FAQ.

<img alt="Contact page" src="./documentation/image_assets/NGO_ContactPage.png" />

**Donate Page**

A functional-looking but fake donation page, clearly marked so that no real money is taken.

<img alt="Donate page" src="./documentation/image_assets/NGO_DonatePage.png" />

**Donate (Pressed)**

Pressing Donate plays a confetti celebration instead of taking a payment.

<img alt="Donate confetti" src="./documentation/image_assets/NGO_Donate_Pressed.png" />

**FAQ Page**

Common questions about the organisation and the project, in an accordion.

<img alt="FAQ page" src="./documentation/image_assets/NGO_FAQPage.png" />

**Sign Up and Log In**

One page that swaps between the two forms.

<img alt="Sign up page" src="./documentation/image_assets/NGO_SignUp.png" />

<img alt="Log in page" src="./documentation/image_assets/NGO_LogIn.png" />

**Volunteer Dashboard**

Your upcoming sign-ups, the colour-coded calendar, and filterable event cards with live volunteer counts.

<img alt="Volunteer dashboard" src="./documentation/image_assets/NGO_DashboardPage.png" />

**Signing Up for an Event**

The event details pop-up: choose a role (full roles can't be picked) and sign up.

<img alt="Event sign-up pop-up" src="./documentation/image_assets/NGO_SignUpEventModal_Dash.png" />

**Signed Up**

After signing up, the pop-up shows your role and lets you cancel up to 24 hours before the event.

<img alt="Signed-up event pop-up" src="./documentation/image_assets/NGO_SignedUpEventModal_Dash.png" />

**Profile**

Events completed, hours given, editable profile details and a Past events tab.

<img alt="Profile page" src="./documentation/image_assets/NGO_Profile.png" />

**Admin Dashboard**

The coordinator's view: the calendar of all events, the upcoming events list, and the selected event's details with who has signed up.

<img alt="Admin dashboard" src="./documentation/image_assets/NGO_Admin_DashboardPage.png" />

**Create Event**

Event details, description, roles with spots, and an image picker.

<img alt="Create event page" src="./documentation/image_assets/NGO_Admin_CreateEvent.png" />

**Create Event: Date Picker and Roles**

The styled calendar date picker, and roles chosen from a fixed list with a number of spots each.

<img alt="Create event date picker and roles" src="./documentation/image_assets/NGO_Admin_CreateCalendar_Role.png" />

#### Mobile (iPhone 16)

<table>
  <tr>
    <td align="center"><img alt="Mobile hero" src="./documentation/image_assets/Iphone16_NGO_Hero.png" width="250" /><br />Hero</td>
    <td align="center"><img alt="Mobile navigation menu" src="./documentation/image_assets/Iphone16_NGO_Navigation.png" width="250" /><br />Navigation menu</td>
  </tr>
</table>

<details>
<summary><strong>Full-length mobile pages (click to expand)</strong></summary>

<table>
  <tr>
    <td align="center" valign="top"><img alt="Mobile home page" src="./documentation/image_assets/Iphone16_NGO_HomePage.png" width="250" /><br />Home</td>
    <td align="center" valign="top"><img alt="Mobile contact page" src="./documentation/image_assets/Iphone16_NGO_ContactPage.png" width="250" /><br />Contact</td>
    <td align="center" valign="top"><img alt="Mobile donate page" src="./documentation/image_assets/Iphone16_NGO_DonatePage.png" width="250" /><br />Donate</td>
  </tr>
  <tr>
    <td align="center" valign="top"><img alt="Mobile FAQ page" src="./documentation/image_assets/Iphone16_NGO_FAQ.png" width="250" /><br />FAQ</td>
    <td align="center" valign="top"><img alt="Mobile sign up page" src="./documentation/image_assets/Iphone16_NGO_SignUp.png" width="250" /><br />Sign up</td>
    <td align="center" valign="top"><img alt="Mobile log in page" src="./documentation/image_assets/Iphone16_NGO_LogIn.png" width="250" /><br />Log in</td>
  </tr>
  <tr>
    <td align="center" valign="top"><img alt="Mobile volunteer dashboard" src="./documentation/image_assets/Iphone16_NGO_Dashboard.png" width="250" /><br />Volunteer dashboard</td>
    <td align="center" valign="top"><img alt="Mobile profile page" src="./documentation/image_assets/Iphone16_NGO_Profile.png" width="250" /><br />Profile</td>
    <td align="center" valign="top"><img alt="Mobile admin dashboard" src="./documentation/image_assets/Iphone16_NGO_AdminDash.png" width="250" /><br />Admin dashboard</td>
  </tr>
  <tr>
    <td align="center" valign="top"><img alt="Mobile create event page" src="./documentation/image_assets/Iphone16_NGO_Admin_CreatePage.png" width="250" /><br />Create event</td>
    <td></td>
    <td></td>
  </tr>
</table>

</details>

---

## 3. Getting Started (Local Setup)

### 3.1 Prerequisites

- [Node.js](https://nodejs.org/) **22 LTS** or newer
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (the free M0 tier works) or a local MongoDB
- Git

### 3.2 Installation

**1. Clone the repository**

```bash
git clone https://github.com/RhichelleStrauss/Doorway-to-Dignity.git
cd Doorway-to-Dignity
```

**2. Set up the backend**

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET_KEY=a-long-random-secret
```

Leave `NODE_ENV` unset locally. In production it is set to `production`, which makes the login cookie HTTPS-only.

Start the API (it runs on **http://localhost:5000**):

```bash
npm run dev
```

**3. Create an admin account (optional)**

Edit the email in `backend/scripts/seedAdmin.js`, then run:

```bash
node scripts/seedAdmin.js
```

Log in with the password set in the script, then change it on the Profile page.

**4. Set up the frontend**

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. Vite forwards every `/api` request to the backend on port 5000, so no extra configuration is needed.

### 3.3 Available Scripts

| Folder | Command | What it does |
|---|---|---|
| `backend` | `npm run dev` | Starts the API with nodemon (restarts on save) |
| `backend` | `npm start` | Starts the API with Node |
| `frontend` | `npm run dev` | Starts the Vite development server |
| `frontend` | `npm run build` | Type-checks and builds the site into `frontend/dist` |

---

## 4. Deployment Summary

The site is deployed twice, on two different platforms. Both use the same codebase and the same MongoDB Atlas database (hosted in AWS `eu-north-1`, Stockholm).

### Platform 1: Microsoft Azure

| Part | Service | How it deploys |
|---|---|---|
| Frontend | **Azure Static Web Apps** | A GitHub Actions workflow builds `frontend` and deploys `dist` on every push to the `frontend-deployment` branch |
| Backend | **Azure App Service** (Linux, Node 22, B2 plan, Always On) | A GitHub Actions workflow deploys the `backend` folder on every push to the `backend-deployment` branch |
| Domain | `www.doorwaytodignityow251169.co.za` | Custom domain pointed at the Static Web App |

- The Static Web App is **linked** to the App Service, so `/api/*` requests are routed to the backend on the same domain. No CORS is needed, and the login cookie works with `sameSite: strict`.
- `frontend/public/staticwebapp.config.json` sends all page routes to `index.html` (so refreshing `/contact` works) and caches built assets for a year.
- Environment variables (`MONGO_URI`, `JWT_SECRET_KEY`, `NODE_ENV=production`) are set in the App Service configuration, not in the code.

### Platform 2: Render + AWS

| Part | Service | How it deploys |
|---|---|---|
| Frontend | **Render Static Site** | Builds `frontend` (`npm install && npm run build`) and publishes `dist`. It redeploys automatically on push. |
| Backend | **AWS Elastic Beanstalk** (Node.js 22 on Amazon Linux 2023, single t3.micro instance, `eu-north-1`) | The `backend` folder is zipped (without `node_modules` and `.env`) and uploaded with **Upload and deploy** |

- Render **rewrite rules** connect the two:
  - `/api/*` → `http://<elastic-beanstalk-domain>/api/*` (proxy to AWS)
  - `/*` → `/index.html` (page routing)
- Because Render proxies `/api`, the browser sees a single site. The frontend code is identical on both platforms, with no CORS settings and no hard-coded API URLs.
- A **single instance** (no load balancer) keeps it within the free tier. Environment variables are set under *Configuration → Environment properties*.

---

## 5. Architecture

```
Browser ──► Frontend (React, static files)
              │  /api/*  (same origin)
              ▼
           Backend (Express API) ──► MongoDB Atlas
```

- **Frontend:** a React single-page app. Pages are routed with React Router, and an `AuthContext` loads the logged-in user from `/api/auth/me`.
- **Backend:** an Express REST API split into routes, controllers, models and middleware (`verifyToken`, `requireRole`).
- **Database:** MongoDB, using Mongoose models.

### API Endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create a volunteer account |
| POST | `/api/auth/login` | Public (rate-limited) | Log in and set the session cookie |
| POST | `/api/auth/logout` | Public | Clear the session cookie |
| GET | `/api/auth/me` | Logged in | Current user's details |
| PATCH | `/api/users/me` | Logged in | Update profile details |
| POST | `/api/users/me/password` | Logged in | Change password |
| GET | `/api/events` | Logged in | Upcoming events with role counts |
| GET | `/api/events/mine` | Logged in | The user's sign-ups |
| POST | `/api/events/:id/signup` | Logged in | Sign up for a role |
| DELETE | `/api/events/:id/signup` | Logged in | Cancel a sign-up (24-hour rule) |
| POST | `/api/events` | Admin | Create an event |
| GET | `/api/events/:id/signups` | Admin | Who has signed up for an event |

### Data Models

- **User:** `fullName`, `email` (unique), `phone`, `password` (hashed), `role` (`volunteer` or `admin`), `preferredRole`
- **Event:** `title`, `description`, `image`, `location`, `start`, `end`, `roles: [{ name, capacity }]`
- **Signup:** `user`, `event`, `role`, with a unique index on `user` + `event` so nobody can sign up for the same event twice

### Security

- Passwords are hashed with **bcrypt**. Accounts can only register as volunteers. Admins are created with a server-side script.
- The JWT is stored in an **httpOnly, sameSite-strict cookie**, and is HTTPS-only in production.
- **Login rate limiting:** 10 attempts per email per 15 minutes.
- **NoSQL injection protection:** Mongoose `sanitizeFilter` is enabled globally.
- Compressed request bodies are rejected (`express.json({ inflate: false })`), in response to the October 2026 Node.js decompression vulnerability.
- Error responses are generic. Details are only logged on the server.

---

## 6. SEO and Analytics

- A unique `<title>`, meta description and canonical URL on each public page, all labelled **"(Student Project)"**.
- `sitemap.xml` lists the four public pages. `robots.txt` blocks private pages (`/login`, `/signup`, `/dashboard`).
- Submitted to **Google Search Console**. Indexing problems were diagnosed and fixed with URL Inspection (see challenges below).
- **Google Analytics 4** tracks visits and engagement.
- Images were resized and compressed (from several MB down to about 870 KB in total) to improve load times.

---

## 7. Challenges and Solutions

| Challenge | Solution |
|---|---|
| **Inner pages returned 404 on Azure.** Visiting or refreshing `/contact` directly failed, and Google Search Console reported "URL is not available". | Added `staticwebapp.config.json` with a `navigationFallback` to `index.html`, so the React router handles every page. Then re-tested the live URLs and requested indexing in Search Console. |
| **Duplicate URLs.** The Azure site was reachable on both the custom domain and the default `azurestaticapps.net` address. | Added canonical tags pointing to the custom domain, so Google treats it as the main version. |
| **Slow and failed sign-ups** ("Backend call failure"). The free App Service tier put the API to sleep, and cold starts timed out. | Moved to the B2 plan with **Always On**. |
| **The build worked on Windows but failed in deployment.** Imports with the wrong capitalisation (`EventSignupModal` vs `EventSignUpModal`) worked locally but broke on Linux build servers. | Matched every import to the exact file name. Linux file systems are case-sensitive. |
| **Browser autofill showed grey fields with white text** in dark mode, overriding the design. | Set `color-scheme: light` in the theme, and styled `:-webkit-autofill` fields with an inset shadow in the brand colour. |
| **Native date and time inputs couldn't be styled** to match the design. | Replaced them with a styled react-day-picker calendar and the site's own dropdown component. |
| **Ranking for the brand name** while competing with the real charity and a classmate's site. | Added clear titles, descriptions and canonicals, and a sitemap. The site is deliberately labelled as a student project so it doesn't mislead people looking for the real charity. |

### Known Limitation

The free Elastic Beanstalk address uses **HTTP** only. Visitors still connect to Render over HTTPS, but the hop from Render to AWS isn't encrypted. Fixing this would need a load balancer and certificate, which is out of scope for a student project.

---

## 8. Roadmap: Future Improvements

- **Admin:** edit and delete events, a volunteers list, and messaging volunteers (designed in Figma, not yet built).
- **Forgot password:** email-based password reset (the link is in place but not functional yet).
- **Event image uploads** instead of choosing from preset images.
- **HTTPS for the AWS backend** with a load balancer and certificate.
- Email reminders before events.

---

## 9. License

Distributed under the MIT License. See [`LICENSE`](LICENSE).

---

## 10. Author

- **Rhichelle Strauss**: Developer and Designer

---

## 11. Acknowledgements

- **[Doorway To Dignity](https://doorwaytodignity.org)**, the Randburg organisation this concept is based on. This is a non-commercial student project, created for academic purposes only, and is not affiliated with or endorsed by the organisation.
- **Tsungai** my lecturer
- **Claude (Anthropic)** for some development assistance (I decided to learn Typescript in thre last semester whoops) and helping diagnose bugs. All design decisions are my own.
