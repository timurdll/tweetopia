import Tweet from "@models/tweet";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    // const url = new URL(request.url);
    // const limit = url.searchParams.get("limit") || 5; // Default to 5 if limit is not provided
    // const page = url.searchParams.get("page") || 1;

    const tweets = await Tweet.find({}).populate("creator");
    // .skip((page - 1) * limit)
    // .limit(limit); // Use 'limit' method here

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all tweets", { status: 500 });
  }
};
