/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { logout } from '../utils/LocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/icons/storm.png'
const Navbar = ({isLoggedIn, setIsLoggedIn, setIsFav}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate= useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const onLogin = ()=>{
    // login page
    navigate("/signin")
  };
  const onLogout = ()=>{
    // logout function, isloggedin false
    logout();
    setIsLoggedIn(false);
    navigate("/");
  };
  console.log("render");

  
  const onExplore = ()=>{
    setIsFav(true);
  };


  return (
    <nav className="bg-grey-900 text-white p-4 h-20px flex items-center justify-between shadow text-[18px]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
        <span className='text-xl font-semibold'>Weather Forecast</span>
        </Link>
      {/* Navigation Options - Desktop */}
      </div>
      <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && ( <span className=" px-5 ">Hi, User</span>)}
            <button onClick={onExplore} className="bg-cyan-500 text-black px-4 py-2 rounded-full">
              Favourites
              </button>
              {isLoggedIn ? (
                <button onClick={onLogout} className="hover:bg-gray-800 px-3 py-2 rounded ">Logout</button>
              ) : (
                <button onClick={onLogin} className="hover:bg-gray-800 px-3 py-2 rounded ">Login</button>
              )}
              
        </div>
        
      {/* Hamburger Menu - Mobile */}
      <div className="md:hidden flex">
      <button onClick={onExplore} className=" text-left bg-cyan-500 text-black px-3 py-1 rounded-md mr-7">
                Favourites
              </button>
        
      
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
          {isMenuOpen ? <svg  className="w-4 h-4" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100" x2="100" y2="0" strokeWidth="6" stroke="white"/>
            <line x1="0" y1="0" x2="100" y2="100" strokeWidth="6" stroke="white"/>
          </svg> :
          <svg className="w-8 h-8" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
          }
        </button>
        </div>              
      {/* Hamburger Menu Content - Mobile */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-40 bg-black px-4  pb-2">
          <div className="flex flex-col space-y-2 ">
     
              {isLoggedIn ? (
                <button onClick={onLogout} className=" text-left hover:bg-gray-800 px-3 py-2 rounded ">Logout</button>
              ) : (
                <button onClick={onLogin} className=" text-left hover:bg-gray-800 px-3 py-2 rounded">Login</button>
              )}
              
          </div>
        </div>
      )}
    </nav>
  );
};
const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
  
    useEffect(() => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    }, []);
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Favorite Cities</h1>
        <ul>
          {favorites.length > 0 ? (
            favorites.map((city, index) => (
              <li key={index} className="mb-2">
                {city}
              </li>
            ))
          ) : (
            <li>No favorite cities added yet.</li>
          )}
        </ul>
      </div>
    );
  };
export default Navbar;