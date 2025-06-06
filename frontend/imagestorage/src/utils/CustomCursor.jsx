import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

 const variants = {
  default: {
    x: mousePosition.x + 4,
    y: mousePosition.y + 4,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};


  return (
    <motion.div
      variants={variants}
      animate="default"
      className="absolute cursor bg-red-800 h-8 w-8 rounded-full top-0 left-0 pointer-events-none "
    ></motion.div>
  );
}

export default CustomCursor;
