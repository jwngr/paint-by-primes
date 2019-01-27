# Server Setup | Paint By Primes

## Table of Contents

- [Initial Setup](#initial-setup)
- [Recurring Setup](#recurring-setup)
- [Updating Server Code](#updating-server-code)

## Initial Setup

1.  [Create a new Linode instance](https://www.linode.com/docs/getting-started/) with the following
    specs:

    1.  **Instance Name:** Linode 8GB
    1.  **Location:** Fremont, CA
    1.  **Image:** Debian 9
    1.  **Disk Size:** 163328 MB
    1.  **Swap Disk:** 512 MB
    1.  **Root Password:** _<set root password>_

1.  Click the "Boot" button from the Linode Manager.

1.  SSH into the machine:

    ```bash
    $ ssh root@45.33.33.58
    # Provide the root password you just set up.
    ```

1.  Install required operating system dependencies to run the Flask app:

    ```bash
    $ apt-get -q update && apt-get -yq upgrade
    $ apt-get -yq install git pigz sqlite3 python-pip
    $ pip install --upgrade pip setuptools virtualenv
    # OR for Python 3
    #$ sudo apt-get -q update
    #$ sudo apt-get -yq install git pigz sqlite3 python3-pip
    #$ sudo pip3 install --upgrade pip setuptools virtualenv
    ```

1.  Clone this directory via HTTPS and navigate into the repo:

    ```bash
    $ git clone https://github.com/jwngr/paint-by-primes.git
    $ cd paint-by-primes/server
    ```

1.  Create and activate a new `virtualenv` environment:

    ```bash
    $ virtualenv -p python2 env  # OR virtualenv -p python3 env
    $ source env/bin/activate
    ```

1.  Install the required Python libraries:

    ```bash
    $ pip install -r requirements.txt
    ```

1.  Copy a [Firebase service account](https://console.firebase.google.com/u/0/project/paint-by-primes-prod/settings/serviceaccounts/adminsdk)
    to `server/resources/serviceAccount.json`.

1.  Create the `results.sqlite` database file:

    ```bash
    $ sqlite3 ./resources/results.sqlite ".read ../scripts/createResultsTable.sql"
    ```

    **Note:** Alternatively, copy a backed-up version of the `results.sqlite` database file:

    ```bash
    $ gsutil -u paint-by-primes-prod cp gs://paint-by-primes-prod/backups/<YYYYMMDD>/results-<YYYYMMDD>.sql.gz results.sql.gz
    $ pigz -d results.sql.gz
    $ sqlite3 resources/results.sqlite ".read results.sql"
    $ rm results.sql
    ```

1.  Install required operating system dependencies to generate an SSL certificate (this and the
    following instructions are based on these
    [blog](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-debian-8)
    [posts](https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https)):

    ```bash
    $ echo 'deb http://ftp.debian.org/debian stretch-backports main' | sudo tee /etc/apt/sources.list.d/backports.list
    $ apt-get -q update
    $ apt-get -yq install nginx
    $ apt-get -yq install python-certbot-nginx -t stretch-backports
    ```

1.  Add this `location` block inside the `server` block in `/etc/nginx/sites-available/default`:

    ```
    location ~ /.well-known {
        allow all;
    }
    ```

1.  Start NGINX:

    ```bash
    $ systemctl restart nginx
    ```

1.  Create an SSL certificate using [Let's Encrypt](https://letsencrypt.org/)'s `certbot` (the
    provided URL must have DNS A record set up which points it to the Linode VM):

    ```bash
    $ certbot certonly -a webroot --webroot-path=/var/www/html -d api.paintbyprimes.com --email wenger.jacob@gmail.com
    ```

1.  Ensure auto-renewal of the SSL certificate is configured properly:

    ```bash
    $ sudo certbot renew --dry-run
    ```

1.  Run `crontab -e` and add the following cron jobs to that file to auto-renew the SSL certificate,
    regularly restart the web server (to ensure it stays responsive), and backup the searches
    database weekly:

    ```
    0 4 * * * sudo /usr/bin/certbot renew --noninteractive --renew-hook "sudo /bin/systemctl reload nginx"
    */10 * * * * /root/paint-by-primes/server/env/bin/supervisorctl -c /root/paint-by-primes/config/supervisord.conf restart all
    0 6 * * 0 /root/paint-by-primes/scripts/backupResultsDatabase.sh
    ```

    **Note:** Let's Encrypt debug logs can be found at `/var/log/letsencrypt/letsencrypt.log`.

    **Note:** Supervisor debug logs can be found at `/tmp/supervisord.log`.

1.  Install a mail service in order to read logs from cron jobs:

    ```bash
    $ sudo apt-get -yq install postfix
    # Choose "Local only" and use the default email address.
    ```

    **Note:** Cron job logs will be written to `/var/mail/jwngr`.

1.  Generate a strong Diffie-Hellman group to further increase security (note that this can take a
    couple minutes):

    ```bash
    $ sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
    ```

1.  Copy over the NGINX configuration, making sure to back up the original configuration:

    ```bash
    $ sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
    $ sudo cp ./config/nginx.conf /etc/nginx/nginx.conf
    ```

1.  Restart `nginx`:

    ```bash
    $ sudo systemctl restart nginx
    ```

1.  Install the Stackdriver monitoring agent:

    ```bash
    $ curl -sSO https://repo.stackdriver.com/stack-install.sh
    $ sudo bash stack-install.sh --write-gcm
    $ rm stack-install.sh
    ```

## Recurring Setup

1.  SSH into the machine:

    ```bash
    $ ssh root@45.33.33.58
    # Provide the root password you just set up.
    ```

1.  Activate the `virtualenv` environment:

    ```bash
    $ cd paint-by-primes/server/
    $ source env/bin/activate
    ```

1.  Start the Flask web server via [Supervisor](http://supervisord.org/) which runs
    [Gunicorn](http://gunicorn.org/):

    ```bash
    $ supervisord -c ../config/supervisord.conf
    ```

1.  Use [`supervisorctl`](http://supervisord.org/running.html#supervisorctl-command-line-options) to
    manage the running web server:

    ```bash
    # Run these commands from the server/ directory.
    $ supervisorctl -c ../config/supervisord.conf status             # Get status of running processes
    $ supervisorctl -c ../config/supervisord.conf stop gunicorn      # Stop web server
    $ supervisorctl -c ../config/supervisord.conf start gunicorn     # Start web server
    $ supervisorctl -c ../config/supervisord.conf restart gunicorn   # Restart web server
    ```

    **Note:** `supervisord` and `supervisorctl` must be run from the `config/` directory or specify
    the configuration file via the `-c` argument or else they will return an obscure
    `"http://localhost:9001 refused connection"` error message.

    **Note:** Log output from `supervisord` is written to `/tmp/supervisord.log` and log output from
    `gunicorn` is written to `/tmp/gunicorn-stdout---supervisor-<HASH>.log`. Logs are also written to
    Stackdriver Logging.

## Updating Server Code

To update the Python server code which powers the server backend, run the following commands after
SSHing into the web server:

```bash
$ cd paint-by-primes/server/
$ source env/bin/activate
$ git pull
$ pip install -r requirements.txt
$ supervisorctl -c ../config/supervisord.conf restart all
```
