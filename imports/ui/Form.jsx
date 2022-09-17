import React, {useState} from "react";
import { Button, TextField } from '@material-ui/core';
import { CloudUpload} from '@material-ui/icons';
import AWS from 'aws-sdk'
import { SalesCollection } from "../api/SalesCollection";
// import backblaze from 'node-backblaze-b2'
function Form(){
  
    const[customer, setCustomer] = useState({
      imageUrl:'',
      amount:'',
      storeName:'',
      customerName:'',
      customerNumber:''
    });
    const [file, setFile] = useState();
    var date = Date.now()
    function insertSales(sale){
      return SalesCollection.insert(sale)
    }
    const handleChange = (e) => {
        const [f] = e.target.files;
        setFile(f);
        console.log(f)
      };
      
    async function GetBucket() {
      AWS.config.update({
        accessKeyId: 'a7beeec896bd',
        secretAccessKey: '0042089a340f9665fdb9d667b1c153244817483816'
      });
      var b2 = new AWS.S3({endpoint: 's3.us-west-004.backblazeb2.com'});
      var params = {
        Bucket: 'salesBucket',
        Body : file,
        Key : 'bucketitem1'
      };
      var req = b2.putObject(params)
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
          console.log("Uploaded in:", data.Location);
        }
      });
        // try{
        //   let response = await b2.listObjects({ bucketName: 'salesBucket' });
        //   console.log(response);
        // } catch (err) {
        //   console.log('Error getting bucket:', err);
        // }
        // // b2.createBucket({Bucket: 'bucketName'}, function() {
        // //   var params = {Bucket: 'bucketName', Key: 'keyName', Body: 'Hello World!'};
        // //   b2.putObject(params, function(err, data) {
        // //   if (err)
        // //   console.log(err)
        // //   else
        // //   console.log("Successfully uploaded data to " + 'bucketName' + "/" + keyName);
        // //   });
        // //   });
        }
      const handleUpload = ()=>{
        GetBucket();
      }
      const handleSubmit= ()=>{
        console.log(customer);
        insertSales(customer);
      }
    return(
        <div style={styles.body}>
            
        <div style={styles.container}>
        
            <div style={styles.inner_container}>
            <h2>EAGM Salesman Bebesha App</h2>
                <div>Enter the details of the sale</div>
               <Button onClick={handleUpload}><CloudUpload></CloudUpload>Upload</Button> 
                <Button><input onChange={handleChange} type="file"/></Button> 
                <label>  </label>
                <br />
                
                <label htmlFor="">Enter Amount:  </label>   <TextField  type="text" value={customer.amount} onChange={(e)=>{setCustomer({...customer,amount: e.target.value})}}></TextField> <br /><br />
                
                <label htmlFor="">Enter Store Name:  </label> 
                <TextField  value={customer.storeName} onChange={(e)=>{setCustomer({...customer,storeName: e.target.value})}} ></TextField> <br />
                <h5>Customer Details</h5>
                <label htmlFor="">Enter Customer Name:  </label>
                <TextField  value={customer.customerName} onChange={(e)=>{setCustomer({...customer,customerName: e.target.value})}}></TextField> <br />
                <label htmlFor="">Enter Customer Number:  </label>
                <TextField  value={customer.customerNumber} type='number' onChange={(e)=>{setCustomer({...customer,customerNumber: e.target.value})}}></TextField> <br />
                <p>{date}</p>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            </div>
        </div>
    ) 


}
export default Form;
const styles = {
    body:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
    },
    container:{
        marginTop:'60px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        right: 0,
        bottom: '2rem',
        padding: '0.5rem',
        fontFamily: 'sans-serif',
        fontSize: '1.5rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        width:'50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    inner_container:{
        margin: 'auto',
        background: 'white',
        fontSize: '1rem',
    }


}