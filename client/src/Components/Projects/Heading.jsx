const Heading = ({ count, projectName }) => {
  return (
    <>
      <h1 className="text-3xl font-myBtn text-black font-black">
        #{count} {projectName}
      </h1>
    </>
  );
};

export default Heading;
