import error from "../../assets/error.png";

const Error = () => {
  return (
    <div className="container">
      <div className="error-container">
        <p className="error-container__text">Sorry, something went wrong !</p>
        <img src={error} alt="Error-image" />
      </div>
    </div>
  );
};

export default Error;
