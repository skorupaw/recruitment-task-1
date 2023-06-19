import { useEffect, useState } from "react";
import { Card, NoResults } from "../ui";
import React from "react";

export type MoodsProps = {
  skip: number
  limit: number
  search?: string
  onSelect?: (id: string) => void;
  selected?: string[]
}

export function Moods({ skip, limit, search, selected = [], onSelect = () => null }: MoodsProps) {
  const [moods, setMoods] = useState([])
  
  useEffect(() => {
    fetch(!search ? `http://localhost:4000/api/moods?limit=${limit}&skip=${skip}` : `http://localhost:4000/api/moods?limit=3&search=${search}`)
      .then(res => res.json())
      .then(data => setMoods(data.moods))
  }, [skip, limit, search])

  return (
    <>
      {moods.length > 0 ? moods.map((mood: any) => (
        <Card
          key={mood.id}
          emoji={mood.emoji}
          title={mood.title}
          description={mood.description}
          onSelect={() => onSelect(mood.id)}
          isSelected={selected.includes(mood.id)}
        />
      )) : <NoResults search={search} />}
    </>
  );
}

export default React.memo(Moods);
