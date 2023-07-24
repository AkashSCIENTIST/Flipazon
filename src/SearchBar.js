import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import reactLogo from "./logo.svg";
import { BsCartFill, BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getCookie("flipazon_username"));
  });

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
    if (getCookie("flipazon_username")) {
      navigate("/cart");
    } else {
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
  };

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

  const handleProfile = (e) => {
    var myCookieValue = getCookie("flipazon_username");
    console.log(myCookieValue);
    if (myCookieValue) {
      confirmAlert({
        title: "Confirm to Sign Out",
        message: "Sign out of account ?",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              document.cookie =
                "flipazon_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              toast("Sign Out successful", {
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
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className='search-bar'>
      <div className='top-row'>
        <img
          src={reactLogo}
          alt='React Logo'
          onClick={redirectHome}
          className='clickable logo'
        />
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
        <BsFillPersonFill
          className='profile-logo clickable'
          onClick={handleProfile}></BsFillPersonFill>
        {user && (
          <b className='clickable'  onClick={handleProfile}>
            {user}
          </b>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchBar;
