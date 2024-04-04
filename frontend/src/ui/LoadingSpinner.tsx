import { FC } from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ fullScreen = true }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
