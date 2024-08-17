from pprint import pp
from neo4j import GraphDatabase
from dotenv import load_dotenv
from neomodel import db

load_dotenv()
import os
from neomodel import (config, StructuredNode, StringProperty, IntegerProperty,
                      UniqueIdProperty, RelationshipTo, OUTGOING, Traversal)
from pylib.constants import NEO4J_DATABASE_URL
from pylib.ogm import AwesomeList, Repo
from neomodel.integration.pandas import to_dataframe, to_series

config.DATABASE_URL = NEO4J_DATABASE_URL

# repo = Repo.nodes.get(url="https://github.com/CrossCopy/tauri-plugin-clipboard")
# print(repo.awesomeList.all())
# a_lists: list[AwesomeList] = AwesomeList.nodes.all()


# for lst in a_lists:
#     definition = dict(node_class=AwesomeList, direction=OUTGOING,
#                       relation_type=None, model=None)
#     relations_traversal = Traversal(lst, Repo.__label__, definition)
#     all_jims_relations = relations_traversal.all()
#     print(all_jims_relations)
# pp(lst.isFrom.all())
# break

a: AwesomeList | None = AwesomeList.nodes.get_or_none(url="https://github.com/tauri-apps/awesome-tauri")
print(a.repos.all())
# print(all_awesome_lists())
