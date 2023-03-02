var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  getAll: function () {
    // select everyting in messages
    return Promise.promisify(db.query)('SELECT * FROM messages', []);
    // equivalent to:
    // return new Promise ((resolve,reject) => {
    //   db.query('SELECT * FROM messages', [], (err, data) => {
    //     if (err) {
    //       recject(err);
    //     }else {
    //       resolve(data);
    //     }
    //   });
    // });
  }, // a function which produces all the messages
  create: function () {

  } // a function which can be used to insert a message into the database
};

// dbConnection.query(queryString, queryArgs,

// 'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],