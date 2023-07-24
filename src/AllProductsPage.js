import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AllProductsPage.css";
import logo from "./logo.svg";

function AllProductsPage() {
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    axios
      .get(`http://localhost:8001/product/all`)
      .then((data) => {
        setProducts(data.data);
        setIsAdmin(getCookie("flipazon_user_isadmin"));
      })
      .catch((err) => console.log(err));
  }, []);

  function redirectEdit(productId) {
    navigate("/edit/" + productId);
  }

  return (
    <div className='AllProductsPage'>
      <table>
        <thead>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Description</th>
          <th>Tax</th>
          <th>Tags</th>
          {isAdmin === true && <th>Edit</th>}
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <>
                <tr>
                  <td>
                    {product.image !== "base64-encoded-image-string" && (
                      <img src={product.image ?? logo}></img>
                    )}
                    {!product.image && <img src={logo}></img>}
                    {product.image === "base64-encoded-image-string" && (
                      <img src={logo}></img>
                    )}
                  </td>
                  <td>{product.productName}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.description}</td>
                  <td>{product.taxPercentage}</td>
                  <td>{product.tags.join(" ")}</td>
                  {isAdmin === true && (
                    <td>
                      <button onClick={(e) => redirectEdit(product.productId)}>
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProductsPage;
