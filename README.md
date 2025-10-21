# Fantasy Premier League App

This is a full-stack web application for managing Fantasy Premier League teams. The backend is built with **Laravel** and the frontend is built with **React**. The application allows users to register, manage their fantasy teams, view Premier League standings, and track player statistics.

---

## **Features**

### Public (No Authentication)
- View all players.
- View Premier League standings and analytics.
- Password reset functionality via email/log.

### Protected (Authentication Required)
- Register and login/logout.
- View and manage user profile.
- Create, update, and delete fantasy teams.
- Add or remove players from teams.
- Admin routes: manage users (CRUD).

---

## **Prerequisites**

Before running the project, ensure you have:

- PHP >= 8.1
- Composer
- Node.js >= 18
- npm
- MySQL
- (Optional) Mail server or use `MAIL_MAILER=log` for password reset testing

---

## **Setup Instructions**

Follow these steps to run the project on your local machine or faculty PC:

### 1. Clone the repository and switch to the fullstack branch

git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
git checkout fullstack
