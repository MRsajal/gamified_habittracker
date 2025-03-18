import React from "react";
import { useState } from "react";
import "./Reward.css";

export default function Reward() {
  const [card, setCards] = useState([]);
  const [reward, setReward] = useState("");
  const [cost, setCost] = useState(0);

  const updateCard = (e) => {
    e.preventDefault();
    if (!reward) return;
    setCards([
      ...card,
      { text: reward, number: cost, collect: false, id: Date.now() },
    ]);
    setCost(0);
    setReward("");
  };

  const handleCollect = (id) => {
    setCards((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div
      style={{
        height: "100vh",
       
        textAlign: "center",
      }}
    >
      <h1>Reward Section</h1>
      <div className="Reward">
        <div className="form-cls">
          <form onSubmit={updateCard}>
            <input
              type="text"
              value={reward}
              placeholder="Enter reward"
              onChange={(e) => setReward(e.target.value)}
            />
            <input
              type="number"
              value={cost}
              placeholder="Enter reward"
              onChange={(e) => setCost(Number(e.target.value))}
            />
            <div>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
      <div className="card-container">
        {card.map(
          (card) =>
            !card.done && (
              <div className="card">
                <h3>
                  <b>{card.text}</b>
                </h3>
                <p>Cost: {card.number}</p>
                <button onClick={() => handleCollect(card.id)}>Get</button>
              </div>
            )
        )}
      </div>
    </div>
  );
}
