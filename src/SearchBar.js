import React, { useState } from "react";
import "./SearchBar.css";
import reactLogo from "./logo.svg";
import { BsCartFill, BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(cleanText(event.target.value));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSelectedCategory("");
      handleSearch();
    }
  };

  const handleSearch = () => {
    // Perform the search using the searchQuery and selectedCategory
    console.log("Performing search for:", searchQuery);
    console.log("Selected category:", selectedCategory);
    let q =
      searchQuery.length === 0
        ? selectedCategory
        : cleanText(searchQuery + " " + selectedCategory);
    navigate({
      pathname: "/search",
      search: `?sort=${q}`,
    });
  };

  function cleanText(text) {
    text = text.replace(/\s+/g, " ");
    text = text.replace(/[^\w\s]/gi, "");
    text = text.toLowerCase();
    return text;
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    handleSearch();
  };

  const redirectHome = (event) => {
    navigate("/");
  };

  const redirectCart = (event) => {
    navigate("/cart");
  };

  return (
    <div className='search-bar'>
      <div className='top-row'>
        <img src={reactLogo} alt='React Logo' className='logo' />
        <h1 onClick={redirectHome} className='clickable'>
          Flipazon
        </h1>
        <input
          type='text'
          className='search-text-box'
          placeholder='Search...'
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button type='submit' onClick={handleSearch} className='.button-submit'>
          Search
        </button>
        <BsCartFill className='cart-logo clickable' onClick={redirectCart} />
        <BsFillPersonFill className='profile-logo' />
      </div>
      {/* <div className="bottom-row">
        <button
          className={`category ${selectedCategory === 'Groceries' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('Groceries')}
        >
          Groceries
        </button>
        <button
          className={`category ${selectedCategory === 'Fashion' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('Fashion')}
        >
          Fashion
        </button>
        <button
          className={`category ${selectedCategory === 'Sports' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('Sports')}
        >
          Sports
        </button>
        <button
          className={`category ${selectedCategory === 'Appliances' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('Appliances')}
        >
          Appliances
        </button>
        <button
          className={`category ${selectedCategory === 'Gadgets' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('Gadgets')}
        >
          Gadgets
        </button>
        <button
          className={`category ${selectedCategory === 'Healthcare' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('Healthcare')}
        >
          Healthcare
        </button>
      </div> */}
    </div>
  );
};

export default SearchBar;
