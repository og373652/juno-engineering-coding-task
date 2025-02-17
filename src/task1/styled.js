import styled from 'styled-components';

const ImageCarouselContainer = styled.div`
    .arrow-back {
        position: absolute;
        bottom: 50%;
        left: 0;
    }
    .arrow-forward {
        position: absolute;
        top: 50%;
        right: 0;
    } 
    .empty-carousel {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        p {
            font-size: 20px;
            font-weight: bold;
            display: inline-block;
            margin-right: 15px;
        }
    }
    
    .frame {
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
        img {
            max-width:600px;
            max-height:600px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }    
`;
export default ImageCarouselContainer;
