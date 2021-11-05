import { useRef, useEffect } from "react";

const Webcam = function (props) {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
    setInterval(() => {
      props.camStream(videoRef.current);
    }, 1000/30);
  }, [videoRef]);

  const getVideo = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msgGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then((stream) => {
          console.log(stream);
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.error("error:", err);
        });
    }
    console.log("getvideo");
  };
  return <video className="w-full h-full" ref={videoRef} />;
};

export default Webcam;
