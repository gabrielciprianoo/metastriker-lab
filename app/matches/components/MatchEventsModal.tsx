"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PlusIcon,
  FireIcon,
  BoltIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { MatchEventType } from "../hooks/useMatchEventsModal";

const STRIKE_OPTIONS = [
  "No cubrir pase",
  "No presionar",
  "No orientar",
  "Perder marca",
  "Mala técnica",
  "Error al recibir",
];

const META_OPTIONS = [
  "Buena recepción",
  "Buena presión",
  "Correcto posicionamiento",
  "Buena cobertura",
  "Excelente toma de decisión",
];

type Props = {
  visible: boolean;
  modalType: MatchEventType;
  selectedLabels: string[];
  customLabel: string;
  setCustomLabel: (v: string) => void;
  toggleLabel: (l: string) => void;
  addCustomLabel: () => void;
  handleConfirm: (time: number) => void;
  currentTime: number;
  hide: () => void;
};

export function MatchEventsModal({
  visible,
  modalType,
  selectedLabels,
  customLabel,
  setCustomLabel,
  toggleLabel,
  addCustomLabel,
  handleConfirm,
  currentTime,
  hide,
}: Props) {
  const options = modalType === "STRIKE" ? STRIKE_OPTIONS : META_OPTIONS;
  const isStrike = modalType === "STRIKE";

  return (
    <Dialog open={visible} onOpenChange={hide}>
      <DialogContent className="max-w-md bg-[#0f1112] border border-emerald-700 rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100 flex items-center gap-2">
            {isStrike ? (
              <FireIcon className="w-6 h-6 text-red-500" />
            ) : (
              <BoltIcon className="w-6 h-6 text-emerald-400" />
            )}
            {isStrike ? "Registrar Strike" : "Registrar Meta"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-60 pr-3 mt-4">
          <div className="space-y-2">
            {options.map((opt) => (
              <motion.label
                key={opt}
                whileHover={{ scale: 1.001 }}
                className={`flex items-center gap-3 p-2 rounded-md border ${
                  isStrike
                    ? "border-red-600 hover:bg-red-600/10"
                    : "border-emerald-500 hover:bg-emerald-500/10"
                } cursor-pointer transition`}
              >
                <Checkbox
                  checked={selectedLabels.includes(opt)}
                  onCheckedChange={() => toggleLabel(opt)}
                  className="accent-emerald-400"
                />
                {isStrike ? (
                  <FireIcon className="w-4 h-4 text-red-500" />
                ) : (
                  <BoltIcon className="w-4 h-4 text-emerald-400" />
                )}
                <span className="text-gray-200">{opt}</span>
              </motion.label>
            ))}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder="Agregar personalizado"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            className="bg-gray-900 text-gray-200 border border-emerald-700 focus:border-emerald-400"
          />
          <Button
            onClick={addCustomLabel}
            className="bg-emerald-600 hover:bg-emerald-500 text-white"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>

        {selectedLabels.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2 text-gray-300">Seleccionados:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedLabels.map((label) => (
                <div
                  key={label}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm ${
                    isStrike
                      ? "bg-red-600/20 text-red-400"
                      : "bg-emerald-600/20 text-emerald-400"
                  }`}
                >
                  <CheckIcon className="w-4 h-4" />
                  <span>{label}</span>
                  <button
                    className="font-bold hover:text-white ml-1 cursor-pointer"
                    onClick={() => toggleLabel(label)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button
            onClick={() => handleConfirm(currentTime)}
            disabled={selectedLabels.length === 0}
            className={`w-full font-semibold ${
              isStrike
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            Registrar ({selectedLabels.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
