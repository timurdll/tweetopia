import Tweet from "@models/tweet";
import { connectToDB } from "@utils/database";

// GET (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const tweet = await Tweet.findById(params.id).populate("creator");

    if (!tweet) return new Response("Tweet not found", { status: 404 });

    return new Response(JSON.stringify(tweet), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tweet", { status: 500 });
  }
};

// PATCH (update)

export const PATCH = async (request, { params }) => {
  const { tweet, tag, likes } = await request.json();

  try {
    await connectToDB();
    const existingTweet = await Tweet.findById(params.id);
    if (!existingTweet) return new Response("Tweet not found", { status: 404 });

    existingTweet.tweet = tweet;
    existingTweet.tag = tag;
    existingTweet.likes = likes;

    await existingTweet.save();

    return new Response(JSON.stringify(existingTweet), { status: 200 });
  } catch (error) {
    return new Response("Failed to update tweet", { status: 500 });
  }
};

// DELETE (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Tweet.findByIdAndRemove(params.id);

    return new Response("Tweet deleted succesfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete tweet", { status: 500 });
  }
};
