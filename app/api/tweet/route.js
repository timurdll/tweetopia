import Tweet from "@models/tweet";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const tweets = await Tweet.find({}).populate("creator");
    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all tweets", { status: 500 });
  }
};
