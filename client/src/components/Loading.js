import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <ReactLoading
        type={"spin"}
        color={"#06b6d4"}
        height={"100px"}
        width={"100px"}
      />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
