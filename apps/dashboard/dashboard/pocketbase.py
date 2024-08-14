from pocketbase import PocketBase
from .constants import pb_url, pb_admin_password, pb_admin_username


def get_admin_pocketbase_client(
    url: str | None = None, username: str | None = None, password: str | None = None
) -> PocketBase:
    if url is None:
        url = pb_url
    if username is None:
        username = pb_admin_username
    if password is None:
        password = pb_admin_password
    client = PocketBase(pb_url)
    admin_data = client.admins.auth_with_password(username, password)
    assert admin_data.is_valid
    return client
