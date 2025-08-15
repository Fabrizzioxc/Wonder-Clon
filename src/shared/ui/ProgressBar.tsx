interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="sticky top-8">
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium text-slate-600">Progresión:</span>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-slate-800 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center mt-1">
              <span className="text-sm font-medium text-slate-800">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          Pregunta {currentStep + 1} de {totalSteps}
        </div>
      </div>
    </div>
  )
}