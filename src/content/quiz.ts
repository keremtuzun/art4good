export type QuizQuestion = {
  question: string;
  options: readonly [string, string, string];
  answer: number;
  explanation: string;
  source: { label: string; url: string };
};

// Questions are intentionally in English on both language routes.
// Keep the scope and year in each numerical question; these are not art-access estimates.
export const QUIZ_QUESTIONS: readonly QuizQuestion[] = [
  {
    question: "What percentage of children worldwide have no access to art education?",
    options: ["About 20%", "About 50%", "There is no reliable single global figure"],
    answer: 2,
    explanation: "That exact global percentage has not been established. UNESCO highlights gaps in cultural data, so a precise-sounding answer would hide what we still need to measure.",
    source: { label: "UNESCO · Global Report on Cultural Policies", url: "https://www.unesco.org/en/culture/global-report" },
  },
  {
    question: "How many children live in extreme monetary poverty worldwide, according to UNICEF's 2025 report?",
    options: ["About 41 million", "About 412 million", "About 1.2 billion"],
    answer: 1,
    explanation: "UNICEF estimates that 412 million children live on less than US$3 per person per day. Poverty can put even basic creative materials out of reach.",
    source: { label: "UNICEF · The State of the World's Children 2025", url: "https://www.unicef.org/reports/state-of-worlds-children/2025" },
  },
  {
    question: "UNESCO's 2026 education report says roughly how many children, adolescents and youth are out of school worldwide?",
    options: ["One in six", "One in fifty", "One in two"],
    answer: 0,
    explanation: "About one in six are excluded from education. This is a general education figure, not a count of children without art classes.",
    source: { label: "UNESCO · 2026 Global Education Monitoring Report", url: "https://www.unesco.org/reports/gem-report/en/2026" },
  },
  {
    question: "What daily poverty threshold does UNICEF use for its estimate of 412 million children?",
    options: ["Less than US$3 per person", "Less than US$10 per person", "Less than US$30 per person"],
    answer: 0,
    explanation: "The 2025 report uses less than US$3 per person per day for this extreme poverty estimate. It does not measure art-supply affordability directly.",
    source: { label: "UNICEF · The State of the World's Children 2025", url: "https://www.unicef.org/reports/state-of-worlds-children/2025" },
  },
  {
    question: "How many people cannot afford a painting set on a minimum wage?",
    options: ["The exact number follows from the wage alone", "It depends on prices, household needs and who earns that wage", "Everyone on a minimum wage"],
    answer: 1,
    explanation: "A wage figure alone cannot tell us how many families can buy a set. We would also need local prices, household size, essential expenses and income data. UNICEF notes that money alone does not capture every deprivation children face.",
    source: { label: "UNICEF · The State of the World's Children 2025", url: "https://www.unicef.org/reports/state-of-worlds-children/2025" },
  },
  {
    question: "In low- and middle-income countries, what share of children are severely deprived in at least two vital areas?",
    options: ["Fewer than 1 in 100", "About 1 in 20", "More than 1 in 5"],
    answer: 2,
    explanation: "UNICEF reports more than one in five. This covers vital needs such as housing, water, sanitation, education and health; it is not an art-access statistic.",
    source: { label: "UNICEF · The State of the World's Children 2025", url: "https://www.unicef.org/reports/state-of-worlds-children/2025" },
  },
  {
    question: "Which children's right explicitly includes taking part in cultural life and the arts?",
    options: ["Article 31 of the UN Convention on the Rights of the Child", "Only a school's optional activities policy", "No international children's right"],
    answer: 0,
    explanation: "Article 31 recognises children's right to participate freely in cultural life and the arts and calls for equal opportunities to do so.",
    source: { label: "UN · Convention on the Rights of the Child, Article 31", url: "https://www.ohchr.org/en/instruments-mechanisms/instruments/convention-rights-child" },
  },
  {
    question: "Which barriers does UNESCO say arts education must address?",
    options: ["Only a lack of talent", "Limited resources, infrastructure and exclusion", "Only a lack of museums"],
    answer: 1,
    explanation: "UNESCO's 2024 framework names limited infrastructure and resources, vulnerability and exclusion among the barriers to access.",
    source: { label: "UNESCO · Framework for Culture and Arts Education", url: "https://www.unesco.org/sites/default/files/medias/fichiers/2024/04/WCCAE_UNESCO%20Framework_EN_CLT-EDWCCAE20241.pdf" },
  },
  {
    question: "In a UNESCO study of 12 developing countries, about what share of instructional time in the first two years of secondary school went to arts education on average?",
    options: ["4.8%", "24.8%", "48%"],
    answer: 0,
    explanation: "The reported average was 4.8%, ranging from 0% to 10%. This sample is not a global average.",
    source: { label: "UNESCO · Learning & Knowledge factsheet", url: "https://www.unesco.org/en/learning-knowledge" },
  },
  {
    question: "Where can culture and arts education happen, according to UNESCO?",
    options: ["Only in specialist art schools", "Only online", "In schools and in community spaces such as museums and libraries"],
    answer: 2,
    explanation: "UNESCO treats museums, galleries, libraries and cultural sites as places of learning alongside classrooms. More routes to participate can help close access gaps.",
    source: { label: "UNESCO · What you need to know about culture and arts education", url: "https://www.unesco.org/en/articles/what-you-need-know-about-culture-and-arts-education" },
  },
];
