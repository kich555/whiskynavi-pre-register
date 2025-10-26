"use client";

import { InputOtp } from "@heroui/input-otp";
import { useEffect, useRef, useState } from "react";
import { StepContainer } from "./StepContainer";
import { type StepProps, schemas, totalSteps } from "./types";

const formatDateWithDash = (dateStr: string) => {
  if (!/^\d{8}$/.test(dateStr)) {
    throw new Error("입력은 8자리 숫자여야 합니다. 예: 19950802");
  }
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return `${year}-${month}-${day}`;
};

export function BirthdayInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;

  const [value, setValue] = useState(context.birthday || "");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트되면 첫 번째 input에 포커스
    const timer = setTimeout(() => {
      const firstInput = inputRef.current?.querySelector("input");
      firstInput?.focus();
    }, 300); // 애니메이션 완료 후 포커스

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    const result = schemas.birthday.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    if (value.length !== 8) {
      setError("생년월일 8자리를 모두 입력해주세요");
      return;
    }
    try {
      const formattedDate = formatDateWithDash(value);
      setDirection("forward");
      history.push("genderInput", {
        ...context,
        birthday: formattedDate,
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  const segmentClasses =
    "backdrop-blur-md bg-white/5 border border-white/20 text-gray-700 data-[active=true]:border-white/40 text-xs sm:text-sm min-w-8 w-8 h-8 sm:min-w-10 sm:w-10 sm:h-10";

  return (
    <StepContainer
      currentStep={4}
      totalSteps={totalSteps}
      title="생년월일을 입력해주세요"
      onNext={handleNext}
      onBack={handleBack}
      direction={direction}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="birthday" className="text-xs sm:text-sm text-white/90">
          생년월일
        </label>
        <div ref={inputRef}>
          <InputOtp
            size="md"
            length={8}
            value={value}
            onValueChange={(val) => {
              setValue(val);
              setError("");
            }}
            classNames={{
              base: "mx-auto",
              segmentWrapper: "gap-0.5 sm:gap-1",
              segment: segmentClasses,
            }}
          />
        </div>
        <div className="flex justify-center gap-2 sm:gap-3 text-white/60 text-[10px] sm:text-xs -mt-1">
          <span>YYYY</span>
          <span>MM</span>
          <span>DD</span>
        </div>
        {error && <p className="text-xs sm:text-sm text-red-300">{error}</p>}
      </div>
    </StepContainer>
  );
}
