import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";


const EditRecipe = () => {
  const [recipe, setRecipe] = useState({});
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

    const {id} = useParams()
    
useEffect(() => {
    const getRecipe = () => {
        axios.get(`http://localhost:5000/recipes/${id}`)
            .then((response) => {
                const res = response.data;
                setRecipe({
                    title: res.title,
                    ingredients: res.ingredients.join(","), // <--- تم التصحيح هنا
                    instructions: res.instructions,
                    imageUrl: res.imageUrl || null
                });
            })
            .catch(error => {
                console.error("Error fetching the recipe:", error); // <--- إضافة معالجة للأخطاء
            });
    };

    getRecipe(); // <--- استدعاء الدالة

}, [id]); // <--- إضافة id لمصفوفة الاعتماديات

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
      await axios.put(`http://localhost:5000/recipes/${id}`, formData, {
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
    <div className="py-40">
<form
  onSubmit={onHanleSubmit}
  className="bg-white text-gray-700 w-full container mx-auto p-6 text-left text-sm rounded-lg border border-gray-200 shadow-sm"
>
  {preview && (
    <img
      src={preview}
      alt="preview"
      className="w-32 h-32 object-cover mt-2 rounded shadow"
    />
  )}

  {/* title */}
  <label className="font-medium text-[#ff6011]" htmlFor="title">
    Project Title
  </label>
  <input
    onChange={onHandleChange}
    id="title"
    name="title"
    className="w-full border mt-1.5 mb-4 border-gray-300 outline-none rounded py-2.5 px-3 focus:border-[#ff6011] focus:ring-1 focus:ring-[#ff6011]"
    type="text"
    placeholder="Enter title"
    required
  />

  {/* ingredients */}
  <label className="font-medium text-[#ff6011]" htmlFor="ingredients">
    Ingredients
  </label>
  <textarea
    rows="4"
    onChange={onHandleChange}
    id="ingredients"
    name="ingredients"
    className="w-full border mt-1.5 mb-4 border-gray-300 outline-none rounded py-2.5 px-3 focus:border-[#ff6011] focus:ring-1 focus:ring-[#ff6011]"
    placeholder="Enter ingredients"
    required
  />

  {/* instructions */}
  <label className="font-medium text-[#ff6011]" htmlFor="instructions">
    Instructions
  </label>
  <textarea
    rows="4"
    onChange={onHandleChange}
    id="instructions"
    name="instructions"
    className="w-full border mt-1.5 mb-4 border-gray-300 outline-none rounded py-2.5 px-3 focus:border-[#ff6011] focus:ring-1 focus:ring-[#ff6011]"
    placeholder="Enter instructions"
    required
  />

  <div className="flex items-center justify-between">
    {/* زرار البوست */}
    <button
      type="submit"
      className="my-3 bg-[#ff6011] py-2 px-5 rounded text-white font-medium hover:bg-[#e2570f] transition"
    >
      Post
    </button>

    {/* زر رفع صورة */}
    <div className="flex items-center space-x-2">
      <input
        onChange={onHandleChange}
        type="file"
        name="imageUrl"
        id="addPicture"
        className="hidden"
        aria-label="addPicture"
      />
      <label htmlFor="addPicture" className="cursor-pointer">
        <svg
          width="24"
          height="24"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#ff6011] hover:text-[#e2570f] transition"
        >
          <path
            d="M9.51 10.625 8.365 9.49c-.526-.522-.79-.783-1.092-.88a1.33 1.33 0 0 0-.82 0c-.303.097-.566.358-1.092.88l-2.666 2.685m6.815-1.55.228-.226c.537-.532.806-.799 1.114-.896.27-.086.562-.082.831.01.306.104.569.376 1.094.921l.557.566m-3.824-.375 2.637 2.684m-9.452-1.134c.02.173.056.31.117.43.128.251.332.455.583.583.285.145.659.145 1.405.145h6.4c.415 0 .714 0 .947-.024m-9.452-1.134c-.028-.237-.028-.544-.028-.975V4.8c0-.747 0-1.12.145-1.405.128-.251.332-.455.583-.583.285-.145.659-.145 1.405-.145h2.534m4.813 10.642c.187-.02.332-.056.459-.121.25-.128.454-.332.582-.583.146-.285.146-.658.146-1.405V8.667M12 6V4m0 0V2m0 2h2m-2 0h-2"
            stroke="currentColor"
            strokeOpacity=".9"
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

export default EditRecipe;
