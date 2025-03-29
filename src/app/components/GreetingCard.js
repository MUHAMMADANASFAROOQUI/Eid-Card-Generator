import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas"; // Import the html2canvas library

const GreetingCard = ({ name, recipient, message, selectedBackground }) => {
  const cardRef = useRef(null); // Create a reference for the card

  // State to track the background image URL
  const [background, setBackground] = useState(selectedBackground);

  useEffect(() => {
    // Update background state when selectedBackground prop changes
    setBackground(selectedBackground);
  }, [selectedBackground]);

  // Function to handle downloading the card
  const handleDownload = () => {
    html2canvas(cardRef.current, {
      allowTaint: true, // Allow background images to be captured even if they are from a different origin
      useCORS: true, // Use CORS to ensure cross-origin images are captured correctly
    })
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL(); // Convert the canvas to a data URL
        link.download = "greeting_card.png"; // Set the default file name for download
        link.click(); // Trigger the download
      })
      .catch((error) => {
        console.error("Error generating greeting card:", error);
        alert("An error occurred while generating the greeting card. Please try again.");
      });
  };

  return (
    <div className="text-center mt-16">
      {/* Card Content */}
      <div
        ref={cardRef} // Attach the reference to the card div
        className="p-5 shadow-lg rounded-lg text-black bg-cover relative bg-center mx-auto"
        style={{
          backgroundImage: `url(${selectedBackground})`, // Dynamically set the background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "auto", // Adjust height to accommodate dynamic content
          maxWidth: "750px",
          width: "100%", // Make the card responsive
        }}
      >
        <h2 className="text-7xl font-bold text-cyan-700 mt-10 font-font1">Happy</h2>
        <h2 className="text-7xl font-bold text-cyan-700 mt-2 font-font1">Eid Mubarak!</h2>
        <p className="text-[23px] font-semibold text-cyan-800 mt-6 font-font2 w-8/12 ml-28">
          {name} sends warm wishes to {recipient}.
        </p>
        <p
          className="italic text-[22px] font-semibold text-cyan-900 mt-4 font-font2 w-2/4 ml-52"
          style={{
            wordBreak: "break-word", // Ensure long words break into the next line
            whiteSpace: "normal", // Ensure text wraps naturally
          }}
        >
          "{message}"
        </p>
      </div>

      {/* Download Button */}
      <div className="mt-8"> {/* Added margin-top to space the button */}
        <button
          onClick={handleDownload}
          className="bg-indigo-600 text-white p-3 rounded"
        >
          Download Greeting Card
        </button>
      </div>
    </div>
  );
};

export default GreetingCard;
