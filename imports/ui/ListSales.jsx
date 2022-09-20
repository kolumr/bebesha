import { Button } from '@material-ui/core'
import React from 'react'
import { SalesCollection } from '../api/SalesCollection'
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
import { useState } from 'react';
import { Search } from '@material-ui/icons';

export default function ListSales() {
    const [loading,setLoading] = useState(true);
    const [sales,setSales] = useState('')
    const filePath = 'CAPTURE.PNG'
    useEffect(()=>{
        console.log("getting sales")
        getSales();
    },[])
    const getSales= async()=>{
        console.log("started");
        var sales1 = SalesCollection.find({}).fetch();
        console.log(sales1)
        await setSales(sales1);
        setLoading(false);
    }
    const getImage =()=>{
        Meteor.call('fetchImage',{filePath},(err, res) => {
            if (err) {
              alert(err);
            } else {
              // success!
              alert('success')
            }
          })
            }

  return (
    <div>
    <div>ListSales</div>
    {loading? <div>Loading....</div>:(
    <Table bordered size='sm' >
            <thead>
                <tr>
                    <td>Amount</td>
                    <td>Customer Name</td>
                    <td>Customer Phone Number</td>
                    <td>Store Name</td>
                </tr>
                
            </thead>
            <tbody>
             { sales.map((e) =>{
                return(
                <tr key={e.id}>
                    <td>{e.amount}</td>
                    <td>{e.customerName}</td>
                    <td>{e.customerNumber}</td>
                    <td>{e.storeName}</td>
                </tr>)
             })
                }
            </tbody>
        </Table>)}
    <Button onClick={getImage}>GetImage</Button>
    <img src="data:application/octet-stream;base64,W29iamVjdCBPYmplY3Rd" alt="Image gone wrong" />
    </div>
  )
}
