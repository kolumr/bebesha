import { Meteor } from 'meteor/meteor';
import {SalesCollection}  from '/imports/api/SalesCollection'
import { WebApp } from 'meteor/webapp'
import cors from 'cors'
const fs = require('fs')
import AWS from 'aws-sdk'
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
    awsUpdate
    var s3 = new AWS.S3({endpoint:'s3.us-west-004.backblazeb2.com'});
    file.forEach((f,index)=>{
      var params = {
        Bucket: 'salesBucket',
        Key : filePath[index][0],
        Body : f,
        ContentType: filePath[index][1],
        ACL : 'public-read'
      };
      s3.upload(params, function(err, data) {
        if (err)
        console.log(err)
        else
        // console.log("Successfully uploaded data to " + data.ETag);
        console.log(data)
        });
    })
    
  },
async 'fetchImage'({filePath}){
  let result;
  awsUpdate
  var s3 = new AWS.S3({endpoint:'s3.us-west-004.backblazeb2.com'});
  var params={
    Bucket: 'salesBucket',
    Key:filePath
  }
  s3.getObject(params, function(err, data) {
   
    if (err) {
     console.log(err);
    } else {
      console.log('success')
      result= data
     return data
     
    }
   });
   return result;
},

})

