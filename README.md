# Laravel Developer Position Technical Test

Hello there, I am Khaldoun Alhalabi

## requirements:

php 8.2 , composer , sqlite or mysql

## How to set up the project

1. install dependencies via :
    ```bash
   composer install
   ```
2. copy .env.example to .env file
    ```bash 
   cp .env.example .env
    ```

3. configure your database connection within the .env file (by default, it is **sqlite**, and it can do the job)
4. replace the default mail server config in the .env file with yours, so you can try the reset password functionality and
   the QR code email functionality

5. generate encryption key:
    ```bash
   php artisan key:generate
    ```
6. run the project migrations and seeders
    ```bash
   php artisan migrate:fresh --seed
   ```
7. run
    ```bash
   npm run dev
   ```
8. for registration page open your browser on `http://localhost/realistic-solutions-task/public` if you are using xampp
   or `http://localhost:8000` if you are using `php artisan serve` command to run the project
9. for the admin dashboard use the path `/public/v1/dashboard` and use `admin@email.com` as an email and `123456789` as
   a password

Thanks for your time.
