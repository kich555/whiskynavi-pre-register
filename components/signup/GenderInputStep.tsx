"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { useState } from "react";
import usePresign from "@/hooks/usePresign";
import { StepContainer } from "./StepContainer";
import { type StepProps, schemas, totalSteps } from "./types";

export function GenderInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;
  const [value, setValue] = useState(context.gender || "male");
  const [error, setError] = useState("");
  const { mutate: presign, isPending } = usePresign();

  const handleNext = () => {
    const result = schemas.gender.safeParse(value);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const finalContext = { ...context, gender: value };
    console.log("finalContext", finalContext);
    presign(finalContext, {
      onSuccess: () => {
        setDirection("forward");
        history.push("complete", finalContext);
      },
      onError: (error) => {
        setError("등록 중 오류가 발생했습니다. 다시 시도해주세요.");
        console.error("Presign error:", error);
      },
    });
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  return (
    <StepContainer
      currentStep={5}
      totalSteps={totalSteps}
      title="성별을 선택해주세요"
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="완료"
      direction={direction}
      isLoading={isPending}
    >
      <div className="flex flex-col gap-2">
        <Tabs
          defaultSelectedKey="male"
          selectedKey={value}
          onSelectionChange={(key) => {
            setValue(key as string);
            setError("");
          }}
          classNames={{
            base: "w-full",
            tabList:
              "w-full backdrop-blur-md bg-white/5 border border-white/20 p-1",
            cursor: "backdrop-blur-md bg-white/20",
            tab: "text-white data-[selected=true]:text-white text-sm sm:text-base",
            tabContent: "text-white group-data-[selected=true]:text-white",
          }}
        >
          <Tab key="male" title="남성" />
          <Tab key="female" title="여성" />
        </Tabs>
        {error && <p className="text-xs sm:text-sm text-red-300">{error}</p>}
      </div>
    </StepContainer>
  );
}
