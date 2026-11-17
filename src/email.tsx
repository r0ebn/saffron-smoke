/**
 * The email: a seasonal menu launch invitation, 600px wide.
 *
 * A charcoal poster band (wordmark, season, hero statement, tasting price),
 * three featured courses, a parchment tasting-menu card with the reservation
 * button, and a footer with the practical details. No Svg here — Email
 * doesn't support it — so the rhythm comes from Dividers and colour bands.
 * render() writes the plain-text twin from the same tree.
 */
import { Column, Divider, Email, Heading, LineBreak, Link, Row, Section, Text, token } from "@hyper-elements/react";
import { allergyNote, featuredCourses, restaurant, season } from "./data.js";
import { ChefNote, CourseList, DietaryKey, ReservationCTA, SeasonLine, TastingLine, Wordmark } from "./components.js";
import { saffronSmoke, WEB_FONTS } from "./theme.js";

export default function MenuLaunchEmail() {
  return (
    <Email
      width={600}
      theme={saffronSmoke}
      lang="en-GB"
      title={`${season.name} — ${restaurant.name}`}
      previewText={`Seven courses, cooked over fire. Our winter tasting menu opens 20 November — £95 per person, wine pairing +£65.`}
      fonts={[...WEB_FONTS]}
    >
      {/* The poster: charcoal band, season and hero statement */}
      <Section style={{ backgroundColor: token("colors.charcoal"), color: token("colors.onDark"), padding: [40, 48, 44], gap: 36, mobile: { padding: [32, 24, 36], gap: 28 } }}>
        <Row style={{ alignItems: "center" }}>
          <Column>
            <Wordmark light />
          </Column>
          <Column>
            <Text style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.6, textTransform: "uppercase", color: token("colors.onDarkMuted"), textAlign: "right", mobile: { textAlign: "left" } }}>
              Marylebone, London
            </Text>
          </Column>
        </Row>
        <Column style={{ gap: 14 }}>
          <SeasonLine light short />
          <Heading level={1} style={{ fontSize: 54, color: token("colors.onDark"), mobile: { fontSize: 40 } }}>
            Seven courses, cooked over fire.
          </Heading>
          <Text style={{ fontSize: 18, lineHeight: 1.55, color: token("colors.onDarkMuted"), mobile: { fontSize: 16 } }}>
            Saffron meets smoke. Our winter tasting menu opens on 20 November — seven courses, every one of them through the grill, the ember oven or the smoker.
          </Text>
        </Column>
        <Row style={{ padding: [24, 0, 0], border: { top: { width: 1, style: "solid", color: "#4A4132" } } }}>
          <TastingLine light />
        </Row>
      </Section>

      {/* A first taste: three featured courses */}
      <Section style={{ padding: [40, 48, 0], gap: 20, mobile: { padding: [32, 24, 0], gap: 16 } }}>
        <Column style={{ gap: 8 }}>
          <Text style={{ apply: ["eyebrow"] }}>From the menu</Text>
          <Heading level={2}>A first taste</Heading>
        </Column>
        <CourseList list={featuredCourses} />
        <Text style={{ fontSize: 15 }}>
          <Link href={restaurant.menuUrl} style={{ color: token("colors.saffronDeep") }}>
            See the full seven-course menu
          </Link>
        </Text>
      </Section>

      {/* The tasting menu card: price, chef, reservation */}
      <Section style={{ padding: [40, 48, 0], mobile: { padding: [32, 24, 0] } }}>
        <Column style={{ apply: ["card"], gap: 20 }}>
          <Column style={{ gap: 8 }}>
            <Heading level={3}>The tasting menu</Heading>
            <Text style={{ fontSize: 15, lineHeight: 1.6 }}>
              Seven courses for the whole table, served Tuesday to Saturday from 6pm. The menu changes with what the market brings in; the saffron stays.
            </Text>
          </Column>
          <ChefNote short />
          <Divider />
          <ReservationCTA />
        </Column>
      </Section>

      {/* Dietary note and footer */}
      <Section style={{ padding: [40, 48, 48], gap: 20, mobile: { padding: [32, 24, 40] } }}>
        <Column style={{ gap: 8 }}>
          <DietaryKey />
          <Text style={{ apply: ["smallMuted"] }}>{allergyNote}</Text>
        </Column>
        <Divider />
        <Text style={{ fontSize: 13, lineHeight: 1.7, color: token("colors.muted") }}>
          {restaurant.name} · {restaurant.address.join(", ")} · {restaurant.hours}
          <LineBreak />
          <Link href={`tel:${restaurant.phone.replace(/\s/g, "")}`} style={{ color: token("colors.muted") }}>
            {restaurant.phone}
          </Link>
          {" · "}
          <Link href={`mailto:${restaurant.email}`} style={{ color: token("colors.muted") }}>
            {restaurant.email}
          </Link>
        </Text>
        <Text style={{ fontSize: 12, lineHeight: 1.6, color: token("colors.muted") }}>
          You’re receiving this because you joined our list at the restaurant.{" "}
          <Link href={`${restaurant.site}/unsubscribe`} style={{ color: token("colors.muted") }}>
            Leave the list
          </Link>
          .
        </Text>
      </Section>
    </Email>
  );
}
