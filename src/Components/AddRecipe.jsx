import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    console.log(e.target.files?.[0]);

    let val;

    if (e.target.name === "ingredients") {
      val = e.target.value.split(",");
    } else if (e.target.name === "imageUrl") {
      val = e.target.files[0]; // أول صورة فقط
    } else {
      val = e.target.value;
    }
    setRecipe((prev) => ({...prev, [e.target.name]: val }));

    if (e.target.type === "file" && e.target.files.length > 0) {
      val = e.target.files[0];
      setPreview(URL.createObjectURL(val));
    }
    setRecipe((prev) => ({ ...prev, [e.target.name]: val }));
  };

  const onHanleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    try {
      const formData = new FormData();
      formData.append("title", recipe.title);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.instructions);
      if (recipe.imageUrl) {
        formData.append("imageUrl", recipe.imageUrl);
      }
      console.log("Sending recipe data: ", recipe);
      await axios.post("http://localhost:5000/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding recipe: ", error);
    }
  };

  return (
   <div className="flex items-center justify-center pt-10 min-h-screen bg-gray-100">
  <form
    onSubmit={onHanleSubmit}
    className="w-full max-w-lg bg-white text-gray-700 rounded-lg border border-gray-300/60 shadow-md p-6"
  >
    {/* Image Preview */}
    {preview && (
      <img
        src={preview}
        alt="preview"
        className="w-40 h-40 object-cover mx-auto mb-6 rounded-lg shadow"
      />
    )}

    {/* Title */}
    <label htmlFor="title" className="font-medium block mb-1">
      Project Title
    </label>
    <input
      id="title"
      name="title"
      type="text"
      placeholder="Enter title"
      required
      onChange={onHandleChange}
      className="w-full border border-gray-300 outline-none rounded-lg px-4 py-2.5 mb-4 focus:ring-2 focus:ring-[#ff6011]"
    />

    {/* Ingredients */}
    <label htmlFor="ingredients" className="font-medium block mb-1">
      Ingredients
    </label>
    <textarea
      id="ingredients"
      name="ingredients"
      rows="4"
      placeholder="Enter ingredients"
      required
      onChange={onHandleChange}
      className="w-full border border-gray-300 outline-none rounded-lg px-4 py-2.5 mb-4 focus:ring-2 focus:ring-[#ff6011]"
    />

    {/* Instructions */}
    <label htmlFor="instructions" className="font-medium block mb-1">
      Instructions
    </label>
    <textarea
      id="instructions"
      name="instructions"
      rows="4"
      placeholder="Enter instructions"
      required
      onChange={onHandleChange}
      className="w-full border border-gray-300 outline-none rounded-lg px-4 py-2.5 mb-6 focus:ring-2 focus:ring-[#ff6011]"
    />

    {/* Actions */}
    <div className="flex items-center justify-between">
      {/* Submit Button */}
      <button
        type="submit"
        className="bg-[#ff6011] hover:bg-[#e6550f] transition text-white font-medium rounded-lg px-6 py-2.5 shadow"
      >
        Post
      </button>

      {/* Upload Image */}
      <div className="flex items-center space-x-2">
        <input
          id="addPicture"
          name="imageUrl"
          type="file"
          onChange={onHandleChange}
          className="hidden"
          aria-label="addPicture"
        />
        <label
          htmlFor="addPicture"
          className="cursor-pointer text-gray-600 hover:text-[#ff6011] transition"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.51 10.625 8.365 9.49c-.526-.522-.79-.783-1.092-.88a1.33 1.33 0 0 0-.82 0c-.303.097-.566.358-1.092.88l-2.666 2.685m6.815-1.55.228-.226c.537-.532.806-.799 1.114-.896.27-.086.562-.082.831.01.306.104.569.376 1.094.921l.557.566m-3.824-.375 2.637 2.684m-9.452-1.134c.02.173.056.31.117.43.128.251.332.455.583.583.285.145.659.145 1.405.145h6.4c.415 0 .714 0 .947-.024m-9.452-1.134c-.028-.237-.028-.544-.028-.975V4.8c0-.747 0-1.12.145-1.405.128-.251.332-.455.583-.583.285-.145.659-.145 1.405-.145h2.534m4.813 10.642c.187-.02.332-.056.459-.121.25-.128.454-.332.582-.583.146-.285.146-.658.146-1.405V8.667M12 6V4m0 0V2m0 2h2m-2 0h-2"
              stroke="currentColor"
              strokeOpacity=".8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </div>
    </div>
  </form>
</div>

  );
};

export default AddRecipe;
