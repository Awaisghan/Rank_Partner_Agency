export interface Publication {
  id: string;
  name: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  isNew?: boolean;
  isFavorite?: boolean;
  genres: string[];
  genreCount?: number;
  price: number;
  da: number;
  dr: number;
  tat: string;
  region: string[];
  sponsored: "Yes" | "No";
  indexed: "Yes" | "No";
  doFollow: "Yes" | "No";
  hasExample: boolean;
  llmAeo: "Yes" | "No";
  url?: string;
  exampleUrl?: string;
  niches: {
    age18?: boolean;
    heart?: boolean;
    cannabis?: boolean;
    copyright?: boolean;
    casino?: boolean;
    multiplier?: string;
  };
}

export const MOCK_PUBLICATIONS: Publication[] = [
  {
    id: "pub-1",
    name: "Daily Scanner",
    url: "dailyscanner.com",
    logoText: "DS",
    logoBg: "#000000",
    logoTextColor: "#ffffff",
    genreCount: 5,
    genres: ["News", "Entertainment", "Lifestyle", "Business", "Tech"],
    price: 75,
    da: 67,
    dr: 61,
    tat: "1 Day",
    region: ["United States"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "No",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true }
  },
  {
    id: "pub-2",
    name: "Josepvinaixa",
    url: "josepvinaixa.com",
    logoText: "repvir",
    logoBg: "#e63939",
    logoTextColor: "#ffffff",
    isNew: true,
    genreCount: 5,
    genres: ["Music", "Entertainment", "Lifestyle", "News", "Culture"],
    price: 75,
    da: 67,
    dr: 61,
    tat: "1 Day",
    region: ["United States"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "No",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true }
  },
  {
    id: "pub-3",
    name: "Hood Critic",
    url: "hoodcriticmagazine.com",
    logoText: "HC",
    logoBg: "#111111",
    logoTextColor: "#ffffff",
    genres: ["Music"],
    price: 75,
    da: 11,
    dr: 26,
    tat: "1-3 Days",
    region: ["United States", "Utah"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true }
  },
  {
    id: "pub-4",
    name: "European Financial Review",
    url: "europeanfinancialreview.com",
    logoText: "EFR",
    logoBg: "#c98a2c",
    logoTextColor: "#ffffff",
    genres: ["Business"],
    price: 150,
    da: 46,
    dr: 61,
    tat: "1-3 Days",
    region: ["Europe"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true, multiplier: "x2" }
  },
  {
    id: "pub-5",
    name: "Cali Post",
    url: "calipost.com",
    logoText: "CaliPost",
    logoBg: "#0088cc",
    logoTextColor: "#ffffff",
    genres: ["News", "Music"],
    price: 75,
    da: 60,
    dr: 43,
    tat: "1-3 Days",
    region: ["California", "United States"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true }
  },
  {
    id: "pub-6",
    name: "Medium",
    url: "medium.com",
    logoText: "M",
    logoBg: "#000000",
    logoTextColor: "#ffffff",
    genres: ["News"],
    price: 75,
    da: 95,
    dr: 94,
    tat: "1 Day",
    region: ["Global"],
    sponsored: "No",
    indexed: "No",
    doFollow: "No",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true }
  },
  {
    id: "pub-7",
    name: "NY Times Mag",
    url: "nytimes.com",
    logoText: "NYT",
    logoBg: "#222222",
    logoTextColor: "#ffffff",
    genres: ["News", "Lifestyle"],
    price: 75,
    da: 18,
    dr: 43,
    tat: "1 Day",
    region: ["New York", "United States"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "No",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true, multiplier: "x4" }
  },
  {
    id: "pub-8",
    name: "Vents Magazine",
    logoText: "VENTS",
    logoBg: "#d32f2f",
    logoTextColor: "#ffffff",
    genreCount: 3,
    genres: ["Music", "Entertainment", "Culture"],
    price: 80,
    da: 64,
    dr: 77,
    tat: "1 Week",
    region: ["United States"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true, cannabis: true, copyright: true, casino: true, multiplier: "x4" }
  },
  {
    id: "pub-9",
    name: "Forbes",
    logoText: "FORBES",
    logoBg: "#111111",
    logoTextColor: "#ffffff",
    genres: ["Business", "Tech"],
    price: 1200,
    da: 95,
    dr: 93,
    tat: "3 Days",
    region: ["Global"],
    sponsored: "Yes",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { heart: true, copyright: true }
  },
  {
    id: "pub-10",
    name: "Entrepreneur",
    logoText: "ENT",
    logoBg: "#000000",
    logoTextColor: "#ffffff",
    genres: ["Business"],
    price: 850,
    da: 92,
    dr: 91,
    tat: "2 Days",
    region: ["United States"],
    sponsored: "Yes",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { heart: true, cannabis: true }
  },
  {
    id: "pub-11",
    name: "TechCrunch",
    logoText: "TC",
    logoBg: "#00a562",
    logoTextColor: "#ffffff",
    genres: ["Tech", "Web 3"],
    price: 950,
    da: 94,
    dr: 92,
    tat: "2 Days",
    region: ["Global"],
    sponsored: "Yes",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { heart: true }
  },
  {
    id: "pub-12",
    name: "USA Today",
    logoText: "USA",
    logoBg: "#0055a5",
    logoTextColor: "#ffffff",
    genres: ["News", "Entertainment"],
    price: 450,
    da: 91,
    dr: 89,
    tat: "1 Day",
    region: ["United States"],
    sponsored: "No",
    indexed: "Yes",
    doFollow: "Yes",
    hasExample: true,
    llmAeo: "Yes",
    niches: { age18: true, heart: true }
  }
];

export const GENRE_OPTIONS = [
  "News",
  "Entertainment",
  "Lifestyle",
  "Web 3",
  "Business",
  "Tech",
  "Music",
  "Real Estate",
  "Fashion",
  "Luxury",
  "Sports",
  "Gaming",
  "Political",
  "Legal",
  "Alcohol"
];

export const REGION_OPTIONS = [
  "All Regions",
  "United States",
  "Europe",
  "Global",
  "California",
  "New York",
  "Utah"
];
