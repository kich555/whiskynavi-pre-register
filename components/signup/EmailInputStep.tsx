"use client";

import { Controller, useFormContext } from "react-hook-form";
import { StepContainer } from "./StepContainer";
import { StepInput } from "./StepInput";
import { type StepProps, type SignupContext, totalSteps } from "./types";

export function EmailInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;

  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<SignupContext>();

  const handleNext = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      const email = getValues("email");
      setDirection("forward");
      history.push("nameInput", { ...context, email });
    }
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  return (
    <StepContainer
      currentStep={2}
      totalSteps={totalSteps}
      title="이메일을 입력해주세요"
      onNext={handleNext}
      onBack={handleBack}
      direction={direction}
    >
      <Controller
        name="email"
        control={control}
        defaultValue={context.email || ""}
        render={({ field }) => (
          <StepInput
            type="email"
            value={field.value || ""}
            onChange={field.onChange}
            onKeyPress={(e) => e.key === "Enter" && handleNext()}
            label="이메일"
            placeholder="example@email.com"
            error={errors.email?.message || ""}
          />
        )}
      />
    </StepContainer>
  );
}
