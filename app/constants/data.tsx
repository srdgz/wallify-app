import { Filters, FiltersTranslations } from "@/app/constants/types";

const categories: string[] = [
  "fashion",
  "nature",
  "science",
  "education",
  "feelings",
  "health",
  "people",
  "places",
  "animals",
  "computer",
  "food",
  "sports",
  "travel",
  "buildings",
  "business",
  "music",
];

const categoryTranslations: { [key: string]: string } = {
  fashion: "Moda",
  nature: "Naturaleza",
  science: "Ciencia",
  education: "Educación",
  feelings: "Sentimientos",
  health: "Salud",
  people: "Personas",
  places: "Lugares",
  animals: "Animales",
  computer: "Ordenadores",
  food: "Comida",
  sports: "Deportes",
  travel: "Viajes",
  buildings: "Edificios",
  business: "Negocios",
  music: "Música",
};

const filters: Filters = {
  order: ["popular", "latest"],
  orientation: ["horizontal", "vertical"],
  type: ["photo", "illustration", "vector"],
  colors: [
    "red",
    "orange",
    "yellow",
    "green",
    "turquoise",
    "blue",
    "pink",
    "gray",
    "black",
    "brown",
    "white",
  ],
};

const filtersTranslations: FiltersTranslations = {
  order: {
    popular: "Popular",
    latest: "Más reciente",
  },
  orientation: {
    horizontal: "Horizontal",
    vertical: "Vertical",
  },
  type: {
    photo: "Foto",
    illustration: "Ilustración",
    vector: "Vector",
  },
  colors: {
    red: "Rojo",
    orange: "Naranja",
    yellow: "Amarillo",
    green: "Verde",
    turquoise: "Turquesa",
    blue: "Azul",
    pink: "Rosa",
    gray: "Gris",
    black: "Negro",
    brown: "Marrón",
    white: "Blanco",
  },
  titles: {
    order: "Ordenar por",
    orientation: "Orientación",
    type: "Tipo",
    colors: "Colores",
  },
};

export const data = {
  categories,
  categoryTranslations,
  filters,
  filtersTranslations,
};
