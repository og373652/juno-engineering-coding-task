import { CircularProgress } from "@mui/material";
import React, {  useEffect, useState } from "react";
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
        <div className="frame">
            {errorWithImage ? (
                <p>Error loading this image 😦 try another one using the arrows</p>
            ) : 
            imageUrl ? 
                <img
                    key={imageIndex}
                    src={imageUrl}
                    alt="not available"
                />
                : (
                <div className="loader-frame">
                    <p>Loading image...</p>
                    <CircularProgress/>
                </div>
            ) }
        </div>
    )};

export default ImageFrame;
