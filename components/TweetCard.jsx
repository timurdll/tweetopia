"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useUpdateTweetMutation,
} from "@redux/tweetopiaApi";

const TweetCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();

  const [copyed, setCopyed] = useState("");
  const [likes, setLikes] = useState(post.likes);
  const [handleAddFavorite, {}] = useAddFavoriteMutation();
  const [handleUpdateTweet, {}] = useUpdateTweetMutation();
  const [handleDeleteFavorite, {}] = useDeleteFavoriteMutation();
  const [liked, setLiked] = useState(false); // Initialize liked state as false

  useEffect(() => {
    // Check if session data is available and post is liked by the user
    if (session?.user && session.user.likedTweets.includes(post._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [session, post._id]);

  const handleCopy = () => {
    setCopyed(post.tweet);
    navigator.clipboard.writeText(post.tweet);
    setTimeout(() => setCopyed(""), 3000);
  };
  const userId = session?.user.id;
  const tweetId = post._id;

  const handleLike = async (e) => {
    e.preventDefault();

    if ((liked == true) & (userId !== null)) {
      try {
        handleDeleteFavorite({
          userId,
          body: JSON.stringify({
            unlikedTweet: tweetId,
          }),
        });
        handleUpdateTweet({
          tweetId,
          body: JSON.stringify({
            tweet: post.tweet,
            tag: post.tag,
            likes: post.likes - 1,
          }),
        });
        setLikes(likes - 1);
        setLiked(false);
      } catch (e) {
        console.log(e);
      } finally {
        setLiked(false);
      }
    }
    if ((liked !== true) & (userId !== null)) {
      try {
        handleAddFavorite({
          userId,
          body: JSON.stringify({
            likedTweet: tweetId,
          }),
        });
        handleUpdateTweet({
          tweetId,
          body: JSON.stringify({
            tweet: post.tweet,
            tag: post.tag,
            likes: post.likes + 1,
          }),
        });
        setLikes(likes + 1);
        setLiked(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {}, []);

  const pathName = usePathname();
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href={`/profile/${post.creator._id}`}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </Link>
        </div>
        <div className="copy_btn" onClick={() => {}}>
          <Image
            src={
              copyed === post.tweet
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            onClick={handleCopy}
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.tweet}</p>
      <div className="flex justify-between">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        <div className="flex gap-3 justify-center items-center">
          {handleLike ? (
            <>
              {likes}
              <div onClick={handleLike} className="cursor-pointer flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    fill={liked ? "red" : "none"}
                  />
                </svg>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 bordet-t border-gray-300 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default TweetCard;
