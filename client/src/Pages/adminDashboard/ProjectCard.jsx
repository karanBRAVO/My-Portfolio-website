const ProjectCard = ({ id, createdAt, updatedAt, name }) => {
  return (
    <div className="bg-teal-900 p-3 rounded-lg flex flex-col w-fit max-w-xl items-start">
      <h1 className="text-white text-3xl font-black p-1 m-1">{name}</h1>
      <div className="text-white text-sm flex items-start flex-col mt-4 mx-5 font-mySubTitle">
        <p className="mt-1">
          <span className="font-black">ID :</span> {id}
        </p>
        <p className="mt-1">
          <span className="font-black">Created At :</span> {createdAt}
        </p>
        <p className="mt-1">
          <span className="font-black">Updated At :</span> {updatedAt}
        </p>
      </div>
      <div className="m-1 mt-3">
        <button
          type="button"
          className="px-3 py-2 rounded-md text-white bg-teal-400 m-1 hover:bg-teal-700 font-text"
        >
          Update
        </button>
        <button
          type="button"
          className="px-3 py-2 rounded-md text-white bg-red-400 m-1 hover:bg-red-700 font-text"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
