
var express = require('express');
var app = express();
var path=require('path');
var router = express.Router();
var bodyParser = require('body-parser');




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});



app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(bodyParser.json());

router.route('/removeRun').post(function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);


    removeDocument(db, function(){},req.body);

    db.close()

  })

  res.json(req.body);
})
.get(function(req,res){

});

var repeat=false;

router.route('/addRun').post(function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    var cursor =db.collection('lunchRuns').find();
    repeat=false;
    var addObject=req.body;
    delete addObject._id;

    cursor.each(function(err, doc) {
      if (doc!=null){
        var dbObject=doc;
        delete dbObject._id;

      }

      var countRepeats=0;
      if (dbObject!=null){
        for (var item in addObject){
          if (addObject[item]==dbObject[item]){
            countRepeats+=1;
          }

        }
      }
      if (countRepeats==15){
        console.log("repeat");
        repeat=true;

      }
      if (err){
        assert.equal(err, null);
      }

    });

    setTimeout(function(){
      if(repeat==false){
        insertDocument(db, function(){},req.body)
      }

      db.close()
    },1000);

  })

//res.json(req.body);
})
.get(function(req,res){

});




router.route('/joinRun').post(function(req,res){})
.get(function(req,res){

  var val= null;
  MongoClient.connect(url, function(err, db) {
    var cursor =db.collection('lunchRuns').find();

    resultArray=[];

    cursor.each(function(err, doc) {

      if (err){
        assert.equal(err, null);
      }else if (doc==null){

        val={
        message:resultArray
        }
        res.json(val);
      }
      resultArray.push(doc);

    });

  })
});



router.route('/updateRun').post(function(req,res){
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    updateDocument(db, function(){},req.body)
    db.close()

  })
})
.get(function(req,res){
});



var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';





app.get('/', function (req, res) {
  //res.send('<p>submit</p>');
  res.sendFile(path.join(__dirname+'/index.html'));
  //res.sendFile(path.join(__dirname));

    //console.log("\n\n\nword: "+req.params.username);

});

app.use(express.static('app'));




// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3000, function () {

  console.log('Example app listening on port 3000!');
});



var insertDocument = function(db,callback,obj) {

  db.collection('lunchRuns').insertOne( obj, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback();
  });

};




var updateDocument = function(db,callback,obj) {
  console.log("success");

  db.collection('lunchRuns').update({"_id":ObjectId(obj[0]._id)}, {$set : {"otherUsers":obj[1],"otherPasswords":obj[2]}});
  console.log(obj);

};



var removeDocument = function(db,callback,obj){

  db.collection('lunchRuns').remove(obj, function(err, result) {
    assert.equal(err, null);
    console.log("document has been removed");

    callback();
  });

}



var findLunchRuns = function(db, callback) {
   var cursor =db.collection('lunchRuns').find();
   console.log();
   //return cursor;
   var num=0;
   var resultArray=[];
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        //console.dir(doc);
        num+=1;
        console.log(num);
        for (var at in doc){
          console.log(at+": "+doc[at]);
        }
        resultArray.push(doc);

        //console.log(num+ ": "+doc.username+", "+doc.password);
        console.log("\n\n\n");
      } else {
      //return resultArray;
        callback();
      }

   });
   //return resultArray;
};

var returnLunchRuns = function(db, callback) {
   var cursor =db.collection('lunchRuns').find( );

   //return cursor;
   console.log("im return lunch runs");
   var resultArray=[];
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {

         resultArray.push(doc);

      } else {
      //return resultArray;
        callback();
      }

   });
   return resultArray;
};

