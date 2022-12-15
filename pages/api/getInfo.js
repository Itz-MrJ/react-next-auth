import { connectToDatabase } from "../../lib/mongodb";


export default async function handler(req, res) {
    const { database } = await connectToDatabase();
    let result = await database.collection("userData").findOne({'username': req.query['username']});
    if(req['method']!='POST')return res.status(200).json({'code': 'CHECK01','error':true, 'message': "Invalid method"});
    else return res.status(200).json(result);
  }
  