"use client";
import { useState } from "react";
import Countdown from "./components/Countdown";
import GreetingCard from "./components/GreetingCard";
import Header from "./components/Header";

const Page = () => {
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(""); // For predefined message
  const [selectedBackground, setSelectedBackground] = useState(""); // For background image
  const [greetingCard, setGreetingCard] = useState(null);

  // Predefined messages
  const messages = [
    "Eid Mubarak! Wishing you a day filled with happiness and blessings.",
    "May this Eid bring peace, prosperity, and joy to your life!",
    "On this blessed occasion of Eid, may Allah bless you and your family.",
    "Eid Mubarak! May your life be filled with love, joy, and prosperity.",
    "Wishing you a joyous and peaceful Eid celebration with your loved ones."
  ];

  // Background image options
  const backgroundImages = [
    "https://static.vecteezy.com/system/resources/thumbnails/006/912/343/small_2x/ramadan-background-animation-4k-loop-free-video.jpg", // Background 1
    "https://png.pngtree.com/thumb_back/fh260/background/20210414/pngtree-empty-islamic-ramadan-background-with-ramadhan-golden-lantern-and-mosque-for-image_607235.jpg", // Background 2
    "https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-arabesque-luxury-ramadan-ramadhan-lantern-eid-al-fitr-fitri-adha-mubarak-vector-image_2382083.jpg", // Background 3
    "https://img.freepik.com/premium-photo/silver-lamp-with-moon-words-ramadanislamic-ramadan-greeting-background_430468-743.jpg?semt=ais_hybrid", // Background 4
    "https://img.freepik.com/premium-photo/eid-al-adha-background_1179652-3451.jpg" // Background 5
  ];

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalMessage = selectedMessage || message; // Use selected message if available, otherwise custom message
    const finalBackground = selectedBackground || backgroundImages[0]; // Default to first background if none selected

    const res = await fetch("/api/generate-card", {
      method: "POST",
      body: JSON.stringify({ name, recipient, message: finalMessage, background: finalBackground }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      setGreetingCard(data);
    } else {
      console.error("Error generating card");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-5">
        <Countdown />

        <form onSubmit={handleSubmit} className="mt-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Recipient's Name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mb-2"
            required
          />

          {/* Dropdown or radio buttons to select predefined messages */}
          <div className="mb-4">
            <label className="block text-gray-700">Choose a message:</label>
            <select
              value={selectedMessage}
              onChange={(e) => setSelectedMessage(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded mt-2"
            >
              <option value="">-- Select a Message --</option>
              {messages.map((msg, index) => (
                <option key={index} value={msg}>
                  {msg}
                </option>
              ))}
            </select>
          </div>

          {/* Custom message textarea if no predefined message is selected */}
          {!selectedMessage && (
            <textarea
              placeholder="Your custom message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded mb-4"
              required
            />
          )}

          {/* Background selection radio buttons */}
          <div className="mb-4">
            <label className="block text-gray-700">Choose a background:</label>
            <div className="flex flex-row mt-2">
              {backgroundImages.map((image, index) => (
                <label key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="background"
                    value={image}
                    onChange={(e) => setSelectedBackground(e.target.value)}
                    className="mr-2"
                  />
                  <img
                    src={image}
                    alt={`Background ${index + 1}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                </label>
              ))}
              
            </div>
          </div>

          <button type="submit" className="bg-indigo-600 text-white p-2 rounded">
            Generate Greeting Card
          </button>
        </form>

        {/* Pass selectedBackground to GreetingCard to apply selected background */}
        {greetingCard && (
          <GreetingCard {...greetingCard.data} selectedBackground={selectedBackground} />
        )}
      </div>
    </div>
  );
};

export default Page;
