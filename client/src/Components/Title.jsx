const Title = ({ imgSrc, quote }) => {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <img
          src={imgSrc}
          alt="Photo"
          className="p-1 w-[290px] h-auto rounded-full border-solid border-2 m-1 bg-red-50"
        />
        <span className="text-sm text-slate-500 font-[serif]">{quote}</span>
      </div>
    </>
  );
};

export default Title;
