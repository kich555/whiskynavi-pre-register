"use client";

import { useFunnel } from "@use-funnel/browser";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BirthdayInputStep } from "@/components/signup/BirthdayInputStep";
import { EmailInputStep } from "@/components/signup/EmailInputStep";
import { GenderInputStep } from "@/components/signup/GenderInputStep";
import { NameInputStep } from "@/components/signup/NameInputStep";
import { PhoneInputStep } from "@/components/signup/PhoneInputStep";
import { PrivacyConsentStep } from "@/components/signup/PrivacyConsentStep";
import {
  signupFormSchema,
  type SignupContext,
} from "@/components/signup/types";

const SignUpFunnel = () => {
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const methods = useForm<SignupContext>({
    resolver: zodResolver(signupFormSchema),
    mode: "onChange",
  });

  const funnel = useFunnel<{
    privacyConsent: SignupContext;
    emailInput: SignupContext;
    nameInput: SignupContext;
    phoneInput: SignupContext;
    birthdayInput: SignupContext;
    genderInput: SignupContext;
  }>({
    id: "signup-funnel",
    initial: {
      step: "privacyConsent",
      context: {},
    },
  });
  return (
    <FormProvider {...methods}>
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

      {/* Signup Funnel */}
      <div className="fixed inset-0 flex items-center justify-center p-4 pb-24 overflow-auto">
        <div className="w-full max-w-lg grid my-auto">
          <AnimatePresence initial={false}>
            <funnel.Render
              privacyConsent={(props) => (
                <PrivacyConsentStep
                  {...props}
                  direction={direction}
                  setDirection={setDirection}
                />
              )}
              emailInput={(props) => (
                <EmailInputStep
                  {...props}
                  direction={direction}
                  setDirection={setDirection}
                />
              )}
              nameInput={(props) => (
                <NameInputStep
                  {...props}
                  direction={direction}
                  setDirection={setDirection}
                />
              )}
              phoneInput={(props) => (
                <PhoneInputStep
                  {...props}
                  direction={direction}
                  setDirection={setDirection}
                />
              )}
              birthdayInput={(props) => (
                <BirthdayInputStep
                  {...props}
                  direction={direction}
                  setDirection={setDirection}
                />
              )}
              genderInput={(props) => (
                <GenderInputStep
                  {...props}
                  direction={direction}
                  setDirection={setDirection}
                />
              )}
            />
          </AnimatePresence>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUpFunnel;
