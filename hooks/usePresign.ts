import { useMutation } from "@tanstack/react-query";
import { http } from "@/apis";
import type { SignupContext } from "@/components/signup/types";

const usePresign = () => {
  return useMutation({
    mutationFn: (data: SignupContext) => {
      return http("/api/pre-register", {
        method: "POST",
        json: data,
      });
    },
  });
};

export default usePresign;
