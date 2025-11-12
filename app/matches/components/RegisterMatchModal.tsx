"use client";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/stores/useAppStore";
import { v4 as uuidv4 } from "uuid";
import { ScoreInput } from "./ScoreInput";
import { OutcomeIcon } from "./OutcomeIcon";
import { useMatchForm } from "../hooks/useMatchForm";
import { useRouter } from "next/navigation";

export function RegisterMatchModal() {
  const isOpen = useAppStore((s) => s.isRegisterMatchOpen);
  const closeModal = useAppStore((s) => s.closeRegisterMatch);
  const addMatch = useAppStore((s) => s.addMatch);
  const selectMatch = useAppStore((s) => s.selectMatch);
  const router = useRouter();


  const {
    title,
    setTitle,
    videoUrl,
    setVideoUrl,
    homeGoals,
    setHomeGoals,
    awayGoals,
    setAwayGoals,
    outcome,
    error,
    setError,
    resetForm,
  } = useMatchForm();

 const handleSubmit = () => {
  if (!title || !videoUrl) {
    setError("Título y link son obligatorios");
    return;
  }
  if (!/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(videoUrl)) {
    setError("Debe ser un link de YouTube válido");
    return;
  }

  const newMatch = {
    id: uuidv4(),
    title,
    videoUrl,
    result: `${homeGoals}-${awayGoals}`,
    outcome,
    metaPoints: 0,
    strikes: 0,
    keyStats: { goalsFor: homeGoals, goalsAgainst: awayGoals },
    createdAt: new Date().toISOString(),
  };

  addMatch(newMatch);
  selectMatch(newMatch.id);
  resetForm();
  closeModal();

  router.push(`/matches/${newMatch.id}`);
};


  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="sm:max-w-md bg-black/95 border border-emerald-700 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-white text-center mb-8">
            Registrar Partido
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center mt-8 space-y-4 relative gap-2">
          <ScoreInput
            homeGoals={homeGoals}
            awayGoals={awayGoals}
            setHomeGoals={setHomeGoals}
            setAwayGoals={setAwayGoals}
          />

          <div className="absolute -top-14">
            <OutcomeIcon outcome={outcome} />
          </div>

          <Input
            placeholder="Título del partido"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-black/90 text-white placeholder-gray-400 focus:ring-emerald-400 focus:border-emerald-400 rounded-md"
          />
          <Input
            placeholder="Link de YouTube"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="bg-black/90 text-white placeholder-gray-400 focus:ring-emerald-400 focus:border-emerald-400 rounded-md"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>

        <DialogFooter className="mt-6 flex justify-between gap-4">
          <Button
            onClick={resetForm}
            className="relative overflow-hidden bg-linear-to-r cursor-pointer from-gray-500 to-gray-400 text-white font-semibold text-lg px-10 py-5 rounded-2xl shadow-md
  transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-gray-500/40 hover:scale-[1.03]"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="relative overflow-hidden bg-linear-to-r cursor-pointer from-emerald-500 to-emerald-400 text-white font-semibold text-lg px-10 py-5 rounded-2xl shadow-md
  transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-emerald-500/40 hover:scale-[1.03]"
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
