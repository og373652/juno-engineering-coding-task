import { CircularProgress } from "@mui/material";
import React, {  Fragment, useEffect, useState } from "react";

const ImageFrame = ({imageUrl}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
    }, [imageUrl]);
    const handleLoad = () => {
        setLoaded(true);
    }
    return (
        <div className="frame">
            
        <img
            style={{display: loaded ? 'block' : 'none'}}
            key={imageUrl}
            src={imageUrl}
            onLoad={handleLoad}
            alt="not available"
        /> 
        {!loaded && <div className="loader-frame">
            <p>Loading image...</p>
        <CircularProgress/>
        </div>}
        </div>
    )};
export default ImageFrame;
