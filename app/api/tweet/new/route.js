import { connectToDB } from "@utils/database";
import Tweet from "@models/tweet";

export const POST = async (request) => {
  const { userId, tweet, tag } = await request.json();

  try {
    await connectToDB();
    const newTweet = new Tweet({
      creator: userId,
      tweet,
      tag,
    });

    await newTweet.save();

    return new Response(JSON.stringify(newTweet), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new tweet", { status: 500 });
  }
};
