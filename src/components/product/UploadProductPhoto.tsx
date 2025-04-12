import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel } from "../ui/form";

export const UploadProductPhoto = () => {
  const { control } = useFormContext();
  return (
    <FormField
      name="imageUrl"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Upload Product Photo</FormLabel>
        </FormItem>
      )}
    />
  );
};
