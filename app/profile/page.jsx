"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import {
  useDeleteTweetMutation,
  useGetProfileQuery,
} from "@redux/tweetopiaApi";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const userId = session?.user?.id;
  const { data = [] } = useGetProfileQuery(userId);
  const [deleteTweet] = useDeleteTweetMutation();
  const router = useRouter();

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(posts)) {
      setPosts(data);
    }
  }, [data, posts]);

  const handleEdit = (post) => {
    router.push(`/update-tweet?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");

    if (hasConfirmed) {
      try {
        await deleteTweet(post._id.toString()).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to you're profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
