"use client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import ActionButton from "./actionButton";
import { useRouter } from "next/navigation";


export function CustomTable() {
  const router = useRouter();
  const [listaFuncionarios, setListaFuncionarios] = useState<Array<any>>([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<object>();
  const props = ["nomeCompleto", "cargo", "contrato", "dataVencimento"];

  // Função para buscar os dados
  const fetchFuncionarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/funcionarios");
      if (!res.ok) {
        throw new Error(`Erro ao buscar funcionários: ${res.statusText}`);
      }
      const data = await res.json();
      setListaFuncionarios(data);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const redirecionarCadastro = (id:string) => {
    router.push(`/cadastro?id=${id}`);
  };

  async function deleteFuncionario(id:string) {
    if(!id){
      alert("ID não encontrado")
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/funcionarios/${id}`, {
        method:"DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Funcionário excluído com sucesso!");
        fetchFuncionarios();

      } else {
        alert("Erro ao excluir funcionário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao excluir funcionário.");
    }
  };

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  return (
        <div className="container w-full flex items-center border-2 rounded-xl overflow-hidden">
            <Table>
            <TableCaption>Uma lista de seus funcionários.</TableCaption>
            <TableHeader>
                <TableRow className="text-nowrap">
                {props.map((column, index) => (
                    <TableHead
                    key={index}
                    className="w-[300px] text-stone-800 font-bold"
                    >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                    </TableHead>
                ))}
                <TableHead className="text-stone-800 font-bold">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listaFuncionarios.map((funcionario, index) => (
                    <TableRow key={index}>
                    {props.map((prop, propIndex) => (
                        <TableCell key={propIndex} className="font-medium">
                        {funcionario[prop]}
                        </TableCell>
                    ))}
                    <TableCell key={index} className="font-medium">{
                        <div className="flex flex-row gap-1">
                            <ActionButton name="Alterar" style="rounded-lg" onClick={()=>redirecionarCadastro(funcionario.id)
                            } />
                            <ActionButton name="Excluir" style="bg-red-500 font-bold hover:bg-red-600 rounded-lg" onClick={()=>deleteFuncionario(funcionario.id)
                            }/>
                        </div>}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
    );
}
