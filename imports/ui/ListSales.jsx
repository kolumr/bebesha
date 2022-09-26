import { Button } from '@material-ui/core'
import React from 'react'
import { SalesCollection } from '../api/SalesCollection'
import { useEffect } from 'react';
import { useState } from 'react';
import { stores } from './Form';
import { regions } from './Form';
export default function ListSales() {
    const [loading,setLoading] = useState(true);
    const [sales,setSales] = useState('')
    const [showImage,setShowImage] = useState(false)
    const [data,setData] = useState()
    const [region_,setRegion] = useState('')
    const [store_,setStore] = useState('')
    const filePath = 'localhost_3000_.png'
    useEffect(()=>{
        console.log("getting sales")
        getSales();
    },[])
    const getSales= async()=>{
        console.log("started");
        var sales1 = SalesCollection.find({}).fetch();
        console.log(sales1)
        setSales(sales1);
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
const filter = (region,store) =>{
  console.log(region+""+store)
  if (region !== '' && store !==''){
    var sales1 = SalesCollection.find({storeName:store,region:region}).fetch();
    setSales(sales1);
  } else if(store !== ''){
    var sales1 = SalesCollection.find({storeName:store}).fetch();
    setSales(sales1);
  } else if(region !==''){
    var sales1 = SalesCollection.find({region:region}).fetch();
    setSales(sales1);
  }else{
    getSales()
  }
}
const setImage = (url)=>{
  setData(url)
setShowImage(true);

}
const handleshowimage =()=>{
  console.log('pressed')
  setShowImage(false)
}
  return (<div>
    {showImage? <div>
      <Button onClick={(()=>handleshowimage())}>Back</Button>
      <img src={data} style={{height:'300px',width:'250px'}}></img>
    </div> :
    <div >
   <br />
    {loading? <div>Loading....</div>:(
      <div class="container" >
        <div class="row" style={{height:'60px'}}>
        <div class="col-sm">Amount</div>
        <div class="col-sm">Customer Name</div>
        <div class="col-sm"> Customer Number</div>
        <div class="col-sm">
          <select name="" id="" onChange={(async(e)=>{setStore(e.target.value); filter(region_,e.target.value)})}>
          <option value="">All Stores</option>
          {stores.map((s,i)=>{
                  return <option key={i} value={s}>{s}</option>
                })}
          </select>
        </div>
        <div class="col-sm" >
          <select name="" id="" onChange={((e)=>{setRegion(e.target.value); filter(e.target.value,store_)})}>
            <option value="">All Regions</option>
            {regions.map((s,i)=>{
                  return <option key={i} value={s}>{s}</option>
                })}
          </select>
        </div>
        <div class="col-sm" >Receipt</div>
        <div class="col-sm" >Action</div>
        </div>
             { sales.map((e) =>{
                return(
                <div key={e.id} class="row">
                    <div class="col-sm">{e.amount}</div>
                    <div class="col-sm">{e.customerName}</div>
                    <div class="col-sm">{e.customerNumber}</div>
                    <div class="col-sm">{e.storeName}</div>
                    <div class="col-sm">{e.region}</div>
                    <div class="col-sm" id='sales-image'><img src={e.imageUrl[0]} style={{height:'60px',width:'50px'}}></img></div>
                    <button class="col-sm" onClick={(()=>setImage(e.imageUrl[0]))}>View Receipt</button>
                </div>)
             })
                }
        </div>
        )}
    </div>}
    </div>
  )
}
