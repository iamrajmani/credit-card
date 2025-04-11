import React, { useState } from "react";
import "./CreditCard.css";

const CreditCard = () => {
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "number") {
      newValue = value.replace(/\D/g, "").substring(0, 16);
      newValue = newValue.replace(/(.{4})/g, "$1 ").trim();
    }

    if (name === "expiry") {
      newValue = value.replace(/\D/g, "").substring(0, 4);
      if (newValue.length > 2) {
        newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
      }
    }

    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").substring(0, 3);
    }

    setCard({ ...card, [name]: newValue });
  };

  return (
    <div className="card-container">
      <div className={`credit-card-wrapper ${isFlipped ? "flipped" : ""}`}>
        {/* FRONT */}
        <div className="credit-card front">
          <div className="card-number">
            {card.number || "- - - - - - - - - - - - - - - -"}
          </div>
          <div className="card-info">
            <div className="card-name">
              <label>Card Holder</label>
              <div>{card.name || "FULL NAME"}</div>
            </div>
            <div className="card-expiry">
              <label>Valid Thru</label>
              <div>{card.expiry || "MM/YY"}</div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="credit-card back">
          <div className="stripe" />
          <div className="cvv-area">
            <label>CVV</label>
            <div className="cvv-box">{card.cvv || "•••"}</div>
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="form">
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={card.number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={card.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={card.expiry}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={card.cvv}
          onChange={handleChange}
          onFocus={() => setIsFlipped(true)}
          onBlur={() => setIsFlipped(false)}
        />
      </div>
    </div>
  );
};

export default CreditCard;
