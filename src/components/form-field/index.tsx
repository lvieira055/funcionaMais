import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

interface FieldProps{
    fieldName: string;
    control: any; 
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: any;
};


export function Field({ fieldName, control,  className, placeholder, value, onChange, disabled }: FieldProps){
    const formSchema = z.object({
        [fieldName]: z.string().min(2, {
          message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least 2 characters.`,
        }),
      })
      const PrimeiraMaiuscula = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
            fieldName: "",
          },
        })

    return(
        <div className="container">
        <Form {...form}>
        <FormField
          control={form.control}
          name={fieldName}
          disabled={disabled}
          render={({ field }) => (
              <FormItem className={className}>
              {/* <FormLabel>{PrimeiraMaiuscula}</FormLabel> */}
              <h3 className="-mb-2 text-gray-400 font-semibold">{PrimeiraMaiuscula}</h3>
              <FormControl>
              <Input
                  placeholder={placeholder}
                  {...field}
                  value={value}
                  onChange={(event) => {
                    field.onChange(event); // Atualiza o estado do react-hook-form
                    onChange?.(event); // Atualiza o estado do componente pai (se definido)
                  }}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display {fieldName}.
                </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
          />
          </Form>
          </div>
    )
}