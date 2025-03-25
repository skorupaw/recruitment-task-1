import {
  Page,
  Navigation,
  Main,
  Search,
  Footer,
  Counter,
  SaveButton,
  MoodSaveSuccessModal,
  NoResults,
  toast,
} from "@/ui";
import Moods from "@/components/Moods";
import { Outlet, useSearchParams } from "react-router";
import { Mood, Pagination } from "./api-types/common";
import useFetch from "./hooks/useFetch";
import { useCallback, useEffect, useRef, useState } from "react";

type MoodsResponse = {
  moods: Mood[];
  pagination: Pagination;
};

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 0);
  const searchQuery = searchParams.get("search") || "";
  const params = {
    search: searchQuery,
    limit: (page + 1) * 3,
    skip: page * 3,
  };

  const { data, loading } = useFetch<MoodsResponse>("/api/moods", params);
  const [searchInput, setSearchInput] = useState(searchQuery);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const [selectedMoods, setSelectedMoods] = useState<Mood["id"][]>([]);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const updateSearchParams = useCallback(
    (search: string) => {
      const currentSearch = searchParams.get("search") || "";
      if (search !== currentSearch) {
        setSearchParams(search ? { search } : {});
      }
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      updateSearchParams(searchInput);
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchInput, updateSearchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSaveAction = async () => {
    setSaveLoading(true);
    try {
      const response = await fetch("/api/moods/current", {
        method: "POST",
        body: JSON.stringify({ moodIds: selectedMoods }),
      });
      if (response.ok) {
        setSuccessModal(true);
      } else {
        throw new Error("Failed to save moods");
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
        console.error(e);
      }
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Page>
      <div className="py-6">
        <h2 className="text-3xl font-bold tracking-tight">Mood selector</h2>
        <span className="text-muted-foreground">
          Select 3 moods that bests describe your feeling
        </span>
      </div>
      <div className="flex w-full items-center py-2">
        <Search
          placeholder="Search..."
          autoFocus
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
      <Main>
        <Outlet />
        {data?.moods.length === 0 && !loading && <NoResults />}

        {
          <Moods
            data={data?.moods}
            loading={loading}
            selectedMoods={selectedMoods}
            setSelectedMoods={setSelectedMoods}
          />
        }
      </Main>
      <Footer>
        <Counter count={data?.pagination.count} />
        <Navigation
          isPreviousDisabled={page === 0 || loading}
          isNextDisabled={loading}
          onNext={() =>
            setSearchParams({ search: searchQuery, page: String(page + 1) })
          }
          onPrevious={() =>
            setSearchParams({ search: searchQuery, page: String(page - 1) })
          }
        />
        <div className="flex items-center justify-end">
          <SaveButton isSaving={saveLoading} onSave={handleSaveAction} />
        </div>
      </Footer>
      <MoodSaveSuccessModal
        isOpen={successModal}
        onChangeOpen={() => setSuccessModal(false)}
      />
    </Page>
  );
}
