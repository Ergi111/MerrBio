import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useLanguage } from "../../context/LanguageContext";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ShoppingBasket, Tractor } from "lucide-react";
import { UserRoleEnum } from "../../types/user";
import { cn } from "../../lib/utils";

export const FormRadioRole = () => {
  const { t } = useLanguage();
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="role"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{t("joinAs")}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  value: UserRoleEnum.FARMER,
                  label: t("farmer"),
                  icon: <Tractor className="h-6 w-6 text-amber-700" />,
                },
                {
                  value: UserRoleEnum.USER,
                  label: t("consumer"),
                  icon: <ShoppingBasket className="h-6 w-6 text-primary" />,
                },
              ].map(({ value, label, icon }) => (
                <label
                  key={value}
                  htmlFor={value}
                  className={cn(
                    "peer-checked:border-primary peer-checked:bg-primary/5 flex flex-col items-center space-y-2 p-4 border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors",
                    value === field.value && "border-primary"
                  )}
                >
                  <RadioGroupItem
                    id={value}
                    value={value}
                    className="sr-only peer"
                  />
                  {icon}
                  <span className="font-medium">{label}</span>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
