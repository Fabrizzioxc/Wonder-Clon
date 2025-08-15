// src/features/fut-wizard/ui/FUTWizard.tsx
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { FUTFormField } from "./FUTFormField";
import { FUTPreview } from "@/features/fut-preview/ui/FUTPreview";
import { ProgressBar } from "@/shared/ui/ProgressBar";

import { initialFUTData, FUTData } from "@/entities/fut/model/type";
import { futQuestions } from "@/features/fut-wizard/model/futQuestions";

export function FUTWizard() {
  const [data, setData] = useState<FUTData>(initialFUTData);
  const visibleQuestions = useMemo(
    () => futQuestions.filter((q) => (q.condition ? q.condition(data) : true)),
    [data]
  );
  const [step, setStep] = useState(0);

  const q = visibleQuestions[step];
  const progress = Math.round(((step + 1) / visibleQuestions.length) * 100);

  const handleChange = (v: string) => {
    setData((prev) => ({ ...prev, [q.id]: v } as FUTData));
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Form */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium text-slate-800">{q.label}</Label>
                <div className="mt-2">
                  <FUTFormField
                    question={q}
                    value={String(data[q.id] ?? "")}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Anterior</span>
                </Button>

                {step === visibleQuestions.length - 1 ? (
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Exportar a PDF</Button>
                ) : (
                  <Button
                    onClick={() => setStep((s) => Math.min(visibleQuestions.length - 1, s + 1))}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center space-x-2"
                  >
                    <span>Paso siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview */}
      <div className="col-span-12 lg:col-span-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="max-h-[600px] overflow-y-auto">
              <FUTPreview data={data} currentFieldId={q.id} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <div className="col-span-12 lg:col-span-2">
        <ProgressBar currentStep={step} totalSteps={visibleQuestions.length} />
        <div className="mt-2 text-sm text-slate-600">{progress}%</div>
      </div>
    </div>
  );
}
