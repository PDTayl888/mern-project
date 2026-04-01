import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ChannelCard from "../components/ChannelCard";

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

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
    </div>
  );
};
