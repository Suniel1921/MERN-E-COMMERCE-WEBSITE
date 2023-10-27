import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios';
import CategoryForm from '../Form/CategoryForm';
import toast from 'react-hot-toast';
import { Modal } from 'antd';




const CreateCategory = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');


    //create category route network request

    const submitHandler = async(e)=>{
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:3000/createCategory",{name})
      if(res?.data?.success){
       toast.success(`${name} is Created !`)
       setName('');
       getCategory()
      }
      else{
        toast.error(res?.data?.message)
      }
    }  catch (error) {
      console.log(error);
      if (error.response) {
          toast.error(error.response.data.message);
      } else {
          toast.error(`Something went Wrong: ${error.message}`);
      }
  }
  
    } 



  //get all category list route network request
    const getCategory = async ()=>{
    try {
      const res = await axios.get("http://localhost:3000/allCategory");
    if(res.data.success){
      setCategoryData(res.data.allCategory)
    }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getCategory();

  },[])

  //update categorgy update route network request
  const updateHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/updateCategory/${selected._id}`,{name: updatedName})
      if(res.data.success){
        toast.success(res.data.message)
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getCategory()
      }
      else{
        toast.error(res.data.message)
      }
      
      
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
      
    }


  }



  //delete route network request

  const deleteHandler = async (id)=>{
    try {
      const res = await axios.delete(`http://localhost:3000/deleteCategory/${id}`)
      if(res.data.success){
        // toast.success('category deleted !')
        toast.success(res.data.message)
        getCategory();
      }
      
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
      
    }
  }





  return (
    <>
     <CategoryForm submitHandler={submitHandler} value={name} setValue={setName}/>
    <div className='adminsec container'>
   
        <div className='admin-menu'>
            <AdminMenu />
        </div>
        <div className='content'>
            <div>
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              {
                categoryData?.map((c)=>(
                  <tr key={c._id}>
                    <td >{c.name}</td>
                    <td><button onClick={()=> {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button></td>
                    <td><button onClick={() => deleteHandler(c._id)}>Delete</button></td>
                  </tr>
                ))
              }                 
             
              </tbody>
            </table>
            </div>
        </div>
        <Modal onCancel={()=> setVisible(false)} footer={null} open={visible}>
          <CategoryForm value={updatedName} setValue={setUpdatedName} submitHandler={updateHandler} />
        </Modal>
    </div>
</>
  )
}

export default CreateCategory









