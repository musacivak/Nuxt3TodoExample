import type { IncomingMessage, ServerResponse } from 'http'
import {getFirestore, deleteDoc, getDoc, doc} from 'firebase/firestore/lite';

import { app } from '~/firestore/firestore';
const db = getFirestore(app);

export default async (req: IncomingMessage, res: ServerResponse) => {

    if(req.method === 'POST') {
        let body = '';
        let todo = null;

        const deleteTodo = async (todos:any) => {
            await deleteDoc(todos);
        }

        req.on('data', async (chunk) => {
            body += chunk.toString(); //
            body = await JSON.parse(body);

            const todos = doc(db, 'todos/'+body.docID)
            await deleteTodo(todos);
        });

        req.on('end', () => {
            res.write('ok');
        })
    } else {
        res.write('unknown method')
    }

    res.end('ok');
}
