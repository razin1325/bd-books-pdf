import { Book } from '@/lib/types';
import { ADMISSION_BANKS, getAdmissionBookHref } from '@/lib/admission';

export { ADMISSION_BANKS, getAdmissionBookHref };

/** Returns the unit slug (du-a-unit) for a question-bank book slug (du-a-unit-2009-2010). */
export function getDuUnitSlug(bookSlug: string): string | null {
  const bank = ADMISSION_BANKS.find((b) => b.bankSlug === 'du');
  if (!bank) return null;
  return bank.units.find((u) => bookSlug.startsWith(`${u.unitSlug}-`))?.unitSlug ?? null;
}

/** Returns the unit-relative slug (2009-2010) for a question-bank book slug. */
export function getDuUnitRelativeSlug(bookSlug: string): string | null {
  const unit = getDuUnitSlug(bookSlug);
  return unit ? bookSlug.slice(unit.length + 1) : null;
}

/** URL for a DU question-bank book: /admission/du/{unit}/{relativeSlug}. */
export function getDuBookHref(book: Book): string {
  return getAdmissionBookHref(book);
}
