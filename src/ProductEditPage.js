import React, { useState } from "react";
import "./ProductEditPage.css";
import { useParams } from "react-router-dom";
import loadingImg from "./loading.gif";

const ProductEditPage = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productDescription, setProductDescription] = useState("");
  const productId = useParams();
  const [isLoading, setIsLoading] = useState(!true);

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

  const submitForm = () => {
    console.log({
      productName,
      productQuantity,
      productPrice,
      productDescription,
      image,
    });
  };

  const deleteHandler = () => {};

  return isLoading ? (
    <div className='loading'>
      <center>
        <img src={loadingImg}></img>
      </center>
    </div>
  ) : (
    <>
      <div className='add-product'>
        <div className='left-column'>
          <div className='image-preview'>
            {image ? (
              <img src={image} alt='Product' className='placeholder' />
            ) : (
              <div className='placeholder'>Upload an image</div>
            )}
          </div>
          <input type='file' accept='image/*' onChange={handleImageUpload} />
        </div>
        <div className='right-column'>
          <h2>Edit Product</h2>
          <div className='form'>
            <div className='form-group'>
              <label>Product Name</label>
              <input
                type='text'
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label>Product Price</label>
              <input
                type='number'
                step='0.01' // Optional: Specify the step size for floating-point values
                value={productPrice}
                onChange={(e) => setProductPrice(parseFloat(e.target.value))}
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
              <label>Product Description</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
          </div>
          <button onClick={submitForm}>Add Product</button>
          <p>{"           "}</p>
          <button onClick={deleteHandler}>Delete Product</button>
        </div>
      </div>
    </>
  );
};

export default ProductEditPage;
