import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs";
const Section = () => {
  const [showFirstText, setShowFirstText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstText(false);
    }, 3000); // Show the first text for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="row rounded bg-dark mb-3 mx-1 text-start">
      <h5
        className={`p-2 rounded bg-dark text-white text-appear ${
          showFirstText ? "" : "d-none"
        }`}
      >
        Search Result will Appear Here <BsFire />
      </h5>
      <h5
        className={`p-2 rounded bg-dark text-white text-slide ${
          !showFirstText ? "" : "d-none"
        }`}
      >
        Latest Result <BsFire />
      </h5>
    </div>
  );
};

export default Section;
