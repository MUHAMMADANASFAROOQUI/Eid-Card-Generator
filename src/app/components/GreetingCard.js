import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";

const GreetingCard = ({ name, recipient, message, selectedBackground }) => {
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side
  const cardRef = useRef(null);

  // Only run the code on the client side after component mounts
  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  const handleDownload = () => {
    if (isClient && cardRef.current) { // Ensure code runs only on client side
      html2canvas(cardRef.current, {
        allowTaint: true,
        useCORS: true,
      })
        .then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL();
          link.download = "greeting_card.png";
          link.click();
        })
        .catch((error) => {
          console.error("Error generating greeting card:", error);
          alert("An error occurred while generating the greeting card. Please try again.");
        });
    }
  };

  if (!isClient) {
    return null; // Optionally return null or a loading spinner until mounted
  }

  return (
    <div className="text-center mt-16">
      <div
        ref={cardRef}
        className="p-5 shadow-lg rounded-lg text-black bg-cover relative bg-center mx-auto"
        style={{
          backgroundImage: `url(${selectedBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
          maxWidth: "750px",
          width: "100%",
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
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          "{message}"
        </p>
      </div>

      <div className="mt-8">
        <button onClick={handleDownload} className="bg-indigo-600 text-white p-3 rounded">
          Download Greeting Card
        </button>
      </div>
    </div>
  );
};

export default GreetingCard;
