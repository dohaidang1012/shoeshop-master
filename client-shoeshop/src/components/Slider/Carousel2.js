import React, { useEffect, useState } from "react";
import "./Carousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ display: "none" }}
      onClick={onClick}
    />
  );
}

function Carousel(props) {
  let { slider, slider1, slider2 } = props;
  const [nav, setNav] = useState({ nav1: null, nav2: null });

  useEffect(() => {
    setNav({
      nav1: slider1,
      nav2: slider2,
    });
  }, []);

  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const next = () => {
    slider1.slickNext();
  };
  const previous = () => {
    slider2.slickPrev();
  };

  return (
    <section id="carousel">
      <div className="carousel">
        <div className="carousel-left">
          <div className="carousel-left-slide">
            <Slider
              asNavFor={nav.nav2}
              ref={(slider) => (slider1 = slider)}
              {...settings}
            >
              <div key={1}>
                <img src="https://res.cloudinary.com/cloudidg/image/upload/v1713520904/Product-Shoe/ctas_cruise_eng_secondary_desktop_iqf9yj.jpg"></img>
              </div>
              <div key={2}>
                <img src="https://res.cloudinary.com/cloudidg/image/upload/v1713520903/Product-Shoe/cruise_ox_eng_secondary_desktop_kbmfbs.jpg"></img>
              </div>
              <div key={3}>
                <img src="https://res.cloudinary.com/cloudidg/image/upload/v1713520903/Product-Shoe/chuck_70_geo_eng_secondary_desktop_b64mp5.jpg"></img>
              </div>
            </Slider>
            <div className="carousel-left-move" onClick={() => previous()}>
              <div className="prev">
                <LeftOutlined></LeftOutlined>
              </div>
              <div className="next" onClick={() => next()}>
                <RightOutlined></RightOutlined>
              </div>
            </div>
          </div>
          <div className="carousel-left-bottom">
            <Slider
              asNavFor={nav.nav1}
              ref={(slider) => (slider2 = slider)}
              slidesToShow={4}
              swipeToSlide={true}
              focusOnSelect={true}
            >
              <div>
                Nike Basketball <br></br> Ưu đãi vô địch
              </div>
              <div>
                Nike Golf <br></br> Hotsale giảm sập sàn
              </div>
              <div>
                Nike Trail <br></br> Giá mới cực tốt
              </div>
              <div>
                Jordan Brand <br></br> Mua đi chờ chi
              </div>
              <div>
                Blazer <br></br> Sale bung nóc
              </div>
            </Slider>
          </div>
        </div>
        {/* <div className="carousel-right">
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/RB_S21.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPhone_12_690x300_copyssspng.png"></img>
          </div>
          <div className="carousel-right-item">
            <img src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/11lite-690-300-max.png"></img>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default Carousel;
