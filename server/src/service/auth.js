/*   //getToken
 firebaseAdmin
 */
const firebaseConfig = require("../configuration/serviceAccountKey.json");
const admin = require("firebase-admin");
const SecurtiyConfiguration = require("../configuration/security");
const UserService = require("../service/user");

module.exports = {

    /**
     * init the connection to firebase
     * TODO when firebase is not accessible -> close server? retry? -> client message "auth not available?"
     */
    init: () => {
        try {
            let firebase = admin.initializeApp({
                credential: admin.credential.cert(firebaseConfig),
                databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
            });
            if (firebase) {
                console.log("Firebase connected.");
            } else {
                console.log("Firebase can not connect.");
            }
        } catch (error) {
            console.log("Firebase Error");
        }
    },

    /**
     * Authenticate User Token: resolve when verified && user in db - reject when auth failed && user not in db
     * @param accessToken
     * @param documentOwnerId if set then it will perform a ownership privilege check (User.uid of Document)
     * @returns {Promise}
     */
    userAuth: (accessToken, documentOwnerId, registration) => {

        return new Promise((resolve, reject) => {
            admin.auth()
            .verifyIdToken(accessToken)
            .then(firebaseUser => {
                  console.log(firebaseUser.user_id);
                if(registration) {
                    resolve("registration");
                } else {
                    UserService.get({uid: firebaseUser.user_id}).then(
                      users => {
                          let user = users.pop();
                          // when User is Basic check for owner privilege
                          if (documentOwnerId && user.privilege == SecurtiyConfiguration.BASIC_USER) {
                              if (firebaseUser.user_id == documentOwnerId) {
                                  user.privilege = 3;
                              }
                          }
                          console.log("Access granted");
                          resolve(user);
                      },
                      error => {
                          console.log("User failed: " + error);
                          reject("User failed: " + error)
                      }
                    );
                }

              },
              error => {
                  console.log("Auth failed: " + error);
                  reject("Auth failed: " + error);
              }
            )
        });

    }


};



