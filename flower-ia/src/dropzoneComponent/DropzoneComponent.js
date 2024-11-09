import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@mui/material';
import HighlightedCountriesMap from '../highlightedCountriesMap/HighlightedCountriesMap';

const flowerMapping = {
  "tulip": "Tulipan",
  "orchid": "Orquídea",
  "Peonies": "Peonías",
  "Hydrangeas": "Hortensia",
  "Lilies": "Lirio",
  "Gardenias": "Gardenia",
  "rose": "Rosa",
  "common_daisy": "Margarita",
  "Hibiscus": "Hibisco",
  "Bougainvillea": "Buganvilla",
  "sunflower": "Girasol",
  "lotus": "Loto",
  "dandelion": "Diente de león",
  "bellflower": "Campánula",
  "astilbe": "Astilbe",
  "black_eyed_susan": "Susana de ojos negros",
  "calendula": "Caléndula",
  "california_poppy": "Amapola de California",
  "carnation": "Clavel",
  "coreopsis": "Coreopsis",
  "iris": "Iris",
  "daffodil": "Narciso",
  "geranium": "Geranio",
  "hyacinth": "Jacinto",
  "jasmine": "Jazmín",
  "magnolia": "Magnolia",
  "primrose": "Primavera",
  "verbena": "Verbena",
  "water_lily": "Nenúfar"
};

const flowerDetails = [
  {
    commonName: "Tulipan",
    scientificName: "Tulipa",
    family: "Liliaceae",
    habitat: "Regiones templadas de Europa y Asia.",
    lifeCycle: "Perenne.",
    height: "30-60 cm de altura.",
    flowerColor: "Varía (rojo, amarillo, púrpura, blanco).",
    bloomSeason: "Primavera.",
    uses: "Ornamental.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo.",
    soilType: "Bien drenado, arenoso.",
    pestResistance: "Moderada.",
    toxicity: "Ligeramente tóxica.",
    propagation: "Semillas y bulbos.",
    culturalSignificance: "Símbolo de amor y primavera.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "Netherlands, Turkey, Iran, Kazakhstan, Uzbekistan, Turkmenistan"
  },
  {
    commonName: "Orquídea",
    scientificName: "Orchidaceae",
    family: "Orchidaceae",
    habitat: "Tropical y subtropical.",
    lifeCycle: "Perenne.",
    height: "Varía ampliamente.",
    flowerColor: "Varía (blanco, púrpura, amarillo).",
    bloomSeason: "Primavera a otoño.",
    uses: "Ornamental, medicinal.",
    growthRate: "Lento.",
    lightRequirements: "Sombra parcial.",
    waterRequirements: "Medio.",
    soilType: "Bien drenado, sustratos especiales.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Semillas, esquejes.",
    culturalSignificance: "Símbolo de belleza y fuerza.",
    activeComponents: "No aplicable.",
    conservationStatus: "Algunas especies en peligro.",
    countries: "Brazil, Colombia, Ecuador, Philippines, Thailand, Indonesia, Malaysia, Australia, India"
  },
  {
    commonName: "Peonías",
    scientificName: "Paeonia",
    family: "Paeoniaceae",
    habitat: "Regiones templadas de Europa y Asia.",
    lifeCycle: "Perenne.",
    height: "60-90 cm de altura.",
    flowerColor: "Rosa, blanco, rojo.",
    bloomSeason: "Primavera.",
    uses: "Ornamental.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Medio.",
    soilType: "Rico en nutrientes.",
    pestResistance: "Baja.",
    toxicity: "Ligeramente tóxica.",
    propagation: "Semillas, división.",
    culturalSignificance: "Símbolo de riqueza y honor.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, China, Japan, Russia, Korea, France, Italy"
  },
  {
    commonName: "Hortensia",
    scientificName: "Hydrangea",
    family: "Hydrangeaceae",
    habitat: "Regiones templadas.",
    lifeCycle: "Perenne.",
    height: "1-3 m de altura.",
    flowerColor: "Rosa, azul, blanco.",
    bloomSeason: "Verano.",
    uses: "Ornamental.",
    growthRate: "Moderada.",
    lightRequirements: "Sombra parcial.",
    waterRequirements: "Alto.",
    soilType: "Ácido y bien drenado.",
    pestResistance: "Moderada.",
    toxicity: "Ligeramente tóxica.",
    propagation: "Esquejes.",
    culturalSignificance: "Símbolo de gracia y belleza.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "Japan, Korea, United States of America, China, Taiwan, United Kingdom, France"
  },
  {
    commonName: "Lirio",
    scientificName: "Lilium",
    family: "Liliaceae",
    habitat: "Regiones templadas.",
    lifeCycle: "Perenne.",
    height: "60-120 cm de altura.",
    flowerColor: "Varía (blanco, naranja, amarillo, rojo).",
    bloomSeason: "Primavera a verano.",
    uses: "Ornamental.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Medio.",
    soilType: "Bien drenado.",
    pestResistance: "Baja.",
    toxicity: "Altamente tóxica para gatos.",
    propagation: "Bulbos.",
    culturalSignificance: "Pureza y renovación.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, China, Japan, South Korea, Italy, Netherlands"
  },
  {
    commonName: "Gardenia",
    scientificName: "Gardenia jasminoides",
    family: "Rubiaceae",
    habitat: "Regiones tropicales y subtropicales.",
    lifeCycle: "Perenne.",
    height: "0.5-1.5 m de altura.",
    flowerColor: "Blanco.",
    bloomSeason: "Verano.",
    uses: "Ornamental y aromático.",
    growthRate: "Lento.",
    lightRequirements: "Sombra parcial.",
    waterRequirements: "Alto.",
    soilType: "Ácido y bien drenado.",
    pestResistance: "Moderada.",
    toxicity: "Ligeramente tóxica.",
    propagation: "Esquejes.",
    culturalSignificance: "Pureza y amor.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Brazil, South Africa, Australia, India, China, Philippines"
  },
  {
    commonName: "Rosa",
    scientificName: "Rosa",
    family: "Rosaceae",
    habitat: "Regiones templadas.",
    lifeCycle: "Perenne.",
    height: "30-150 cm de altura.",
    flowerColor: "Varía (rojo, blanco, rosa, amarillo).",
    bloomSeason: "Primavera a otoño.",
    uses: "Ornamental, medicinal.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Medio.",
    soilType: "Bien drenado y rico.",
    pestResistance: "Moderada.",
    toxicity: "Generalmente no tóxica.",
    propagation: "Esquejes, injertos.",
    culturalSignificance: "Amor y pasión.",
    activeComponents: "Aceites esenciales.",
    conservationStatus: "Común.",
    countries: "United States of America, Turkey, China, France, Japan, United Kingdom, India, Italy"
  },
  {
    commonName: "Margarita",
    scientificName: "Bellis perennis",
    family: "Asteraceae",
    habitat: "Regiones templadas.",
    lifeCycle: "Anual o perenne.",
    height: "10-30 cm de altura.",
    flowerColor: "Blanco con centro amarillo.",
    bloomSeason: "Primavera y verano.",
    uses: "Ornamental, medicinal.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo.",
    soilType: "Bien drenado.",
    pestResistance: "Alta.",
    toxicity: "No tóxica.",
    propagation: "Semillas.",
    culturalSignificance: "Inocencia y pureza.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, United Kingdom, Germany, France, Netherlands, Japan"
  },
  {
    commonName: "Hibisco",
    scientificName: "Hibiscus rosa-sinensis",
    family: "Malvaceae",
    habitat: "Regiones tropicales y subtropicales, comúnmente encontrado en Asia y el Pacífico.",
    lifeCycle: "Perenne.",
    height: "1-3 m de altura.",
    flowerColor: "Varía (rojo, rosa, amarillo, blanco).",
    bloomSeason: "Primavera a otoño.",
    uses: "Ornamental, medicinal (infusiones).",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Alto, necesita riego regular.",
    soilType: "Rico en materia orgánica y bien drenado.",
    pestResistance: "Moderada, susceptible a pulgones y cochinillas.",
    toxicity: "Generalmente no tóxica.",
    propagation: "Esquejes y semillas.",
    culturalSignificance: "Símbolo de belleza y juventud, a menudo asociado con la cultura hawaiana.",
    activeComponents: "Antioxidantes, se utiliza en la medicina herbal.",
    conservationStatus: "Común.",
    countries: "United States of America, Mexico, India, Philippines, Thailand, Caribbean, Malaysia, Australia, Egypt"
  },
  {
    commonName: "Buganvilla",
    scientificName: "Bougainvillea",
    family: "Nyctaginaceae",
    habitat: "Regiones tropicales y subtropicales.",
    lifeCycle: "Perenne.",
    height: "1-12 m de altura.",
    flowerColor: "Varía (rosa, púrpura, rojo, blanco).",
    bloomSeason: "Todo el año, pico en primavera y verano.",
    uses: "Ornamental.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo.",
    soilType: "Bien drenado.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Esquejes.",
    culturalSignificance: "Símbolo de pasión y alegría.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "Brazil, Argentina, India, Indonesia, Philippines, Thailand, Mexico, Australia"
  },
  {
    commonName: "Girasol",
    scientificName: "Helianthus annuus",
    family: "Asteraceae",
    habitat: "Regiones templadas.",
    lifeCycle: "Anual.",
    height: "1.5-3.5 m de altura.",
    flowerColor: "Amarillo brillante.",
    bloomSeason: "Verano.",
    uses: "Ornamental, semillas comestibles.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo.",
    soilType: "Bien drenado y fértil.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Semillas.",
    culturalSignificance: "Símbolo de adoración y lealtad.",
    activeComponents: "Aceite de girasol.",
    conservationStatus: "Común.",
    countries: "United States of America, Russia, Ukraine, Argentina, China, India, France, Canada, Italy, Spain"
  },
  {
    commonName: "Loto",
    scientificName: "Nelumbo nucifera",
    family: "Nelumbonaceae",
    habitat: "Lagos y estanques en regiones tropicales y subtropicales.",
    lifeCycle: "Perenne.",
    height: "Hasta 1.5 m de altura.",
    flowerColor: "Rosa, blanco o amarillo.",
    bloomSeason: "Verano.",
    uses: "Ornamental, alimenticio (semillas y rizomas), medicinal.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Alto, necesita estar en agua.",
    soilType: "Suelo arcilloso y rico en nutrientes.",
    pestResistance: "Alta, pocas plagas.",
    toxicity: "No tóxica.",
    propagation: "Semillas y rizomas.",
    culturalSignificance: "Símbolo de pureza y belleza en varias culturas.",
    activeComponents: "Antioxidantes y compuestos antiinflamatorios.",
    conservationStatus: "Algunas especies están amenazadas.",
    countries: "India, China, Japan, Thailand, Vietnam, Egypt, Cambodia, Myanmar"
  },
  {
    commonName: "Diente de león",
    scientificName: "Taraxacum officinale",
    family: "Asteraceae",
    habitat: "Regiones templadas, comúnmente en prados y jardines.",
    lifeCycle: "Perenne.",
    height: "10-30 cm de altura.",
    flowerColor: "Amarillo brillante.",
    bloomSeason: "Primavera a otoño.",
    uses: "Medicinal, ensaladas, té.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol a sombra.",
    waterRequirements: "Moderado.",
    soilType: "Tolerante a varios tipos de suelo.",
    pestResistance: "Alta, rara vez se ve afectado por plagas.",
    toxicity: "No tóxica.",
    propagation: "Semillas.",
    culturalSignificance: "Asociado con la resiliencia y la transformación.",
    activeComponents: "Vitaminas A, C y K, y minerales.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, United Kingdom, Germany, France, Russia, China"
  },
  {
    commonName: "Campánula",
    scientificName: "Campanula spp.",
    family: "Campanulaceae",
    habitat: "Regiones templadas de Europa, Asia y América del Norte.",
    lifeCycle: "Perenne.",
    height: "15-90 cm de altura.",
    flowerColor: "Azul, violeta, blanco.",
    bloomSeason: "Verano.",
    uses: "Ornamental, jardinería.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Moderado.",
    soilType: "Bien drenado, suelo fértil.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Semillas y división de raíces.",
    culturalSignificance: "Simboliza la gratitud.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, United Kingdom, Germany, France, Italy, Japan"
  },
  {
    commonName: "Astilbe",
    scientificName: "Astilbe spp.",
    family: "Saxifragaceae",
    habitat: "Regiones húmedas y sombreadas, nativa de Asia y América del Norte.",
    lifeCycle: "Perenne.",
    height: "30-90 cm de altura.",
    flowerColor: "Rosa, rojo, blanco, púrpura.",
    bloomSeason: "Verano.",
    uses: "Ornamental, jardinería.",
    growthRate: "Moderada.",
    lightRequirements: "Sombra parcial a plena sombra.",
    waterRequirements: "Alto, necesita suelo húmedo.",
    soilType: "Rico en materia orgánica y bien drenado.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "División de raíces.",
    culturalSignificance: "A menudo utilizada en jardines de sombra.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, Japan, Korea, China, Russia"
  },
  {
    commonName: "Susana de ojos negros",
    scientificName: "Rudbeckia hirta",
    family: "Asteraceae",
    habitat: "Regiones templadas de América del Norte.",
    lifeCycle: "Bienal o perenne.",
    height: "30-90 cm de altura.",
    flowerColor: "Amarillo con centro negro.",
    bloomSeason: "Verano a otoño.",
    uses: "Ornamental, jardines silvestres.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo a moderado.",
    soilType: "Suelo bien drenado, tolerante a la sequía.",
    pestResistance: "Alta.",
    toxicity: "No tóxica.",
    propagation: "Semillas.",
    culturalSignificance: "Simboliza la belleza silvestre.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, Mexico"
  },
  {
    commonName: "Caléndula",
    scientificName: "Calendula officinalis",
    family: "Asteraceae",
    habitat: "Nativa de Europa, se cultiva en todo el mundo.",
    lifeCycle: "Anual.",
    height: "30-60 cm de altura.",
    flowerColor: "Naranja, amarillo.",
    bloomSeason: "Primavera a otoño.",
    uses: "Medicinal (antiinflamatorio), ornamental.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Moderado.",
    soilType: "Suelo bien drenado.",
    pestResistance: "Moderada, susceptible a pulgones.",
    toxicity: "No tóxica.",
    propagation: "Semillas.",
    culturalSignificance: "Asociada con la alegría y la protección.",
    activeComponents: "Flavonoides, carotenoides.",
    conservationStatus: "Común.",
    countries: "United States of America, Mexico, Spain, India, Morocco, Italy, France, Turkey"
  },
  {
    commonName: "Amapola de California",
    scientificName: "Eschscholzia californica",
    family: "Papaveraceae",
    habitat: "Regiones áridas y semiáridas de California.",
    lifeCycle: "Anual.",
    height: "15-60 cm de altura.",
    flowerColor: "Naranja brillante.",
    bloomSeason: "Primavera a verano.",
    uses: "Ornamental, puede usarse en herbalismo.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo.",
    soilType: "Suelo arenoso y bien drenado.",
    pestResistance: "Alta.",
    toxicity: "No tóxica.",
    propagation: "Semillas.",
    culturalSignificance: "Flor estatal de California, simboliza la belleza natural.",
    activeComponents: "Alcaloides, que pueden tener efectos calmantes.",
    conservationStatus: "Común.",
    countries: "United States of America, Mexico, Canada"
  },
  {
    commonName: "Clavel",
    scientificName: "Dianthus caryophyllus",
    family: "Caryophyllaceae",
    habitat: "Nativa del área mediterránea, cultivada en todo el mundo.",
    lifeCycle: "Anual o perenne, dependiendo de la variedad.",
    height: "30-90 cm de altura.",
    flowerColor: "Varía (rojo, rosa, blanco, amarillo).",
    bloomSeason: "Primavera a otoño.",
    uses: "Ornamental, en arreglos florales.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Moderado.",
    soilType: "Suelo bien drenado y fértil.",
    pestResistance: "Moderada, puede ser susceptible a pulgones y ácaros.",
    toxicity: "No tóxica.",
    propagation: "Semillas, esquejes.",
    culturalSignificance: "Simboliza amor y fascinación.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "Spain, Italy, United States of America, Netherlands, China, India, Turkey"
  },
  {
    commonName: "Coreopsis",
    scientificName: "Coreopsis spp.",
    family: "Asteraceae",
    habitat: "Nativa de América del Norte, crece en praderas y campos.",
    lifeCycle: "Anual o perenne.",
    height: "30-90 cm de altura.",
    flowerColor: "Amarillo, a menudo con centros marrones.",
    bloomSeason: "Verano a otoño.",
    uses: "Ornamental, en jardines silvestres.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo a moderado.",
    soilType: "Bien drenado.",
    pestResistance: "Alta.",
    toxicity: "No tóxica.",
    propagation: "Semillas y división de raíces.",
    culturalSignificance: "Asociada con la belleza silvestre.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, Mexico"
  },
  {
    commonName: "Iris",
    scientificName: "Iris spp.",
    family: "Iridaceae",
    habitat: "Regiones templadas y tropicales, crece en suelos húmedos.",
    lifeCycle: "Perenne.",
    height: "30-100 cm de altura.",
    flowerColor: "Varía (púrpura, azul, blanco, amarillo).",
    bloomSeason: "Primavera a principios de verano.",
    uses: "Ornamental, en jardines.",
    growthRate: "Lenta a moderada.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Moderado, no tolera el agua estancada.",
    soilType: "Suelo bien drenado y fértil.",
    pestResistance: "Moderada.",
    toxicity: "Algunas especies son tóxicas.",
    propagation: "Rizomas.",
    culturalSignificance: "Simboliza fe y esperanza.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, Japan, China, India, Russia, France, Netherlands"
  },
  {
    commonName: "Narciso",
    scientificName: "Narcissus",
    family: "Amaryllidaceae",
    habitat: "Regiones templadas de Europa y Asia.",
    lifeCycle: "Perenne.",
    height: "30-60 cm de altura.",
    flowerColor: "Varía (blanco, amarillo, naranja).",
    bloomSeason: "Primavera.",
    uses: "Ornamental.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Bajo.",
    soilType: "Bien drenado, arenoso.",
    pestResistance: "Moderada.",
    toxicity: "Ligeramente tóxica.",
    propagation: "Semillas y bulbos.",
    culturalSignificance: "Símbolo de amor y renacimiento.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, United Kingdom, Netherlands, Germany, Italy, Spain, France"
  },
  {
    commonName: "Geranio",
    scientificName: "Pelargonium",
    family: "Geraniaceae",
    habitat: "Áreas templadas de África del Sur.",
    lifeCycle: "Perenne.",
    height: "30-90 cm de altura.",
    flowerColor: "Varía (rojo, rosa, blanco, morado).",
    bloomSeason: "Primavera y verano.",
    uses: "Ornamental y medicinal.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Moderado.",
    soilType: "Bien drenado, fértil.",
    pestResistance: "Baja.",
    toxicity: "Baja toxicidad.",
    propagation: "Esquejes y semillas.",
    culturalSignificance: "Símbolo de amistad y devoción.",
    activeComponents: "Aceites esenciales.",
    conservationStatus: "Común.",
    countries: "United States of America, South Africa, United Kingdom, Spain, Germany, Australia"
  },
  {
    commonName: "Jacinto",
    scientificName: "Hyacinthus",
    family: "Asparagaceae",
    habitat: "Regiones templadas de Europa y Asia.",
    lifeCycle: "Perenne.",
    height: "15-30 cm de altura.",
    flowerColor: "Varía (azul, violeta, blanco, rosa).",
    bloomSeason: "Primavera.",
    uses: "Ornamental.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Moderado.",
    soilType: "Bien drenado, arenoso.",
    pestResistance: "Baja.",
    toxicity: "Tóxica.",
    propagation: "Bulbos.",
    culturalSignificance: "Símbolo de belleza y renovación.",
    activeComponents: "Alcaloides.",
    conservationStatus: "Común.",
    countries: "United States of America, Netherlands, France, Germany, Turkey, Egypt"
  },
  {
    commonName: "Magnolia",
    scientificName: "Magnolia",
    family: "Magnoliaceae",
    habitat: "Regiones templadas y subtropicales del mundo.",
    lifeCycle: "Perenne.",
    height: "3-30 m de altura.",
    flowerColor: "Blanco, rosa, púrpura, amarillo.",
    bloomSeason: "Primavera a verano.",
    uses: "Ornamental.",
    growthRate: "Lenta a moderada.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Moderado.",
    soilType: "Bien drenado, arcilloso o arenoso.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Esquejes y semillas.",
    culturalSignificance: "Símbolo de dignidad y nobleza.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, China, Japan, Korea, India, Malaysia"
  },
  {
    commonName: "Primavera",
    scientificName: "Bougainvillea",
    family: "Nyctaginaceae",
    habitat: "Regiones tropicales y subtropicales.",
    lifeCycle: "Perenne.",
    height: "1-12 m de altura.",
    flowerColor: "Fucsia, púrpura, rojo, naranja, blanco.",
    bloomSeason: "Primavera a otoño.",
    uses: "Ornamental.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo a moderado.",
    soilType: "Bien drenado, arenoso.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Esquejes.",
    culturalSignificance: "Símbolo de alegría y celebración.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, United Kingdom, Japan, China, South Korea, Canada"
  },
  {
    commonName: "Verbena",
    scientificName: "Verbena officinalis",
    family: "Verbenaceae",
    habitat: "Regiones templadas de Europa y América.",
    lifeCycle: "Anual o perenne.",
    height: "30-90 cm de altura.",
    flowerColor: "Morado, rosa, blanco, rojo.",
    bloomSeason: "Primavera a otoño.",
    uses: "Ornamental y medicinal.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Bajo a moderado.",
    soilType: "Bien drenado, fértil.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Semillas y esquejes.",
    culturalSignificance: "Símbolo de protección y amor.",
    activeComponents: "Ácidos fenólicos.",
    conservationStatus: "Común.",
    countries: "United States of America, Mexico, Brazil, Spain, Argentina, Italy, France"
  },
  {
    commonName: "Nenúfar",
    scientificName: "Nymphaea",
    family: "Nymphaeaceae",
    habitat: "Aguas tranquilas de regiones templadas y tropicales.",
    lifeCycle: "Perenne.",
    height: "Varía según la especie.",
    flowerColor: "Blanco, rosa, amarillo, azul.",
    bloomSeason: "Primavera a verano.",
    uses: "Ornamental en jardines acuáticos.",
    growthRate: "Moderada.",
    lightRequirements: "Pleno sol.",
    waterRequirements: "Alto.",
    soilType: "Lodo o barro en el fondo del agua.",
    pestResistance: "Moderada.",
    toxicity: "No tóxica.",
    propagation: "Semillas y rizomas.",
    culturalSignificance: "Símbolo de pureza y tranquilidad.",
    activeComponents: "No aplicable.",
    conservationStatus: "Común.",
    countries: "United States of America, Canada, Brazil, India, Egypt, China, Australia, Thailand"
  },
  {
    commonName: "Jazmín",
    scientificName: "Jasminum",
    family: "Oleaceae",
    habitat: "Regiones tropicales y subtropicales de Asia, Europa y África.",
    lifeCycle: "Perenne.",
    height: "Varía según la especie, puede alcanzar hasta 3-5 metros.",
    flowerColor: "Blanco, amarillo, rosa, morado, dependiendo de la especie.",
    bloomSeason: "Primavera a verano.",
    uses: "Ornamental, medicinal, cosmético (aceite esencial), aromático.",
    growthRate: "Rápida.",
    lightRequirements: "Pleno sol a sombra parcial.",
    waterRequirements: "Moderado, no tolera encharcamientos.",
    soilType: "Bien drenado, ligeramente ácido a neutro.",
    pestResistance: "Baja (puede ser susceptible a plagas como áfidos).",
    toxicity: "No tóxica.",
    propagation: "Esquejes, acodo, y semillas.",
    culturalSignificance: "Símbolo de amor y belleza en varias culturas, usado en perfumes y aromaterapia.",
    activeComponents: "Aceites esenciales, flavonoides, compuestos fenólicos.",
    conservationStatus: "Común, algunas especies están en peligro debido a la destrucción del hábitat.",
    countries: "India, China, Egypt, Pakistan, Thailand, Indonesia, Philippines, Morocco"
  }
];

function DropzoneComponent() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [flowerInfo, setFlowerInfo] = useState(null);
  const [mercadoLibreUrl, setMercadoLibreUrl] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      procesarImagen(imgUrl);
    }
  }, []);

  const procesarImagen = async (imgUrl) => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = async () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
  
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const { width, height } = imageData;
      const numberOfPixels = width * height; // Total de píxeles
      const numberOfChannels = imageData.data.length / numberOfPixels; // Número de canales
  
      // Verifica si tiene 3 canales
      if (numberOfChannels === 4) {
        console.log(`La imagen tiene ${numberOfPixels} píxeles y ${numberOfChannels} canales (RGBA).`);
      } else if (numberOfChannels === 3) {
        console.log(`La imagen tiene ${numberOfPixels} píxeles y ${numberOfChannels} canales (RGB).`);
      } else {
        console.log(`La imagen tiene ${numberOfPixels} píxeles y ${numberOfChannels} canales.`);
      }

      const flowerName = "tulip"; // reemplazar con nombre procesado
      const spanishName = flowerMapping[flowerName] || "Desconocida";
      setResult(`${spanishName}`);

      const selectedFlower = flowerDetails.find(detail => detail.commonName === flowerMapping[flowerName]);
      setFlowerInfo(selectedFlower);

      const mercadoLibreUrl = 'https://listado.mercadolibre.com.ar/' + spanishName + '?category=MLA11033';
      setMercadoLibreUrl(mercadoLibreUrl);
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div style={styles.container}>
      <h3 style={styles.mainText}>Seleccioná la imagen de una flor</h3>
      <div style={styles.flexContainer}>
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suba una imagen de una flor</p>
          ) : (
            <p>Arrastrá o seleccioná un archivo</p>
          )}
        </div>
        <div style={styles.detailsContainer}>
          {image && (
            <div style={styles.previewContainer}>
              <img src={image} alt="Uploaded preview" style={styles.image} />
              <p style={styles.result}>{result}</p>
            </div>
          )}
          {flowerInfo && (
            <div style={styles.flowerDetails}>
              <h4 style={{ textDecoration: 'underline' }}>Detalles de la Flor: {flowerInfo.commonName}</h4>
              <p><strong>Nombre científico:</strong> {flowerInfo.scientificName}</p>
              <p><strong>Familia botánica:</strong> {flowerInfo.family}</p>
              <p><strong>Hábitat natural:</strong> {flowerInfo.habitat}</p>
              <p><strong>Ciclo de vida:</strong> {flowerInfo.lifeCycle}</p>
              <p><strong>Altura y tamaño:</strong> {flowerInfo.height}</p>
              <p><strong>Color de la flor:</strong> {flowerInfo.flowerColor}</p>
              <p><strong>Época de floración:</strong> {flowerInfo.bloomSeason}</p>
              <p><strong>Usos:</strong> {flowerInfo.uses}</p>
              <p><strong>Tasa de crecimiento:</strong> {flowerInfo.growthRate}</p>
              <p><strong>Requerimientos de luz:</strong> {flowerInfo.lightRequirements}</p>
              <p><strong>Requerimientos de agua:</strong> {flowerInfo.waterRequirements}</p>
              <p><strong>Tipo de suelo:</strong> {flowerInfo.soilType}</p>
              <p><strong>Resistencia a plagas:</strong> {flowerInfo.pestResistance}</p>
              <p><strong>Toxicidad:</strong> {flowerInfo.toxicity}</p>
              <p><strong>Propagación:</strong> {flowerInfo.propagation}</p>
              <p><strong>Significado cultural:</strong> {flowerInfo.culturalSignificance}</p>
              <p><strong>Estado de conservación:</strong> {flowerInfo.conservationStatus}</p>
            </div>
          )}
          {mercadoLibreUrl && (
            <div style={styles.resultsContainer}>
              <h2>Comprar en MercadoLibre:</h2>
              <Button 
                variant="contained" 
                color="primary" 
                href={mercadoLibreUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Ver listado de {result}
              </Button>
            </div>
          )}
          {flowerInfo && flowerInfo.countries && (
            <HighlightedCountriesMap countries={flowerInfo.countries} />
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #e0f7fa, #fff3e0)',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '800px',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    padding: '50px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    width: '95%',
    textAlign: 'center',
    cursor: 'pointer',
    marginBottom: '20px',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  detailsContainer: {
    width: '100%',
    padding: '20px',
  },
  previewContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '300px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  result: {
    marginTop: '10px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'underline'
  },
  flowerDetails: {
    marginTop: '20px',
    textAlign: 'left',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  resultsContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  purchaseButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  mainText: {
    fontSize: '24px',
    color: '#1f2121',
    textAlign: 'center',
    marginBottom: '20px',
    textDecoration: 'underline',
    fontWeight: '600',
    fontFamily: "'Poppins', sans-serif",
  },
};


export default DropzoneComponent;