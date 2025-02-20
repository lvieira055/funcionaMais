"use client";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Field } from "@/components/form-field";
import { useSearchParams } from "next/navigation";
import {useEffect, useState } from "react"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

export function EmployeForm() {
  const searchParams = useSearchParams();
  const [id, setId] = useState(searchParams.get("id") || ""); 
  const [nome, setNome] = useState(searchParams.get("nome") || "");
  const [sobrenome, setSobrenome] = useState(searchParams.get("sobrenome") || "");
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [listaCargos, setListaCargos] = useState<Array<any>>([]);
  const [cargo, setCargo] = useState(searchParams.get("cargo") || "");
  const [contrato, setContrato] = useState(searchParams.get("contrato") || "");
  const [dataVencimento, setDataVencimento] = useState<Date>();
  const [date, setDate] = useState<Date>();
  const [endereco, setEndereco] = useState(searchParams.get("endereco") || "");
  const [cidade, setCidade] = useState(searchParams.get("cidade") || "");
  const [estado, setEstado] = useState(searchParams.get("estado") || "");

  const formSchema = z.object({
    nome: z.string().min(2, {
      message: "Nome deve ter pelo menos 2 caracteres.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: nome || "",
    },
  });
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formattedDataVencimento = dataVencimento ? format(dataVencimento, "dd/MM/yyyy") : null;
    const formData = {
      nome,
      sobrenome,
      nomeCompleto: nome + " " + sobrenome,
      email,
      cargo,
      contrato,
      dataVencimento: formattedDataVencimento,
      endereco,
      cidade,
      estado,
    };

    try {
      const url = id ? `http://localhost:3000/funcionarios/${id}` : "http://localhost:3000/funcionarios";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Funcionário salvo ou atualizado:", data);

        setId("");
        setNome("");
        setSobrenome("");
        setEmail("");
        setCargo("");
        setContrato("");
        setDataVencimento(new Date());
        setEndereco("");
        setCidade("");
        setEstado("");

        alert(id ? "Funcionário atualizado com sucesso!" : "Funcionário salvo com sucesso!");
      } else {
        console.error("Erro ao salvar ou atualizar funcionário:", response.statusText);
        alert("Erro ao salvar ou atualizar funcionário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao salvar ou atualizar funcionário.");
    }
  };
  function formateDate(date:string){
    console.log('como chegou '+date);
    if(!date){
      const temp = new Date();
      const temp2 = temp.toLocaleDateString("pt-BR");
      console.log('1 - '+temp2);
      return new Date(temp2);
    }else{
     const listaDate = date.split('/');
     const dia = listaDate[0];
     const mes = listaDate[1];
     const ano = listaDate[2];
     const DataBrasil = mes+'/'+dia+'/'+ano;
     const auxData = new Date(DataBrasil);
     auxData.toLocaleDateString("pt-BR");
      return auxData;
    }
  }


  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/funcionarios/${id}`);
          if (response.ok) {
            const data = await response.json();          
            setId(data.id);
            setNome(data.nome);
            setSobrenome(data.sobrenome);
            setEmail(data.email);
            setCargo(data.cargo);
            setContrato(data.contrato);
            setDataVencimento(formateDate(data.dataVencimento));
            setEndereco(data.endereco);
            setCidade(data.cidade);
            setEstado(data.estado);            
          } else {
            console.error("Erro ao buscar dados do funcionário:", response.statusText);
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      };

      fetchEmployeeData();
    }
    const FetchJobData = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/cargos/`);
        const auxiliaLista = [];
        if (response.ok) {
          const data = await response.json();
          auxiliaLista.push(...data);
          setListaCargos(auxiliaLista); 
          // alert(id ? "Cargo alterado com sucesso!" : "Cargo salvo com sucesso!");

        } else {
          console.error("Erro ao salvar ou atualizar este cargo:", response.statusText);
          alert("Erro ao salvar ou atualizar este cargo.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao salvar ou atualizar este cargo.");
      }
    }
    FetchJobData();

  }, [id])

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="self-center w-full h-full flex flex-col p-2 bg-white rounded-md">
        <div className="flex flex-col">
          <Field
            fieldName="ID"
            disabled={true}
            className="w-20 read-only:*"
            control={form.control}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <div className="flex gap-2">
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
            <div className="flex flex-row gap-2">
              <Select value={cargo}  onValueChange={(e) => setCargo(e)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contratado">Contratado</SelectItem>
                  {/* { listaCargos.map(()=>(
                    
                  ))} */}
                </SelectContent>
              </Select>

            <div className="flex flex-row gap-2">
              <Select value={contrato} onValueChange={(value) => setContrato(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Contrato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contratado">Contratado</SelectItem>
                  <SelectItem value="desligado">Desligado</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !dataVencimento && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dataVencimento ? format(dataVencimento, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dataVencimento}
                    onSelect={setDataVencimento}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
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

interface SectorProps{
  label: string,
  placeholder?: string,
  data?: object,
}
export function FormSector({label, placeholder, data}:SectorProps){
  const setores = ["Administrativo", 'Engenharia','Almoxarifado']
  return (
    <div>
      <Label>{label}</Label>
        <Select>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent>
              {setores.map((setor, index)=>(              
                <SelectItem key={index} value={setor}>{setor}</SelectItem>
              ))};

            </SelectContent>
        </Select>     
      </div>
  );
}
