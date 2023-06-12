import React from "react";
import { Oval } from "react-loader-spinner";

function CustomLoader() {
  return (
    <Oval
      height={80}
      width={80}
      color="##81688D"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}

export default CustomLoader;