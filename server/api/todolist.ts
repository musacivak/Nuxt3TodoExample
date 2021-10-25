import type { IncomingMessage, ServerResponse } from 'http'
import { getFirestore, collection, getDocs, query, orderBy, documentId} from 'firebase/firestore/lite';

import { app } from '~/firestore/firestore';
const db = getFirestore(app);
const todos = collection(db, 'todos')
const que = query(todos, orderBy('createdAt', 'desc'))

export default async (req: IncomingMessage, res: ServerResponse) => {
    const todolist = await getDocs(que);
    const todosData = todolist.docs.map(doc => doc)
    const data = [];

    todosData.forEach((val, index) => {
        let temp = {
            id: val.id,
            data: val.data()
        }
        data.push(temp)
    })

    return { data }
}
