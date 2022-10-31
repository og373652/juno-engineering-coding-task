import styled from 'styled-components';

const ImageCarouselContainer = styled.div`
    .arrow-back {
        position: absolute;
        bottom: 50%;
        width: 50px;
    }
    .arrow-forward {
        position: absolute;
        top: 50%;
        right: 0;
    }
    img {
        max-width:600px;
        max-height:600px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .loader-frame {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        p {
            position: relative;
            bottom: 8px;
            margin: 35px;
            display: inline-block;
        }
    }
    
    
    `;
export default ImageCarouselContainer;
