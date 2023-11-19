import { MongoClient } from 'mongodb'
// mongodb+srv://hoho3419:<password>@cluster0.8ep2qxo.mongodb.net/?retryWrites=true&w=majority  비번 : g6X3uIyAe3lq5iCj 

const handler = async (req,res) =>{
  if(req.method === 'POST'){
    const data = req.body;
    // const { title, image, address, description } = data;

    const client = await MongoClient.connect('mongodb+srv://hoho3419:g6X3uIyAe3lq5iCj@cluster0.8ep2qxo.mongodb.net/meetups?retryWrites=true&w=majority');
    
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    //  작업이 완료되었다는 뜻.
    res.status(201).json({message: '데이터 저장이 완료되었습니다.'});
  }
}

export default handler;