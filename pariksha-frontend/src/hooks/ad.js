"use client";

import axios from "axios";
import { API_URL } from "./constant.js";

export const getAds = async () => {
  const data = [
    {
      value: {
        banner200:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/SamriddhiCollege/Samriddhi-200",
        banner100:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/SamriddhiCollege/Samriddhi-100",
        link: "https://pariksha.solutions/samriddhi-college/",
        fullPageMobile:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/SamriddhiCollege/Samriddhi-Portrait",
        fullPageDesktop:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/SamriddhiCollege/Samriddhi-Landscape",
      },
      probability: 0.5,
    },
    {
      value: {
        banner200:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NewSummitCollege/NewSummit-200",
        banner100:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NewSummitCollege/NewSummit-100",
        link: "https://pariksha.solutions/new-summit-college",
        fullPageMobile:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NewSummitCollege/NewSummit-Portrait",
        fullPageDesktop:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NewSummitCollege/NewSummit-Landscape",
      },
      probability: 0.25,
    },
    {
      value: {
        banner200:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NCCS/nccs-200",
        banner100:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NCCS/nccs-100",
        link: "https://pariksha.solutions/nccs",
        fullPageMobile:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NCCS/NCCS-Portrait",
        fullPageDesktop:
          "https://res.cloudinary.com/dlcsmu0d3/image/upload/f_auto,q_auto/v1/Pariksha-Ad-Images/NCCS/NCCS-Landscape",
      },
      probability: 0.25,
    },
  ];
  // const { data } = await axios.get(`${API_URL}/ads/getAds`);
  return data;
};
