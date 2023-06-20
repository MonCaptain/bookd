# Book'd

## Setting Up Development Environment

### Web Client

This tutorial assumes that you have fulfilled the following pre-requisites:

- Node.js version 12.2.0 or higher installed on your machine

```init
cd client
```

```init
npm install
```

```init
npm run dev
```

That should be sufficient. After running `npm run dev`, you should see the following on your screen:

```txt
$ npm run dev
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

> get-bookd@0.0.0 dev
> vite


  VITE v4.3.3  ready in 365 ms

  ➜  Local:   http://127.0.0.1:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Just click the link at local host to be redirected. This application uses vite, so the project should be able to load up almost instantly.

### Server

#### Setup

1. Change to the server directory

   ```txt
   cd server
   ```

2. Install `virtualenv` on your system.

   **Unix/macOS**

   ```txt
   python3 -m pip install --user virtualenv
   ```

   **Windows**

   Before starting, you may need to add python as an environment variable to PATH on your system.

   ```txt
   python -m ensurepip
   ```

   ```txt
   py -m pip install --user virtualenv
   ```

3. Create the virtual environment

   ```txt
   virutalenv env
   ```

4. Run the virtual environment in your system.

   **Unix/macOS**

   ```txt
   source env/bin/activate
   ```

   **Windows**

   ```txt
   .\env\Scripts\activate
   ```

   If the environment doesn't get activated, open powershell as adminstrator and run the following command first:

   ```txt
   Set-ExecutionPolicy RemoteSigned
   ```

5. Install the packages in `requirements.txt`.

   ```txt
   pip install -r requirements.txt
   ```

6. create a `.env` file within `server/`

   ```txt
   cp .env.example .env
   ```

7. Run secret_key.py to get Django secret key

   ```txt
   python scripts/secret_key.py
   ```

8. Enter the Django secret_key in the `.env` file you created.

   ```txt
   SECRET_KEY="<Your secret key>"
   ```

9. Set up and migrate the database.

   Prior to running these commands, make sure that your project Environment Variables are set up

   ```txt
   python manage.py makemigrations
   python manage.py migrate
   ```

10. Create a superuser (Owner Account)

    ```txt
    python manage.py createsuperuser
    ```

#### Run Server

Run the following command to run the server

```txt
python manage.py runserver
```

### FAQ

- How would you flush the database?

  Go into the server directory and run the following command.

  ```txt
  python manage.py flush
  ```

- How can I reset the database if I'm having issues with `makemigrations` and `migrate`?

  1. Use `psql` to recreate the database.

     ```txt
     postgres#= DROP DATABASE get_bookd;
     DROP DATABASE
     postgres#= CREATE DATABASE get_bookd;
     CREATE DATABASE
     ```

   > if the psql doesn't work, then you may need to drop the database and create it again via pgAdmin4

  2. Run `makemigrations` and `migrate`.

  User data will be lost so you will need to create another superuser and other users you may have created.