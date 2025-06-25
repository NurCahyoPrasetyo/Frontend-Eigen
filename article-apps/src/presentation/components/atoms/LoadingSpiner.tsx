import React from "react";

const LoadingSpiner: React.FC<{ isShow: boolean }> = ({ isShow }) => {
  if (!isShow) return null;

  return (
    <div className="loading-contnets">
      <div className="spinner" data-testid="spinner" />
    </div>
  );
};

export default LoadingSpiner;
