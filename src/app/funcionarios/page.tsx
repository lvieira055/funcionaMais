import { CustomTable } from "@/components/table";

export default function Funcionarios(){
    return(
        <div className="container flex flex-col items-center w-full max-h-min">
            <h1 className="font-bold text-2xl text-gray-400 mb-7 mt-3">Lista de funcionários</h1>
            <div className="container min-h-screen">
                <CustomTable/>
            </div>
        </div>

    )
}