import React from 'react';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import {IoIosArrowForward, IoIosArrowBack} from 'react-icons/io';

const buttonStyle = {
  width: '30px',
  background: 'none',
  border: '0px',
  color: 'white',
};
const properties = {
  prevArrow: (
    <button style={{...buttonStyle}}>
      <IoIosArrowBack size={24} />
    </button>
  ),
  nextArrow: (
    <button style={{...buttonStyle}}>
      <IoIosArrowForward size={24} />
    </button>
  ),
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '700px',
  borderRadius: '10px',
};
const slideImages = [
  {
    url: 'https://img.freepik.com/free-psd/sale-banner-template_24972-824.jpg?w=1380&t=st=1689240778~exp=1689241378~hmac=f7c9bd17ae57ff31ccdd94d2af30b21cf1e6016ae2ba8bccae18cc8d041c6a63',
  },
  {
    url: 'https://img.freepik.com/free-vector/new-season-banner-template-with-splash_1361-1527.jpg?w=1060&t=st=1689240779~exp=1689241379~hmac=984361811c8c34a9ffa1b6d7248bfc03fcdbe750c61a28e73b8c641200643773',
  },
  {
    url: 'https://img.freepik.com/free-vector/flat-geometric-fashion-youtube-thumbnail_23-2148918593.jpg?w=1380&t=st=1689240781~exp=1689241381~hmac=32291dbfe0a255c7e9a919d474c55688887073c645147a24ec031982e8605376',
  },
  {
    url: 'https://img.freepik.com/premium-vector/fashion-banner-sale-with-text-effect_92715-89.jpg?w=1060',
  },
];

function Hero() {
  return (
    <div className="py-[5rem]">
      <div className="flex justify-center">
        <div className="w-[97%]">
          <Slide {...properties} transitionDuration={500}>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.url})`,
                  }}></div>
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
}

export default Hero;
