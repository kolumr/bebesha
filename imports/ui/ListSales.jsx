import { Button } from '@material-ui/core'
import React from 'react'
import { SalesCollection } from '../api/SalesCollection'
import { useEffect } from 'react';
import { useState } from 'react';


export default function ListSales() {
    const [loading,setLoading] = useState(true);
    const [sales,setSales] = useState('')
    const [data,setData] = useState()
    const filePath = 'localhost_3000_.png'
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
    const getImage = async()=>{
       await Meteor.call('fetchImage',{filePath},(err, res) => {
            if (err) {
              alert(err);
            } else {
              // success!
              alert('success')
             
            }
          })
            }
            const chooseFile = document.getElementById("choose-file");
            const imgPreview = document.getElementById("img-preview");
            
            function getImgData() {
              const files = chooseFile.files[0];
              if (files) {
                console.log(files)
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files);
                fileReader.addEventListener("load", function () {
                  console.log(this.result)
                  imgPreview.style.display = "block";
                  imgPreview.innerHTML = '<img src="' + sales[13].imageUrl[0] + '" />';
                });    
              }
            }

  return (
    <div >
   
    {loading? <div>Loading....</div>:(
      <div class="container" >
        <div class="row" style={{height:'60px'}}>
        <div class="col-sm">Amount</div>
        <div class="col-sm">Customer Name</div>
        <div class="col-sm"> Customer Number</div>
        <div class="col-sm">Store Name</div>
        <div class="col-sm" >Receipt</div>
        </div>
             { sales.map((e) =>{
                return(
                <div key={e.id} class="row">
                    <div class="col-sm">{e.amount}</div>
                    <div class="col-sm">{e.customerName}</div>
                    <div class="col-sm">{e.customerNumber}</div>
                    <div class="col-sm">{e.storeName}</div>
                    <div class="col-sm" id='sales-image'><img src={e.imageUrl[0]} style={{height:'60px',width:'50px'}}></img></div>
                </div>)
             })
                }
        </div>
        )}
    </div>
  )
}
