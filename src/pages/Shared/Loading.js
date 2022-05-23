import React from "react";

const Loading = () => {
  return (
    <div style={{minHeight: 'calc(100vh - 64px - 100px)'}} className="flex justify-center items-center">
    <div className="flex justify-center">
    <button className="btn loading">loading</button>
    </div>
</div>
  );
};

export default Loading;
