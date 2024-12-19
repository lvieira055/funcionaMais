"use client"
import Echart from "@/components/employe-count-chart";
import DChart from "@/components/default-chart";
import { skip } from "node:test";
import { useEffect, useState } from "react";

export default function Inicio(){
  //<any>([]) para caso eu passe objetos, assim ao repassar props não dá erro.
    const [listaFuncionarios, setListaFuncionarios] = useState<any[]>([]);

    useEffect(() => {
        getFuncionarios();
      }, []);
    

    const getFuncionarios = async () => {
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
      
    const employeePerBranch = () => {
        // Lista de cidades sem repetições
        const branchList = [...new Set(listaFuncionarios.map((fun) => fun.cidade))];
    
        // Mapeando a quantidade de funcionários por cidade
        const countEmployeePerBranch = branchList.map((branch) => {
            const funcionarios = listaFuncionarios.filter((fun) => fun.cidade === branch).length;
            return { branch, funcionarios };
        });
    
        return countEmployeePerBranch;
    };
//    console.log(employeePerBranch());
        
    return (
        <div className="container flex flex-col items-center w-full min-w-max p-2">
            <h1><span className="font-bold">Bem vindo ao Inicio</span></h1>
            <div className="container flex flex-row gap-1">
                <Echart title="Empregados por Filial" description="Histórico geral" data={employeePerBranch()}/>
            </div>
        </div>
    )
}