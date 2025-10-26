"use client";

import { useState } from "react";
import { StepContainer } from "./StepContainer";
import { StepInput } from "./StepInput";
import { type StepProps, schemas, totalSteps } from "./types";

export function EmailInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;
  const [value, setValue] = useState(context.email || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    const result = schemas.email.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setDirection("forward");
    history.push("nameInput", { ...context, email: value });
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  return (
    <StepContainer
      currentStep={1}
      totalSteps={totalSteps}
      title="이메일을 입력해주세요"
      onNext={handleNext}
      onBack={handleBack}
      direction={direction}
    >
      <StepInput
        type="email"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setError("");
        }}
        onKeyPress={(e) => e.key === "Enter" && handleNext()}
        label="이메일"
        placeholder="example@email.com"
        error={error}
      />
    </StepContainer>
  );
}
