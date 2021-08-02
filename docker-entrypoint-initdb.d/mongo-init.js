db.auth('admin', 'admin');
db = db.getSiblingDB('tip');
db.createCollection("features");
db.createCollection("members");