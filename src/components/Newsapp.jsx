import React, { useState, useEffect } from "react";
import Card from "./Card";

const states = [
  { name: "Andhra Pradesh" },
  { name: "Arunachal Pradesh" },
  { name: "Assam" },
  { name: "Bihar" },
  { name: "Chhattisgarh" },
  { name: "Goa" },
  { name: "Gujarat" },
  { name: "Haryana" },
  { name: "Himachal Pradesh" },
  { name: "Jammu and Kashmir" },
  { name: "Jharkhand" },
  { name: "Karnataka" },
  { name: "Kerala" },
  { name: "Madhya Pradesh" },
  { name: "Maharashtra" },
  { name: "Manipur" },
  { name: "Meghalaya" },
  { name: "Mizoram" },
  { name: "Nagaland" },
  { name: "Odisha" },
  { name: "Punjab" },
  { name: "Rajasthan" },
  { name: "Sikkim" },
  { name: "Tamil Nadu" },
  { name: "Telangana" },
  { name: "Tripura" },
  { name: "Uttar Pradesh" },
  { name: "Uttarakhand" },
  { name: "West Bengal" },
];

const Newsapp = () => {
  const [search, setSearch] = useState("modi");
  const [newsData, setNewsData] = useState([]);
  const [language, setLanguage] = useState("en");
  const [selectedState, setSelectedState] = useState(""); // State for selected state
  const API_KEY = "dff5b8de956c499aab027a5b99fc6993";

  useEffect(() => {
    getData();
  }, [search, language, selectedState]); // Fetch data based on language and state as well

  const getData = async () => {
    // Modify the search term to include the selected state if available
    const query = selectedState ? `news about ${selectedState}` : search;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&language=${language}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      console.error("Failed to fetch data:", response.statusText);
      return; // Exit if there's an error
    }

    const jsonData = await response.json();
    console.log("All news data:", jsonData.articles); // Log the data received
    setNewsData(jsonData.articles);
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleAllNews = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=india&language=${language}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      console.error("Failed to fetch all news:", response.statusText);
      return; // Exit if there's an error
    }

    const jsonData = await response.json();
    console.log("All news data:", jsonData.articles); // Log the data received
    setNewsData(jsonData.articles);
  };

  const handleTrending = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=general&language=${language}&apiKey=${API_KEY}`
    );

    if (!response.ok) {
      console.error("Failed to fetch trending news:", response.statusText);
      return; // Exit if there's an error
    }

    const jsonData = await response.json();
    console.log("Trending news data:", jsonData.articles); // Log the data received

    if (jsonData.articles && jsonData.articles.length > 0) {
      setNewsData(jsonData.articles); // Set the articles if available
    } else {
      console.warn("No trending articles available.");
      setNewsData([]); // Set an empty array if no articles are found
    }
  };

  const handleCategory = (category) => {
    setSearch(category); // Update search term to the category clicked
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Set selected language
  };

  // Handle state change
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state); // Set selected state
  };

  return (
    <div className="container">
      <nav>
        <div>
          <h1>News World</h1>
        </div>
        <ul>
          <a href="#all-news" onClick={handleAllNews}>
            All News
          </a>
          <a href="#trending" onClick={handleTrending}>
            Trending
          </a>
        </ul>
        <div className="searchBar">
          <input type="text" placeholder="Search News" onChange={handleInput} />
          <button onClick={getData}>Search</button>
        </div>
        <div>
          <select onChange={handleLanguageChange} value={language}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        <div>
          <select onChange={handleStateChange} value={selectedState}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      </nav>
      <p className="head">Connect to the world through stories.</p>
      <div className="categoryBtn">
        <button onClick={() => handleCategory("sports")}>Sports</button>
        <button onClick={() => handleCategory("politics")}>Politics</button>
        <button onClick={() => handleCategory("entertainment")}>
          Entertainment
        </button>
        <button onClick={() => handleCategory("health")}>Health</button>
        <button onClick={() => handleCategory("fitness")}>Fitness</button>
      </div>

      <div>
        <Card data={newsData}></Card>
      </div>
    </div>
  );
};

export default Newsapp;
