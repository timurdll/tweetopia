import { connectToDB } from "@utils/database";
import Tweet from "@models/tweet";

export const POST = async (request) => {
  const { userId, tweet, tag, likes } = await request.json();

  try {
    await connectToDB();
    const newTweet = new Tweet({
      creator: userId,
      tweet,
      tag,
      likes,
    });

    await newTweet.save();

    return new Response(JSON.stringify(newTweet), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new tweet", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { likes } = await request.json();

  try {
    await connectToDB();

    const existingTweet = await Tweet.findById(params.id);

    if (!existingTweet) return new Response("Tweet not found", { status: 404 });

    existingTweet.likes = likes; // Update the likes count

    await existingTweet.save();

    return new Response(JSON.stringify(existingTweet), { status: 200 });
  } catch (error) {
    return new Response("Failed to update tweet", { status: 500 });
  }
};
