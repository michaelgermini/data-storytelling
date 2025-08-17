import { create } from 'zustand';

export interface SelectedEntity {
	id: string;
	name: string;
	type: 'base' | 'canton' | 'infrastructure';
	canton?: string;
	summary?: string;
	metrics?: { label: string; value: string | number }[];
	skills?: string[];
	experiences?: string[];
}

interface SelectionState {
	selected: SelectedEntity | null;
	select: (e: SelectedEntity) => void;
	clear: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
	selected: null,
	select: (e) => set({ selected: e }),
	clear: () => set({ selected: null })
}));


