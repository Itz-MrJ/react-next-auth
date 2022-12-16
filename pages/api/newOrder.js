import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    if(req.query['item_name'] == 'null' || req.query['item_name'] == null)return res.status(200).json(0);
    const { database } = await connectToDatabase();
    let result = await database.collection("kitchen").findOne({'kitchen': 'kitchen'});
    var code = "";
    var i=0;
    while(i<6){
        code += Math.floor(Math.random() * (9 - 0)) + 0;
        i++;
    }
    result['total']++;
    result['order'].push({'username': req.query['username'], 'paid': true, 'item_name': req.query['item_name'], 'code': code, 'orderNumber': result['total']});
    await database.collection("kitchen").updateOne({'kitchen': 'kitchen'}, {$set: {'order': result['order'], 'total': result['total']}})
    res.status(200).json(result['order'][result['order'].length - 1]);
}