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

# 1. Clone repo and switch to fullstack branch
git clone https://github.com/yourusername/yourrepo.git
cd yourrepo
git checkout fullstack

# 2. Copy environment example to .env
cp .env.example .env

# 3. Edit .env and fill in credentials:
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=yourpassword
# MAIL_MAILER=log
# EXTERNAL_API_KEY=your_api_key_here
# (Do not commit .env to GitHub)

# 4. Install backend dependencies
composer install

# 5. Generate application key
php artisan key:generate

# 6. Clear and cache config
php artisan config:clear
php artisan cache:clear

# 7. Install frontend dependencies
npm install

# 8. Set up the database: run migrations
php artisan migrate

# 9. Optional: seed demo data
php artisan db:seed

# 10. Serve backend and frontend
php artisan serve & npm start

# Backend will run at http://127.0.0.1:8000
# Frontend will run at http://localhost:3000

