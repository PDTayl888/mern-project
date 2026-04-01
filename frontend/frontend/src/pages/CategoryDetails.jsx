import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ChannelCard from "../components/ChannelCard";
import { fetch } from "../utils/apiClient";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const {
    data: cards,
    setData,
    loading,
    error,
  } = useFetch(`/api/categories/${categoryId}/cards`);

  const [newCard, setNewCard] = useState({
    channelName: "",
    youtubeUrl: "",
    description: "",
  });

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const createdCard = await fetch(`/api/categories/${categoryId}/cards`, {
        method: "POST",
        body: JSON.stringify(newCard),
      });
      setData([...cards, createdCard]);
      setNewCard({ channelName: "", youtubeUrl: "", description: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCard = async (cardId, updatedData) => {
    try {
      const updatedCard = await fetch(
        `/api/categories/${categoryId}/cards/${cardId}`,
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
      await fetch(`/api/categories/${categoryId}/cards/${cardId}`, {
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
    <div>
      <button onClick={() => navigate("/")}>DASHBOARD</button>

      <h1>CATEGORIES</h1>

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
          placeholder="yt URL"
          value={newCard.youtubeURL}
          onChange={(e) =>
            setNewCard({ ...newCard, youtubeURL: e.target.value })
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
