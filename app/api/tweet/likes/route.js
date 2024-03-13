import Tweet from "@models/tweet";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
  const { likedTweet, likes } = await request.json();
  try {
    await connectToDB();
    const tweet = await Tweet.findById(likedTweet);

    tweet.likes = likes;

    await tweet.save();
    return new Response(tweet, { status: 200 });
  } catch (error) {
    return new Response(console.log(error), {
      status: 500,
    });
  }
};
