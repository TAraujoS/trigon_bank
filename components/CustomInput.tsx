import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema, formatToCPF, formatToDate } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInoputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}
const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInoputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel>{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                type={name === "password" ? "password" : "text"}
                {...field}
                placeholder={placeholder}
                className="input-class"
                onChange={(e) => {
                  const value = e.target.value;
                  if (name === "cpf") {
                    field.onChange(formatToCPF(value));
                  } else if (name === "dateOfBirth") {
                    field.onChange(formatToDate(value));
                  } else {
                    field.onChange(value);
                  }
                }}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
