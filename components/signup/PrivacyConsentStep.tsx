"use client";

import { Checkbox } from "@heroui/checkbox";
import { Controller, useFormContext } from "react-hook-form";
import { StepContainer } from "./StepContainer";
import { type StepProps, type SignupContext, totalSteps } from "./types";

export function PrivacyConsentStep(props: StepProps) {
  const { history, context, direction, setDirection } = props;

  const {
    control,
    trigger,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<SignupContext>();

  const handleNext = async () => {
    const isValid = await trigger("privacyConsent");
    if (isValid) {
      const privacyConsent = getValues("privacyConsent");
      setDirection("forward");
      history.push("emailInput", {
        ...context,
        privacyConsent,
      });
    }
  };

  return (
    <StepContainer
      currentStep={1}
      totalSteps={totalSteps}
      title="개인정보 수집 및 이용 동의"
      onNext={handleNext}
      showBackButton={false}
      direction={direction}
    >
      <div className="flex flex-col gap-4">
        <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4 max-h-60 overflow-y-auto">
          <div className="text-gray-700 text-xs sm:text-sm space-y-3">
            <p className="font-semibold text-sm sm:text-base">
              개인정보 수집 및 이용에 대한 안내
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>수집 목적:</strong> 사전 등록 및 <br/> 추후 정식 서비스 오픈 시 서비스 제공
              </p>
              <p>
                <strong>수집 항목:</strong> 이름, 이메일, 전화번호, 생년월일,
                성별
              </p>
              <p>
                <strong>보유 기간:</strong> 회원 탈퇴 시까지 또는 관계 법령에 따른
                보존 기간
              </p>
            </div>
            <p className="text-gray-700text-xs">
              귀하는 개인정보 수집 및 이용을 거부할 권리가 있으며, 거부 시
              회원가입이 제한됩니다.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Controller
            name="privacyConsent"
            control={control}
            defaultValue={context.privacyConsent || false}
            render={({ field }) => (
              <Checkbox
                isSelected={field.value || false}
                onValueChange={field.onChange}
                classNames={{
                  base: "backdrop-blur-md bg-white/5 border border-white/20 rounded-lg p-3 m-0 max-w-full hover:bg-white/10 transition-colors",
                  wrapper: "before:border-white/40 after:bg-blue-500",
                  label: "text-white text-sm sm:text-base text-gray-700",
                }}
              >
                개인정보 수집 및 이용에 동의합니다 (필수)
              </Checkbox>
            )}
          />
          {errors.privacyConsent && (
            <p className="text-xs sm:text-sm text-red-300 ml-1">
              {errors.privacyConsent.message}
            </p>
          )}
        </div>
      </div>
    </StepContainer>
  );
}

