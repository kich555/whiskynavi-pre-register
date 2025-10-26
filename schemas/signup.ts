import { z } from "zod";

export const signupSchema = z.object({
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
    .min(10, "전화번호를 입력해주세요")
    .max(12, "전화번호는 최대 12자까지 가능합니다"),
  birthday: z.string().length(8, "생년월일을 8자리로 입력해주세요"),
  gender: z.string().refine((val) => val === "male" || val === "female", {
    message: "성별을 선택해주세요",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
