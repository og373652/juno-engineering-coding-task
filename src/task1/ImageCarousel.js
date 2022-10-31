import React, { Fragment, useEffect, useState } from "react";
import { fetchImage, fetchImageUrls } from "../api/index";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImageFrame from "./ImageFrame";
import ImageCarouselContainer from "./styled";

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

    const updateImageUrls = async () => {
        const imageUrls = await fetchImageUrls();
        setImageUrls(imageUrls);
    }
    useEffect(() => {
        updateImageUrls();
    }, []);

    return (
    <ImageCarouselContainer>
        <ArrowBackIcon className="arrow-back" onClick={() => handleMoveImage(MOVEMENT_DIRECTIONS.BACK)}/>
        <ImageFrame imageUrl={imageUrls[imageIndex]} />
        <ArrowForwardIcon className="arrow-forward" onClick={() => handleMoveImage(MOVEMENT_DIRECTIONS.FORWARD)} />
    </ImageCarouselContainer> 
    );
};
export default ImageCarousel;
