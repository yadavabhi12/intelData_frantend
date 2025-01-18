import React, { useEffect, useState } from "react";
import "./MovingText.css"

const messages = [
  "Welcome to IntelData Datastore! Securely store and manage your WhatsApp, Email, SMS, and Voice data with ease.",
  "Never miss a birthday! Set up automated, professional messages and make every birthday special with IntelData.",
  "IntelData Datastore: Your secure solution for data storage and automated reminders, tailored just for you."
];

const MovingText = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const messageSwitchTimeout = setTimeout(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 30*1000); // Adjust time to match animation duration

    return () => clearTimeout(messageSwitchTimeout);
  }, [currentMessageIndex]);

  return (
    <div className="moving-text-container">
      <span className="moving-text">{messages[currentMessageIndex]}</span>
    </div>
  );
};

export default MovingText;
