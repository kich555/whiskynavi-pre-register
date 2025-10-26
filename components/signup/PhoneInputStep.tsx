"use client";

import { useState } from "react";
import { StepContainer } from "./StepContainer";
import { StepInput } from "./StepInput";
import { type StepProps, schemas, totalSteps } from "./types";

export function PhoneInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;
  const [value, setValue] = useState(context.phoneNumber || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    const result = schemas.phoneNumber.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setDirection("forward");
    history.push("birthdayInput", { ...context, phoneNumber: value });
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  return (
    <StepContainer
      currentStep={3}
      totalSteps={totalSteps}
      title="전화번호를 입력해주세요"
      onNext={handleNext}
      onBack={handleBack}
      direction={direction}
    >
      <StepInput
        type="number"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setError("");
        }}
        onKeyPress={(e) => e.key === "Enter" && handleNext()}
        label="전화번호"
        placeholder="000-0000-0000"
        error={error}
      />
    </StepContainer>
  );
}
