import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
// Components
import Home from "./Components/Home.jsx";
import NavBar from "./Components/NavBar";
// react-spinners
import RingLoader from "react-spinners/RingLoader";
import MyRecipes from "./Components/MyRecipes.jsx";
import AddRecipe from "./Components/AddRecipe.jsx";
import EditRecipe from "./Components/EditRecipe.jsx";
import Footer from "./Components/Footer.jsx";


function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // وقت تحميل لمدة 3 ثوانٍ
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-indigo-200" >
          <RingLoader color="red"/>
        </div>

      ) : (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="MyRecipes" element={<MyRecipes />} />
            <Route path="addRecipe" element={<AddRecipe />} />
            <Route path="EditRecipe/:id" element={<EditRecipe />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
