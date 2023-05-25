#!/bin/bash

set -e

sudo su postgres <<EOF
psql -c "CREATE USER $1 WITH PASSWORD '$1';"
psql -c "CREATE DATABASE $1 WITH ENCODING='UTF8';"
echo "Postgres user and database '$1' created."
EOF
