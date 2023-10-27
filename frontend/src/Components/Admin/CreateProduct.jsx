import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(''); 
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('0'); 
  const navigate = useNavigate();
  



  // Get all categories
  const allCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3000/allCategory');
      if (res?.data?.success) {
        setCategories(res?.data?.allCategory);
      }

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');

    }
  }

  useEffect(() => {
    allCategory();
  }, []);


  //create product handler 
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category); 
      formData.append('quantity', quantity);
      formData.append('image', image);
      formData.append('shipping', shipping);
  
      const res = await axios.post('http://localhost:3000/createProduct', formData);
  
      if (res?.data.success) {
        toast.success(res?.data?.message);
        navigate('/dashboard/admin/products')
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }
  
  





  return (
    <>
      <div className='adminsec container'>
        <div className='admin-menu'>
          <AdminMenu />
        </div>
        <div className='content'>
          <h3>Create Products</h3>
          <Select placeholder="select a category" size='large' showSearch onChange={(value) => { setCategory(value) }} >
            {
              categories?.map((c) => (
                <Option key={c._id} value={c._id} >{c.name}</Option>
              ))
            }
          </Select>

          <div className='image'>
            <label className='uploadImage'> {image ? image.name : "Upload Image"}
            <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
            </label>
          </div>

          <div className='imgPreview'>
            {image && (
              <div> <img src={URL.createObjectURL(image)} alt="product-image" height={'200px'} /></div>
            )}
          </div>
          {/* input form */}
         <form onSubmit={submitHandler} encType="multipart/form-data">
         <div className='inputForm'>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Write a Product Name' />
            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Write a product description' />
            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" placeholder='Write a Product qunatity' />
            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Write a Product price' />
            {/* <input onChange={(e)=>setShipping(e.target.value)} value={shipping} type="text" placeholder='Write a Product shipping' /> */}
            <Select onChange={(value) => { setShipping(value) }} placeholder='Select Shipping' className='shippingForm'>
              <Option value='0' >No</Option>
              <Option value='1' >Yes</Option>
            </Select>
          </div>
          {/* <button onClick={createProductHandler} className='btn'>Create Product</button> */}
          <button type='submit' className='btn'>Create Product</button>
         </form>

        </div>






      </div>
    </>
  );
}

export default CreateProduct;
