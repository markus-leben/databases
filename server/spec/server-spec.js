/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect();

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */

    const tablename = 'messages'; // clear messages
    dbConnection.query(`truncate ${tablename}`, done);

    // should we clear user?
    // const roomname = 'rooms'; // clear rooms
    // dbConnection.query(`truncate ${roomname}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercy\'s name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.

        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = [];

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            console.log('error in dbConnection');
            throw err;
          }
          // Should have one result:
          console.log(`results: ${results}`);
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        console.log('failed to connect to API');
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    // Let's insert a message into the db
       const queryString = 'SQL CODE GOES HERE'; //
       const queryArgs = [];
    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */

    // do we have to assign message and roomname, if so do we do them here or in query?
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data; //server responds with a list of all messages
          expect(messageLog[0].text).toEqual(message); //the first item of which should equal our original message
          expect(messageLog[0].roomname).toEqual(roomname); //and should have the same room
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
