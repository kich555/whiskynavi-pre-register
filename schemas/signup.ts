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
  birthday: z
    .string()
    .length(8, "생년월일을 8자리로 입력해주세요")
    .refine((val) => /^\d{8}$/.test(val), {
      message: "생년월일은 8자리 숫자여야 합니다",
    })
    .refine(
      (val) => {
        const year = Number.parseInt(val.slice(0, 4));
        const month = Number.parseInt(val.slice(4, 6));
        const day = Number.parseInt(val.slice(6, 8));
        
        // 기본적인 날짜 범위 검증
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        
        // 실제 유효한 날짜인지 검증
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      },
      {
        message: "유효하지 않은 날짜입니다",
      }
    ),
  gender: z.string().refine((val) => val === "male" || val === "female", {
    message: "성별을 선택해주세요",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
