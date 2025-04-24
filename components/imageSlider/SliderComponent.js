"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function SliderComponent({ settings, children }) {
  return <Slider {...settings}>{children}</Slider>;
}
