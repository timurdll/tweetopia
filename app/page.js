import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">
          Thoughts about everything
        </span>
      </h1>
      <p className="desc text-center">
        Tweetopia is an open-source twitter clone to discover, create and share
        creative thoughts
      </p>

      <Feed />
    </section>
  );
};

export default Home;
