/**
 * The page: the full seasonal menu, 960px wide.
 *
 * Navigation, a hero with the drawn flame and saffron motifs, the seven
 * courses as a table with prices, the chef's note, a dark wine-pairing
 * callout, and the visit details. Every Row wraps, so it holds together at
 * every width down to a phone.
 */
import { Button, Column, Grid, Heading, LineBreak, Link, Menu, Page, Row, Section, Text, token } from "@hyper-elements/react";
import { courses, pairingNotes, restaurant, season } from "./data.js";
import { ChefNote, CourseList, DietaryKey, FlameMark, Flourish, ReservationCTA, SaffronSprig, SeasonLine, TastingLine, Wordmark } from "./components.js";
import { saffronSmoke, SERIF, WEB_FONTS } from "./theme.js";

export default function SeasonalMenuPage() {
  return (
    <Page
      width={960}
      theme={saffronSmoke}
      lang="en-GB"
      title={`${season.name} — ${restaurant.name}, Marylebone`}
      description={`Seven courses, cooked over fire. ${restaurant.name}'s winter tasting menu, ${season.dates} — £95 per person, wine pairing +£65.`}
      fonts={[...WEB_FONTS]}
    >
      {/* Navigation */}
      <Section style={{ padding: [24, 48], mobile: { padding: [20, 20] } }}>
        <Row stackOnMobile={false} style={{ alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <Column style={{ minWidth: 200 }}>
            <Wordmark href={restaurant.site} />
          </Column>
          <Row stackOnMobile={false} style={{ flex: "none", alignItems: "center", gap: 8 }}>
            <Menu
              hidden={{ mobile: true }}
              items={[
                { text: "Menu", href: "#menu" },
                { text: "The chef", href: "#chef" },
                { text: "Wine", href: "#wine" },
                { text: "Visit", href: "#visit" },
              ]}
              style={{ flex: "none", color: token("colors.foreground"), fontSize: 14, fontWeight: 500, padding: [6, 20, 6, 0] }}
            />
            <Button href={restaurant.reservations} style={{ flex: "none", fontSize: 12, padding: [11, 20] }}>
              Book a table
            </Button>
          </Row>
        </Row>
      </Section>

      {/* Hero: the words, and the drawn flame */}
      <Section style={{ padding: [40, 48, 72], mobile: { padding: [24, 20, 56] } }}>
        <Row style={{ alignItems: "center", flexWrap: "wrap", gap: 56, mobile: { gap: 36 } }}>
          <Column style={{ width: 480, gap: 24 }}>
            <SeasonLine short />
            <Heading level={1} style={{ fontSize: 68, mobile: { fontSize: 48 } }}>
              Seven courses, cooked over fire.
            </Heading>
            <Text style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 460, mobile: { fontSize: 17 } }}>{season.intro}</Text>
            <Row stackOnMobile={false} style={{ alignItems: "center", gap: 28 }}>
              <Button href={restaurant.reservations} style={{ flex: "none" }}>
                Book a table
              </Button>
              <Text style={{ fontSize: 16 }}>
                <Link href="#menu" style={{ color: token("colors.saffronDeep") }}>
                  See the menu
                </Link>
              </Text>
            </Row>
          </Column>
          <Column style={{ flex: 1, minWidth: 260, maxWidth: 360, gap: 20, alignItems: "center", backgroundColor: token("colors.parchment"), padding: [40, 32], borderRadius: 4 }}>
            <FlameMark height={132} />
            <Column style={{ gap: 6, alignItems: "center" }}>
              <Text style={{ fontFamily: SERIF, fontSize: 26, fontStyle: "italic", fontWeight: 500, textAlign: "center" }}>{season.name}</Text>
              <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.8, textTransform: "uppercase", color: token("colors.muted"), textAlign: "center" }}>{season.datesShort}</Text>
            </Column>
            <Flourish />
            <SaffronSprig size={56} />
          </Column>
        </Row>
      </Section>

      {/* The menu: all seven courses as a table */}
      <Section style={{ padding: [72, 48], gap: 28, mobile: { padding: [56, 20], gap: 24 } }}>
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrow"] }}>The menu</Text>
          <Heading level={2} style={{ fontSize: 40, mobile: { fontSize: 30 } }}>
            {season.name} tasting menu
          </Heading>
          <Text style={{ fontSize: 16, lineHeight: 1.6, color: token("colors.muted"), maxWidth: 640 }}>
            Seven courses for the whole table. Each is also available à la carte at lunch — the prices below are the à la carte prices.
          </Text>
        </Column>
        <CourseList list={courses} layout="table" />
        <DietaryKey />
        <TastingLine />
      </Section>

      {/* The chef's note */}
      <Section style={{ backgroundColor: token("colors.parchment"), padding: [72, 48], mobile: { padding: [56, 20] } }}>
        <Column style={{ gap: 24, alignItems: "center" }}>
          <Flourish />
          <Column style={{ maxWidth: 680 }}>
            <ChefNote center />
          </Column>
        </Column>
      </Section>

      {/* The wine pairing */}
      <Section style={{ backgroundColor: token("colors.charcoal"), color: token("colors.onDark"), padding: [72, 48], gap: 32, mobile: { padding: [56, 20], gap: 28 } }}>
        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["eyebrowLight"] }}>The wine pairing</Text>
          <Heading level={2} style={{ fontSize: 40, color: token("colors.onDark"), mobile: { fontSize: 30 } }}>
            Three movements, one cellar
          </Heading>
          <Text style={{ fontSize: 16, lineHeight: 1.6, color: token("colors.onDarkMuted"), maxWidth: 640 }}>
            Seven pours across the seven courses, chosen by our sommelier to follow the saffron from first course to last. A non-alcoholic pairing follows the same arc.
          </Text>
        </Column>
        <Grid columns={3} style={{ gap: 32 }}>
          {pairingNotes.map((note) => (
            <Column key={note.title} style={{ gap: 8, padding: [18, 0, 0], border: { top: { width: 1, style: "solid", color: "#4A4132" } } }}>
              <Text style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 600, lineHeight: 1.1, color: token("colors.saffron") }}>{note.title}</Text>
              <Text style={{ fontSize: 15, lineHeight: 1.6, color: token("colors.onDarkMuted") }}>{note.text}</Text>
            </Column>
          ))}
        </Grid>
        <Row style={{ alignItems: "center", gap: 28 }}>
          <Text style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 600, color: token("colors.onDark") }}>+£65 per person</Text>
          <Button href={restaurant.reservations} style={{ flex: "none", color: token("colors.primaryForeground") }}>
            Add the pairing
          </Button>
        </Row>
      </Section>

      {/* Visit */}
      <Section style={{ padding: [72, 48, 40], gap: 32, mobile: { padding: [56, 20, 32] } }}>
        <Heading level={2}>Visit us</Heading>
        <Row style={{ flexWrap: "wrap", gap: 40 }}>
          <Column style={{ minWidth: 200, gap: 8 }}>
            <Text style={{ apply: ["eyebrow"] }}>Hours</Text>
            <Text style={{ lineHeight: 1.6 }}>{restaurant.hours}</Text>
            <Text style={{ apply: ["smallMuted"] }}>Kitchen closes at 10:30pm.</Text>
          </Column>
          <Column style={{ minWidth: 200, gap: 8 }}>
            <Text style={{ apply: ["eyebrow"] }}>Find us</Text>
            <Text style={{ lineHeight: 1.6 }}>
              {restaurant.address[0]}
              <LineBreak />
              {restaurant.address[1]}
            </Text>
            <Text style={{ apply: ["smallMuted"] }}>Four minutes from Bond Street station.</Text>
          </Column>
          <Column style={{ minWidth: 200, gap: 8 }}>
            <Text style={{ apply: ["eyebrow"] }}>Contact</Text>
            <Text style={{ lineHeight: 1.6 }}>
              <Link href={`tel:${restaurant.phone.replace(/\s/g, "")}`} style={{ color: token("colors.foreground") }}>
                {restaurant.phone}
              </Link>
            </Text>
            <Text style={{ lineHeight: 1.6 }}>
              <Link href={`mailto:${restaurant.email}`} style={{ color: token("colors.foreground") }}>
                {restaurant.email}
              </Link>
            </Text>
          </Column>
        </Row>
        <ReservationCTA />
      </Section>

      {/* Footer */}
      <Section style={{ padding: [28, 48, 48], border: { top: { width: 1, style: "solid", color: token("colors.border") } }, mobile: { padding: [24, 20, 40] } }}>
        <Row style={{ alignItems: "center", flexWrap: "wrap", gap: 8 }}>
          <Column style={{ minWidth: 280 }}>
            <Text style={{ fontSize: 13, color: token("colors.muted") }}>© 2026 {restaurant.name} · Est. {restaurant.established} · A fictional restaurant, built as a template.</Text>
          </Column>
          <Column style={{ flex: "none" }}>
            <Text style={{ fontSize: 13, color: token("colors.muted"), textAlign: "right" }}>
              <Link href={restaurant.site} style={{ color: token("colors.foreground") }}>
                saffronandsmoke.example
              </Link>
            </Text>
          </Column>
        </Row>
      </Section>
    </Page>
  );
}
