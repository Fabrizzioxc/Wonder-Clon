// src/features/fut-wizard/ui/FUTFormField.tsx
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FUTData, Question } from "@/entities/fut/model/type";

interface Props {
  question: Question<FUTData>;
  value: string;
  onChange: (v: string) => void;
}

export function FUTFormField({ question, value, onChange }: Props) {
  switch (question.type) {
    case "textarea":
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          className="min-h-[100px]"
        />
      );
    case "radio":
      return (
        <RadioGroup value={value} onValueChange={onChange}>
          {question.options?.map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={String(opt.value)} />
              <Label htmlFor={String(opt.value)}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case "select":
      return (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una opción" />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "date":
      return <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} />;
    case "number":
      return <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder={question.placeholder} />;
    default:
      return <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={question.placeholder} />;
  }
}
