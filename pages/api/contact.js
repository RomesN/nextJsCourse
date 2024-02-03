import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage = { email, name, message };
    let client = null;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.aoxwe05.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to the database." });
      return;
    }

    try {
      const db = client.db();
      const result = await db.collection("messages").insertOne({ ...newMessage });
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing the message failed." });
      return;
    }

    client.close();
    res.status(201).json({ message: "Successfuly stored message.", newMessage });
    return;
  }
}
