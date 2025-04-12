import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
// import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { ShoppingBasket, Tractor } from "lucide-react";
import { Navbar } from "../../components/NavBar";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Navigate } from "react-router";

export default function AuthPage() {
  const { t } = useLanguage();
  // const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");

  const user = null;

  // Login form schema
  const loginSchema = z.object({
    username: z.string().min(3, { message: t("usernameMin") }),
    password: z.string().min(6, { message: t("passwordMin") }),
  });

  // Register form schema
  const registerSchema = z.object({
    name: z.string().min(3, { message: t("nameMin") }),
    email: z.string().email({ message: t("emailInvalid") }),
    username: z.string().min(3, { message: t("usernameMin") }),
    password: z.string().min(6, { message: t("passwordMin") }),
    role: z.enum(["farmer", "consumer"], {
      required_error: t("roleRequired"),
    }),
  });

  // Initialize forms
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      role: "consumer",
    },
  });

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  // Form submission handlers
  const onLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    // loginMutation.mutate(values);
    console.log("Login values:", values);
  };

  const onRegisterSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log("Register values:", values);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Hero section (left on mobile, right on desktop) */}
              <div className="md:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-8 text-white flex flex-col justify-center md:order-2">
                <h2 className="text-3xl font-bold mb-4">
                  {t("authHeroTitle")}
                </h2>
                <p className="mb-6">{t("authHeroDescription")}</p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit1")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit2")}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-white/20 p-1 rounded-full mr-2 mt-0.5">
                      ✓
                    </span>
                    <span>{t("authBenefit3")}</span>
                  </li>
                </ul>
              </div>

              {/* Auth forms */}
              <div className="md:w-1/2 p-8 md:order-1">
                <Tabs
                  defaultValue="login"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">{t("login")}</TabsTrigger>
                    <TabsTrigger value="register">{t("register")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {t("welcomeBack")}
                        </h3>
                        <p className="text-gray-500">{t("loginToAccount")}</p>
                      </div>

                      <Form {...loginForm}>
                        <form
                          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                          className="space-y-4"
                        >
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("username")}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("usernamePlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("password")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder={t("passwordPlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="w-full">
                            Login
                          </Button>
                        </form>
                      </Form>

                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                          {t("noAccount")}{" "}
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => setActiveTab("register")}
                          >
                            {t("createAccount")}
                          </Button>
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="register">
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
                          <FormField
                            control={registerForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("fullName")}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("fullNamePlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("email")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("username")}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("usernamePlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t("password")}</FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder={t("passwordPlaceholder")}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="role"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>{t("joinAs")}</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 gap-4"
                                  >
                                    <FormItem className="flex flex-col items-center space-y-2 p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 aria-checked:border-primary aria-checked:bg-primary/5">
                                      <FormControl>
                                        <RadioGroupItem
                                          value="farmer"
                                          className="sr-only"
                                        />
                                      </FormControl>
                                      <Tractor className="h-6 w-6 text-amber-700" />
                                      <FormLabel className="font-medium cursor-pointer">
                                        {t("farmer")}
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex flex-col items-center space-y-2 p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 aria-checked:border-primary aria-checked:bg-primary/5">
                                      <FormControl>
                                        <RadioGroupItem
                                          value="consumer"
                                          className="sr-only"
                                        />
                                      </FormControl>
                                      <ShoppingBasket className="h-6 w-6 text-primary" />
                                      <FormLabel className="font-medium cursor-pointer">
                                        {t("consumer")}
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button type="submit" className="w-full">
                            SignUp
                          </Button>
                        </form>
                      </Form>

                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-500">
                          {t("alreadyHaveAccount")}{" "}
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => setActiveTab("login")}
                          >
                            {t("login")}
                          </Button>
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
