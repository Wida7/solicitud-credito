import { InfiniteSlider } from "@/components/ui/infinite-slider";
import Image from "next/image";

function InfiniteSliderMol() {

  const CLIENTS = [
    { src: "https://motion-primitives.com/apple_music_logo.svg", alt: "Apple Music" },
    { src: "https://motion-primitives.com/chrome_logo.svg", alt: "Chrome" },
    { src: "https://motion-primitives.com/strava_logo.svg", alt: "Strava" },
    { src: "https://motion-primitives.com/nintendo_logo.svg", alt: "Nintendo" },
    { src: "https://motion-primitives.com/jquery_logo.svg", alt: "Jquery" },
    { src: "https://motion-primitives.com/prada_logo.svg", alt: "Prada" },
  ];

  const LOOP = [...CLIENTS, ...CLIENTS];

  return (
    <InfiniteSlider gap={100} reverse className="w-full h-full bg-white flex min-w-full justify-around">
      {LOOP.map((logo, i) => (
        <Image
        key={i}
        src={logo.src}
        alt={logo.alt}
        width={120}
        height={120}
        className="size-30"
        unoptimized
        />
      ))}
    </InfiniteSlider>
  );
}

export default InfiniteSliderMol;

