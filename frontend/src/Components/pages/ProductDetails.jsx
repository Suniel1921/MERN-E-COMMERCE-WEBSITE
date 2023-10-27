import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/cart";

const ProductDetails = () => {
  const { id } = useParams(); // Access the 'id' from the route/url
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  const getSingleProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/singleProduct/${id}`);
      setProduct(res?.data?.singleProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //     getSingleProducts();
  // },[])
  //*****or****
  useEffect(() => {
    if (id) getSingleProducts();
  }, [id]);

  return (
    <>
      <section className="container">
        {/* <pre>{JSON.stringify(product, null, 4)}</pre> */}

        <div className="mainProductDetails">
          <div className="imageLeft">
            <img
              className="productImage"
              src={`http://localhost:3000/image/${product.image}`}
              alt=""
            />
          </div>
          <div className="DetailsRight">
            <h3>ProductDetails</h3>
            <h3>Name: {product.name}</h3>
            <h3>Price: $ {product.price}</h3>
            {/* <h3>Category: {product.category.name}</h3> */}
            <h3>Description : {product.description}</h3>
            <button
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added ");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <hr />

        <div className="similarProducts"></div>
      </section>
    </>
  );
};

export default ProductDetails;
