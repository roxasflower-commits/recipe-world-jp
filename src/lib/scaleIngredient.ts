const VULGAR_FRACTIONS: Record<string, number> = {
  '½': 1 / 2,
  '⅓': 1 / 3,
  '⅔': 2 / 3,
  '¼': 1 / 4,
  '¾': 3 / 4,
  '⅕': 1 / 5,
  '⅖': 2 / 5,
  '⅗': 3 / 5,
  '⅘': 4 / 5,
  '⅙': 1 / 6,
  '⅚': 5 / 6,
  '⅐': 1 / 7,
  '⅛': 1 / 8,
  '⅜': 3 / 8,
  '⅝': 5 / 8,
  '⅞': 7 / 8,
};

const VULGAR_CHARS = Object.keys(VULGAR_FRACTIONS).join('');

interface ParsedNumber {
  value: number;
  rest: string;
}

/** Parses a leading numeric quantity ("1と1/2個" / "1½個" / "1/2カップ" / "800g" / "2つまみ") from the
 * start of a string, returning the numeric value and whatever text trails it. Returns null when the
 * string doesn't start with a recognizable quantity (e.g. "適量", "少々", "お好みで"). */
function parseLeadingNumber(input: string): ParsedNumber | null {
  let m = input.match(/^(\d+(?:\.\d+)?)と(\d+)\/(\d+)(.*)$/);
  if (m) {
    return { value: Number(m[1]) + Number(m[2]) / Number(m[3]), rest: m[4] };
  }

  const vulgarRe = new RegExp(`^(\\d+(?:\\.\\d+)?)?([${VULGAR_CHARS}])(.*)$`);
  m = input.match(vulgarRe);
  if (m && (m[1] !== undefined || m[2] !== undefined)) {
    const base = m[1] ? Number(m[1]) : 0;
    return { value: base + VULGAR_FRACTIONS[m[2]], rest: m[3] };
  }

  m = input.match(/^(\d+)\/(\d+)(.*)$/);
  if (m) {
    return { value: Number(m[1]) / Number(m[2]), rest: m[3] };
  }

  m = input.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (m) {
    return { value: Number(m[1]), rest: m[2] };
  }

  return null;
}

function formatNumber(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  return String(parseFloat(rounded.toFixed(2)));
}

/**
 * Scales the numeric portion of an ingredient amount string by `ratio`, preserving any trailing
 * unit text embedded in the string itself. Amounts with no leading number ("適量", "少々",
 * "ひとつまみ", "お好みで" 等) are returned unchanged since they aren't meaningfully scalable.
 */
export function scaleAmount(amount: string, ratio: number): string {
  if (ratio === 1) return amount;
  const trimmed = amount.trim();
  if (!trimmed) return amount;

  const rangeSep = trimmed.includes('〜') ? '〜' : trimmed.includes('~') ? '~' : null;
  if (rangeSep) {
    const [left, right] = trimmed.split(rangeSep);
    const leftParsed = left ? parseLeadingNumber(left) : null;
    const rightParsed = right ? parseLeadingNumber(right) : null;
    if (leftParsed && rightParsed) {
      const suffix = rightParsed.rest || leftParsed.rest;
      return `${formatNumber(leftParsed.value * ratio)}${rangeSep}${formatNumber(rightParsed.value * ratio)}${suffix}`;
    }
  }

  const parsed = parseLeadingNumber(trimmed);
  if (!parsed) return amount;
  return `${formatNumber(parsed.value * ratio)}${parsed.rest}`;
}
