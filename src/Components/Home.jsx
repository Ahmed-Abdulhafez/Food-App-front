import React, { useState } from "react";
import AllRecipes from "./AllRecipes";
import { useNavigate } from "react-router";
import InputForm from "./inputForm";
import Modals from "./Modals";

const Home = () => {
  const navigate = useNavigate();

  const [isOpen , setIsOpen] = useState(false)
  const addRecipes = () =>{
    let token = localStorage.getItem("token");
    if(token){
      navigate("/addRecipe")
    }else{
      setIsOpen(true)
    }
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <div className="pt-25 ">
      <section className="container mx-auto grid grid-cols-2 gap-4 items-center mt-10">
        <div className="left">
          <h1 className="text-3xl text-[#ff5500]">
            Lorem ipsum dolor cupiditate rem, ipsum sint sequi sunt?
          </h1>
          <p className="my-5 text-[#878787 text-[18px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
            laudantium architecto quam repudiandae non, rerum n minima nihil aut
            doloremque!
          </p>
          <button 
          onClick={addRecipes}
            className="bg-[#ff5500] text-[16px] py-2 px-5 text-white rounded 
             hover:bg-[#ff6011] hover:-translate-y-1 transition-transform duration-200 cursor-pointer"
          >
            Share your Recipe
          </button>
        </div>
        <div className="right">
          <img
          className="w-full h-[350px] object-cover rounded-lg"
            src="public/image-1.jpg"

            alt="food"
          />
        </div>
      </section>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff5500"
            fillOpacity="1"
            d="M0,192L10,208C20,224,40,256,60,272C80,288,100,288,120,282.7C140,277,160,267,180,256C200,245,220,235,240,218.7C260,203,280,181,300,192C320,203,340,245,360,240C380,235,400,181,420,160C440,139,460,149,480,170.7C500,192,520,224,540,245.3C560,267,580,277,600,250.7C620,224,640,160,660,122.7C680,85,700,75,720,101.3C740,128,760,192,780,224C800,256,820,256,840,240C860,224,880,192,900,186.7C920,181,940,203,960,192C980,181,1000,139,1020,106.7C1040,75,1060,53,1080,74.7C1100,96,1120,160,1140,202.7C1160,245,1180,267,1200,261.3C1220,256,1240,224,1260,202.7C1280,181,1300,171,1320,192C1340,213,1360,267,1380,261.3C1400,256,1420,192,1430,160L1440,128L1440,320L1430,320C1420,320,1400,320,1380,320C1360,320,1340,320,1320,320C1300,320,1280,320,1260,320C1240,320,1220,320,1200,320C1180,320,1160,320,1140,320C1120,320,1100,320,1080,320C1060,320,1040,320,1020,320C1000,320,980,320,960,320C940,320,920,320,900,320C880,320,860,320,840,320C820,320,800,320,780,320C760,320,740,320,720,320C700,320,680,320,660,320C640,320,620,320,600,320C580,320,560,320,540,320C520,320,500,320,480,320C460,320,440,320,420,320C400,320,380,320,360,320C340,320,320,320,300,320C280,320,260,320,240,320C220,320,200,320,180,320C160,320,140,320,120,320C100,320,80,320,60,320C40,320,20,320,10,320L0,320Z"
          ></path>
        </svg>
      </div>
      {isOpen && <Modals onClose={closeModal}><InputForm/></Modals>}
      <AllRecipes />
    </div>
  );
};

export default Home;
