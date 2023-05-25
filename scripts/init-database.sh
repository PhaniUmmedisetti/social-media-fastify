#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;
    REVOKE ALL ON DATABASE id_service_db FROM PUBLIC;
    CREATE SCHEMA id_db_schema;
    GRANT USAGE, CREATE ON SCHEMA id_db_schema TO id_service_db_user;
    ALTER DEFAULT PRIVILEGES IN SCHEMA id_db_schema GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO id_service_db_user;
    ALTER USER id_service_db_user SET search_path TO id_db_schema;
EOSQL
