import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "select" | "number";
  selectOptions?: string[];
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
  selectOptions,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="label">{label}</FormLabel>
          {description && (
            <FormDescription className="text-xs text-muted-foreground">
              *{description}
            </FormDescription>
          )}
          {type === "select" ? (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-full rounded-full py-6 px-5 bg-[#27272f]">
                  <SelectValue
                    placeholder={placeholder}
                    className="text-[#d8daef]"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="w-full rounded-2xl">
                {selectOptions?.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="w-full rounded-3xl"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              <Input
                className="input"
                type={type}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
