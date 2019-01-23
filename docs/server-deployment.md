\$ ssh root@45.79.84.252

# provide root password

\$ apt-get -q update && apt-get -yq upgrade

# Change hostname? \$ hostnamectl set-hostname mersenne

# Update /etc/hosts? https://www.linode.com/docs/getting-started/#update-etc-hosts

$ apt-get -yq install git pigz sqlite3 python-pip
$ pip install --upgrade pip setuptools virtualenv
$ git clone https://github.com/jwngr/notre-dame-prime.git
$ cd notre-dame-prime/server

$ virtualenv -p python2 env  # OR virtualenv -p python3 env
$ source env/bin/activate

\$ pip install -r requirements.txt

# Copy service account to server/resources/serviceAccount.json from https://console.firebase.google.com/u/0/project/paint-by-primes-prod/settings/serviceaccounts/adminsdk

\$ supervisord -c ../config/supervisord.conf

\$ supervisorctl -c ../config/supervisord.conf status

$ echo 'deb http://ftp.debian.org/debian stretch-backports main' | sudo tee /etc/apt/sources.list.d/backports.list
$ sudo apt-get -q update
$ sudo apt-get -yq install nginx
$ sudo apt-get -yq install python-certbot-nginx -t stretch-backports

$ sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup
$ sudo cp ../config/nginx.conf /etc/nginx/nginx.conf

\$ sudo systemctl restart nginx
