"use client";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { useAppStore } from "@/stores/useAppStore";

export type MatchEventType = "META" | "STRIKE";

export function useMatchEventsModal(matchId?: string) {
  const addEventToMatch = useAppStore((s) => s.addEventToMatch);
  const setFeedback = useAppStore((s) => s.setFeedback); // feedback global

  const [showRegister, setShowRegister] = useState(false);
  const [modalType, setModalType] = useState<MatchEventType>("META");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [customLabel, setCustomLabel] = useState("");

  const openRegister = useCallback((type: MatchEventType) => {
    setModalType(type);
    setSelectedLabels([]);
    setCustomLabel("");
    setShowRegister(true);
  }, []);

  const toggleLabel = useCallback((label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }, []);

  const addCustomLabel = useCallback(() => {
    const trimmed = customLabel.trim();
    if (!trimmed) return;
    setSelectedLabels((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
    setCustomLabel("");
  }, [customLabel]);

  const handleConfirm = useCallback(
  (currentTime: number) => {
    if (!matchId) return;

    // Agregar los eventos al partido
    selectedLabels.forEach((label) => {
      addEventToMatch(matchId, {
        id: uuid(),
        type: modalType.toLowerCase() as "meta" | "strike",
        label,
        time: currentTime,
        createdAt: new Date().toISOString(),
      });
    });

    // Actualizar los contadores del partido
    useAppStore.setState((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId
          ? {
              ...m,
              metaPoints: m.metaPoints + (modalType === "META" ? selectedLabels.length : 0),
              strikes: m.strikes + (modalType === "STRIKE" ? selectedLabels.length : 0),
            }
          : m
      ),
    }));

    // Activar feedback global
    const feedbackText = modalType === "STRIKE" ? "Strike registrado" : "Meta registrada";
    setFeedback({ text: feedbackText, type: modalType });
    setTimeout(() => setFeedback(null), 1200);

    setShowRegister(false);
  },
  [selectedLabels, matchId, modalType, addEventToMatch, setFeedback]
);


  return {
    showRegister,
    modalType,
    selectedLabels,
    customLabel,
    setCustomLabel,
    openRegister,
    toggleLabel,
    addCustomLabel,
    handleConfirm,
    setShowRegister,
  };
}
