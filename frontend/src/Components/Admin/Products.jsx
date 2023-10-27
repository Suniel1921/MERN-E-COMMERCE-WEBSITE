import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from 'antd';
import UpdateProductFrom from '../Form/UpdateProductFrom';


const Products = () => {

    const [products, setProducts] = useState([]);
    const [isModalVisible, setisModalVisible] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    console.log(selectedProduct)
   

    //get all products network request
    const allProducts = async () => {
        try {
            const res = await axios.get('http://localhost:3000/allProduct')
            if (res.data.message) {
                setProducts(res.data.allProduct)
            }
            else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')

        }
    }

    useEffect(() => {
        allProducts()
    }, [])



    //updated products network request (for code check another file called updatedProductForm.jsx file)



    //delte product network request
    const deleteProduct = async (id)=>{
        try {
            let answer = window.confirm('Are you sure want to delete ?')
                if(!answer) return;
            
            const res = await axios.delete(`http://localhost:3000/deleteProduct/${id}`);
        if(res.data.message){
            toast.success(res.data.message);
            allProducts()
        }
            
        } catch (error) {
            console.log(error)
            toast.error(`something went wrong`)
            
        }


    }


    return (
        <>
            <div className='adminsec container'>
                <div className='admin-menu'>
                    <AdminMenu />
                </div>
                <div className='content'>
                    All Product list
                    <div className='cards'>
                        {
                            products.map((product) => (
                                <div className="chilCard" key={product._id}>
                                    <img className='productImage' src={`http://localhost:3000/image/${product.image}`} alt="" />
                                    <h2>{product.name}</h2>
                                    <h2>$ {product.price}</h2>
                                    <p>{product.description}</p>
                                    <button onClick={()=>{setisModalVisible(true); setSelectedProduct(product._id)}}>Edit</button>                                   
                                    <button onClick={() => deleteProduct(product._id)}>Delete</button>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* pop up box (modal) */}
                {/* <Modal width={644} onCancel={()=>setisModalVisible(false)} open={isModalVisible} footer={null}  >
                <UpdateProductFrom/>           
              
                </Modal> */}


<Modal width={644} onCancel={() => setisModalVisible(false)} open={isModalVisible} footer={null}>
  <UpdateProductFrom productId={selectedProduct} />
</Modal>


     



            </div>
        </>
    )
}

export default Products












