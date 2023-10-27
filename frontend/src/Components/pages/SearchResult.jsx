import React from "react";
import { useSearch } from "../../context/search";

const SearchResult = () => {
  const [values, setValues] = useSearch();
  // console.log(values)
  return (
    <>
      <div className="container">
        <h3>Search Result</h3>
        <h5>
          {values?.results.length < 1
            ? "No valueDatas Found 😒"
            : `Found ${values?.results.length}`}
        </h5>
        <div>
          <div className="mainCardContainer">
            {values.results.map((valueData) => (
              <div className="childCard" key={valueData._id}>
                <img
                  src={`http://localhost:3000/image/${valueData.image}'}`}
                  alt=""
                />
                <h2>{valueData.name}</h2>
                <p>{valueData.description.substring(0, 20)}...</p>
                <h3>price : $ {valueData.price}</h3>
                <div className="btnSection">
                  <button>Add to Cart</button>
                  <button>More Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
