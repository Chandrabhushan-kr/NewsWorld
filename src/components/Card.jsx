import React from "react";

const Card = ({ data }) => {
  // Log the data for debugging purposes
  console.log(data);

  // Handle cases where data is not provided or is an empty array
  if (!data || data.length === 0) {
    return <p>No news available.</p>;
  }

  return (
    <div className="cardContainer">
      {data.map((curItem, index) => {
        return (
          <div className="card" key={index}>
            <img src={curItem.urlToImage} alt="news" />
            <div className="cardContent">
              <a href={curItem.url} target="_blank" rel="noopener noreferrer">
                {curItem.title}
              </a>
              <p>{curItem.description}</p>
              <button>
                <a href={curItem.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
