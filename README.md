# Laravel Developer Position Technical Test

Hello there, I am Khaldoun Alhalabi

## requirements:

php 8.2 , composer , sqlite or mysql

## How to set up the project

1. install dependencies via :
    ```bash
   composer install
   ```
2. install frontend dependencies via : 
    ```bash 
   npm install
    ```
3. copy .env.example to .env file
    ```bash 
   cp .env.example .env
    ```

4. configure your database connection within the .env file (by default, it is **sqlite**, and it can do the job)
5. replace the default mail server config in the .env file with yours, so you can try the reset password functionality
   and
   the QR code email functionality
6. configure the `APP_URL` environment variable (make it correspond to your localhost e.g.:
   `http://localhost/realistic-solutions-task/public`)

7. generate encryption key:
    ```bash
   php artisan key:generate
    ```
8. run the project migrations and seeders
    ```bash
   php artisan migrate:fresh --seed
   ```
9. run storage link command :
    ```bash 
   php artisan storage:link
   ```
10. run
     ```bash
    npm run dev
    ```
11. for registration page open your browser on `http://localhost/realistic-solutions-task/public` if you are using xampp
    or `http://localhost:8000` if you are using `php artisan serve` command to run the project
12. for the admin dashboard use the path `/public/v1/dashboard` and use `admin@email.com` as an email and `123456789` as
    a password

13. Finally, the ERD image included in project root named: `database.png`
    Thanks for your time.
