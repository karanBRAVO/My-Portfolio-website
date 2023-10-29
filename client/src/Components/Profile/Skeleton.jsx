const Skeleton = () => {
  return (
    <>
      <div className="mx-auto w-32 h-32 rounded-full mb-4 animate-pulse bg-slate-400"></div>
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2">Contact</h2>
        <div className="text-gray-700 font-black pl-3 ml-1 animate-pulse">
          Email
        </div>
      </div>
    </>
  );
};

export default Skeleton;
