import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading.gif";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

function Cart() {
  const [content, setContent] = useState();
  const userId = getCookie("flipazon_username");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie("flipazon_username")) {
      toast("Sign In to see cart", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/signin");
    }
    axios
      .get(`http://localhost:8001/cart/${userId}`)
      .then((data) => {
        setContent(data.data);
        console.log(data.data);
        generateAmount(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  function rerender() {
    axios
      .get(`http://localhost:8001/cart/${userId}`)
      .then((data) => {
        setContent(data.data);
        console.log(data.data);
        generateAmount(data.data);
      })
      .catch((err) => console.log(err));
  }

  function generateAmount(arr) {
    let total = 0;
    for (let row of arr) {
      total += row.price * row.qty * (1 + row.taxPercentage);
    }
    setTotalAmount(total);
  }

  async function proceedToPay(e) {
    navigate("/bill");
  }

  return (
    <div className='cart'>
      {!content && <img src={Loading}></img>}
      {content && content.length !== 0 && (
        <>
          <h3 className='total-amount'>Total Amount : ₹{totalAmount}</h3>
          <button onClick={proceedToPay}>Proceed to Payment</button>
          <br></br>
          Press enter to update the quantity
          <br></br>
          <br></br>
          <table className='cart-table'>
            <thead>
              <td>
                <b>Image</b>
              </td>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Quantity</b>
              </td>
              <td>
                <b>Price</b>
              </td>
              <td>
                <b>Total</b>
              </td>
            </thead>
            <tbody>
              {content.map((row) => (
                <tr>
                  <td>
                    <img src={row.image}></img>
                  </td>
                  <td>
                    <b>{row.productName}</b>
                  </td>
                  <td>
                    <ChangableInput
                      productName={row.productName}
                      productId={row.productId}
                      userId={userId}
                      qty={row.qty}
                      rerender={rerender}
                    />
                  </td>
                  <td>
                    {row.price}
                    {"(+"}
                    {row.taxPercentage}
                    {"%)"}
                  </td>
                  <td>{row.price * (1 + row.taxPercentage) * row.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {content && content.length === 0 && (
        <center>
          <h3>Cart is empty</h3>
        </center>
      )}
      <br></br>
      <br></br>
      <ToastContainer />
    </div>
  );
}

function ChangableInput({ productName, productId, userId, qty, rerender }) {
  const [qtyy, setQtyy] = useState(qty);
  const [_productId, setProductId] = useState(productId);
  const [_userId, setUserId] = useState(userId);

  async function changeQty() {
    const data = { productId: _productId, qty: qtyy, userId: _userId };
    await axios
      .post("http://localhost:8001/cart/modifyqty", data)
      .then((res) => {
        console.log(res);
        toast(`Quantity of "${productName}" Updated : ${qtyy} Item(s)`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .then(() => rerender())
      .catch((err) => console.log(err));
  }

  function validateQuantity(qty) {
    if (qty < 1) {
      toast(`Minimum 1 item is required`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setQtyy(1);
    } else {
      setQtyy(qty);
    }
  }

  async function removeFromCart(e) {
    const data = { productId: _productId, userId: _userId };
    await axios
      .post("http://localhost:8001/cart/remove", data)
      .then((res) => {
        console.log(res);
        toast(`Deleted "${productName}" from Cart`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        rerender();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <center>
        <button onClick={(e) => validateQuantity(qtyy - 1)}>-</button>

        <input
          type='number'
          min={1}
          value={qtyy}
          onChange={(e) => validateQuantity(e.target.value)}
        />
        <button onClick={(e) => validateQuantity(qtyy + 1)}>+</button>
        <br></br>
        <br></br>
        <button onClick={(e) => changeQty()}>OK</button>
        <br></br>
        <br></br>
        <button onClick={removeFromCart}>Remove from Cart</button>
      </center>
    </div>
  );
}

export default Cart;
