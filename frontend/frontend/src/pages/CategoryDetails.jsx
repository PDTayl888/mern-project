import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ChannelCard from "../components/ChannelCard";
import { fetchClient as fetch } from "../utils/apiClient";
import CategoryItem from "../components/CategoryItem";

const CategoryDetails = () => {
  const pageTest = {
    backgroundColor: "#7f10ee",
    border: "3px solid #fb11c0",
  };
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: cards,
    setData,
    loading,
    error,
  } = useFetch(`/api/categories/${categoryId}/card`);

  const { 
    data: categories, 
    loading: catLoading 
  } = useFetch(`/api/categories`);

    const currentCategory = categories?.find(cat => cat._id === categoryId);


  const [newCard, setNewCard] = useState({
    channelName: "",
    youTubeUrl: "",
    description: "",
  });

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const createdCard = await fetch(`/api/categories/${categoryId}/card`, {
        method: "POST",
        body: JSON.stringify(newCard),
      });
      setData([...(cards || []), createdCard]);
      setNewCard({ channelName: "", youTubeUrl: "", description: "" });
    } catch (error) {
      const errorParsed = JSON.parse(error.message);
      alert(errorParsed.message);
    }
  };

  const handleUpdateCard = async (cardId, updatedData) => {
    try {
      const updatedCard = await fetch(
        `/api/categories/${categoryId}/card/${cardId}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
        },
      );
      setData(cards.map((card) => (card._id === cardId ? updatedCard : card)));
    } catch (error) {
      alert(error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm("Remove this channel?")) return;
    try {
      await fetch(`/api/categories/${categoryId}/card/${cardId}`, {
        method: "DELETE",
      });
      setData(cards.filter((card) => card._id !== cardId));
    } catch (error) {
      alert(error, "DELETE FAILED");
    }
  };

  if (loading) return <p>LOADING...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={pageTest}>
      <button onClick={() => navigate("/")}>DASHBOARD</button>


    <h1>{currentCategory?.name?.toUpperCase()}</h1>
      <h1>CHANNELS</h1>

      <form onSubmit={handleAddCard}>
        <input
          placeholder="Channel Name"
          value={newCard.channelName}
          onChange={(e) =>
            setNewCard({ ...newCard, channelName: e.target.value })
          }
          required
        />
        <input
          type="url"
          placeholder="https://youtube.com/..."
          value={newCard.youTubeUrl}
          onChange={(e) =>
            setNewCard({ ...newCard, youTubeUrl: e.target.value })
          }
          pattern=".*youtube\.com.*|.*youtu\.be.*"
          title="enter valid YouTube URL"
        />
        <input
          placeholder="description"
          value={newCard.description}
          onChange={(e) =>
            setNewCard({ ...newCard, description: e.target.value })
          }
          required
        />

        <button type="submit">Add Channel</button>
      </form>

      <ul className="card-list">
        {cards && cards.length > 0 ? (
          cards.map((card) => (
            <ChannelCard
              key={card._id}
              card={card}
              onDelete={handleDeleteCard}
              onUpdate={handleUpdateCard}
            />
          ))
        ) : (
          <p>No channels in this category yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryDetails;
