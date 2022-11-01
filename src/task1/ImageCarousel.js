import React, { Fragment, useEffect, useState } from "react";
import { fetchImageUrls } from "../api/index";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageFrame from "./ImageFrame";
import ImageCarouselContainer from "./styled";
import { CircularProgress } from "@mui/material";

const MOVEMENT_DIRECTIONS = {
    BACK: 'back',
    FORWARD: 'forward',
};
const MOVEMENTS_TO_UPDATE_MAP = {
    [MOVEMENT_DIRECTIONS.FORWARD]: 1,
    [MOVEMENT_DIRECTIONS.BACK]: -1,
}

const ImageCarousel = (props) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);
    const handleMoveImage = (movementDirection) => {
        setImageIndex((oldImageIndex) => {
            let newIndex = oldImageIndex + MOVEMENTS_TO_UPDATE_MAP[movementDirection];
            if(newIndex < 0) {
                newIndex = imageUrls.length - 1;
            } 
            if(newIndex >= imageUrls.length) {
                newIndex = 0;
            }
            return newIndex;
        })
    };

    const fetchUrls = async () => {
        const imageUrls = await fetchImageUrls();
        setImageUrls(imageUrls);
    }
    useEffect(() => {
        fetchUrls();
    }, []);

    return (
    <ImageCarouselContainer>
        {imageUrls.length > 0 ? ( 
        <Fragment>
        <ArrowBackIcon className="arrow-back" onClick={() => handleMoveImage(MOVEMENT_DIRECTIONS.BACK)} data-testid="arrowBack"/>
        <ImageFrame imageIndex={imageIndex} />
        <ArrowForwardIcon className="arrow-forward" onClick={() => handleMoveImage(MOVEMENT_DIRECTIONS.FORWARD)} data-testid="arrowForward"/>
        </Fragment>
        ) : (
        <div className="empty-carousel" data-testid="emptyCarousel">
            <p>Loading the carousel, We are working on it... 🎠</p>
            <CircularProgress />
        </div>
        )}
    </ImageCarouselContainer> 
    );
}
export default ImageCarousel;
