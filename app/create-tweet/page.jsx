"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCreateTweetMutation } from "@redux/tweetopiaApi";
import Form from "@components/Form";

const CreateTweet = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    tweet: "",
    tag: "",
    likes: 0,
  });
  const [addTweet, {}] = useCreateTweetMutation();

  const createTweet = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await addTweet({
        tweet: post.tweet,
        userId: session?.user.id,
        tag: post.tag,
        likes: post.likes,
      }).unwrap();
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
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createTweet}
      />
    </>
  );
};

export default CreateTweet;
