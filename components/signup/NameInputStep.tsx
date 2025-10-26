"use client";

import { useState } from "react";
import { StepContainer } from "./StepContainer";
import { StepInput } from "./StepInput";
import { type StepProps, schemas, totalSteps } from "./types";

export function NameInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;
  const [value, setValue] = useState(context.name || "");
  const [error, setError] = useState("");

  const handleNext = () => {
    const result = schemas.name.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setDirection("forward");
    history.push("phoneInput", { ...context, name: value });
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
      <StepInput
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setError("");
        }}
        onKeyPress={(e) => e.key === "Enter" && handleNext()}
        label="이름"
        placeholder="이름을 입력해주세요"
        error={error}
      />
    </StepContainer>
  );
}
