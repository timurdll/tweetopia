import { Schema, model, models } from "mongoose";

const tweetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tweet: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  likes: {
    type: Number,
  },
});

const Tweet = models.Prompt || model("Prompt", tweetSchema);

export default Tweet;
