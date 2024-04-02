from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import event

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# Listen for the 'connect' event on SQLAlchemy's engine and enforce foreign key constraints for SQLite connections
# @event.listens_for(db.engine, "connect")
# def set_sqlite_pragma(dbapi_connection, connection_record):
#     if environment != "production":  # Assuming SQLite is used for non-production environments
#         cursor = dbapi_connection.cursor()
#         cursor.execute("PRAGMA foreign_keys=ON")
#         cursor.close()


# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr
