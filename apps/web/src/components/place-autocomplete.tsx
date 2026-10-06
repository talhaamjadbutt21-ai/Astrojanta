"use client";

import type { Place } from "@sebt/shared";
import { useQuery } from "@tanstack/react-query";
import { MapPin, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { api } from "@/lib/api";
import { cn } from "@/lib/cn";
import { inputStyles } from "./ui/field";
import { Spinner } from "./ui/spinner";

interface Props {
  id: string;
  value: Place | null;
  onChange: (place: Place | null) => void;
  invalid?: boolean;
  describedBy?: string;
}

function useDebounced<T>(value: T, ms: number) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

export function PlaceAutocomplete({ id, value, onChange, invalid, describedBy }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const q = useDebounced(query.trim(), 300);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["places", q.toLowerCase()],
    queryFn: () => api.places.search(q),
    enabled: q.length >= 2,
    staleTime: Infinity,
  });
  const results = data?.results ?? [];

  if (value) {
    return (
      <div className={cn(inputStyles, "flex items-center gap-3")}>
        <MapPin className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm">{value.name}</p>
          <p className="truncate text-[11px] text-muted">
            {value.latitude.toFixed(2)}°, {value.longitude.toFixed(2)}° · {value.timezone}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="grid size-7 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-ink"
          aria-label="Change birthplace"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  const select = (i: number) => {
    const place = results[i];
    if (!place) return;
    onChange({ name: place.name, latitude: place.latitude, longitude: place.longitude, timezone: place.timezone });
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <MapPin
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
      <input
        id={id}
        className={cn(inputStyles, "pl-10")}
        placeholder="Search city, e.g. Varanasi"
        autoComplete="off"
        role="combobox"
        aria-expanded={open && q.length >= 2}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter" && open && results.length) {
            e.preventDefault();
            select(active);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      />
      {isFetching && <Spinner className="absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />}
      {open && q.length >= 2 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-2xl border border-white/10 bg-night-900/95 p-1.5 shadow-2xl backdrop-blur-xl">
          {isError && (
            <p role="status" className="px-3 py-3 text-sm text-red-300">
              Place search is unavailable. Try again.
            </p>
          )}
          {!isError && !isFetching && results.length === 0 && (
            <p role="status" className="px-3 py-3 text-sm text-muted">
              No places found for “{q}”.
            </p>
          )}
          <div id={listId} role="listbox" aria-label="Matching places">
            {results.map((r, i) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard selection is handled by the combobox input via aria-activedescendant.
              <div
                key={r.id}
                id={`${listId}-${i}`}
                role="option"
                tabIndex={-1}
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => select(i)}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  "cursor-pointer rounded-xl px-3 py-2.5 text-sm",
                  i === active ? "bg-gold-400/12 text-ink" : "text-ink/85",
                )}
              >
                {r.name}
                <span className="block text-[11px] text-muted">{r.timezone}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
