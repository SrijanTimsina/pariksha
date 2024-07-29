import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAd } from "@/utils/AdContext";
import Spinner from "@/utils/Spinner";

export default function BannerAd({ currentPage }) {
  const [adData, setAdData] = useState(null);
  const { adDataPending, getRandomData, cumulativeAdData } = useAd();

  useEffect(() => {
    if (adDataPending || !cumulativeAdData) return;
    const ad = getRandomData();
    setAdData(ad);
  }, [cumulativeAdData, currentPage]);
  if (adDataPending || !adData) return <Spinner />;
  return (
    <>
      {adData && (
        <Link href={adData.link} target="_blank">
          <picture>
            <source media="(max-width: 800px)" srcSet={adData.banner200} />
            <source media="(min-width: 800px)" srcSet={adData.banner100} />
            <Image
              src={adData.banner100}
              alt="New Summit College"
              height={100}
              width={1200}
            />
          </picture>
        </Link>
      )}
    </>
  );
}
