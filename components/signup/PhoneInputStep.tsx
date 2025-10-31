"use client";

import { Controller, useFormContext } from "react-hook-form";
import { StepContainer } from "./StepContainer";
import { StepInput } from "./StepInput";
import { type StepProps, type SignupContext, totalSteps } from "./types";

export function PhoneInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;

  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<SignupContext>();

  const handleNext = async () => {
    const isValid = await trigger("phoneNumber");
    if (isValid) {
      const phoneNumber = getValues("phoneNumber");
      setDirection("forward");
      history.push("birthdayInput", { ...context, phoneNumber });
    }
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  return (
    <StepContainer
      currentStep={4}
      totalSteps={totalSteps}
      title="전화번호를 입력해주세요"
      onNext={handleNext}
      onBack={handleBack}
      direction={direction}
    >
      <Controller
        name="phoneNumber"
        control={control}
        defaultValue={context.phoneNumber || ""}
        render={({ field }) => (
          <StepInput
            type="tel"
            value={field.value || ""}
            onChange={field.onChange}
            onKeyPress={(e) => e.key === "Enter" && handleNext()}
            label="전화번호"
            placeholder="000-0000-0000"
            error={errors.phoneNumber?.message || ""}
          />
        )}
      />
    </StepContainer>
  );
}
