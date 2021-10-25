import type { IncomingMessage, ServerResponse } from 'http'
import {getFirestore, updateDoc, getDoc, doc} from 'firebase/firestore/lite';

import { app } from '~/firestore/firestore';
const db = getFirestore(app);

export default async (req: IncomingMessage, res: ServerResponse) => {
    if(req.method === 'PATCH') {
        let body = '';
        let todo = null;

        const updateTodo = async (todos:any, todo:any) => {

            await updateDoc(todos, "status", todo.status);
        }

        req.on('data', async (chunk) => {
            body += chunk.toString(); //
            body = await JSON.parse(body);
            todo = {
               status: true
            }
            const todos = doc(db, 'todos/'+body.docID)
            await updateTodo(todos, todo);
        });

        req.on('end', () => {
            res.write('ok');
        })
    } else {
        res.write('unknown method')
    }

    res.end();
}
