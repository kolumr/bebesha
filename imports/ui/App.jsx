import React from 'react';
import Form from './Form.jsx';
import {useTracker} from 'meteor/react-meteor-data';
import { SalesCollection } from '../api/SalesCollection';
export const App = () => {
  const sales = useTracker(()=>SalesCollection.find({}).fetch())
  return (
  <div>
    {sales.map((sale)=>{
      <ul>
      <li>{sale.name}</li>
      <li>{sale.amount}</li>
      </ul>
    })}
    <Form/>
  </div>
)};
