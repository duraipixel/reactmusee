function PreLoader() {
  return (
    <section
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center fixed-top bg-white"
    >
      <img
        src={require("../assets/gif/loader.gif")}
        width={100}
      />
    </section>
  );
}

export default PreLoader;
