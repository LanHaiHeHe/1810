const {
  MongoClient,
  ObjectId
} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = '1810';
// Use connect method to connect to the server

let connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, client) => {
      if (err) {
        reject(err)
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        resolve({
          db,
          client
        })
      }
    });
  })
}

let insert = (col, arr) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.insertMany(arr, (err, result) => {
      if (err) {
        reject(err)
      } else {
        console.log(result);
        resolve(result);
        client.close();
      }
    })
  })
}
// insert('studentLogin',[{
//   'name':'lizhongwei',
//   'password':123
//   }]);

let find = (col, obj) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.find({
      ...obj
    }).toArray(function (err, docs) {
      if (err) {
        reject(err)
      } else {
        resolve(docs);
        client.close();
       
      }
    });
  })
}
// find('studentLogin',{
//   name:"lizhongwei"
// });

// collection.updateOne({ a : 2 }
  // , { $set: { b : 1 } }, function(err, result) {
let update= (col, obj,obj1) => {
  return new Promise(async (resolve, reject) => {
    let {
      db,
      client
    } = await connect();
    const collection = db.collection(col);
    collection.updateOne({
      ...obj
    },{$set:
      {...obj1}
    } ,function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve( result);
        client.close();
      }
    });
  })
}
// collection.deleteOne({ a : 3 }, function(err, result) {
  let del= (col, obj) => {
    return new Promise(async (resolve, reject) => {
      let {
        db,
        client
      } = await connect();
      const collection = db.collection(col);
      collection.deleteOne({
        ...obj
      },function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve( result);
          
          client.close();
        }
      });
    })
  }
// del('students',{
//   "name" : "malin",
//   "age" : 18,
//   "skill" : "all",
//   "description" : "huhu",
//   "city" : "guangzhou",
//   "aihao" : "lanqiu"
// });
module.exports = {
  connect,
  insert,
  find,
  ObjectId,
  update,
  del
}

