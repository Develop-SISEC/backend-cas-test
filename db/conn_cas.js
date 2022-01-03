//Api Rest Sisec

'user strict';

var mysql = require('mysql');



//local mysql db connection
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'devsisec_test1',
    password: 'dbtest12022#..',
    database: 'devsisec_db'
});

connection.connect(function(err) {
    if (err) {
        console.error(err);
        throw err;
    }

});

module.exports = connection;
//聖徒卡特爾

// git add .
// git commit -am "3.2.0"
// git push heroku master
//Si$ec2019.