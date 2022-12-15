import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res){
    const { database } = await connectToDatabase();
    let result = await database.collection("items").find({});
    // await result.forEach(console.dir);
    const aa = [];
    await result.forEach(element => {
        aa.push(element);
    });
    res.status(200).json(aa);
}