## Dependencies

- neomodel

## DB Init

`neomodel` models are defined in `./pylib/ogm.py`, need to install constraints when db is initialized.

```bash
neomodel_install_labels pylib/ogm.py --db <NEO4J_URL>
neomodel_remove_labels --db <NEO4J_URL>
```
