import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import YouTube from 'react-youtube'

const imgPath = '/images/home/'
const CarouselList = [
  {
    img: 'carousel1',
    // content: 'Legend 1',
  },
  {
    img: 'carousel2',
    // content: 'Legend 1',
  },
  {
    img: 'carousel3',
    // content: 'Legend 1',
  },
]
export default function Home() {
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }
  const onReady = (e) => {
    e.target.pauseVideo()
  }
  return (
    <>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showThumbs={false}
        showStatus={false}>
        {CarouselList.map((item) => (
          <div key={item.img}>
            <Image
              width={900}
              height={400}
              src={`${imgPath}${item.img}.jpeg`} />
          </div>
        ))}
      </Carousel>
      <YouTube videoId="Y4ZhMXEy-Pw" opts={opts} onReady={onReady} />
    </>
  )
}
