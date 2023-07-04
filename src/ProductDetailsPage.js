import axios from "axios";
import "./ProductDetailsPage.css";
import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [content, setContent] = useState();
  const [comments, setComments] = useState();
  const { productid } = useParams();

  useEffect(() => {
    let url = `http://localhost:8001/product/get/${productid}`;
    console.log("inside useEffect", url);
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setContent(body[0]);
      })
      .catch((err) => console.log(err));

    fetch(`http://localhost:8001/comment/${productid}`)
      .then((res) => res.json())
      .then((body) => {
        setComments(body);
        console.log(body);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);

    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = () => {
    if (comment.trim() !== "") {
      let body = {
        productId: productid,
        userId: "Admin",
        starRating: 5,
        review: comment,
      };
      console.log(body);
      fetch(`http://localhost:8001/comment/add`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setComments([res]);
          setComment("");
        })
        .catch((err) => console.log(err));
    }
  };

  const addToCart = async (event) => {
    const data = {
      productId: productid,
      userId: "Admin",
      qty: quantity,
      productName: content.productName,
    };
    await axios
      .post("http://localhost:8001/cart/add", data)
      .then((res) => {
        console.log(res);
        alert("Added");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='top-down-split'>
      <div className='product-details'>
        <div className='product-image'>
          {!content && <img src={logo} alt='Product' />}
          {content && content.image === "base64-encoded-image-string" && (
            <img src={logo} alt='Product' />
          )}
          {content && content.image !== "base64-encoded-image-string" && (
            <img src={content.image} alt='Product' />
          )}
        </div>
        <div className='product-info'>
          <h2 className='product-name'>{content && content.productName}</h2>
          <p className='product-description'>
            {content && content.description}
          </p>
          <p className='product-price'>₹{content && content.price}</p>
          <div className='quantity-bar'>
            <button className='quantity-button' onClick={decreaseQuantity}>
              -
            </button>
            <input
              type='text'
              maxLength={2}
              className='quantity-input'
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button className='quantity-button' onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button className='add-to-cart-button' onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className='comment-section'>
        <textarea
          className='comment-textarea'
          placeholder='Enter your comment...'
          value={comment}
          onChange={handleCommentChange}></textarea>
        <button className='comment-submit-button' onClick={submitComment}>
          Submit
        </button>
        <div className='posted-comments'>
          <h3>Posted Comments</h3>
          {comments &&
            (comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className='posted-comment'>
                  {comment.review}
                </li>
              ))
            ) : (
              <p>No comments posted yet.</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
