"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

type ImageItem = {
  src: string;
  alt?: string;
};

type ImageSliderProps = {
  images: ImageItem[];
  children: React.ReactNode;
  imageProps?: {
    width?: number;
    height?: number;
    className?: string;
  };
  overlay?: React.ReactNode;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
};

export const ImagesSlider = ({
  images,
  children,
  imageProps,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const loadImages = useCallback(() => {
    const loadPromises = images.map((image) => {
      return new Promise<string>((resolve, reject) => {
        const img = new window.Image();
        img.src = image.src;
        img.onload = () => resolve(image.src);
        img.onerror = reject;
      });
    });

    Promise.all(loadPromises)
      .then((loaded) => {
        setLoadedImages(loaded);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 1,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 1,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {areImagesLoaded && children}
      {areImagesLoaded && overlay && (
        <div
          className={cn("absolute inset-0 bg-transparent", overlayClassName)}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="h-full w-full absolute inset-0"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
              width={imageProps?.width || 1000}
              height={imageProps?.height || 1000}
              className={cn(
                "object-cover object-center w-full h-full shadow-lg",
                imageProps?.className
              )}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
