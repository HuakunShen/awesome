from pocketbase import PocketBase

class PocketBaseDao:
    def __init__(self, admin_client: PocketBase):
        self.client = admin_client

    