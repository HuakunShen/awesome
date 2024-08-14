from dotenv import load_dotenv

load_dotenv()

import os

pb_url = os.getenv("PB_URL")
if pb_url is None:
    raise ValueError("PB_URL is not set in .env file")
# PB_ADMIN_USERNAME
# PB_ADMIN_PASSWORD

pb_admin_username = os.getenv("PB_ADMIN_USERNAME")
if pb_admin_username is None:
    raise ValueError("PB_ADMIN_USERNAME is not set in .env file")

pb_admin_password = os.getenv("PB_ADMIN_PASSWORD")
if pb_admin_password is None:
    raise ValueError("PB_ADMIN_PASSWORD is not set in .env file")
