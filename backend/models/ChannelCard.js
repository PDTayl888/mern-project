const mongoose = require("mongoose");

const channelCardSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    youTubeUrl: {
      type: String,
      required: [true, "URL REQUIRED"],
      match: [
        /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
        "ENTER VALID YT URL",
      ]
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Subscribed", "Watch Later", "Archived"],
      default: "Subscribed",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ChannelCard", channelCardSchema);
