import type { IncomingMessage, ServerResponse } from 'http'
import { getFirestore, collection, addDoc} from 'firebase/firestore/lite';

import { app } from '~/firestore/firestore';
const db = getFirestore(app);
const todos = collection(db, 'todos')

export default async (req: IncomingMessage, res: ServerResponse) => {
    if(req.method === 'POST') {
        let body = '';
        let todo = null;

        const addData = async (todo:any) => {
            await addDoc(todos, todo);
        }

        req.on('data', async (chunk) => {
            body += chunk.toString(); //
            body = await JSON.parse(body);
            todo = {
                title: body.title,
                status: false,
                createdAt: Date.now()
            }
            await addData(todo);
        });

        req.on('end', () => {
            res.write('ok');
        })
    } else {
        res.write('unknown method')
    }

    res.end();
}
