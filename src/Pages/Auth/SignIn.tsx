import { z } from "zod";
import { FormInput } from "../../components/form/FormInput";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { routerPaths } from "../../constants/routerPaths";
import { useNavigate } from "react-router";
import { PasswordInput } from "../../components/PasswordInput";

export const SignIn = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { t } = useLanguage();
  const loginSchema = z.object({
    email: z.string().email({ message: t("emailInvalid") }),
    password: z.string().min(6, { message: t("passwordMin") }),
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log("Login data:", data);

    try {
      const { email, password } = data;
      console.log("Login data:", data);
      await signIn(email, password).then(() => {
        navigate(routerPaths.default);
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  console.log("Form errors:", form.formState.errors);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">
          {t("welcomeBack")}
        </h3>
        <p className="text-gray-500">{t("loginToAccount")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)} className="space-y-4">
          <FormInput
            name="email"
            label={t("email")}
            placeholder={t("emailPlaceholder")}
          />

          <PasswordInput
            name="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
          />

          <Button className="w-full">Login</Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          {t("noAccount")}{" "}
          <Button
            variant="link"
            type="submit"
            className="p-0"
            onClick={() => navigate(routerPaths.signUp)}
          >
            {t("createAccount")}
          </Button>
        </p>
      </div>
    </div>
  );
};
