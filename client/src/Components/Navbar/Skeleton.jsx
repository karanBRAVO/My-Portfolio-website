const Skeleton = ({ arr = [] }) => {
  return (
    <>
      <div className="p-1 m-1">
        <div className="p-1 m-1 flex items-start justify-center flex-col">
          {arr.map((value, index) => {
            return (
              <div
                key={index}
                className="p-1 m-1 mt-4 bg-slate-700 animate-pulse h-6 rounded-sm"
                style={{width: `${value.name.length * 9}px`}}
              ></div>
            );
          })}
        </div>
        <div className="p-1 m-1 flex items-center justify-center">
          <div className="p-1 m-1 flex items-center justify-center flex-col">
            <div className="w-14 h-14 rounded-lg m-1 bg-slate-700 animate-pulse"></div>
            <div className="p-1 m-1 animate-pulse bg-slate-700 w-24 h-4 rounded-md"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skeleton;
