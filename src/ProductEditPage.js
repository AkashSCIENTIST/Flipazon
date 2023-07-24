import React, { useEffect, useState } from "react";
import "./ProductEditPage.css";
import { useParams } from "react-router-dom";
import loadingImg from "./loading.gif";
import logo from "./logo.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductEditPage = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productDescription, setProductDescription] = useState("");
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState();
  const [taxPercentage, setTaxPercentage] = useState(9);
  const [tags, setTags] = useState([]);
  const [tagString, setTagString] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log("admin", getCookie("flipazon_user_isadmin"));
    if (getCookie("flipazon_user_isadmin") === true) {
      setIsAdmin(true);
      let url = `http://localhost:8001/product/get/${productId}`;
      console.log("inside useEffect", url);
      fetch(url)
        .then((res) => res.json())
        .then((body) => {
          if (body.length === 1) {
            let body2 = body[0];
            setImage(body2.image);
            setProductName(body2.productName);
            setProductPrice(body2.price);
            setProductQuantity(body2.quantity);
            setProductDescription(body2.description);
            setTagString(body2.tags.join(" "));
            setCategory(body2.category);
            setTags(body2.tags);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitForm = async () => {
    const data = {
      productId,
      productName,
      productQuantity,
      productPrice,
      productDescription,
      category,
      taxPercentage,
      tags,
      image,
    };
    console.log(data);
    await axios
      .post("http://localhost:8001/product/edit", data)
      .then((res) => {
        console.log(res);
        toast(`Edit Successful`, {
          position: "bottom-right",
          autoClose: 400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast(`Edit Failed`, {
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
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  const changeTax = (e) => {
    setTaxPercentage(e.target.value);
  };

  const changeTag = (e) => {
    setTagString(e.target.value);
    setTags(e.target.value.trim().split(/\s+/));
  };

  const changeProductName = (e) => {
    setProductName(e.target.value);
  };

  function getCookie(name) {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return false;
  }

  const deleteHandler = () => {};

  return (
    <>
      {isAdmin === false && (
        <center>
          <h1>You are not authorised</h1>
        </center>
      )}
      {isAdmin === true && isLoading === true && (
        <center>
          <img src={loadingImg}></img>
        </center>
      )}
      {isAdmin === true && isLoading === false && (
        <>
          <div className='add-product'>
            <div className='left-column'>
              <div className='image-preview'>
                {image ? (
                  <img
                    src={image === "base64-encoded-image-string" ? logo : image}
                    alt='Product'
                    className='placeholder'
                  />
                ) : (
                  <div className='placeholder'>Upload an image</div>
                )}
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageUpload}
              />
            </div>
            <div className='right-column'>
              <h2>Add Product</h2>
              <div className='form'>
                <div className='form-group'>
                  <label>Product Name</label>
                  <input
                    type='text'
                    value={productName}
                    onChange={changeProductName}
                  />
                </div>
                <div className='form-group'>
                  <label>Product Price</label>
                  <input
                    type='number'
                    step='0.01' // Optional: Specify the step size for floating-point values
                    value={productPrice}
                    onChange={(e) =>
                      setProductPrice(parseFloat(e.target.value))
                    }
                  />
                </div>
                <div className='form-group'>
                  <label>Product Quantity</label>
                  <input
                    type='number'
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <h3>Category</h3>
                  <select value={category} onChange={changeCategory}>
                    <option value='toys'>Toys</option>
                    <option value='grocery'>Groceries</option>
                    <option value='home'>Home</option>
                    <option value='elec'>Electronics</option>
                    <option value='man'>Men's Fashion</option>
                    <option value='woman'>Women's Fashion</option>
                    <option value='book'>Books</option>
                    <option value='kitchen'>Kitchen</option>
                    <option value='food'>Food</option>
                    <option value='recharge'>Mobile Recharge</option>
                  </select>
                </div>
                <div className='form-group'>
                  <h3>Tax Percentage</h3>
                  <select value={taxPercentage} onChange={changeTax}>
                    <option value='2'>2</option>
                    <option value='5'>5</option>
                    <option value='8'>8</option>
                    <option value='10'>10</option>
                    <option value='12'>12</option>
                    <option value='18'>18</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label>Tags (seperated by space)</label>
                  <textarea
                    value={tagString}
                    onChange={changeTag}
                    style={{ resize: "none" }}
                  />
                </div>
                <div className='form-group'>
                  <label>Product Description</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    style={{ resize: "none" }}
                  />
                </div>
              </div>
              <button onClick={submitForm}>Add Product</button>
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

export default ProductEditPage;
