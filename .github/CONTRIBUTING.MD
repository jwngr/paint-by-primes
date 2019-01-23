# Contributing | Paint By Primes

Thank you for contributing to Paint By Primes!

## Local Setup

There are three main pieces you'll need to get set up running locally:

1.  Mock SQLite database of historical results.
2.  Backend Python Flask web server.
3.  [Create React App](https://github.com/facebook/create-react-app)-based frontend website.

There is some larger set up you'll need to run initially as well as some recurring set up every time
you want to run the service.

Note: The following instructions have only been tested on macOS.

### Initial Setup

The first step is to clone the repo and move into the created directory:

```bash
$ git clone git@github.com:jwngr/paint-by-primes.git
$ cd paint-by-primes/
```

Several global dependencies are required to run the service. Since installation instructions vary
and are decently documented for each project, please refer to the links below on how to install them.

1.  [Python](https://www.python.org/downloads/) - macOS comes with an older `2.x` version of Python,
    but I recommend using [`pyenv`](https://github.com/pyenv/pyenv) to install the latest `2.x`
    release.
1.  [`pip`](https://pip.pypa.io/en/stable/installing/) - Most recent versions of Python ship with
    `pip`
1.  [`sqlite3`](https://docs.python.org/3/library/sqlite3.html) - Can be installed via `brew install sqlite3`.
1.  [`virtualenv`](https://virtualenv.pypa.io/en/stable/installation/) - Helps avoid polluting your
    global environment.

Once all the required global dependencies above are installed, run the following commands to get
everything set up:

```bash
$ python scripts/create_mock_databases.py # TODO: implement this and make sure docs are correct
$ cd server/
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
$ cd ../website/
$ npm install
$ cd ..
```

### Recurring Setup

Every time you want to run the service, you need to source your environment, start the backend Flask
app, and the frontend website. You can run the backend and frontend apps in different tabs.

To run the backend, open a new tab and run the following commands from the repo root:

```bash
$ cd server/
$ source env/bin/activate
$ export FLASK_APP=server.py FLASK_DEBUG=1 FL_RUN_PORT=3373
$ flask run
```

To run the frontend, open a new tab and run the following commands from the repo root:

```bash
$ cd website/
$ npm start
```

The service should be running at http://localhost:3000.

## Repo Organization

Here are some highlights of the directory structure and notable source files

- `.github/` - Contribution instructions as well as issue and pull request templates.
- `config/` - Configuration files for services like Firebase, NGINX, Gunicorn, and Supervisord.
- `scripts/` - Helper scripts to do things like create a mock database.
- `server/` - The Python Flask web server.
  - `server.py` - Main entry point which initializes the Flask web server.
  - `primes.py` - Provides methods to determine number primality.
  - `helpers.py` - Miscellaneous helper functions and classes.
  - `requirements.txt` - Requirements specification for installing project dependencies via `pip`.
- `sketch/` - Sketch logo files.
- `website/` - The frontend website, based on [Create React App](https://github.com/facebook/create-react-app).
