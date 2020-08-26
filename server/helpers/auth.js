
var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //databaseURL: "https://graphql-41.firebaseio.com"  //we don't need the database for this app
});


exports.authCheck = async (req) => {

    console.log("AUTHCHECK HELPER RUN")

    try {
        const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log('CURRENT USER', currentUser);
        return currentUser;
        
    } catch (error) {
        console.log('AUTH CHECK ERROR', error);
        //throw new Error('Invalid or expired token');
    }
};
