/**
 * Saffron & Smoke — the single source of truth.
 *
 * One fictional restaurant, one season, one menu. Every output (email, page,
 * print document, social canvas) reads from this file, so changing the menu
 * here changes it everywhere. Nothing here is real: the restaurant, the chef,
 * the address and the links are invented for the template.
 */

export type DietaryMark = "v" | "gf" | "n";

export const DIETARY_LABELS: Record<DietaryMark, string> = {
  v: "vegetarian",
  gf: "gluten-free",
  n: "contains nuts",
};

export interface Course {
  /** Short key, used for React keys and anchors. */
  id: string;
  name: string;
  description: string;
  /** À la carte price in pounds. */
  price: number;
  dietary: DietaryMark[];
  /** Shown in the email's featured-courses section. */
  featured?: boolean;
}

export const gbp = (n: number): string => `£${n}`;

export const restaurant = {
  name: "Saffron & Smoke",
  /** Short form for tight spots (canvas footer, page header). */
  shortName: "Saffron & Smoke",
  tagline: "Seven courses, cooked over fire.",
  address: ["14 Ember Lane, Marylebone", "London W1U 2AB"],
  hours: "Tuesday – Saturday, 6pm – 11pm",
  hoursShort: "Tue – Sat · 6 – 11pm",
  phone: "+44 20 7946 0821",
  email: "book@saffronandsmoke.example",
  site: "https://saffronandsmoke.example",
  reservations: "https://saffronandsmoke.example/book",
  menuUrl: "https://saffronandsmoke.example/menu/ember-season",
  established: 2019,
};

export const season = {
  name: "The Ember Season",
  /** Long form for headings and the email. */
  dates: "20 November 2026 – 28 February 2027",
  /** Short form for the canvas and tight spots. */
  datesShort: "20 NOV 2026 — 28 FEB 2027",
  intro:
    "Our winter menu is built around two things: saffron, bought at harvest and kept for the cold months, and fire — the grill, the ember oven and the smoker at the back of the kitchen. Seven courses, one through-line, and nothing that hasn't met a flame.",
};

export const tasting = {
  courses: 7,
  price: 95,
  pairingPrice: 65,
  priceLine: "Seven courses · £95 per person",
  pairingLine: "Wine pairing · +£65 per person",
};

export const chef = {
  name: "Elena Marchetti",
  title: "Chef & Founder",
  note: "Every course this season passes through fire — the grill, the ember oven, the smoker. Saffron is our through-line: it meets smoke the way autumn meets winter, and the menu is built around that meeting.",
  noteShort:
    "Every course this season passes through fire. Saffron is our through-line — it meets smoke the way autumn meets winter.",
};

export const courses: Course[] = [
  {
    id: "veloute",
    name: "Saffron & Charred Leek Velouté",
    description: "Smoked crème fraîche, chive oil, toasted seeds.",
    price: 14,
    dietary: ["v", "gf"],
  },
  {
    id: "beetroot",
    name: "Ember-Roasted Beetroot",
    description: "Whipped goat's curd, hazelnut, sherry caramel.",
    price: 16,
    dietary: ["v", "gf", "n"],
  },
  {
    id: "scallop",
    name: "Hand-Dived Scallop",
    description: "Saffron beurre blanc, sea herbs, brown butter.",
    price: 22,
    dietary: ["gf"],
    featured: true,
  },
  {
    id: "duck",
    name: "Smoked Duck Breast",
    description: "Blackberry, charred endive, juniper jus.",
    price: 28,
    dietary: ["gf"],
    featured: true,
  },
  {
    id: "risotto",
    name: "Wild Mushroom & Barley Risotto",
    description: "Aged parmesan, black truffle, sage.",
    price: 19,
    dietary: ["v"],
  },
  {
    id: "beef",
    name: "Aged Beef Fillet",
    description: "Smoked bone-marrow crust, celeriac, red wine.",
    price: 38,
    dietary: ["gf"],
    featured: true,
  },
  {
    id: "panna-cotta",
    name: "Burnt Honey & Saffron Panna Cotta",
    description: "Smoked almond praline, poached pear.",
    price: 13,
    dietary: ["v", "gf", "n"],
  },
];

export const featuredCourses = courses.filter((c) => c.featured);

/** The three movements of the wine pairing, shown on the page. */
export const pairingNotes = [
  {
    title: "Amber & oak",
    text: "An oaked white from the Jura opens the meal — walnut, warm spice, and just enough weight for the velouté.",
  },
  {
    title: "Stone & smoke",
    text: "Etna Rosso and a lightly smoked Syrah carry the middle courses, standing up to the grill without shouting.",
  },
  {
    title: "Honey & spice",
    text: "A late-harvest Riesling meets the burnt honey of the final course, and the saffron comes back one last time.",
  },
];

export const allergyNote =
  "Please tell us about allergies when you book — the kitchen can adapt every course except the panna cotta's praline. A full allergen list is available on request.";
