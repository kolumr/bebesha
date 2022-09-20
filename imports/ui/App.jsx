import React from 'react';
import * as dotenv from 'dotenv'
import {useTracker} from 'meteor/react-meteor-data';
import { SalesCollection } from '../api/SalesCollection';
import ListSales from './ListSales.jsx';
import Navigation from './Navigation.jsx';
export const App = () => {
  dotenv.config()
  console.log(process.env)
  const sales = useTracker(()=>SalesCollection.find({}).fetch())
  return (
  <div>
    <Navigation/>
  </div>
)};
