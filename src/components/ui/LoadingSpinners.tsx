import { ThreeDots } from "react-loader-spinner";
import { MagnifyingGlass } from "react-loader-spinner";

const LoadingSpinners = ({ three_dots, magnifying_glass }: any) => {
  return (
    <div className="container">
      <div className="loading-container">
        {three_dots && (
          <ThreeDots
            height="25"
            width={35}
            color="#ccc"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        )}
        {magnifying_glass && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
      </div>
    </div>
  );
};

export default LoadingSpinners;
