"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  label?: string;
  value?: Date | null; // Propriedade para receber o valor externo
  onChange?: (date: Date | null) => void; // Callback para enviar o valor selecionado
}

export default function DatePicker({ label, value, onChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(value || null);

  React.useEffect(() => {
    // Atualizar o estado interno sempre que a prop `value` mudar
    setDate(value || null);
  }, [value]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    const newDate = selectedDate || null;
    setDate(newDate) // Atualiza o estado interno
    if (onChange) {
      onChange(newDate); // Notifica o componente pai
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2" />
          {date ? format(date, "dd/MM/yyyy") : <span>{label || "Selecionar data"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleDateChange} // Usa a função de callback
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
