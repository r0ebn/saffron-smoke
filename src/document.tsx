/**
 * The document: a printable A4 tasting menu.
 *
 * One page: the flame and the season at the top, the seven courses in two
 * ruled columns, the tasting price, the chef's note, and the allergy note.
 * A header and a footer (with page numbers) repeat on every page.
 * render() writes the print HTML; renderPdf() the PDF, from the same tree.
 */
import { Column, Divider, Document, Grid, Heading, PageFooter, PageHeader, PageNumber, Row, Text, token } from "@hyper-elements/react";
import { allergyNote, courses, restaurant, season } from "./data.js";
import { ChefNote, CourseList, DietaryKey, FlameMark, Flourish, SeasonLine, TastingLine, Wordmark } from "./components.js";
import { saffronSmoke, WEB_FONTS } from "./theme.js";

export default function PrintableMenu() {
  const left = courses.slice(0, 4);
  const right = courses.slice(4);
  return (
    <Document size="A4" margin={48} theme={saffronSmoke} lang="en-GB" title={`${season.name} tasting menu — ${restaurant.name}`} fonts={[...WEB_FONTS]}>
      <PageHeader style={{ padding: [0, 0, 12], border: { bottom: { width: 1, style: "solid", color: token("colors.border") } } }}>
        <Row stackOnMobile={false} style={{ alignItems: "center" }}>
          <Column>
            <Wordmark size={15} />
          </Column>
          <Column>
            <Text style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.muted"), textAlign: "right" }}>
              {season.name} · 2026–27
            </Text>
          </Column>
        </Row>
      </PageHeader>

      <Document.Page style={{ gap: 18 }}>
        {/* The masthead */}
        <Column style={{ gap: 10, alignItems: "center" }}>
          <FlameMark height={48} />
          <Heading level={1} style={{ fontSize: 36, textAlign: "center" }}>
            {season.name}
          </Heading>
          <Text style={{ apply: ["eyebrow"], textAlign: "center" }}>{season.dates}</Text>
          <Text style={{ fontSize: 14, lineHeight: 1.6, color: token("colors.muted"), textAlign: "center", maxWidth: 560 }}>
            Seven courses for the whole table. Saffron, bought at harvest and kept for the cold months, meets fire — the grill, the ember oven, the smoker.
          </Text>
        </Column>

        {/* The courses, in two ruled columns */}
        <Grid columns={2} style={{ gap: 32 }}>
          <CourseList list={left} compact />
          <CourseList list={right} compact />
        </Grid>

        {/* Price, key, chef, allergy note */}
        <Column style={{ gap: 12, alignItems: "center" }}>
          <TastingLine />
          <DietaryKey />
          <Flourish />
          <Column style={{ maxWidth: 620 }}>
            <ChefNote short center />
          </Column>
          <Divider style={{ width: "100%" }} />
          <Text style={{ apply: ["smallMuted"], textAlign: "center", maxWidth: 620 }}>{allergyNote}</Text>
          <Text style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1.4, textTransform: "uppercase", color: token("colors.saffronDeep"), textAlign: "center" }}>
            Reservations · saffronandsmoke.example/book · {restaurant.phone}
          </Text>
        </Column>
      </Document.Page>

      <PageFooter style={{ padding: [12, 0, 0], border: { top: { width: 1, style: "solid", color: token("colors.border") } } }}>
        <Row stackOnMobile={false} style={{ alignItems: "center" }}>
          <Column>
            <Text style={{ fontSize: 11, color: token("colors.muted") }}>
              {restaurant.name} · {restaurant.address.join(", ")} · {restaurant.hours}
            </Text>
          </Column>
          <Column>
            <Text style={{ fontSize: 11, color: token("colors.muted"), textAlign: "right" }}>
              Page <PageNumber /> of <PageNumber total />
            </Text>
          </Column>
        </Row>
      </PageFooter>
    </Document>
  );
}
