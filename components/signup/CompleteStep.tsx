"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import type { SignupContext } from "./types";

interface CompleteStepProps {
  context: SignupContext;
}

const phoneNumberFormatter = (phoneNumber: string) => {
  if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  }
  return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export function CompleteStep({ context }: CompleteStepProps) {
  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ gridArea: "1 / 1" }}
      className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-5xl sm:text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
          사전등록 완료!
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
          환영합니다, {context.name}님!
        </p>
        <div className="text-left text-gray-700 space-y-2 mb-6 sm:mb-8 text-sm sm:text-base mx-6">
          <p>📧 {context.email}</p>
          <p>📞 {phoneNumberFormatter(context.phoneNumber || "")}</p>
          <p>📅 {context.birthday}</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          className="w-full backdrop-blur-md bg-white/20 border border-white/30 hover:bg-white/30 text-white font-semibold text-sm sm:text-base"
          size="lg"
        >
          처음으로
        </Button>
      </div>
    </motion.div>
  );
}
