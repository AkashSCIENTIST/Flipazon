import axios from "axios";
import "./ProductDetailsPage.css";
import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [content, setContent] = useState();
  const [comments, setComments] = useState();
  const [user, setUser] = useState();
  const { productid } = useParams();

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

  useEffect(() => {
    setUser(getCookie("flipazon_username"));
    let url = `http://localhost:8001/product/get/${productid}`;
    console.log("inside useEffect", url);
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        console.log(body);
        setContent(body[0]);
      })
      .catch((err) => console.log(err));

    window.scrollTo({ top: 0, behavior: "smooth" });

    fetch(`http://localhost:8001/comment/${productid}`)
      .then((res) => res.json())
      .then((body) => {
        setComments(body);
        console.log(body);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {}, [quantity]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      // toast(`Current Quantity : ${quantity}`);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    // toast(`Current Quantity : ${quantity}`);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      let body = {
        productId: productid,
        userId: user,
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
          toast(`Comment Submitted`, {
            position: "bottom-right",
            autoClose: 400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const addToCart = async (event) => {
    const data = {
      productId: productid,
      userId: user,
      qty: quantity,
      productName: content.productName,
    };
    await axios
      .post("http://localhost:8001/cart/add", data)
      .then((res) => {
        console.log(res);
        // alert("Added");
        setQuantity(1);
        toast(`Added to Cart`, {
          position: "bottom-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
        toast(`Error while adding to cart`, {
          position: "bottom-right",
          autoClose: 800,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
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
            <center>{content && content.description}</center>
          </p>
          <p className='product-price'>₹{content && content.price}</p>
          {user && (
            <>
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
            </>
          )}
          {!user && <h3>Sign In to add products to cart and to comment</h3>}
        </div>
      </div>

      <div className='comment-section'>
        {user && (
          <>
            <textarea
              className='comment-textarea'
              placeholder='Enter your comment...'
              value={comment}
              onChange={handleCommentChange}></textarea>
            <button className='comment-submit-button' onClick={submitComment}>
              Submit
            </button>
          </>
        )}
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
      <ToastContainer />
    </div>
  );
};

export default ProductDetailsPage;
