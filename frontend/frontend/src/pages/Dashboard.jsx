import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchClient } from "../utils/apiClient";
import CategoryItem from "../components/CategoryItem";

const Dashboard = () => {
  const {
    data: categories,
    setData,
    loading,
    error,
  } = useFetch("/api/categories");
  const [newCategoryName, setNewCategoryName] = useState("");

  return (
    <div>
      <h1>CATEGORIES</h1>

      <section>
        <form onSubmit={handleCreateCategory}>
          <input
            type="text"
            placeholder="CATEGORY NAME"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            required
          />
          <button type="submit">CREATE CATEGORY</button>
        </form>
      </section>

      <section>
        {categories.length > 0 ? (
            categories.map((cat) => (
             <CategoryItem key={cat._id} category={cat} />
            ))
        ) : (
            <p>NO CATEGORIES AVAILABLE</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
