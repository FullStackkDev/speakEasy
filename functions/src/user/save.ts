import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import * as express from 'express';
const cors = require('cors')({ origin: true });
admin.initializeApp();

const db = admin.firestore();

export async function save (request: functions.https.Request ,response: express.Response){

    cors(request,response, async () => {
        try { 
            const data = JSON.parse(request.body);
            const obj = {
                name: data.name ,
                type: data.type,
                profile_pic: data.profile_pic ,
                bio:data.bio,
                doc_id:db.collection("users").doc().id
            }
            await db.collection("users").doc(obj.doc_id).set(obj, { merge: false });
            response.status(200).send({
                success: true,
                message: 'Member added successfully',
                data:[]
              });
        } catch (error) {
            response.status(200).send({
                message: 'error while running my first functions',
                error: error
              });
        }
    })
}