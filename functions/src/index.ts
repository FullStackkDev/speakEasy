import * as functions from 'firebase-functions';
import { save } from "./user/save";

export const api = functions
  .runWith({ timeoutSeconds: 540, memory: '1GB' })
  .https.onRequest(async (request, response) => {
    await (await import('./services/http')).default(request, response);
  });

export const userOnCreate = functions.auth.user().onCreate(async (user, context) => {
  await (await import('./services/auth/userOnCreate')).default(user, context);
});

export const reviewOnCreate = functions.firestore.document('reviews/{reviewId}').onCreate(async (snap, context) => {
  await (await import('./services/db/reviewOnCreate')).default(snap, context);
});

export const saveUser = functions.https.onRequest(save);