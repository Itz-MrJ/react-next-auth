import { connectToDatabase } from "../../../lib/mongodb";

const refreshToken = () => {
    let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.></?`
    var result = '';
    var charactersLength = characters.length;
    for ( var i = 0; i < 64; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}
export default async function handler(req, res){
    console.log("here")
    if(req['method']!='POST')return res.status(200).json({'code': 'AUTH01','error':true, 'message': "Invalid method"});

    const { database } = await connectToDatabase();
    const d = new Date();
    const newDateObj = new Date();
    // demo 60 minutes
    newDateObj.setTime(d.getTime() + (60 * 60 * 1000));
    let query = await database.collection("userData").findOne({'username': req.query['username']});
    if(query!=null)
    if(query['username'] == req.query['username'] && query['password'] == req.query['password']){
        console.log(query);
        var code;
        if(query['username']!='kitchen')
        code = refreshToken();
        else code = "lmao.lmao";
        await database.collection("userData").updateOne({'username': req.query['username']}, {$set: {'exp': newDateObj, 'accessCode': code}}, {upsert: true})
        return res.status(200).json({'code': 'LOGINCHECK01', 'message': `Welcome back ${req.query['username']}!`,'error': false, 'accessCode': code, 'exp': newDateObj});
    }
    else return res.status(200).json({'code': 'AUTH02', 'message': "User already exists, an invalid password was entered.", 'error': true});

    var code = refreshToken()
    await database.collection("userData").insertOne({'username': req.query['username'], 'password': req.query['password'], 'accessCode': code, 'exp': newDateObj})
    res.status(200).json({'code': 'SUCCESSNEWAUTH01', 'message': "User created successfully", 'error': false, 'accessCode': code, 'exp': newDateObj});
}