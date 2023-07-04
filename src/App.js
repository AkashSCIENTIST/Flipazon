import logo from "./logo.svg";
import "./App.css";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import ProductDetailsPage from "./ProductDetailsPage";
import ResultPage from "./ResultPage";
import ErrorPage from "./ErrorPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductAddPage from "./ProductAddPage";
import ProductEditPage from "./ProductEditPage";
import EmailLoginPage from "./EmailLoginPage";
import EmailSignUpPage from "./EmailSignUpPage";
import Cart from "./Cart";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Flipazon";
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <SearchBar />
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route
            path='/product/:productid'
            exact
            element={<ProductDetailsPage />}
          />
          <Route path='/search' exact element={<ResultPage />} />
          <Route path='/add' exact element={<ProductAddPage />} />
          <Route path='/edit' exact element={<ProductEditPage />} />
          <Route path='/signin' exact element={<EmailLoginPage />} />
          <Route path='/signup' exact element={<EmailSignUpPage />} />
          <Route path='/cart' exact element={<Cart />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
