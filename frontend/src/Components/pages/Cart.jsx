// import React, { useEffect, useState } from "react";
// import { useCart } from "../../context/cart";
// import { useAuth } from "../../context/auth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";

// const Cart = () => {
//   const [cart, setCart] = useCart();
//   const [auth, setAuth] = useAuth();
//   const [clientToken, setclientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   console.log("Instance:", instance);
//   console.log("Loading:", loading);
//   console.log("User Name:", auth?.user?.name);

//   //delete items
//   const removeCartItem = (pid) => {
//     try {
//       const myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       toast.success("Item removed");
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0; // Initialize total to 0
//       cart?.forEach((item) => {
//         total += parseFloat(item.price); // Parse the item's price as a float and add it to total
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/braintree/token");
//       console.log("Cart:", cart);
// console.log("Client Token:", clientToken);

//       // console.log(`braintree token : ${res}`)
//       setclientToken(res?.data?.clientToken);
//       // console.log(`braintree token : ${res?.data?.clientToken}`)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //payment handler
//   // const paymentHandler = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const { nonce } = await instance.requestPaymentMethod();
//   //     const { data } = await axios.post("http://localhost:3000/braintree/payment",
//   //       {
//   //         nonce,
//   //         cart,
//   //       }
//   //     );
//   //     setLoading(false);
//   //     localStorage.removeItem("cart");
//   //     setCart([]);
//   //     navigate("/dashboard/user/order");
//   //     toast.success("payment sucessfully");
//   //   } catch (error) {
//   //     console.log(error);
//   //     setLoading(false);
//   //   }
//   // };

//   const paymentHandler = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const response = await axios.post("http://localhost:3000/braintree/payment", {
//         nonce,
//         cart,
//       });

//       if (response.data.ok) {
//         setLoading(false);
//         localStorage.removeItem("cart");
//         setCart([]);
//         navigate("/dashboard/user/order");
//         toast.success("Payment successful");
//       } else {
//         setLoading(false);
//         toast.error("Payment failed. Please try again.");
//       }
//     } catch (error) {
//       console.log("Payment Error:", error); // Log the error for debugging
//       setLoading(false);
//       toast.error("Payment failed. Please try again.");
//     }
//   };

//   return (
//     <>
//       <section className="container">
//         <div>
//           <h2 className="users">{`Hello ${
//             auth?.token && auth?.user?.name
//           }`}</h2>

//           <h4 className="cartItems">
//             {cart?.length
//               ? `You Have ${cart.length} items in your Cart${
//                   auth?.token ? "" : " - Please Login to Checkout"
//                 }`
//               : "Your Cart is Empty"}
//           </h4>
//         </div>

//         <div className="cartChekcoutPayment">
//           <div className="cartItems">
//             <div>
//               {cart?.map((p) => (
//                 <>
//                   <div className="productDetails" key={p._id}>
//                     <div>
//                       <img
//                         src={`http://localhost:3000/image/${p.image}`}
//                         alt=""
//                       />
//                     </div>
//                     <div>
//                       <h4>{p.name}</h4>
//                       <h4>{p.description.substring(0, 30)}</h4>
//                       <h4>price $ {p.price}</h4>
//                       <button onClick={() => removeCartItem(p._id)}>
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 </>
//               ))}
//             </div>
//           </div>

//           <div className="cartSummary">
//             <h3>Cart Summary</h3>
//             <p>Total | Payment | Checkout</p>
//             <hr />
//             <h3>Total : {totalPrice()}</h3>

//             <div>
//               {auth?.user?.name ? (
//                 <>
//                   <div>
//                     <h3>Your Name</h3>
//                     <h5>{auth.user.name}</h5>
//                     <button onClick={() => navigate("/dashboard/user/profile")}>
//                       Update your Name
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div>
//                     {auth.token ? (
//                       <button
//                         onClick={() => navigate("/dashboard/user/profile")}
//                       >
//                         Update Name
//                       </button>
//                     ) : (
//                       <>
//                         <button
//                           onClick={() => navigate("/login", { state: "/cart" })}
//                         >
//                           Please login to checkout
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="paymentOptions">
//               {!clientToken || !cart?.length ? (
//                 ""
//               ) : (
//                 <>
//                   <DropIn
//                     options={{
//                       authorization: clientToken,
//                       paypal: {
//                         flow: "vault",
//                       },
//                     }}
//                     onInstance={(instance) => setInstance(instance)}
//                   />
//                   <button className="paybtn" onClick={paymentHandler}
//                     disabled={!loading || !instance || !auth?.user?.name}
//                   >
//                     {loading ? "Processing..." : "Make Payment"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // console.log("Instance:", instance);
  // console.log("Loading:", loading);
  // console.log("User Name:", auth?.user?.name);

  //delete items
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      toast.success("Item removed");
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0; // Initialize total to 0
      cart?.forEach((item) => {
        total += parseFloat(item.price); // Parse the item's price as a float and add it to total
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const res = await axios.get("http://localhost:3000/braintree/token");
      // console.log("Braintree Token:", res?.data?.clientToken);
      setClientToken(res?.data?.clientToken);
    } catch (error) {
      console.log("Token Error:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const paymentHandler = async () => {
    try {
      console.log("Payment handler called.");
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Payment nonce:", nonce); // Log the payment nonce
      const response = await axios.post(
        "http://localhost:3000/braintree/payment",
        {
          nonce,
          cart,
        }
      );

      if (response.data.ok) {
        setLoading(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/order");
        toast.success("Payment successful");
      } else {
        setLoading(false);
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.log("Payment Error:", error); // Log the error for debugging
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <>
      <section className="container">
        <div>
          <h2 className="users">{`Hello ${
            auth?.token && auth?.user?.name
          }`}</h2>

          <h4 className="cartItems">
            {cart?.length
              ? `You Have ${cart.length} items in your Cart${
                  auth?.token ? "" : " - Please Login to Checkout"
                }`
              : "Your Cart is Empty"}
          </h4>
        </div>

        <div className="cartChekcoutPayment">
          <div className="cartItems">
            <div>
              {cart?.map((p) => (
                <div className="productDetails" key={p._id}>
                  <div>
                    <img
                      src={`http://localhost:3000/image/${p.image}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4>{p.name}</h4>
                    <h4>{p.description.substring(0, 30)}</h4>
                    <h4>price $ {p.price}</h4>
                    <button onClick={() => removeCartItem(p._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cartSummary">
            <h3>Cart Summary</h3>
            <p>Total | Payment | Checkout</p>
            <hr />
            <h3>Total : {totalPrice()}</h3>

            <div>
              {auth?.user?.name ? (
                <div>
                  <h3>Your Name</h3>
                  <h5>{auth.user.name}</h5>
                  <button onClick={() => navigate("/dashboard/user/profile")}>
                    Update your Name
                  </button>
                </div>
              ) : (
                <div>
                  {auth.token ? (
                    <button onClick={() => navigate("/dashboard/user/profile")}>
                      Update Name
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="paymentOptions">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <div>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="paybtn"
                    onClick={paymentHandler}
                    // disabled={!loading || !instance || !auth?.user?.name}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
