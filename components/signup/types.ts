import { z } from "zod";

export const schemas = {
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .max(100, "이름은 최대 100자까지 가능합니다"),
  email: z
    .string()
    .email({ message: "올바른 이메일 형식이 아닙니다" })
    .max(100, "이메일은 최대 100자까지 가능합니다"),
  phoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .max(20, "전화번호는 최대 20자까지 가능합니다"),
  birthday: z.string().min(1, "생년월일을 입력해주세요"),
  gender: z.string().min(1, "성별을 선택해주세요"),
};

export type SignupContext = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  gender?: string;
};

export interface StepProps {
  history: { push: (...args: any[]) => void; back: () => void };
  context: SignupContext;
  direction: "forward" | "backward";
  setDirection: (dir: "forward" | "backward") => void;
}

export const totalSteps = 8;
