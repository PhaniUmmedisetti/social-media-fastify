#!/bin/bash

set -e

sudo su postgres <<EOF
psql -c "DROP DATABASE $1;"
psql -c "DROP USER $1;"
echo "Postgres user and database '$1' deleted."
EOF
