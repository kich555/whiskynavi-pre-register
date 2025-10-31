"use client";

import { Tab, Tabs } from "@heroui/tabs";
import { Controller, useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import usePresign from "@/hooks/usePresign";
import { StepContainer } from "./StepContainer";
import { type StepProps, type SignupContext, totalSteps } from "./types";



export function GenderInputStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;
  const { mutate: presign, isPending } = usePresign();
  const router = useRouter();

  const {
    control,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<SignupContext>();
  

  const handleNext = async () => {
    const isValid = await trigger("gender");
    if (isValid) {
      const gender = getValues("gender");
      const birthday = getValues("birthday");
      const finalContext = { ...context, gender };
      presign(finalContext, {
        onSuccess: () => {
          // sessionStorage에 context 저장
          sessionStorage.setItem("signup-data", JSON.stringify(finalContext));
          // /complete 페이지로 이동
          router.push("/complete");
        },
        onError: (error) => {
          setError("gender", {
            type: "manual",
            message: "등록 중 오류가 발생했습니다. 다시 시도해주세요.",
          });
          console.error("Presign error:", error);
        },
      });
    }
  };

  const handleBack = () => {
    setDirection("backward");
    history.back();
  };

  return (
    <StepContainer
      currentStep={6}
      totalSteps={totalSteps}
      title="성별을 선택해주세요"
      onNext={handleNext}
      onBack={handleBack}
      nextButtonText="완료"
      direction={direction}
      isLoading={isPending}
    >
      <div className="flex flex-col gap-2">
        <Controller
          name="gender"
          control={control}
          defaultValue={context.gender || "male"}
          render={({ field }) => (
            <Tabs
              defaultSelectedKey="male"
              selectedKey={field.value || "male"}
              onSelectionChange={(key) => field.onChange(key as string)}
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
          )}
        />
        {errors.gender && (
          <p className="text-xs sm:text-sm text-red-300">
            {errors.gender.message}
          </p>
        )}
      </div>
    </StepContainer>
  );
}
