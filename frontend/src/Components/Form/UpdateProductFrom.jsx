
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const UpdateProductFrom = ({ productId }) => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('0');
    const navigate = useNavigate();
    // const formRef = useRef();
   


    // single product value showing on input form

    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/singleProduct/${productId}`);
            if (res.data.success) {
                const productData = res.data.singleProduct;
                setName(productData.name);
                setDescription(productData.description);
                setPrice(productData.price);
                setQuantity(productData.quantity);
                setShipping(productData.shipping);
                setCategory(productData.category); // Convert to string
                // setCategory(productData.category._id.toString()); // Convert to string


                // Load the image as a Blob or File
                if (productData.image) {
                    const imageBlob = await fetch(`http://localhost:3000/image/${productData.image}`).then((res) =>
                        res.blob()
                    );
                    setImage(imageBlob);
                } else {
                    setImage(null); // Set to null if there is no image
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };


    useEffect(() => {
        getSingleProduct();
    }, [productId]);

   


  

    // Fetch all categories
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


    // update product form submission netowork request
    const updateHandler = async (e) => {
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

            const res = await axios.put(`http://localhost:3000/updateProduct/${productId}`, formData);
            // const res = await axios.put(`http://localhost:3000/updateProduct/${productId}`, formData);
            console.log(res)

            if (res?.data.success) {
                toast.success(res?.data?.message);
                navigate('/dashboard/admin')
                // navigate('/dashboard/admin/products')
            }
            else{
                toast.error(res.data.message)
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
                    {/* Add your admin menu component here if needed */}
                </div>
                <div className='content'>
                    <h3>Update Products</h3>
                    <Select placeholder="Select a category" size='large' showSearch onChange={(value) => { setCategory(value);}} value={category}>
                        {categories?.map((c) => (
                            <Option key={c._id} value={c._id}>{c.name}</Option>
                        ))}
                    </Select>                  



                    <div className='image'>
                        <label className='uploadImage'>{image ? image.name : 'Upload Image'}
                            <input type="file" name="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} hidden />
                        </label>
                    </div>

                    <div className='imgPreview'>
                        {image && (
                            <div><img src={URL.createObjectURL(image)} alt="product-image" height={'200px'} /></div>
                        )}
                    </div>

                    <form  onSubmit={updateHandler} encType="multipart/form-data">
                        <div className='inputForm'>
                            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Write a Product Name' />
                            <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Write a product description' />
                            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" placeholder='Write a Product quantity' />
                            <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='Write a Product price' />
                            <Select value={shipping ? 'Yes' : 'No'} onChange={(value) => { setShipping(value) }} placeholder='Select Shipping' className='shippingForm'>
                                <Option value='0'>No</Option>
                                <Option value='1'>Yes</Option>
                            </Select>
                        </div>
                        <button type='submit' className='btn'>Update Product</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProductFrom;













