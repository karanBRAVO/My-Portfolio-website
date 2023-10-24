const Card = ({ imgSrc, text }) => {
  return (
    <>
      <div className="text-center p-1 w-fit">
        <img
          src={imgSrc}
          alt="Photo"
          className="cursor-pointer w-60 h-32 border-2 border-solid border-white rounded-2xl p-1 hover:opacity-40"
        />
        <p className="text-[navy] font-projectsTitle capitalize">{text}.</p>
      </div>
    </>
  );
};

export default Card;
