import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    if(req['method']!='POST')return res.status(200).json({'code': 'AUTH01','error':true, 'message': "Invalid method"});
    const { database } = await connectToDatabase();
    if(req.query['accessToken'] != "lmao.lmao")return res.status(200).json({'error': true, 'code': "Invalid Token"})
    let result = await database.collection("kitchen").findOne({'kitchen': 'kitchen'});
    const aa = [];
    // console.log(result['order']);
    await result['order'].forEach(element => {
        aa.push(element);
    });
    res.status(200).json(aa);
}