"use client";

import { Controller, useFormContext } from "react-hook-form";
import { StepContainer } from "./StepContainer";
import { StepInput } from "./StepInput";
import { type StepProps, type SignupContext, totalSteps } from "./types";

export function NameInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;

  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<SignupContext>();

  const handleNext = async () => {
    const isValid = await trigger("name");
    if (isValid) {
      const name = getValues("name");
      setDirection("forward");
      history.push("phoneInput", { ...context, name });
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
      title="이름을 입력해주세요"
      onNext={handleNext}
      onBack={handleBack}
      direction={direction}
    >
      <Controller
        name="name"
        control={control}
        defaultValue={context.name || ""}
        render={({ field }) => (
          <StepInput
            value={field.value || ""}
            onChange={field.onChange}
            onKeyPress={(e) => e.key === "Enter" && handleNext()}
            label="이름"
            placeholder="이름을 입력해주세요"
            error={errors.name?.message || ""}
          />
        )}
      />
    </StepContainer>
  );
}
