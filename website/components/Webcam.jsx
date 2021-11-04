import { useRef, useEffect } from "react";

const Webcam = function (props) {
  const videoRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        console.log(stream)
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        props.camStream(stream);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };
  return <video className="w-full h-full" ref={videoRef} />;
};

export default Webcam;
