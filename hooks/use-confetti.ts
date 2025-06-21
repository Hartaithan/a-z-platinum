"use client";

import { sleep } from "@/utils/async";
import type confetti from "canvas-confetti";
import { useCallback, useEffect, useRef } from "react";

const delay = 1000;
const duration = 15 * 1000;
const animationEnd = Date.now() + duration;

const options = {
  fire: { particleCount: 100, spread: 70, origin: { y: 0.6 } },
  fireworks: { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 },
};

const randomRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const useConfetti = () => {
  const confettiRef = useRef<typeof confetti | null>(null);

  const fire = useCallback(() => {
    if (!confettiRef.current) return;
    confettiRef.current(options.fire);
  }, []);

  const fireworks = useCallback(() => {
    if (!confettiRef.current) return;
    const interval = setInterval(function () {
      if (!confettiRef.current) return clearInterval(interval);
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 50 * (timeLeft / duration);
      const y = Math.random() - 0.2;
      confettiRef.current({
        ...options.fireworks,
        particleCount,
        origin: { x: randomRange(0.1, 0.3), y },
      });
      confettiRef.current({
        ...options.fireworks,
        particleCount,
        origin: { x: randomRange(0.7, 0.9), y },
      });
    }, 250);
  }, []);

  useEffect(() => {
    const preload = async () => {
      try {
        console.info("starting to load confetti library...");
        await sleep(delay);
        const { default: confetti } = await import("canvas-confetti");
        confettiRef.current = confetti;
        console.info("confetti library successfully loaded");
      } catch (error) {
        console.error("unable to load confetti", error);
      }
    };
    preload();
  }, []);

  return { fire, fireworks };
};

export default useConfetti;
