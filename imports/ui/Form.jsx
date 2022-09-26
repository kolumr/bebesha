import React, {useState} from "react";
import { Button, TextField } from '@material-ui/core';
import { SalesCollection } from "../api/SalesCollection";
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'
export const stores = ['Chandarana','Cleanshelf','Naivas']
export const  regions = ['Nairobi','Kisumu','Mombasa']
function Form(props){

    const[customer, setCustomer] = useState({
      imageUrl:'',
      amount:'',
      storeName:'',
      customerName:'',
      customerNumber:'',
      region:''
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
  const handleImage = (e) => {
    console.log(e.target.files[0])
    file =[]
    filePath = []
        const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      
        const binaryStr = reader.result
         file.push(binaryStr)
         customer.imageUrl= binaryStr;
      }
      if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0])
      }
        var filePath_ = `${date}_${e.target.files[0].name}`
        filePath.push([filePath_,e.target.files[0].type])
       console.log(filePath)
      }
      
      // console.log(filePath)
      // setTimeout(() => {
      //   console.log(file)
      // }, 1000);
     
  
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
        if (customer.amount.length === 0) return alert( 'Amount is missing');
        if (customer.storeName.length === 0) return alert( 'Select store');
        if (customer.customerName.length === 0) return alert( 'Customer Name is missing');
        if (customer.customerNumber.length === 0) return alert( 'Phone number is missing');
        if (customer.region.length === 0) return alert( 'Select region');
        
        console.log(customer);
        insertSales(customer);
        setCustomer({
          imageUrl:'',
          amount:'',
          storeName:'',
          customerName:'',
          customerNumber:'',
          region:''
        })
      }
      const upl = Meteor.call('GetBucket',file, (error, result) => { console.log('done') })
    return(
        <div style={styles.body}>
            
        <div style={styles.container}>
        
            <div style={styles.inner_container}>
            <h2>EAGM Salesman Bebesha App</h2><br />
            <form action="/upolad" method="post" encType="multipart/form-data">
                <div>Select the image of the receipt</div>
             <br />
                {/* <Dropzone
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
         */}
        
        {/* <Button onClick={GetBucket}><CloudUpload></CloudUpload>Upload Images</Button>   */}
        </form>
        {/* <br /><br /> */}

        <input type='file' onChange={(e)=>handleImage(e)} ></input><br /><br />
                <TextField label='Enter Amount' variant="outlined" type="number" value={customer.amount} onChange={(e)=>{setCustomer({...customer,amount: e.target.value})}}></TextField> <br /><br />
               
               
              <select onChange={(e)=>{setCustomer({...customer,storeName: e.target.value})}} value={customer.storeName}>
                <option>--Select Store--</option>
                {stores.map((s,i)=>{
                  return <option key={i} value={s}>{s}</option>
                })}
              </select>
                 <br />
                <br />
                
                <TextField label='Customer Name' variant="outlined" value={customer.customerName} onChange={(e)=>{setCustomer({...customer,customerName: e.target.value})}}></TextField> <br />
                <br />
                <TextField label='Customer Phone Number' variant="outlined" value={customer.customerNumber} type='number' onChange={(e)=>{setCustomer({...customer,customerNumber: e.target.value})}}></TextField> <br />

                {/* <p>{date}</p> <br /> */}
                <br />
                <select onChange={(e)=>{setCustomer({...customer,region: e.target.value})}} value={customer.region}>
                <option>--Select Region--</option>
                {regions.map((s,i)=>{
                  return <option key={i} value={s}>{s}</option>
                })}
              </select>
              <br /><br />
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