// react
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// redux
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/Login/Login.action';
// components
import Topbar from '../Components/Topbar/Topbar';
import Navbar from '../Components/Navbar/Navbar';
// services
import userApi from '../services/userApi';
import { isLogin } from '../services/loginServices';
// styles
import './UserFavoritesStyles.css';


export default function UserFavorites() {
  const [favoritesCharacters, setFavoritesCharacters] = useState([]);
  const [favoritesComics, setFavoritesComics] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const userId = user ? user.id : null;

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    !isLogin()
      ? history.push('/')
      : dispatch(loginSuccess(JSON.parse(localStorage.getItem('loggedUser'))));
  }, []);

  // fetches api to get all favorites characters and comics
  useEffect(() => {
    userApi.get(`/favorites/characters/${userId}`)
      .then(response => {
        setFavoritesCharacters(response.data)
        console.log(response.data)
      });

    userApi.get(`/favorites/comics/${userId}`)
      .then(response => setFavoritesComics(response.data));
  }, []);


  return (
    <div className="container">

      <Topbar />

      <Navbar />

      <div className="pageContainer">
        <div className="favoritesContainer">

          <div>
            {favoritesCharacters.length > 0 && <p className="charactersP">Characters</p>}
            <div className="cardsContainer">
              {favoritesCharacters.map((fav, index) => (
                <div key={index} className="favoriteCard">
                  <p>{fav.name}</p>
                  <img src={`${fav.thumbPath}.${fav.thumbExt}`} alt={fav.name} />
                </div>
              ))}
            </div>
          </div>

          <div>
            {favoritesComics.length > 0 && <p className="comicsP">Comics</p>}
            <div className="cardsContainer">
              {favoritesComics.map((fav, index) => (
                <div key={index} className="favoriteCard">
                  <p>{fav.name}</p>
                  <img src={`${fav.thumbPath}.${fav.thumbExt}`} alt={fav.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};