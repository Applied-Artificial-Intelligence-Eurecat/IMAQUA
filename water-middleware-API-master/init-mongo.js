db.createUser({
    user: 'imaqua',
    pwd: 'password',
    roles: [
        {
            role: 'readWrite',
            db: 'imaqua'
        }
    ]
});
