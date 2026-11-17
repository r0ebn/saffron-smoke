/**
 * The canvas: a 1080 × 1080 Instagram post announcing the season.
 *
 * Charcoal ground, a drawn flame, the season's name set huge in the serif,
 * the saffron sprig, the dates and the booking line. renderImage() draws it
 * as a PNG and as an SVG (whose text is paths, so it shows without fonts).
 * No images: every visual is a Hyper Elements element or a drawn Svg shape.
 */
import { Button, Canvas, Column, Heading, LineBreak, Row, Text, token } from "@hyper-elements/react";
import { restaurant, season } from "./data.js";
import { FlameMark, SaffronSprig, Wordmark } from "./components.js";
import { saffronSmoke, SERIF, WEB_FONTS } from "./theme.js";

export default function SeasonAnnouncement() {
  return (
    <Canvas
      width={1080}
      height={1080}
      theme={saffronSmoke}
      title={`${season.name} — ${restaurant.name}`}
      fonts={[...WEB_FONTS]}
      style={{ backgroundColor: token("colors.charcoal"), color: token("colors.onDark"), padding: 80, gap: 40, alignItems: "stretch", justifyContent: "space-between" }}
    >
      {/* Top: wordmark and establishment year */}
      <Row stackOnMobile={false} style={{ alignItems: "center" }}>
        <Column>
          <Wordmark light size={24} />
        </Column>
        <Column>
          <Text style={{ fontSize: 15, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: token("colors.onDarkMuted"), textAlign: "right" }}>
            Est. {restaurant.established} · Marylebone
          </Text>
        </Column>
      </Row>

      {/* Middle: flame, season name, sprig, tagline, dates */}
      <Column style={{ gap: 30, alignItems: "center" }}>
        <FlameMark height={150} />
        <Heading level={1} style={{ fontSize: 118, fontWeight: 500, lineHeight: 0.98, letterSpacing: -1, textAlign: "center", color: token("colors.onDark") }}>
          The Ember
          <LineBreak />
          Season
        </Heading>
        <SaffronSprig size={64} />
        <Text style={{ fontFamily: SERIF, fontSize: 38, fontStyle: "italic", fontWeight: 500, lineHeight: 1.2, textAlign: "center", color: token("colors.onDark") }}>
          Seven courses, cooked over fire.
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 600, letterSpacing: 3.2, textTransform: "uppercase", textAlign: "center", color: token("colors.saffron") }}>
          {season.datesShort}
        </Text>
      </Column>

      {/* Bottom: booking button and address */}
      <Column style={{ gap: 18, alignItems: "center" }}>
        <Button href={restaurant.reservations} style={{ width: 320, fontSize: 16, padding: [20, 32], color: token("colors.primaryForeground") }}>
          Book a table
        </Button>
        <Text style={{ fontSize: 16, letterSpacing: 1.2, textAlign: "center", color: token("colors.onDarkMuted") }}>
          saffronandsmoke.example · {restaurant.address.join(", ")}
        </Text>
      </Column>
    </Canvas>
  );
}
