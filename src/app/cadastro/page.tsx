import { Field } from "@/components/form-field";
import { EmployeForm } from "@/components/forms";

export default function Cadastro(){
    return (
        <div className="container min-w-full min-h-full flex flex-col bg-secondary">
            <div className="container max-w-screen-2xl m-5 h-5/6 self-center flex flex-row bg-secondary">
                <div className="container flex flex-col items-center p-2">
                    <h1 className="self-center font-sans font-semibold text-3xl">Cadastrar funcionario</h1>         
                    <div className="flex flex-col w-4/6 h-full rounded-xl overflow-hidden border-2 mt-4">
                        <div className="flex flex-col p-2 rounded-md border-b-2">
                            <h2 className="text-start font-sans font-semibold text-xl">Dados pessoais</h2>
                        </div>
                            <EmployeForm />
                    </div>
                </div>
            </div>
        </div>

    );
}