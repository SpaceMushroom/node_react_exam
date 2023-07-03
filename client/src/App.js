import { useState, useEffect } from "react";

const App = () => {
  const [owners, setOwners] = useState([]);
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    fetch(`http://localhost:3000/owners?sort=${sort}`)
      .then((resp) => resp.json())
      .then((response) => {
        setOwners(response);
      });
  }, [sort]);

  return (
    <div>
      <button
        onClick={() => setSort("asc")}
        style={{ background: sort === "asc" ? "red" : "white" }}
      >
        ascending
      </button>
      <button
        onClick={() => setSort("dsc")}
        style={{ background: sort === "dsc" ? "red" : "white" }}
      >
        descending
      </button>
      {owners.map((owner) => (
        <div key={owner._id}>
          {owner.name} income: {owner.income}
        </div>
      ))}
    </div>
  );
};

export default App;
