import { Separator } from "@/ui/primitives/separator";
import { Badge } from "@/ui/primitives/badge";
import { Button } from "@/ui/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/ui/primitives/card";
import { Volume2, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { memo, useCallback, useMemo } from "react";

export type DictionaryCardProps = {
  emoji: string;
  title: string;
  description: string;
  word: {
    pronunciation: string;
    definitions: string[];
    partOfSpeech: string;
  };
};

export const DictionaryCard = memo<DictionaryCardProps>(
  ({ emoji, title, word }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const linkTo = useMemo(() => {
      const queryString = searchParams.toString();
      return `/${queryString ? `?${queryString}` : ""}`;
    }, [searchParams]);

    const handleClose = useCallback(() => {
      navigate(linkTo);
    }, [linkTo, navigate]);

    return (
      <Card className="relative col-span-1 min-h-96 w-full overflow-hidden pb-0 shadow-lg lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-6 pb-2 pt-6">
          <div className="flex items-center gap-4">
            <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-full">
              <span
                className="text-2xl"
                role="img"
                aria-label={`${title} emoji`}
              >
                {emoji}
              </span>
            </div>
          </div>
        </CardHeader>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <CardContent className="h-full px-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8 px-2"
              >
                <span className="text-sm font-normal">
                  {word?.pronunciation}
                </span>
                <Volume2 className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
            <Badge className="rounded-sm text-xs font-medium">
              {word?.partOfSpeech}
            </Badge>
          </div>
          <Separator className="my-4" />
          <ol className="list-inside list-decimal space-y-3 text-sm">
            {word?.definitions.map((definition, index) => (
              <li key={index} className="pl-1">
                {definition}
              </li>
            ))}
          </ol>
        </CardContent>
        <CardFooter className="bg-muted/30 px-6 py-4">
          <div className="text-muted-foreground text-xs">
            Source: Oxford English Dictionary*
          </div>
        </CardFooter>
      </Card>
    );
  },
);
DictionaryCard.displayName = "DictionaryCard";
