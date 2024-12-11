"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/form-field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";
import DatePicker from "../date-input";

export function EmployeForm() {
  const [nome, setNome] = React.useState("");
  const [sobrenome, setSobrenome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [cargo, setCargo] = React.useState("");
  const [contrato, setContrato] = React.useState("");
  const [dataVencimento, setDataVencimento] = React.useState<Date | null>(null);
  const [endereco, setEndereco] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [estado, setEstado] = React.useState("");

  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email("Invalid email format."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      nome,
      sobrenome,
      email,
      cargo,
      contrato,
      dataVencimento,
      endereco,
      cidade,
      estado,
    };

    try {
      const response = await fetch("http://localhost:3000/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",


        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Funcionário salvo:", data);

        // Resetar o formulário após o sucesso
        setNome("");
        setSobrenome("");
        setEmail("");
        setCargo("");
        setContrato("");
        setDataVencimento: dataVencimento?.toISOString(),
        setEndereco("");
        setCidade("");
        setEstado("");

        alert("Funcionário salvo com sucesso!");
      } else {
        console.error("Erro ao salvar funcionário:", response.statusText);
        alert("Erro ao salvar funcionário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao salvar funcionário.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="self-center w-1/2 flex flex-col p-2 shadow-lg"
      >
        <h1 className="text-2xl font-bold text-gray-500 mb-7">Funcionário</h1>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <Field
              fieldName="nome"
              control={form.control}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite seu nome"
            />
            <Field
              fieldName="sobrenome"
              control={form.control}
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Sobrenome"
            />
          </div>
          <div className="flex flex-col gap-2 my-3">
            <Field
              fieldName="email"
              control={form.control}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex. test@hotmail.com"
            />
            <Field
              fieldName="cargo"
              control={form.control}
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ex. Auxiliar Administrativo"
            />
            <div className="flex flex-row gap-2">
              <Select
                value={contrato}
                onValueChange={(value) => setContrato(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contratado">Contratado</SelectItem>
                  <SelectItem value="desligado">Desligado</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <DatePicker
                label="Data de Vencimento"
                value={dataVencimento} // Estado do componente pai
                onChange={(date) => setDataVencimento(date)} // Atualiza o estado do pai
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Field
            fieldName="endereco"
            control={form.control}
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Endereço completo"
          />
          <Field
            fieldName="cidade"
            control={form.control}
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Cidade"
          />
          <Select value={estado} onValueChange={(value) => setEstado(value)}>
            <SelectTrigger className="w-[180px] text-gray-400 font-semibold">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem  value="AC">Acre</SelectItem>
                    <SelectItem value="AL">Alagoas</SelectItem>
                    <SelectItem value="AP">Amapá</SelectItem>
                    <SelectItem value="AM">Amazonas</SelectItem>
                    <SelectItem value="BA">Bahia</SelectItem>
                    <SelectItem value="CE">Ceará</SelectItem>
                    <SelectItem value="ES">Espírito Santo</SelectItem>
                    <SelectItem value="GO">Goiás</SelectItem>
                    <SelectItem value="MA">Maranhão</SelectItem>
                    <SelectItem value="MT">Mato Grosso</SelectItem>
                    <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                    <SelectItem value="MG">Minas Gerais</SelectItem>
                    <SelectItem value="PA">Pará</SelectItem>
                    <SelectItem value="PB">Paraíba</SelectItem>
                    <SelectItem value="PR">Paraná</SelectItem>
                    <SelectItem value="PE">Pernambuco</SelectItem>
                    <SelectItem value="PI">Piauí</SelectItem>
                    <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                    <SelectItem value="RN">Rio Grande do Norte</SelectItem>
                    <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                    <SelectItem value="RO">Rondônia</SelectItem>
                    <SelectItem value="RR">Roraima</SelectItem>
                    <SelectItem value="SC">Santa Catarina</SelectItem>
                    <SelectItem value="SP">São Paulo</SelectItem>
                    <SelectItem value="SE">Sergipe</SelectItem>
                    <SelectItem value="TO">Tocantins</SelectItem>
                    <SelectItem value="DF">Distrito Federal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-row self-center my-2 gap-2">
          <Button type="submit" className="h-10 w-40 bg-green-700">
            Salvar
          </Button>
          <Button type="button" className="h-10 w-40 bg-red-600">
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
