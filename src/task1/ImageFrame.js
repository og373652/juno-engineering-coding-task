import { CircularProgress } from "@mui/material";
import React, {  Fragment, useEffect, useState } from "react";
import { fetchImage } from "../api";

const ImageFrame = ({imageIndex}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [errorWithImage, setErrorWithImage] = useState(false); 

    const init = () => {
        setImageUrl(null);
        setErrorWithImage(false);
    }
    const loadImage = async () => {
        init();
        try {
            const imageUrl = await fetchImage(imageIndex);
            setImageUrl(imageUrl);
        } catch  {
            setErrorWithImage(true);
        }
    };

    useEffect(() => {
        loadImage();
    }, [imageIndex]);

    return (
        <div className="frame" data-testid="imageFrame">
            {errorWithImage ? (
                <p>Error loading this image 😦 try another one using the arrows</p>
            ) : (
                <Fragment>
                <img
                    hidden={!imageUrl}
                    data-testid="image"
                    key={imageIndex}
                    src={imageUrl}
                    alt="not available"
                />
                {!imageUrl && <div className="loader-frame" data-testid="imageLoader"> 
                    <p>Loading image...</p>
                    <CircularProgress data-testid="spinner"/>
                </div>}
                </Fragment>
            )}
        </div>
    )};

export default ImageFrame;
