"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import type { ReactNode, RefObject } from "react";

interface StepContainerProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  showBackButton?: boolean;
  direction?: "forward" | "backward";
  isLoading?: boolean;
  nextButtonRef?: RefObject<HTMLButtonElement>;
}

export function StepContainer({
  currentStep,
  totalSteps,
  title,
  children,
  onNext,
  onBack,
  nextButtonText = "다음",
  showBackButton = true,
  direction = "forward",
  isLoading = false,
  nextButtonRef,
}: StepContainerProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const slideDistance = isMobile ? 100 : 300;

  const mobileVariants = {
    enter: {
      x: direction === "forward" ? slideDistance : -slideDistance,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === "forward" ? -slideDistance : slideDistance,
      opacity: 0,
    },
  };

  return (
    <motion.div
      key={currentStep}
      variants={mobileVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ gridArea: "1 / 1" }}
      className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8"
    >
      <div className="text-gray-700 text-xs sm:text-sm mb-2">
        {currentStep}/{totalSteps}
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 sm:mb-8">
        {title}
      </h1>

      {children}

      <div className="flex gap-2 sm:gap-3 mt-6">
        {showBackButton && onBack && (
          <Button
            type="button"
            onClick={onBack}
            variant="bordered"
            className="backdrop-blur-md bg-white/5 border-white/30 text-white text-sm sm:text-base"
            size="lg"
          >
            이전
          </Button>
        )}
        <Button
          ref={nextButtonRef}
          type="button"
          onClick={onNext}
          className="flex-1 backdrop-blur-md bg-black/30 border border-white/30 hover:bg-white/30 text-white font-semibold text-sm sm:text-base"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading}
        >
          {nextButtonText}
        </Button>
      </div>
    </motion.div>
  );
}
