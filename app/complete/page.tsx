"use client";

import { CompleteStep } from "@/components/signup/CompleteStep";

export default function CompletePage() {
  return (
    <>
      {/* Gradient Background Layer - soft pastel tones matching the illustration */}
      <div
        className="fixed inset-0 -z-50"
        style={{
          background:
            "linear-gradient(135deg, #E8F4F8 0%, #D4E4F7 25%, #E5D9F2 50%, #F5E6E8 75%, #FFF4E6 100%)",
        }}
      />

      {/* Main Image Layer - shows full image without cropping */}
      <div
        className="fixed inset-0 bg-cover sm:bg-contain bg-center bg-no-repeat -z-40"
        style={{
          backgroundImage: "url(/background-image.png)",
        }}
      />

      {/* Subtle Overlay - darker at top and bottom for better readability */}
      <div
        className="fixed inset-0 -z-30"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Complete Step */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pb-24 overflow-auto">
        <div className="w-full max-w-lg grid my-auto">
          <CompleteStep />
        </div>
      </div>
    </>
  );
}

