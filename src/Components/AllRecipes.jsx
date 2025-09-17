import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiHeart } from "react-icons/hi2";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/recipes").then((res) => {
      setRecipes(res.data);
    });
  }, []);
  return (
    <div className="py-10 bg-gray-100  w-full">
      <h2 className="text-2xl font-bold text-center my-8">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-16 lg:px-24 xl:px-32 mb-10">
        {recipes?.map((recipe) => (
          <div
            key={recipe._id}
            className="w-full min-h-52 border rounded-xl bg-white shadow-md 
  hover:shadow-xl transition-transform duration-500 hover:scale-105 
  p-5 hover:bg-[#ff5500] hover:text-white cursor-pointer 
  flex flex-col justify-between relative group"
          >
              <img src={`http://localhost:5000/images/${recipe.imageUrl}`} alt={recipe.title} />

            {/* العنوان */}
            <h2 className="text-2xl font-semibold mb-2 text-amber-500 group-hover:text-white">
              {recipe.title}
            </h2>

            {/* المكونات */}
            <p className=" text-base mb-3">{recipe.ingredients}</p>

            {/* التعليمات */}
            <small className="text-sm">{recipe.instructions}</small>
            <HiHeart className=" absolute top-5 right-5 text-2xl  text-amber-500 " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
