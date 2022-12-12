import { connectToDatabase } from "../../../lib/mongodb";


export default async function handler(req,res){
    if(req['method']!='POST')return res.status(200).json({'code': 'CHECK01','error':true, 'message': "Invalid method"});

    const { database } = await connectToDatabase();
    let result = await database.collection("userData").findOne({'username': req.query['username']});
    if(result == null)return res.status(200).json({'code': 'CHECK02', 'message': `No user found by the username - '${req.query['username']}'`, 'error': true});
    if(result['username']==req.query['username'] && result['accessCode'] == req.body)
    res.status(200).json({'code': 'VALID', 'error': false})
    else res.status(200).json({'code': "INVALID01",'message': 'An invalid username or user token was passed', 'error': true})
}