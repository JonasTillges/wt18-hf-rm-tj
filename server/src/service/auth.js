/*   //getToken
 firebaseAdmin
 */
const firebaseConfig = require("../configuration/serviceAccountKey.json");
const admin = require("firebase-admin");

module.exports =  {

    init: () => {
        try {
            let firebase = admin.initializeApp({
                credential: admin.credential.cert(firebaseConfig),
                databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
            });
            if(firebase) {
                console.log("Firebase connected.");
            } else {
                console.log("Firebase can not connect.");
            }
        } catch (error) {
            console.log("Firebase Error");
        }
    },
    
    userAuth: (accessToken, userId) => {

        return new Promise((resolve, reject) => {
            //TODO get correct accesToken
            console.log("User is real");
            resolve(true);
            return;
            
            admin.auth()
            .verifyIdToken(accessToken)
            .then(decodedIdToken => {
                // guarantee user match, undefined for register
                if(decodedIdToken.uid == userId || typeof userId === 'undefined') {
                    console.log("User is real");
                    resolve(true);
                } else {
                    console.log("User is not real");
                    resolve(false);
                }
              },
              error => {
                  console.log("FIREBASE-ADMIN: " +  error);
                  resolve(false);
              }
            )
        });

    }
    

};



