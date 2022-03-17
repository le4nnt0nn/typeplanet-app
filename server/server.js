const Database = require('./config/database');
const CONFIG = require('./config/config');
const app = require('./index');

Database.connect();

app.listen(CONFIG.PORT, err => {
    if (err) return console.log(err)
    console.log(`Server running on port: ${CONFIG.PORT}`);
})