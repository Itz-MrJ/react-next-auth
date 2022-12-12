import { MongoClient } from "mongodb";

const uri = "mongodb+srv://MrJaguar:Aryaarunkumaristhebest@cluster0.qmhrz.mongodb.net/?retryWrites=true&w=majority";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let mongoClient = null;
let database = null;

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
        mongoClient = await (new MongoClient(uri, options)).connect();
        }
        database = await mongoClient.db("hackathon");
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
    }
}