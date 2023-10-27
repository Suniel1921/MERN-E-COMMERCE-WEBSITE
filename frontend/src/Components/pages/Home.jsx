import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //filter by category
  const filterHandler = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  //get all product network requrest
  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allProduct");
      if (res?.data?.success) {
        setProducts(res?.data?.allProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts(); //calling getallprodcut conditionally
    // getAllProducts();
  }, []);
  // }, [checked.length, radio.length]) // dont use like this [] make sure this will empty

  // get all category network request
  const getAllCategory = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allCategory");
      if (res?.data?.success) {
        setCategories(res?.data?.allCategory);
        // console.log("Categories data:", res.data.allCategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //calling  function getAllCategory
  useEffect(() => {
    getAllCategory();
  }, []);

  // //get filter products
  const filterProducts = async () => {
    try {
      const res = await axios.post("http://localhost:3000/productFilter", {
        checked,
        radio,
      });
      setProducts(res.data.productData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  return (
    <>
      <main className="container">
        {/* {JSON.stringify(checked, null, 4)}
        {JSON.stringify(radio, null, 4)} */}
        <section className="mainHome">
          {/* //filter by category */}
          <div className="filterCategory">
            <h1>category</h1>
            {categories.map((category) => (
              <div key={category._id}>
                <Checkbox
                  onChange={(e) =>
                    filterHandler(e.target.checked, category._id)
                  }
                >
                  {category.name}
                </Checkbox>
              </div>
            ))}

            {/* //filter by price */}
            <div className="filterPrice">
              <h1>Price</h1>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <button
              className="resetbtn"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>

          <div>
            <h3>All Products</h3>
            <div className="mainCardContainer">
              {products.map((product) => (
                <div className="childCard" key={product._id}>
                  <img
                    src={`http://localhost:3000/image/${product.image}`}
                    alt=""
                  />
                  <h2>{product.name.substring(0, 10)}...</h2>
                  <p>{product.description.substring(0, 20)}...</p>
                  <h3>price : $ {product.price}</h3>
                  <div className="btnSection">
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

                    <button
                      onClick={() => navigate(`/productDetails/${product._id}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
