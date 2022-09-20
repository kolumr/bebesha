import { Meteor } from 'meteor/meteor';
import {SalesCollection}  from '/imports/api/SalesCollection'
import { WebApp } from 'meteor/webapp'
import cors from 'cors'
import AWS, { S3 } from 'aws-sdk'
export function insertSales(sale){
  return SalesCollection.insert(sale)
}
const awsUpdate = AWS.config.update({
  accessKeyId: '004a7beeec896bd0000000001',
  secretAccessKey: 'K004LL/q2OOuaVGMo/Xmlu+lftFzal4'
});
Meteor.startup(() => {

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
WebApp.connectHandlers.use(cors(corsOptions))
 
});
Meteor.methods({
  'uploadSalesImage'({file,filePath}){
    console.log('started')
    awsUpdate
    var b2 = new AWS.S3({endpoint: 's3.us-west-004.backblazeb2.com'});
    file.forEach((f,index)=>{
      var params = {
        Bucket: 'salesBucket',
        Body : f,
        Key : filePath[index]
      };
      var req = b2.upload(params)
      req.on('build',function(req){
        req.httpRequest.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      });
      req.send(function (err, data) {
        //handle error
        if (err) {
          console.log("Error", err);
        }
      
        //success
        if (data) {
          console.log(filePath[index], "Uploaded in:", data.ETag);
        }
      });
    })
    
  },
'fetchImage'({filePath}){
  var s3 = new S3()
  var params={
    Bucket: 'salesBucket',
    Key:filePath
  }
  s3.getObject(params, function(err, data) {
    awsUpdate
    if (err) {
     console.log(err);
    } else {
     resolve(data.Body);
     console.log(data.Body)
    }
   });
}
})

