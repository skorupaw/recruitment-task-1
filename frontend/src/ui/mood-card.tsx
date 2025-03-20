import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Checkbox } from "@/ui/primitives/checkbox";
import { KeyboardEvent, memo, useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router";

export type MoodCardProps = {
  id: string;
  emoji: string;
  title: string;
  word: {
    pronunciation: string;
    definitions: string[];
    partOfSpeech: string;
  };
  description: string;
  isSelected?: boolean;
  onSelect?: () => void;
};

export const MoodCard = memo<MoodCardProps>(
  ({
    id,
    emoji,
    title,
    word,
    description,
    isSelected,
    onSelect = () => null,
  }: MoodCardProps) => {
    const [searchParams] = useSearchParams();

    const handleKeyboardSelect = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      },
      [onSelect],
    );

    const handleSelect = useCallback(() => {
      onSelect();
    }, [onSelect]);

    const handlePropagation = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
      },
      [],
    );

    const linkTo = useMemo(() => {
      const queryString = searchParams.toString();
      return `/mood/${id}${queryString ? `?${queryString}` : ""}`;
    }, [id, searchParams]);

    return (
      <Card
        className={`relative w-full cursor-pointer transition-all ${
          isSelected ? "ring-primary bg-primary/5 ring-2" : ""
        }`}
        tabIndex={0}
        role="checkbox"
        aria-checked={isSelected}
        onKeyDown={handleKeyboardSelect}
        onClick={handleSelect}
        data-testid={`mood-card-${title}`}
      >
        <div className="absolute right-3 top-3 z-10">
          <Checkbox
            checked={isSelected}
            onCheckedChange={handleSelect}
            onClick={handlePropagation}
          />
        </div>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-muted flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-2xl">
            {emoji}
          </div>
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <p className="text-muted-foreground text-sm">
              {word.pronunciation}
            </p>
          </div>
        </CardHeader>
        <CardContent className="min-h-20">
          <CardDescription>{description}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button
            asChild
            variant="link"
            size="sm"
            className="px-0"
            onClick={handlePropagation}
          >
            <Link to={linkTo}>Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  },
);
MoodCard.displayName = "MoodCard";
