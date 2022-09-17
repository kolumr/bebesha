import { Meteor } from 'meteor/meteor';
import {SalesCollection}  from '/imports/api/SalesCollection'
import { WebApp } from 'meteor/webapp'
import cors from 'cors'
export function insertSales(sale){
  return SalesCollection.insert(sale)
}
Meteor.startup(() => {
//  if(SalesCollection.find().count()===0){
//   insertSales(5000, 'Kolum');
//   insertSales(400, 'Abu');
//  }
// WebApp.rawConnectHandlers.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Authorization,Content-Type");
//   return next();
// });
// WebApp.connectHandlers.use(cors)
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
});
