#!/bin/bash

set -euo pipefail

DATE=`date +%Y%m%d`
BACKUP_FILENAME="results.sql.gz"

sqlite3 /root/paint-by-primes/server/resources/results.sqlite .dump | pigz --best > /tmp/$BACKUP_FILENAME
gsutil -u paint-by-primes-prod cp /tmp/$BACKUP_FILENAME gs://paint-by-primes-prod/backups/$DATE/
rm /tmp/$BACKUP_FILENAME
