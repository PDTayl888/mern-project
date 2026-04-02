import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { fetchClient } from "../utils/apiClient";
import CategoryItem from "../components/CategoryItem";

const Dashboard = () => {
  const gridContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  };

  const pageTest = {
    backgroundColor: "#205992",
    border: "3px solid #74a1d4",
  };

  const {
    data: categories,
    setData,
    loading,
    error,
  } = useFetch("/api/categories");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const newCat = await fetchClient("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: newCategoryName,
          description: newCategoryDescription,
        }),
      });
      setData([...categories, newCat]);
      setNewCategoryName("");
      setNewCategoryDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await fetchClient(`/api/categories/${id}`, { method: "DELETE" });
      setData(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.log(error, "DELETE FAILED");
    }
  };

  const handleUpdateCategory = async (id, updatedData) => {
    try {
      const updatedCat = await fetchClient(`/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
      setData(categories.map((cat) => (cat._id === id ? updatedCat : cat)));
    } catch (error) {
      console.log(error, "UPDATE FAILED");
    }
  };

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={pageTest}>
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
          <textarea
            placeholder="DESCRIPTION"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            rows="2"
          />
          <button type="submit">CREATE CATEGORY</button>
        </form>
      </section>

      <section style={gridContainerStyle}>
        {categories?.length > 0 ? (
          categories.map((cat) => (
            <CategoryItem
              key={cat._id}
              category={cat}
              onDelete={handleDeleteCategory}
              onUpdate={handleUpdateCategory}
            />
          ))
        ) : (
          <p>NO CATEGORIES AVAILABLE</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
