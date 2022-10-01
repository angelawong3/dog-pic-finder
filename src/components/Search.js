import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = (props) => {
  const [optionList, setOptionList] = useState([]);
  const [currentBreed, setCurrentBreed] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchData = () => {
    axios
      .get(`https://dog.ceo/api/breeds/list/all`)
      .then(({ data }) => {
        setOptionList(Object.keys(data?.message));
      })
      .catch((error) => console.log(error));
  };

  const fetchBreed = (breed) => {
    axios
      .get(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(({ data }) => {
        setImageUrl(data?.message);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Breed List</h1>
        <span>
          https://dog.ceo/api/breed/
          {
            <select
              onChange={(e) => {
                setCurrentBreed(e.target.value);
                fetchBreed(e.target.value);
              }}
            >
              {optionList?.map((breed, i) => (
                <option key={i} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          }
          /images/random
        </span>
        <button
          onClick={(e) => {
            setImageUrl(e.target.value);
          }}
        >
          Fetch!
        </button>
      </div>
      <img alt={currentBreed} src={imageUrl} />
    </>
  );
};

export default Search;
