"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const TweetCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copyed, setCopyed] = useState("");
  const handleCopy = () => {
    setCopyed(post.tweet);
    navigator.clipboard.writeText(post.tweet);
    setTimeout(() => setCopyed(""), 3000);
  };
  const { data: session } = useSession();
  const pathName = usePathname();
  return (
    <div className="tweet_card">
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
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
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
