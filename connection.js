var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
  var Connection = require('mongodb').Connection;
  var Server = require('mongodb').Server;
  var BSON = require('mongodb').BSON;
  var ObjectID = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://localhost:27017/student';
// Use connect method to connect to the Server
var Db = {};
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  Db = db;    
});

function getDetail(callback){
  Db.collection('details').find({}).toArray(function(e,docs){
        if(e)
        {
          callback(e);
        }
        else
        {
          callback(e,docs);
        }
    });
}


function insertDocs(firstName,lastName,callback){
  Db.collection('details').insert({"firstname" : firstName, "lastname" : lastName},function(err,docs){
    if(err){
      callback(err);
    }
    else{
        callback(err,docs);
    }
  });
}

function getUpdatedDetail(id,callback){
  Db.collection('details').findOne({"_id":ObjectID(id)},function(e,docs){
        if(e)
        {
          callback(e);
        }
        else
        {
          callback(e,docs);
        }
    });
}

function updateDocs(id,user,callback){
  Db.collection('details').update({"_id":ObjectID(id)},user,function(err,docs){
    if(err){
      callback(err);
    }
    else
    {
      callback(err,user);
    }
  });
};
function removeDocs(id,callback){
  console.log(id);
  Db.collection('details').remove({"_id":ObjectID(id)},function(err,docs) {
       if(err){
          callback(err);
       }
       else{
          callback(err,docs);
       }
   });
}

module.exports = {
  getDetail:getDetail,
  insertDocs:insertDocs,
  removeDocs:removeDocs,
  updateDocs:updateDocs,
  getUpdatedDetail:getUpdatedDetail
};
