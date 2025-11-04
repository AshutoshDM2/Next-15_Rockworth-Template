"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: Math.PI, // Rotate 180 degrees to show the front side
  theta: 0.5,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [13.7563, 100.5018], size: 0.08 },
    { location: [1.3521, 103.8198], size: 0.08 },
    { location: [3.139, 101.6869], size: 0.08 },
    { location: [-6.2088, 106.8456], size: 0.08 },
    { location: [13.41, 122.56], size: 0.08 },
    { location: [14.0583, 108.2772], size: 0.08 },
    { location: [11.55, 104.916], size: 0.08 },
    { location: [21.9162, 95.956], size: 0.08 },
    { location: [19.8563, 102.4955], size: 0.08 },
    { location: [-25.2744, 133.7751], size: 0.08 },
    { location: [35.6762, 139.6503], size: 0.08 },
    { location: [36.5, 127.5], size: 0.08 },
    { location: [23.6978, 120.9605], size: 0.08 },
    { location: [22.3193, 114.1694], size: 0.08 },
    { location: [20.5937, 78.9629], size: 0.08 },
    { location: [7.8731, 80.7718], size: 0.08 },
    { location: [23.685, 90.3563], size: 0.08 },
    { location: [30.3753, 69.3451], size: 0.08 },
    { location: [24.4667, 54.3667], size: 0.08 },
    { location: [21.5126, 55.9233], size: 0.08 },
    { location: [25.276987, 51.520008], size: 0.08 },
    { location: [26.0667, 50.5577], size: 0.08 },
    { location: [24.7136, 46.6753], size: 0.08 },
    { location: [31.9454, 35.9284], size: 0.08 },
    { location: [9.145, 40.4897], size: 0.08 },
    { location: [-20.3484, 57.5522], size: 0.08 },
    { location: [-1.2921, 36.8219], size: 0.08 },
    { location: [12.8628, 30.2176], size: 0.08 },
  ],
};

export default function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const widthRef = useRef(0);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(Math.PI); // Start from the rotated position
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        state.phi = rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[400px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
