"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { object, z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { Trash2, Bolt } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  cargo: z.string().min(2, {
    message: "Cargo deve ter mais de 2 caracter.",
  }),
  tipoCargo: z.string().min(2, {
    message: "Tipo cargo deve ter mais de 2 caracter.",
  }),
  vagas: z.number().optional(),
})

export default function ProfileForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLimitChecked, setIsLimitChecked] = useState(false);
  const [id, setId] = useState(searchParams.get("id") || ""); 
  const [cargo, setCargo] = useState(searchParams.get("cargo") || "");
  const [tipoCargo, setTipoCargo] = useState(searchParams.get("tipoCargo") || "");
  const [vagas, setVagas] = useState(searchParams.get("vagas") || "");
  const [listaVagas, setListaVagas] = useState<Array<any>>([]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cargo: "",
      tipoCargo: "",
      vagas: 0,
    },
  });
     
  const handleCheckboxChange = () => {
    setIsLimitChecked(!isLimitChecked);
  };
    
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      cargo,
      tipoCargo,
      vagas,
    };

    try {
      const url = id ? `http://localhost:3000/cargos/${id}` : "http://localhost:3000/cargos";
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
        console.log("Cargo salvo ou atualizado:", data);
        // Limpar os campos
        setId("");
        setCargo("");
        setTipoCargo("");
        setVagas("");

        // Atualiza a lista: remove o cargo com o mesmo id, se existir, e adiciona o cargo atualizado
        const AtualizaLista = listaVagas.filter(c => c.id !== data.id);
        AtualizaLista.push(data);
        setListaVagas(AtualizaLista);

        alert(id ? "Cargo alterado com sucesso!" : "Cargo salvo com sucesso!");
      } else {
        console.error("Erro ao salvar ou atualizar este cargo:", response.statusText);
        alert("Erro ao salvar ou atualizar este cargo.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao salvar ou atualizar este cargo.");
    }
  };

  const alteraCargo = (id:string) => {
    router.push(`/cargos?id=${id}`);
    router.refresh();
  }    

  useEffect(() => {
    const idParam = searchParams.get("id") || "";
    setId(idParam);
    if (idParam) {
      const fetchJobData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/cargos/${idParam}`);
          if (response.ok) {
            const data = await response.json();
            const ajustaLista = [...listaVagas];
            const cargoAlterado: number = ajustaLista.findIndex((cargo) => cargo.id === idParam);
            if(cargoAlterado > -1) {
              ajustaLista.splice(cargoAlterado, 1);
              setListaVagas(ajustaLista);           
            }
            setCargo(data.cargo);    
            setTipoCargo(data.tipoCargo);    
            setVagas(data.vagas);           
            form.reset({ 
              cargo: data.cargo,
              tipoCargo: data.tipoCargo,
              vagas: data.vagas,
            });
            
          } else {
            console.error("Erro ao buscar dados deste cargo:", response.statusText);
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      };
      fetchJobData();
    }
    const fetchAllJobData = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/cargos/`);
        if (response.ok) {
          const allData = await response.json();
          setListaVagas(allData);
        } else {
          console.error("Erro ao buscar dados dos cargos:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    }
    fetchAllJobData();
  }, [searchParams]);  

  return (
    <div className="container flex flex-col h-screen w-4/6">
      <div className="flex flex-col border rounded-lg m-5">
        <div className="flex self-center font-bold mb-10 text-2xl">
          Cargos
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 row-span-1 gap-2 m-2">
            <div className="col-span-1 col-start-2">
              <Label className="font-bold">Cargo</Label>
              <Input placeholder="Nome" value={cargo} name="cargo"
                onChange={(e) => setCargo(e.target.value)}/>
            </div>
            <div className="col-span-1 col-start-3">
              <Label className="font-bold">Tipo Cargo</Label>
              <Select name="tipoCargo" value={tipoCargo} onValueChange={setTipoCargo}>
                <SelectTrigger>
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gerente">Gerente</SelectItem>
                  <SelectItem value="Coordenador">Coordenador</SelectItem>
                  <SelectItem value="Supervisor">Supervisor</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Pleno">Pleno</SelectItem>
                  <SelectItem value="Junior">Junior</SelectItem>
                  <SelectItem value="Assistente">Assistente</SelectItem>
                  <SelectItem value="Auxiliar">Auxiliar</SelectItem>
                  <SelectItem value="Menor Aprendiz">Menor Aprendiz</SelectItem>
                  <SelectItem value="Estagiário">Estagiário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 m-2">
            <div className="grid col-span-1 col-start-2 items-center">
              <div className="flex flex-row items-center">
                <Label className="font-bold mr-2">Limitar vagas?</Label>
                <Checkbox className="mr-2" checked={isLimitChecked} onCheckedChange={(checked) =>
                    setIsLimitChecked(!!checked)}/>
              </div>
            </div>
            <div id="JobLimits" className={`${isLimitChecked ? "visible" : "invisible"}`}>
              <Label className="font-bold">Numero de vagas</Label>
              <Input type="number" placeholder="1" value={vagas}
                onChange={(e) => setVagas(e.target.value)} name="vagas"></Input>
            </div>
          </div>
          <div className="flex self-baseline items-end justify-center gap-2 mb-2">
            <Button type="submit" className="bg-primary">Salvar</Button>
            <Button type="reset" className="bg-destructive">Cancelar</Button>
          </div>
        </form>
      </div>
      {/* Lista de cargos */}
      <div className="flex flex-col border m-5 rounded-lg">
        <div>
          <h1 className="font-bold text-2xl text-center">Lista de cargos</h1>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px] text-stone-800 font-bold">
                  Cargo
                </TableHead>
                <TableHead className="w-[300px] text-stone-800 font-bold">
                  Tipo
                </TableHead>
                <TableHead>
                  Limite de vagas
                </TableHead>
                <TableHead>
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>   
            <TableBody>
              {listaVagas.map((vaga) => (
                <TableRow key={vaga.id}>
                  <TableCell>{vaga.cargo}</TableCell>
                  <TableCell>{vaga.tipoCargo}</TableCell>
                  <TableCell>{vaga.vagas || 0}</TableCell>
                  <TableCell className="flex m-0">
                    <Button variant={"ghost"} className="p-1" onClick={()=>alteraCargo(vaga.id)}><Bolt/></Button>
                    <Button variant={"ghost"} className="p-1"><Trash2/></Button>                          
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> 
        </div>
      </div>
    </div>
  )
}
