import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi2";
import { PiNotePencilFill } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fatchRecipe = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const { data } = await axios.get("http://localhost:5000/recipes");
      const myRecipes = data.filter((recipe) => recipe.createdBy === user._id);
      setRecipes(myRecipes);
    };
    fatchRecipe();
  }, []);

  const DeleteRecipe = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/recipes/${id}`);
      console.log(res);
      setRecipes((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>My Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <div className="pt-10 bg-gray-100 py-20 h-screen w-full">
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
                <img
                  src={`http://localhost:5000/images/${recipe.imageUrl}`}
                  alt={recipe.title}
                />

                {/* العنوان */}
                <h2 className="text-2xl font-semibold mb-2 text-amber-500 group-hover:text-white">
                  {recipe.title}
                </h2>

                {/* المكونات */}
                <p className=" text-base mb-3">{recipe.ingredients}</p>

                {/* التعليمات */}
                <small className="text-sm">{recipe.instructions}</small>
                <HiHeart className=" absolute top-5 right-5 text-2xl  text-amber-500 " />
                <div className="flex gap-3 text-xl mt-1">
                  <Link
                    to={`/EditRecipe/${recipe._id}`}
                    className="hover:text-indigo-500"
                  >
                    <PiNotePencilFill />
                  </Link>
                  <button className="hover:text-red-500">
                    <MdDeleteOutline
                      onClick={() => {
                        DeleteRecipe(recipe._id);
                      }}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
