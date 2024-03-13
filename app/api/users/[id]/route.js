import User from "@models/user";
import { connectToDB } from "@utils/database";

export const PATCH = async (request, { params }) => {
  const { likedTweet } = await request.json();
  try {
    await connectToDB();
    const user = await User.findById(params.id);
    user.likedTweets.push(likedTweet);
    await user.save();
    return new Response(user, { status: 200 });
  } catch (error) {
    return new Response("Failed to like", {
      status: 500,
    });
  }
};

export const DELETE = async (request, { params }) => {
  const { unlikedTweet } = await request.json();
  try {
    await connectToDB();
    const user = await User.findById(params.id);

    user.likedTweets = user.likedTweets.filter(
      (likedTweet) => likedTweet !== unlikedTweet
    );
    await user.save();
    return new Response(user, { status: 200 });
  } catch (error) {
    return new Response("Failed to unlike", {
      status: 500,
    });
  }
};
