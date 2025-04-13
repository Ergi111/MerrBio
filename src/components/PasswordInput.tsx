import { FC, InputHTMLAttributes, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { CheckIcon, DotIcon, Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cn } from "../lib/utils";

const checks = [
  { regex: /.{8,}/, weight: 0.25, message: "A minimum of 8 characters" },
  {
    regex: /[A-Z]/,
    weight: 0.25,
    message: "At least one uppercase letter (A-Z)",
  },
  { regex: /\d/, weight: 0.25, message: "At least one number" },
  {
    regex: /[!@#$%^&*]/,
    weight: 0.25,
    message: "At least one special character (i.e. !@#$%^&*)",
  },
];

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showStrengthPopup?: boolean;
  name: string;
  label?: string;
}

const getStrengthColor = (strength: string) => {
  switch (strength) {
    case "Weak":
      return "text-red-500"; // Red color for "Weak"
    case "Fair":
      return "text-yellow-500"; // Yellow color for "Fair"
    case "Good":
      return "text-green-500"; // Green color for "Good"
    case "Strong":
      return "text-blue-500"; // Blue color for "Strong"
    default:
      return "text-gray-500"; // Default color for an unknown strength
  }
};
export const PasswordInput: FC<PasswordInputProps> = ({
  showStrengthPopup = false,
  label,
  ...props
}) => {
  const { control } = useFormContext();
  const [showPopUp, setShowPopUp] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // const inputClassNames = passwordInputVariants({
  //   color,
  //   full,
  //   class: `${className} rounded-lg`,
  // });
  const password = useWatch({ control, name: props.name });

  const totalWeight = checks.reduce((total, check) => total + check.weight, 0);
  const passedWeight = checks.reduce((total, check) => {
    return check.regex.test(password) ? total + check.weight : total;
  }, 0);
  const strength = (passedWeight / totalWeight) * 100;

  const strengthLabel = useMemo(() => {
    if (passedWeight === 0.25) {
      return "Weak";
    } else if (passedWeight === 0.5) {
      return "Fair";
    } else if (passedWeight === 0.75) {
      return "Good";
    } else if (passedWeight === 1) {
      return "Strong";
    } else {
      return "";
    }
  }, [passedWeight]);

  return (
    <FormField
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <TooltipProvider>
              <Tooltip open={showPopUp}>
                <div className="relative rounded-lg border shadow-sm border-gray-300 shadow-[rgba(16, 24, 40, 0.05)] w-full">
                  <TooltipTrigger type="button" className="w-full flex">
                    <Input
                      type={isVisible ? "text" : "password"}
                      className={` w-full pr-12 border-none`}
                      {...field}
                      {...props}
                      onFocus={() => setShowPopUp(true)}
                      onBlur={() => setShowPopUp(false)}
                    />
                  </TooltipTrigger>
                  <button
                    className="absolute inset-y-0 right-2 px-3 flex items-center justify-center focus:outline-none cursor-pointer "
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <Eye
                        size={20}
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    ) : (
                      <EyeOff
                        size={20}
                        className="text-2xl text-default-400 pointer-events-none"
                      />
                    )}
                  </button>
                  {showStrengthPopup && (
                    <TooltipContent
                      side="right"
                      sideOffset={20}
                      className="bg-white border"
                    >
                      <div className="px-4 py-5 space-y-3">
                        <p className="text-md text-gray-700 font-medium">
                          Your password must have:
                        </p>
                        <ul>
                          {checks.map((check, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-3 text-sm text-gray-600 py-1"
                            >
                              {check.regex.test(password) ? (
                                <CheckIcon />
                              ) : (
                                <DotIcon />
                              )}
                              {check.message}
                            </li>
                          ))}
                        </ul>
                        <div className="space-y-3 text-black">
                          <div className="flex flex-row">
                            <p>Strength: </p>
                            <p
                              className={cn(
                                "font-semibold",
                                getStrengthColor(strengthLabel)
                              )}
                            >
                              &nbsp;
                              {strengthLabel}
                            </p>
                          </div>
                          <Progress value={strength} />
                        </div>
                      </div>
                    </TooltipContent>
                  )}
                </div>
              </Tooltip>
            </TooltipProvider>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
