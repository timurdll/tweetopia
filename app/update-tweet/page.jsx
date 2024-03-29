"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { useGetTweetQuery, useUpdateTweetMutation } from "@redux/tweetopiaApi";

const UpdateTweet = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tweetId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tweet: "",
    tag: "",
  });
  const { data = [] } = useGetTweetQuery(tweetId);
  const [handleUpdateTweet, {}] = useUpdateTweetMutation();

  useEffect(() => {
    setPost({
      tweet: data.tweet,
      tag: data.tag,
      likes: data.likes,
    });
  }, []);

  const updateTweet = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    if (!tweetId) return alert("Tweet ID not found");

    try {
      handleUpdateTweet({
        tweetId,
        body: JSON.stringify({
          tweet: post.tweet,
          tag: post.tag,
          likes: data.likes,
        }),
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updateTweet}
      />
    </>
  );
};

export default UpdateTweet;
