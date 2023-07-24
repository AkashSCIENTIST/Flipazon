import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./loading.gif";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./BillPage.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function BillPage() {
  const [content, setContent] = useState();
  const [userContent, setUserContent] = useState();
  const userId = getCookie("flipazon_username");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("useUsedAddress");
  const [newAddress, setNewAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");

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

    axios
      .get(`http://localhost:8001/user/${userId}`)
      .then((data) => {
        setUserContent(data.data);
        console.log("user", data.data);
        setSelectedAddress(data.data.address[0]);
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

  function generateAmount(arr) {
    let total = 0;
    for (let row of arr) {
      total += row.price * row.qty * (1 + row.taxPercentage);
    }
    setTotalAmount(total);
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedAddress(""); // Clear selected address when option changes
    setNewAddress(""); // Clear new address when option changes
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };

  const handleSelectAddress = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleSubmit = (e) => {
    const body = {
      selectedOption,
      selectedAddress,
      newAddress,
      userId,
      totalAmount,
      content: content.map((item) => {
        return {
          price: item.price,
          productId: item.productId,
          productName: item.productName,
          qty: item.qty,
          taxPercentage: item.taxPercentage,
        };
      }),
    };
    console.log(body);

    confirmAlert({
      title: "Bill Payment",
      message: "Confrm ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .post("http://localhost:8001/bill/new", body)
              .then((res) => {
                console.log(res);
                toast("Order Placed", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
                toast(`Error Occured`, {
                  position: "bottom-right",
                  autoClose: 400,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <>
      {!content && <img src={Loading}></img>}
      {content && content.length === 0 && (
        <center>
          <h1>Your Cart is Empty</h1>
        </center>
      )}
      {content && content.length !== 0 && (
        <div className='billpage'>
          <h3 className='total-amount'>Total Amount : ₹{totalAmount}</h3>
          <table className='cart-table'>
            <thead>
              <th>
                <b>Name</b>
              </th>
              <th>
                <b>Quantity</b>
              </th>
              <th>
                <b>Price</b>
              </th>
              <th>
                <b>Total</b>
              </th>
            </thead>
            <tbody>
              {content.map((row) => (
                <tr>
                  <td>
                    <b>{row.productName}</b>
                  </td>
                  <td>{row.qty}</td>
                  <td>{row.price * (1 + row.taxPercentage)}</td>
                  <td>{row.price * (1 + row.taxPercentage) * row.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {userContent && (
            <div className='usercontent'>
              <label>
                Select an option:
                <select value={selectedOption} onChange={handleOptionChange}>
                  <option value='useUsedAddress' selected>
                    Use Used Address
                  </option>
                  <option value='useNewAddress'>Use New Address</option>
                </select>
              </label>
              {selectedOption === "useUsedAddress" && (
                <div>
                  <label>
                    Select an address:
                    <select
                      value={selectedAddress}
                      onChange={handleSelectAddress}>
                      {userContent.address.map((address, index) => (
                        <>
                          <option
                            key={index}
                            value={address}
                            selected={index === 0}>
                            {address}
                          </option>
                        </>
                      ))}
                    </select>
                  </label>
                </div>
              )}
              {selectedOption === "useNewAddress" && (
                <div>
                  <label>
                    Enter a new address:
                    <input
                      type='text'
                      value={newAddress}
                      onChange={handleAddressChange}
                    />
                  </label>
                </div>
              )}
              <button type='button' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default BillPage;
