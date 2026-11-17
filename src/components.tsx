/**
 * Shared blocks, reused across the four roots.
 *
 * Wordmark, SeasonLine, CourseList, ChefNote and ReservationCTA are plain
 * components that render Hyper Elements, so the email, the page, the print
 * document and the canvas all stay on-brand from the same code. The drawn
 * motifs (FlameMark, SaffronSprig, Flourish) are Svg, which Email doesn't
 * support — they are used by the Page, Document and Canvas only; the email
 * gets the same rhythm from Dividers and colour bands instead.
 */
import {
  Button,
  Circle,
  Column,
  Line,
  LineBreak,
  Link,
  Path,
  Polygon,
  Row,
  Span,
  Svg,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { chef, courses as allCourses, DIETARY_LABELS, gbp, restaurant, season, tasting, type Course, type DietaryMark } from "./data.js";
import { PALETTE, SANS, SERIF } from "./theme.js";

/* ------------------------------------------------------------------ */
/* Wordmark and season line                                            */
/* ------------------------------------------------------------------ */

/** The restaurant's name, set in the serif with wide tracking. */
export function Wordmark({ light = false, size = 20, href }: { light?: boolean; size?: number; href?: string }) {
  const color = light ? token("colors.onDark") : token("colors.foreground");
  const style = {
    fontFamily: SERIF,
    fontSize: size,
    fontWeight: 600,
    letterSpacing: 3.5,
    textTransform: "uppercase",
    lineHeight: 1.1,
    color,
  } as const;
  return (
    <Text style={style}>
      {href ? (
        <Link href={href} style={{ color, textDecoration: "none" }}>
          {restaurant.name}
        </Link>
      ) : (
        restaurant.name
      )}
    </Text>
  );
}

/** "The Ember Season · 20 November 2026 – 28 February 2027", as an eyebrow. */
export function SeasonLine({ light = false, short = false }: { light?: boolean; short?: boolean }) {
  return (
    <Text style={{ apply: [light ? "eyebrowLight" : "eyebrow"] }}>
      {season.name} · {short ? season.datesShort : season.dates}
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/* Drawn motifs (Svg — Page, Document and Canvas only)                 */
/* ------------------------------------------------------------------ */

/** A flame: an outer tongue in saffron, an inner one in pale gold. */
export function FlameMark({ height = 80, outer = PALETTE.saffron, inner = "#F5C04E" }: { height?: number; outer?: string; inner?: string }) {
  const width = Math.round(height * 0.8);
  return (
    <Svg width={width} height={height} viewBox="0 0 64 80" title="A flame">
      <Path
        d="M32 6 C36 18 48 24 48 42 A16 16 0 1 1 16 42 C16 34 20 30 22 22 C23 26 25 28 27 28 C25 20 28 10 32 6 Z"
        style={{ fill: outer }}
      />
      <Path
        d="M32 36 C34 42 40 45 40 52 A8 8 0 1 1 24 52 C24 48 26 45 27 41 C28 44 29 45 30 45 C29 42 30 38 32 36 Z"
        style={{ fill: inner }}
      />
    </Svg>
  );
}

/** Three saffron stigmas, fanning up from one stem. */
export function SaffronSprig({ size = 72, color = PALETTE.saffron, accent = PALETTE.ember }: { size?: number; color?: string; accent?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 72 72" title="Saffron threads">
      <Path d="M36 68 C34 52 28 38 18 26" style={{ fill: "transparent", stroke: color, strokeWidth: 3 }} />
      <Path d="M36 68 C36 50 36 34 36 16" style={{ fill: "transparent", stroke: accent, strokeWidth: 3 }} />
      <Path d="M36 68 C38 52 44 38 54 26" style={{ fill: "transparent", stroke: color, strokeWidth: 3 }} />
      <Circle cx={18} cy={24} r={3.5} style={{ fill: color }} />
      <Circle cx={36} cy={14} r={3.5} style={{ fill: accent }} />
      <Circle cx={54} cy={24} r={3.5} style={{ fill: color }} />
    </Svg>
  );
}

/** A divider ornament: rule — diamond — rule. */
export function Flourish({ width = 120, color = PALETTE.saffron }: { width?: number; color?: string }) {
  return (
    <Svg width={width} height={12} viewBox="0 0 120 12" title="">
      <Line x1={0} y1={6} x2={48} y2={6} style={{ stroke: PALETTE.border, strokeWidth: 1 }} />
      <Polygon points="60,1 65,6 60,11 55,6" style={{ fill: color }} />
      <Line x1={72} y1={6} x2={120} y2={6} style={{ stroke: PALETTE.border, strokeWidth: 1 }} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ */
/* Courses                                                             */
/* ------------------------------------------------------------------ */

/** A course's dietary marks, as small caps after its name ("V · GF"). */
function DietaryMarks({ marks }: { marks: DietaryMark[] }) {
  if (marks.length === 0) return null;
  return (
    <Span style={{ fontFamily: SANS, fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: token("colors.muted") }}>
      {"  "}· {marks.map((m) => m.toUpperCase()).join(" · ")}
    </Span>
  );
}

/** The name, description and price of one course, as a ruled row. */
function CourseRow({ course, compact = false }: { course: Course; compact?: boolean }) {
  return (
    <Row stackOnMobile={false} style={{ apply: ["courseRow"], padding: compact ? [8, 0] : [14, 0], gap: 16 }}>
      <Column style={{ gap: 3 }}>
        <Text style={{ fontFamily: SERIF, fontSize: compact ? 17 : 21, fontWeight: 600, lineHeight: 1.2 }}>
          {course.name}
          <DietaryMarks marks={course.dietary} />
        </Text>
        <Text style={{ fontSize: compact ? 13 : 14, lineHeight: 1.5, color: token("colors.muted") }}>{course.description}</Text>
      </Column>
      <Column style={{ width: compact ? 56 : 64 }}>
        <Text style={{ apply: ["price"], fontSize: compact ? 18 : 21 }}>{gbp(course.price)}</Text>
      </Column>
    </Row>
  );
}

/** One course as a table row (name + description | price). A TableCell holds
 *  text and inline elements only, so the name and description are text runs
 *  separated by a LineBreak, not Text elements. */
function CourseTableRow({ course }: { course: Course }) {
  return (
    <TableRow>
      <TableCell style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 600, lineHeight: 1.35, verticalAlign: "top", mobile: { fontSize: 19 } }}>
        {course.name}
        <DietaryMarks marks={course.dietary} />
        <LineBreak />
        <Span style={{ fontFamily: SANS, fontSize: 14, fontWeight: 400, color: token("colors.muted") }}>{course.description}</Span>
      </TableCell>
      <TableCell style={{ apply: ["price"], width: 72, verticalAlign: "top" }}>{gbp(course.price)}</TableCell>
    </TableRow>
  );
}

/**
 * The course list, in two layouts from the same data: ruled rows (email,
 * document) or a table (page). The closing rule sits on the wrapper, so the
 * list reads as one block.
 */
export function CourseList({
  list = allCourses,
  layout = "rows",
  compact = false,
}: {
  list?: Course[];
  layout?: "rows" | "table";
  compact?: boolean;
}) {
  if (layout === "table") {
    return (
      <Table style={{ cellPadding: [14, 0], rowBorder: { width: 1, style: "solid", color: token("colors.border") } }}>
        {list.map((course) => (
          <CourseTableRow key={course.id} course={course} />
        ))}
      </Table>
    );
  }
  return (
    <Column style={{ border: { bottom: { width: 1, style: "solid", color: token("colors.border") } } }}>
      {list.map((course) => (
        <CourseRow key={course.id} course={course} compact={compact} />
      ))}
    </Column>
  );
}

/** The legend for the dietary marks. */
export function DietaryKey() {
  return (
    <Text style={{ apply: ["smallMuted"] }}>
      {Object.entries(DIETARY_LABELS)
        .map(([mark, label]) => `${mark.toUpperCase()} — ${label}`)
        .join("   ·   ")}
    </Text>
  );
}

/* ------------------------------------------------------------------ */
/* Chef's note, tasting price, reservation                             */
/* ------------------------------------------------------------------ */

/** The chef's note: an italic serif quote with her name under it. */
export function ChefNote({ short = false, center = false }: { short?: boolean; center?: boolean }) {
  return (
    <Column style={{ gap: 12 }}>
      <Text style={{ fontFamily: SERIF, fontSize: 24, fontStyle: "italic", fontWeight: 500, lineHeight: 1.35, textAlign: center ? "center" : "left" }}>
        “{short ? chef.noteShort : chef.note}”
      </Text>
      <Text style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.saffronDeep"), textAlign: center ? "center" : "left" }}>
        {chef.name} · {chef.title}
      </Text>
    </Column>
  );
}

/** Tasting-menu price and wine-pairing price, side by side. */
export function TastingLine({ light = false }: { light?: boolean }) {
  const price = (label: string, value: string) => (
    <Column style={{ gap: 2 }}>
      <Text style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 600, lineHeight: 1.1, color: light ? token("colors.onDark") : token("colors.foreground") }}>{value}</Text>
      <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: light ? token("colors.onDarkMuted") : token("colors.muted") }}>{label}</Text>
    </Column>
  );
  return (
    <Row style={{ gap: 32 }}>
      {price(`Tasting menu · per person`, gbp(tasting.price))}
      {price("Wine pairing · per person", `+${gbp(tasting.pairingPrice)}`)}
    </Row>
  );
}

/** The reservation button, with the season's dates under it. */
export function ReservationCTA({ label = "Book a table" }: { label?: string }) {
  return (
    <Column style={{ gap: 10 }}>
      <Button href={restaurant.reservations} style={{ width: 260, mobile: { width: "100%" } }}>
        {label}
      </Button>
      <Text style={{ apply: ["smallMuted"] }}>
        {season.name} · {season.dates}
      </Text>
    </Column>
  );
}
