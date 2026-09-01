import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "@/ui";
import type { Mood } from "@/api-types/rest";

const PAGE_SIZE = 3;

type MoodsContextValue = {
  moods: Mood[];
  isLoading: boolean;
  count: number;
  page: number;
  search: string;
  selectedIds: string[];
  isSaving: boolean;
  isSuccessOpen: boolean;
  setSearch: (value: string) => void;
  goNext: () => void;
  goPrevious: () => void;
  toggleSelect: (id: string) => void;
  save: () => void;
  setSuccessOpen: (open: boolean) => void;
};

const MoodsContext = createContext<MoodsContextValue | null>(null);

export function MoodsProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { page, search } = useSearch({ from: "__root__" });

  const [moods, setMoods] = useState<Mood[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const requestId = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const currentRequest = ++requestId.current;
    setIsLoading(true);

    const skip = page * PAGE_SIZE;
    const limit = skip + PAGE_SIZE;

    const params = new URLSearchParams({
      skip: String(skip),
      limit: String(limit),
    });
    if (search) {
      params.set("search", search);
    }

    fetch(`/api/moods?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (currentRequest !== requestId.current) return;
        setMoods(data.moods);
        setCount(data.pagination.count);
      })
      .finally(() => {
        if (currentRequest === requestId.current) {
          setIsLoading(false);
        }
      });
  }, [page, search]);

  const setSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        navigate({
          to: ".",
          search: (prev) => ({ ...prev, search: value, page: 0 }),
        });
      }, 400);
    },
    [navigate],
  );

  const goNext = useCallback(() => {
    navigate({
      to: ".",
      search: (prev) => ({ ...prev, page: (prev.page ?? 0) + 1 }),
    });
  }, [navigate]);

  const goPrevious = useCallback(() => {
    navigate({
      to: ".",
      search: (prev) => ({ ...prev, page: Math.max((prev.page ?? 0) - 1, 0) }),
    });
  }, [navigate]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        toast.error("You can only select up to 3 moods");
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const save = useCallback(() => {
    setIsSaving(true);
    fetch("/api/moods/current", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moodIds: selectedIds }),
    })
      .then((res) => res.json())
      .then(() => {
        setIsSuccessOpen(true);
      })
      .finally(() => setIsSaving(false));
  }, [selectedIds]);

  return (
    <MoodsContext.Provider
      value={{
        moods,
        isLoading,
        count,
        page,
        search,
        selectedIds,
        isSaving,
        isSuccessOpen,
        setSearch,
        goNext,
        goPrevious,
        toggleSelect,
        save,
        setSuccessOpen: setIsSuccessOpen,
      }}
    >
      {children}
    </MoodsContext.Provider>
  );
}

export function useMoodsContext() {
  const ctx = useContext(MoodsContext);
  if (!ctx)
    throw new Error("useMoodsContext must be used within MoodsProvider");
  return ctx;
}
