import Tweet from "@models/tweet";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const tweets = await Tweet.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch tweets created by user", {
      status: 500,
    });
  }
};
