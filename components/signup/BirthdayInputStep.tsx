"use client";

import { InputOtp } from "@heroui/input-otp";
import { Controller, useFormContext } from "react-hook-form";
import { StepContainer } from "./StepContainer";
import { type StepProps, type SignupContext, totalSteps } from "./types";

export function BirthdayInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;

  const {
    control,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<SignupContext>();

  const handleNext = async () => {
    const birthday = getValues("birthday");
    if (!birthday || birthday.length !== 8) {
      setError("birthday", {
        type: "manual",
        message: "생년월일 8자리를 모두 입력해주세요",
      });
      return;
    }

    const isValid = await trigger("birthday");
    if (isValid) {
      // 8자리 숫자를 YYYY-MM-DD 형식으로 변환
      const year = birthday.slice(0, 4);
      const month = birthday.slice(4, 6);
      const day = birthday.slice(6, 8);
      const formattedBirthday = `${year}-${month}-${day}`;

      setDirection("forward");
      history.push("genderInput", {
        ...context,
        birthday: formattedBirthday,
      });
    }
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  // Extract date from context if it exists (format: YYYY-MM-DD)
  const defaultBirthday = context.birthday
    ? context.birthday.replace(/-/g, "")
    : "";

  const segmentClasses =
    "backdrop-blur-md bg-white/5 border border-white/20 text-gray-700 data-[active=true]:border-white/40 text-xs sm:text-sm min-w-8 w-8 h-8 sm:min-w-10 sm:w-10 sm:h-10";

  return (
    <StepContainer
      currentStep={5}
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
        <div>
          <Controller
            name="birthday"
            control={control}
            defaultValue={defaultBirthday}
            render={({ field }) => (
              <InputOtp
                size="md"
                length={8}
                autoFocus={true}
                value={field.value || ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  // 8자리가 모두 입력되면 현재 input blur 처리 후 Next 버튼으로 포커스 이동
                  if (value.length === 8) {
                    // 마지막 input에서 포커스 제거 (blink effect 제거)
                    const activeElement = document.activeElement as HTMLElement;
                    activeElement?.blur();
                  }
                }}
                classNames={{
                  base: "mx-auto",
                  segmentWrapper: "gap-0.5 sm:gap-1",
                  segment: segmentClasses,
                }}
              />
            )}
          />
        </div>
        <div className="flex justify-center gap-2 sm:gap-3 text-white/60 text-[10px] sm:text-xs -mt-1">
          <span>YYYY</span>
          <span>MM</span>
          <span>DD</span>
        </div>
        {errors.birthday && (
          <p className="text-xs sm:text-sm text-red-300">
            {errors.birthday.message}
          </p>
        )}
      </div>
    </StepContainer>
  );
}
