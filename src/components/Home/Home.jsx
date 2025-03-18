import React, { useEffect, useState } from "react";
import "./Home.css";
import createNote from "../../utils/AddText";
import getEntries from "../../utils/GetEntries";
import deleteEntry from "../../utils/DeleteEntry";
import updateEntry from "../../utils/UpdateEntry";
import getPoint from "../../utils/GetPoint";
import updatePoint from "../../utils/UpdatePoint";
import { useAuth } from "../../utils/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const [totalPoint, setTotalPoint] = useState(null);
  useEffect(() => {
    if (user) {
      async function fetchMainPoint() {
        try {
          console.log(user.$id);
          const point = await getPoint(user.$id);

          setTotalPoint(point || 0);
        } catch (error) {
          console.error("Error fetching points: ", error);
          setTotalPoint(0);
        }
      }
      fetchMainPoint();
    }
  }, [user]);

  useEffect(() => {
    if (user.$id) {
      async function fetchMainPoint() {
        try {
          const point = await getPoint(user.$id);
          console.log(point);
          setTotalPoint(point || 0);
        } catch (error) {
          console.error("Error fetching points: ", error);
          setTotalPoint(0);
        }
      }
      fetchMainPoint();
    }
  }, [user.$id]);

  return (
    <div className="main">
      {/* <h2>Points: {totalPoint}</h2> */}

      {/* {console.log("total Points: ", totalPoint)} */}
      <Positive
        user={user}
        setTotalPoint={setTotalPoint}
        totalPoint={totalPoint}
      />
      <Negative
        user={user}
        setTotalPoint={setTotalPoint}
        totalPoint={totalPoint}
      />
      {/* <Demo /> */}
    </div>
  );
}

function Positive({ user, setTotalPoint, totalPoint }) {
  const [List, setList] = useState([]);
  const [description, setDescription] = useState("");
  const [point, setPoint] = useState(10);
  const [difficulty, setDifficulty] = useState("Easy");
  useEffect(() => {
    getEntries(user.$id).then((data) => {
      setList(data.filter((item) => item.Type));
    });
  }, []);
  const handleDescription = async (e) => {
    e.preventDefault();
    if (!description) return;
    await createNote(description, point, false, true, user.$id);
    setDescription("");
    setPoint(10);
    setDifficulty("Easy");
    const updatedList = await getEntries(user.$id);
    setList(updatedList.filter((item) => item.Type));
  };
  async function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want ot delete all items?"
    );
    if (confirmed) {
      setList([]);
      setTotalPoint(0);
      await updatePoint(user.$id, 0);
    }
  }
  const handleToggleItem = async (id, done) => {
    await updateEntry(id, done);
    const updatedList = await getEntries(user.$id);
    setList(updatedList.filter((item) => item.Type));

    const toggleItem = updatedList.find((item) => item.$id === id);
    if (toggleItem) {
      const addPoint = toggleItem.Done ? toggleItem.Point : -toggleItem.Point;
      setTotalPoint((prev) => {
        const newTotal = prev + addPoint;
        updatePoint(user.$id, newTotal);
        return newTotal;
      });
      console.log(totalPoint);
      console.log(await getPoint(user.$id));
    }
  };
  const handleDeleteItem = async (id) => {
    await deleteEntry(id);
    const updateList = await getEntries(user.$id);
    setList(updateList.filter((item) => item.Type));
  };
  function handleDifficultyChage(e) {
    const selectDificulty = e;
    setDifficulty(selectDificulty);
    if (selectDificulty === "Easy") setPoint(10);
    if (selectDificulty === "Medium") setPoint(15);
    if (selectDificulty === "Hard") setPoint(20);
  }

  return (
    <div className="todo todo-positive">
      <h2>Add Positive Todo</h2>
      <form onSubmit={handleDescription}>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChage(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="text"
          placeholder="Add Positive Todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list">
        <ul>
          {List.length > 0
            ? List.map((item) => (
                <li
                  key={item.$id}
                  style={
                    item.Done
                      ? { backgroundColor: "#1F7D53", color: "white" }
                      : {}
                  }
                >
                  <input
                    type="checkbox"
                    checked={item.Done}
                    onChange={() => handleToggleItem(item.$id, !item.Done)}
                  />
                  <span
                    style={item.Done ? { textDecoration: "line-through" } : {}}
                  >
                    {item.Positive} - for points {item.Point}
                  </span>
                  <button onClick={() => handleDeleteItem(item.$id)}>❌</button>
                </li>
              ))
            : null}
        </ul>
      </div>
      <button className="btn" onClick={handleClearList}>
        Clear List
      </button>
    </div>
  );
}

//Negative Todo
function Negative({ user, setTotalPoint, totalPoint }) {
  const [List, setList] = useState([]);
  const [description, setDescription] = useState("");
  const [point, setPoint] = useState(10);
  const [difficulty, setDifficulty] = useState("Easy");
  useEffect(() => {
    getEntries(user.$id).then((data) => {
      setList(data.filter((item) => !item.Type));
    });
  }, []);
  const handleDescription = async (e) => {
    e.preventDefault();
    if (!description) return;
    await createNote(description, point, false, false, user.$id);
    setDescription("");
    setPoint(10);
    setDifficulty("Easy");
    const updatedList = await getEntries(user.$id);
    setList(updatedList.filter((item) => !item.Type));
  };
  async function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want ot delete all items?"
    );
    if (confirmed) {
      setList([]);
      setTotalPoint(0);
      await updatePoint(user.$id, 0);
    }
  }
  const handleToggleItem = async (id, done) => {
    await updateEntry(id, done);
    const updatedList = await getEntries(user.$id);
    setList(updatedList.filter((item) => !item.Type));

    const toggleItem = updatedList.find((item) => item.$id === id);
    if (toggleItem) {
      const addPoint = toggleItem.Done ? -toggleItem.Point : toggleItem.Point;
      setTotalPoint((prev) => {
        const newTotal = prev + addPoint;
        updatePoint(user.$id, newTotal);
        return newTotal;
      });
      console.log(totalPoint);
      console.log(await getPoint(user.$id));
    }
  };
  const handleDeleteItem = async (id) => {
    await deleteEntry(id);
    const updatedList = await getEntries(user.$id);
    setList(updatedList.filter((item) => !item.Type));
  };
  function handleDifficultyChage(e) {
    const selectDificulty = e;
    setDifficulty(selectDificulty);
    if (selectDificulty === "Easy") setPoint(10);
    if (selectDificulty === "Medium") setPoint(15);
    if (selectDificulty === "Hard") setPoint(20);
  }

  return (
    <div className="todo todo-negative">
      <h2>Add Negative Todo</h2>
      <form onSubmit={handleDescription}>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChage(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="text"
          placeholder="Add Negative Todo"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list">
        <ul>
          {List.length > 0
            ? List.map((item) => (
                <li
                  key={item.$id}
                  style={
                    item.Done
                      ? { backgroundColor: "#1F7D53", color: "white" }
                      : {}
                  }
                >
                  <input
                    type="checkbox"
                    checked={item.Done}
                    onChange={() => handleToggleItem(item.$id, !item.Done)}
                  />
                  <span
                    style={item.Done ? { textDecoration: "line-through" } : {}}
                  >
                    {item.Positive} - for points {item.Point}
                  </span>
                  <button onClick={() => handleDeleteItem(item.$id)}>❌</button>
                </li>
              ))
            : null}
        </ul>
      </div>
      <button className="btn" onClick={handleClearList}>
        Clear List
      </button>
    </div>
  );
}
