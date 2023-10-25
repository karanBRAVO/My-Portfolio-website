export default function NoPage() {
  return (
    <>
      <div className="w-full h-[100vh] bg-sky-950 flex items-center justify-center">
        <h1 className="text-3xl text-white font-text">
          [<span className="text-white text-md p-1 bg-red-700 ml-1">!</span>
          <span className="text-black font-bold bg-red-700 text-md mr-1 p-1">
            Error
          </span>
          ]Page not found
        </h1>
      </div>
    </>
  );
}
