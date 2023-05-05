# Get Book'd

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

1. Install `virtualenv` on your system.

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

1. Create the virtual environment

   ```txt
   virutalenv env
   ```

1. Run the virtual environment in your system.

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

1. Install the packages in `requirements.txt`.

   ```txt
   pip install -r requirements.txt
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

- How can I fully reset the database if I'm having issues with `makemigrations` and `migrate`?

  1. Delete the `db.sqlite3` file inside the server folder.

  2. Run `makemigrations` and `migrate`.
