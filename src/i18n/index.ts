import { en } from "./en";
import { zh } from "./zh";

export type Locale = "en" | "zh";

export const translations = { en, zh } as const;

export type Translations = typeof en;
