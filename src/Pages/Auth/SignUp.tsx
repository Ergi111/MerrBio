import { useForm } from "react-hook-form";
import { Form } from "../../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UserRoleEnum } from "../../types/user";
import { useLanguage } from "../../context/LanguageContext";
import { FormInput } from "../../components/form/FormInput";
import { Button } from "../../components/ui/button";
import { FormRadioRole } from "../../components/form/FormRadioRole";
import { useRegisterUser } from "../../services/useRegisterUser";
import { PasswordInput } from "../../components/PasswordInput";
import { toast } from "sonner";
import { routerPaths } from "../../constants/routerPaths";
import { useNavigate } from "react-router";

export const SignUp = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { register, loading } = useRegisterUser();

  const registerSchema = z
    .object({
      fullName: z.string().min(3, { message: t("nameMin") }),
      email: z.string().email({ message: t("emailInvalid") }),
      password: z
        .string()
        .min(6, "Password should be at least 6 characters")
        .max(20, "Password should be at most 20 characters")
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
      confirmPassword: z.string(),
      role: z.nativeEnum(UserRoleEnum, {
        required_error: t("roleRequired"),
      }),
    })
    .superRefine((data, ctx) => {
      const { confirmPassword, password } = data;

      if (!password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Password is required.`,
          path: ["password"],
        });
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Passwords do not match.`,
          path: ["confirmPassword"],
        });
      }
    });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRoleEnum.USER,
    },
  });
  const onRegisterSubmit = (data: z.infer<typeof registerSchema>) => {
    const { fullName, email, password, role } = data;
    register(email, password, fullName, role)
      .then(() => {
        toast.success("User registered successfully");
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  console.log(registerForm.getValues());

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          {t("createAccount")}
        </h3>
        <p className="text-gray-500">{t("joinCommunity")}</p>
      </div>

      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="space-y-4"
        >
          <FormInput
            name="fullName"
            label={t("fullName")}
            placeholder={t("fullNamePlaceholder")}
          />
          <FormInput
            name="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
          />

          <PasswordInput
            name="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            showStrengthPopup
          />

          <PasswordInput
            name="confirmPassword"
            label={t("confirmPassword")}
            placeholder={t("confirmPasswordPlaceholder")}
          />

          <FormRadioRole />

          <Button type="submit" className="w-full">
            SignUp
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          {t("alreadyHaveAccount")}{" "}
          <Button
            disabled={loading}
            variant="link"
            className="p-0"
            onClick={() => navigate(routerPaths.signUp)}
          >
            {t("login")}
          </Button>
        </p>
      </div>
    </div>
  );
};
