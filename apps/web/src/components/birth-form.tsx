"use client";

import { type BirthDetails, birthDetailsSchema, type Place } from "@astrojanta/shared";
import { type FormEvent, useState } from "react";
import { PlaceAutocomplete } from "./place-autocomplete";
import { Button } from "./ui/button";
import { Field, FormError, Input } from "./ui/field";

interface Props {
  onSubmit: (birth: BirthDetails) => void;
  pending?: boolean;
  submitLabel?: string;
  serverError?: string | null;
  serverFields?: Record<string, string[]>;
  initialName?: string;
  title?: string;
}

export function BirthForm({
  onSubmit,
  pending,
  submitLabel = "Generate Kundli",
  serverError,
  serverFields,
  initialName = "",
  title,
}: Props) {
  const [name, setName] = useState(initialName);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [place, setPlace] = useState<Place | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fieldError = (key: string) => errors[key] ?? serverFields?.[key]?.[0] ?? serverFields?.[`birth.${key}`]?.[0];

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = birthDetailsSchema.safeParse({
      name,
      date,
      time: timeUnknown || !time ? undefined : time,
      timeUnknown,
      place: place ?? undefined,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] === "place" ? "place" : String(issue.path[0] ?? "_");
        next[key] ??= key === "place" ? "Choose your birthplace from the list" : issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  return (
    <form onSubmit={submit} noValidate className="grid gap-5">
      {title ? <p className="font-display text-lg text-gold-200">{title}</p> : null}
      <Field label="Full name" error={fieldError("name")}>
        {(p) => (
          <Input
            {...p}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            autoComplete="name"
            maxLength={80}
          />
        )}
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date of birth" error={fieldError("date")}>
          {(p) => (
            <Input
              {...p}
              type="date"
              value={date}
              min="1800-01-01"
              max="2199-12-31"
              onChange={(e) => setDate(e.target.value)}
            />
          )}
        </Field>
        <Field
          label="Time of birth"
          error={fieldError("time")}
          hint={timeUnknown ? "Lagna and houses will be skipped" : "As on birth certificate (local time)"}
        >
          {(p) => (
            <Input {...p} type="time" value={time} disabled={timeUnknown} onChange={(e) => setTime(e.target.value)} />
          )}
        </Field>
      </div>

      <label className="-mt-2 flex w-fit cursor-pointer items-center gap-2.5 text-sm text-muted">
        <input
          type="checkbox"
          checked={timeUnknown}
          onChange={(e) => setTimeUnknown(e.target.checked)}
          className="size-4 rounded accent-gold-500"
        />
        I don’t know my birth time
      </label>

      <Field label="Place of birth" error={fieldError("place")} hint="We use the historical time zone of this place">
        {(p) => (
          <PlaceAutocomplete
            id={p.id}
            value={place}
            onChange={setPlace}
            invalid={p["aria-invalid"]}
            describedBy={p["aria-describedby"]}
          />
        )}
      </Field>

      <FormError message={serverError} />

      <Button type="submit" size="lg" loading={pending} className="mt-1 w-full">
        {submitLabel}
      </Button>
    </form>
  );
}
