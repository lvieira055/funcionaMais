"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/form-field"; 

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "../date-input";
import { Label } from "@radix-ui/react-label";


// Define o esquema de validação usando Zod
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email format."),
});

export function EmployeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col border-2 p-2">
        <div className="flex flex-row gap-2 self-baseline">
          <Field fieldName="nome" control={form.control} placeholder="Digite seu nome" />
          <Field fieldName="sobrenome" control={form.control} placeholder="Sobrenome"/>
        </div>
        <div className="flex flex-col max-w-2xl gap-2 my-2">      
          <Field fieldName="email" control={form.control}  placeholder="Ex. test@hotmail.com"/>
          <Field fieldName="cargo" control={form.control} placeholder="Ex. Auxiliar Administrativo"/>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Contratado</SelectItem>
              <SelectItem value="dark">Desligado</SelectItem>
              <SelectItem value="system">Outro</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flow-col items-center">
              <DatePicker/>
              <h3 className="absolute left-16">Vencimento Aso</h3>
          </div>
        </div>
          <div className="flex flex-row self-center my-2">
            <Button type="submit" className="h-10 w-40 bg-green-700">Salvar</Button>
            <Button type="submit" className="h-10 w-40 bg-red-600">Cancelar</Button>
          </div>
      </form>
    </Form>
  );
}
