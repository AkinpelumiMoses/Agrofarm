import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function MyCarousel() {
  return (
    <div className="max-w-8xl mx-auto mt-8">
    <Carousel showThumbs={false} infiniteLoop autoPlay>
      <div>
        <img src="https://i.pinimg.com/736x/a8/6d/6f/a86d6fc22e7c33eaac1ccfe8a94916d0.jpg" alt="" />
      </div>
      <div>
        <img src="https://i.pinimg.com/736x/83/5d/bd/835dbde7920c868ae03478a4496566fb.jpg" alt="" />
      </div>
      <div>
        <img src="https://i.pinimg.com/736x/84/5a/40/845a40b96512d8f3fde068586dc16e15.jpg" alt="" />
      </div>

         <div>
        <img src="https://i.pinimg.com/736x/3a/2a/f9/3a2af9464e09743e2c1e92599cc02910.jpg" alt="" />
      </div>

         <div>
        <img src="https://i.pinimg.com/736x/1d/59/e6/1d59e6221573bd07ad687afd3a9a9e02.jpg" alt="" />
      </div>

         <div>
        <img src="https://i.pinimg.com/736x/6a/c9/f1/6ac9f18522bbc28a1e128c330fc7e662.jpg" alt="" />
      </div>
    </Carousel>
    </div>
  );
}


// Note: Ensure that the image paths are correct and accessible in your project setup.
// You may need to adjust the paths based on your project's structure.