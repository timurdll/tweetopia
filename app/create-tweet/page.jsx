"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useCreateTweetMutation } from "@redux/tweetopiaApi";

const CreateTweet = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [createTweet, {}] = useCreateTweetMutation();
  const [post, setPost] = useState({
    tweet: "",
    tag: "",
  });

  const handleCreateTweet = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await createTweet({
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
        handleSubmit={handleCreateTweet}
      />
    </>
  );
};

export default CreateTweet;
