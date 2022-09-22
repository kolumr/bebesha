import React, {useState} from "react";
import { Button, colors, TextField } from '@material-ui/core';
import { CloudUpload} from '@material-ui/icons';
import { SalesCollection } from "../api/SalesCollection";
import { fs } from 'fs'
import {path} from 'path'
import { Slingshot } from 'meteor/edgee:slingshot';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

function Form(props){
  var base64data;
    const[customer, setCustomer] = useState({
      imageUrl:'',
      amount:'',
      storeName:'',
      customerName:'',
      customerNumber:''
    });
    
    // const [file,setFile] = useState()
    // const [filePath, setFilePath] = useState()
    var file =[]
    var filePath = []
    var date = Date.now()

    function insertSales(sale){
      return SalesCollection.insert(sale)
    }
    // File Upload
    
    const fileParams = ({ meta }) => {
      return { url: 'https://httpbin.org/post' }
  }
  const onFileChange = ({ meta, file }, status) => { 
      console.log(status, meta, file) 
  }
  const onSubmit = (files, allFiles) => {
    file =[]
    filePath = []
      allFiles.forEach((f) =>{
        const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      
        const binaryStr = reader.result
         file.push(binaryStr)
         console.log(file)
      }
      if(f.file){
        reader.readAsDataURL(f.file)
      }
        var filePath_ = `${date}_${f.file.name}`
        filePath.push([filePath_,f.file.type])
       console.log(filePath)
      })
      allFiles.forEach(f => {
        
        f.remove()
      })
      // console.log(filePath)
      // setTimeout(() => {
      //   console.log(file)
      // }, 1000);
     
  }
  const getFilesFromEvent = e => {
      return new Promise(resolve => {
          getDroppedOrSelectedFiles(e).then(chosenFiles => {
              resolve(chosenFiles.map(f => f.fileObject))
          })
      })
  }
  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
      const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'
      return (
          <label className="btn btn-danger mt-4">
              {textMsg}
              <input
                  style={{ display: 'none' }}
                  type="file"
                  accept={accept}
                  multiple
                  onChange={e => {
                      getFilesFromEvent(e).then(chosenFiles => {
                          onFiles(chosenFiles)
                      })
                  }}
              />
          </label>
      )
  }
      
    async function GetBucket() {
      Meteor.call('uploadSalesImage', {file,filePath}, (err, res) => {
        if (err) {
          alert(err);
        } else {
          // success!
          alert('success')
        }
      })
 
        }

      const handleSubmits= ()=>{
        customer.imageUrl=file;
        console.log(customer);
        insertSales(customer);
      }
      const upl = Meteor.call('GetBucket',file, (error, result) => { console.log('done') })
    return(
        <div style={styles.body}>
            
        <div style={styles.container}>
        
            <div style={styles.inner_container}>
            <h2>EAGM Salesman Bebesha App</h2><br />
            <form action="/upolad" method="post" encType="multipart/form-data">
                <div>Drag and drop or select an image of the receipt</div>
             
                <Dropzone
            onSubmit={onSubmit}
            onChangeStatus={onFileChange}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*"
            maxFiles={5}
            inputContent="Drop A File"
            styles={{
                dropzone: { width: 500, height: 200 },
                dropzoneActive: { borderColor: 'green' },
            }}            
        /> <br />
        
        
        {/* <Button onClick={GetBucket}><CloudUpload></CloudUpload>Upload Images</Button>   */}
        </form>
        {/* <br /><br /> */}
                <TextField label='Enter Amount' variant="outlined" type="text" value={customer.amount} onChange={(e)=>{setCustomer({...customer,amount: e.target.value})}}></TextField> <br /><br />
               
               
                <TextField  label= 'Enter Store Name' variant="outlined" value={customer.storeName} onChange={(e)=>{setCustomer({...customer,storeName: e.target.value})}} ></TextField> <br />
                <br />
                
                <TextField label='Customer Name' variant="outlined" value={customer.customerName} onChange={(e)=>{setCustomer({...customer,customerName: e.target.value})}}></TextField> <br />
                <br />
                <TextField label='Customer Phone Number' variant="outlined" value={customer.customerNumber} type='number' onChange={(e)=>{setCustomer({...customer,customerNumber: e.target.value})}}></TextField> <br />
                {/* <p>{date}</p> */} <br />
                
                
                <Button style={{backgroundColor:'blue',color:'white'}} onClick={handleSubmits}>Submit</Button>
               
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