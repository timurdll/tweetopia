"use client";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const [userName, setUserName] = useState("");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setUserPosts(data);
      setUserName(data[0].creator.username);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName} profile page.`}
      data={userPosts}
    />
  );
};

export default UserProfile;
