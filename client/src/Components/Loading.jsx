const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <div className="text-white text-3xl font-text animate-ping absolute">
          Loading...
        </div>
      </div>
    </>
  );
};

export default Loading;
