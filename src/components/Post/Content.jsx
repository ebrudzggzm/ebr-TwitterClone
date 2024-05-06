const Content = ({ tweet }) => {
  return (
    <div className="my-5 ">
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          className="my-2 rounded-lg object-cover max-h-[400px] w-full"
          src={tweet.imageContent}
          alt=""
        />
      )}
    </div>
  );
};

export default Content;
