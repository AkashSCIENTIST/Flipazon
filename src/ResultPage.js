import "./ResultPage.css";
import reactLogo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

const ResultPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("sort");
  const [result, setResult] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("relevence");

  useEffect(() => {
    let url = `http://localhost:8001/product/search?q=${query}`;
    console.log("inside useEffect", url);
    fetch(url)
      .then((res) => res.json())
      .then((body) => {
        setResult(body);
        setProducts(body);
      })
      .catch((err) => console.log(err));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams, query]);

  useEffect(() => {}, [selectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    if (selectedOption === "relevence") setResult(products);
    else if (selectedOption === "price-low-to-high") sortLowToHigh();
    else sortHighToLow();
  };

  function sortHighToLow() {
    const key = "price";
    // Create a new array to store the sorted objects
    const sortedArray = [...products];

    // Sort the array in ascending order based on the specified key
    sortedArray.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
    console.log(sortedArray);
    setResult(sortedArray);
  }

  function sortLowToHigh() {
    const key = "price";
    const sortedArray = [...products];
    // console.log("inside sortLowToHigh", sortedArray);

    sortedArray.sort((a, b) => {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    });
    console.log(sortedArray);
    setResult(sortedArray);
  }

  return (
    <div className='result-page'>
      <div className='filter-section'>
        <h2>Filters</h2>
        {/* Add filter options */}
        <div className='sort-by-section'>
          <h3>Sort by</h3>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value='relevence'>Relevence</option>
            <option value='price-low-to-high'>Price: Low to High</option>
            <option value='price-high-to-low'>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className='product-list'>
        {result.map((product) => (
          <Link to={`/product/${product.productId}`} className='redirect-link'>
            <div className='product-item' key={product._id}>
              <img
                src={
                  product.image === "base64-encoded-image-string"
                    ? reactLogo
                    : product.image
                }
                alt={product.productName}
                className={
                  "temp-logo" +
                  (product.image === "base64-encoded-image-string" &&
                    "rotating")
                }
              />
              <div className='product-details'>
                <h3>{product.productName}</h3>
                <p className='product-price'>₹{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
