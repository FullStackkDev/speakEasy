import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";
import * as express from 'express';
const cors = require('cors')({ origin: true });
admin.initializeApp();

const db = admin.firestore();

export async function intergateBytesPro (request: functions.https.Request ,response: express.Response){

    cors(request,response, async () => {
        try { 
            const data = JSON.parse(request.body);
            console.log(data.name);   
            const obj = {
                name: data.name,
                type: data.type,
                profile_pic: data.profile_pic,
                bio:data.bio
            }
            await db.collection('users')
            .doc('1')
            .set(obj);
            response.status(200).send({
                success: true,
                message: 'This is test response',
                data:[]
              });
        } catch (error) {
            console.log(error);
            // console.log('error while running my first functions');
            response.status(200).send({
                message: 'error while running my first functions',
                error: error
              });
        }
    })
}