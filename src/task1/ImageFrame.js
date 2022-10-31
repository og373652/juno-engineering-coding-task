import { CircularProgress } from "@mui/material";
import React, {  Fragment, useState } from "react";

const ImageFrame = ({imageUrl}) => {
    const [loaded, setLoaded] = useState(false);
    console.log('imageUrlINFRAME', imageUrl);
    return (
    loaded ? ( <img
        style={loaded ? {} : { display: 'none' }}
        src={imageUrl}
        onLoad={() => setLoaded(true)}
      /> ) :
      <Fragment>
        <p>Loading image...</p>
      <CircularProgress />
      </Fragment>
    );
};
export default ImageFrame;
