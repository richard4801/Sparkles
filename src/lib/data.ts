import type {
  Category,
  Faq,
  PlatformStat,
  Resource,
  Testimonial,
  University,
} from "@/types";

export const resources: Resource[] = [
  {
    id: "impact-mobile-banking-sme-lagos",
    title:
      "The Impact of Mobile Banking on Small and Medium Enterprises in Lagos State",
    type: "Research Project",
    category: "Accounting",
    institution: "University of Lagos",
    department: "Accounting",
    description:
      "Examines how mobile banking adoption affects daily cash flow and growth for SMEs across three Lagos markets.",
    abstractSnippet:
      "This study surveyed 180 SME owners in Alaba, Computer Village and Balogun markets to measure mobile banking usage. Findings show faster transaction times but persistent trust issues around failed transfers.",
    rating: 4.6,
    reviews: 187,
    downloads: 2431,
    pages: 68,
    priceNaira: 4000,
    level: "BSc",
    year: 2023,
    thumbnailSeed: "mobile-banking-report",
    trending: true,
    addedDaysAgo: 2,
  },
  {
    id: "campus-course-registration-system",
    title:
      "Design and Implementation of a Campus Course Registration System Using PHP and MySQL",
    type: "Seminar Paper",
    category: "Computer Science",
    institution: "University of Nigeria, Nsukka",
    department: "Computer Science",
    description:
      "Builds a working course registration portal that replaces manual paper forms used by the department.",
    abstractSnippet:
      "The system was developed with PHP, MySQL and Bootstrap to handle student login, course selection and result upload. Testing with 40 students cut average registration time from 25 minutes to under 4.",
    rating: 4.8,
    reviews: 264,
    downloads: 3102,
    pages: 81,
    priceNaira: 5000,
    level: "BSc",
    year: 2024,
    thumbnailSeed: "course-registration-system",
    trending: true,
    addedDaysAgo: 1,
  },
  {
    id: "exchange-rate-volatility-fdi-nigeria",
    title:
      "Exchange Rate Volatility and Foreign Direct Investment Inflows in Nigeria, 2000 to 2020",
    type: "Journal",
    category: "Economics",
    institution: "University of Ibadan",
    department: "Economics",
    description:
      "Analyzes twenty years of exchange rate data to show its effect on foreign investment decisions in Nigeria.",
    abstractSnippet:
      "Using annual CBN and World Bank data, the paper applies a GARCH model to test volatility against FDI inflow. Results indicate that naira instability discourages long term investment more than short term inflows.",
    rating: 4.3,
    reviews: 96,
    downloads: 1284,
    pages: 112,
    priceNaira: 6500,
    level: "MSc",
    year: 2022,
    thumbnailSeed: "exchange-rate-chart",
    addedDaysAgo: 11,
  },
  {
    id: "solar-cold-storage-business-plan-ogun",
    title:
      "A Business Plan for a Solar-Powered Cold Storage Facility for Smallholder Farmers in Ogun State",
    type: "Business Plan",
    category: "Business Administration",
    institution: "Covenant University",
    department: "Business Administration",
    description:
      "Lays out a funding-ready plan for a cold storage business that reduces post-harvest losses for local farmers.",
    abstractSnippet:
      "The plan covers market analysis, a three year financial projection and equipment costs for a 40 ton facility. It targets tomato and pepper farmers around Sango Ota who currently lose produce to spoilage.",
    rating: 4.9,
    reviews: 58,
    downloads: 742,
    pages: 54,
    priceNaira: 7000,
    level: "BSc",
    year: 2025,
    thumbnailSeed: "cold-storage-solar-farm",
    trending: true,
    addedDaysAgo: 3,
  },
  {
    id: "poultry-processing-plant-feasibility-zaria",
    title: "Feasibility Study on Establishing a Poultry Processing Plant in Zaria",
    type: "Feasibility Study",
    category: "Business Administration",
    institution: "Ahmadu Bello University",
    department: "Agricultural Economics",
    description:
      "Assesses the technical and financial viability of a mid-size poultry processing plant near Zaria.",
    abstractSnippet:
      "The study reviews land cost, equipment sourcing and projected demand from hotels and restaurants in Kaduna State. It concludes the venture breaks even within two years and seven months under moderate demand.",
    rating: 4.1,
    reviews: 44,
    downloads: 861,
    pages: 63,
    priceNaira: 3500,
    level: "HND",
    year: 2021,
    thumbnailSeed: "poultry-processing-plant",
    addedDaysAgo: 17,
  },
  {
    id: "past-questions-circuit-theory-electromagnetic-futa",
    title:
      "Past Examination Questions: Circuit Theory and Electromagnetic Fields (2016-2023)",
    type: "Past Questions",
    category: "Electrical Engineering",
    institution: "Federal University of Technology, Akure",
    department: "Electrical and Electronics Engineering",
    description:
      "Compiles eight years of exam questions and marking guides for the Circuit Theory course at FUTA.",
    abstractSnippet:
      "Questions are grouped by topic, from Kirchhoff laws to electromagnetic wave propagation, with worked solutions included. Past scripts from three lecturers were used to track recurring question patterns across semesters.",
    rating: 4.5,
    reviews: 133,
    downloads: 1976,
    pages: 22,
    priceNaira: 2000,
    level: "BSc",
    year: 2024,
    thumbnailSeed: "circuit-theory-notes",
    addedDaysAgo: 6,
  },
  {
    id: "social-media-political-participation-benin",
    title:
      "Social Media Use and Political Participation Among Youths in Benin City",
    type: "Research Project",
    category: "Mass Communication",
    institution: "University of Benin",
    department: "Mass Communication",
    description:
      "Investigates how Twitter and WhatsApp use shaped voting decisions among young people during the last election.",
    abstractSnippet:
      "A survey of 220 undergraduates in Benin City measured social media exposure against actual voting behavior. Results show strong awareness gains but weaker translation into registered votes among first time voters.",
    rating: 4.4,
    reviews: 121,
    downloads: 1543,
    pages: 71,
    priceNaira: 3500,
    level: "BSc",
    year: 2023,
    thumbnailSeed: "social-media-phone",
    addedDaysAgo: 14,
  },
  {
    id: "land-use-act-property-rights-nigeria",
    title:
      "An Appraisal of the Land Use Act and Its Effect on Property Rights in Nigeria",
    type: "Research Project",
    category: "Law",
    institution: "Obafemi Awolowo University",
    department: "Law",
    description:
      "Reviews how the Land Use Act of 1978 restricts individual property ownership across Nigerian states.",
    abstractSnippet:
      "The work traces court judgments from 1980 to 2022 involving governor consent and compulsory acquisition disputes. It argues that the Act, though meant to simplify land administration, now slows commercial development.",
    rating: 4.2,
    reviews: 77,
    downloads: 1092,
    pages: 89,
    priceNaira: 4500,
    level: "BSc",
    year: 2022,
    thumbnailSeed: "land-property-documents",
    addedDaysAgo: 9,
  },
  {
    id: "microbial-contamination-sachet-water-kano",
    title: "Microbial Contamination of Sachet Water Sold Within Kano Metropolis",
    type: "Seminar Paper",
    category: "Microbiology",
    institution: "Bayero University Kano",
    department: "Microbiology",
    description:
      "Tests bacterial contamination levels in 30 sachet water brands sold around Kano markets and motor parks.",
    abstractSnippet:
      "Samples were cultured and tested for coliform and E. coli counts against NAFDAC standards. Twelve of the thirty brands tested failed to meet safe drinking water thresholds set by regulators.",
    rating: 4.7,
    reviews: 152,
    downloads: 2018,
    pages: 58,
    priceNaira: 3000,
    level: "BSc",
    year: 2022,
    thumbnailSeed: "sachet-water-lab",
    trending: true,
    addedDaysAgo: 4,
  },
  {
    id: "machine-learning-crop-disease-detection",
    title:
      "A Comparative Study of Machine Learning Algorithms for Crop Disease Detection",
    type: "Journal",
    category: "Computer Science",
    institution: "University of Ilorin",
    department: "Computer Science",
    description:
      "Compares four machine learning models used to detect cassava and maize leaf diseases from photographs.",
    abstractSnippet:
      "The study trained CNN, SVM, random forest and KNN models on a dataset of 3400 labelled leaf images. The convolutional neural network achieved the highest accuracy at 94.6 percent on the test set.",
    rating: 4.9,
    reviews: 39,
    downloads: 621,
    pages: 168,
    priceNaira: 9000,
    level: "PhD",
    year: 2020,
    thumbnailSeed: "crop-disease-leaf",
    addedDaysAgo: 19,
  },
  {
    id: "youth-unemployment-south-east-nigeria",
    title: "Determinants of Youth Unemployment in South East Nigeria",
    type: "Research Project",
    category: "Economics",
    institution: "University of Nigeria, Nsukka",
    department: "Economics",
    description:
      "Studies why unemployment stays high among graduates in five South Eastern states despite rising enrollment.",
    abstractSnippet:
      "Data from 2015 to 2020 across Enugu, Anambra and Imo states was analyzed using multiple regression. Education mismatch and low industrial investment were found to be the strongest contributing factors.",
    rating: 4.0,
    reviews: 68,
    downloads: 934,
    pages: 97,
    priceNaira: 5500,
    level: "MSc",
    year: 2021,
    thumbnailSeed: "unemployment-graph",
    addedDaysAgo: 8,
  },
  {
    id: "past-questions-financial-accounting-nd",
    title:
      "Past Questions and Answers: Introduction to Financial Accounting (ND Level)",
    type: "Past Questions",
    category: "Accounting",
    institution: "University of Lagos",
    department: "Accounting",
    description:
      "Gathers first and second semester financial accounting past questions with fully worked solutions for ND students.",
    abstractSnippet:
      "Each question comes with a fully worked solution covering ledger entries, trial balance and final accounts. The set draws from five academic sessions to reflect common examiner patterns.",
    rating: 4.6,
    reviews: 210,
    downloads: 2870,
    pages: 34,
    priceNaira: 1500,
    level: "ND",
    year: 2025,
    thumbnailSeed: "accounting-ledger-book",
    addedDaysAgo: 15,
  },
  {
    id: "mini-grid-solar-electrification-kaduna",
    title:
      "Feasibility Study on Mini-Grid Solar Electrification for Rural Communities in Kaduna State",
    type: "Feasibility Study",
    category: "Electrical Engineering",
    institution: "Ahmadu Bello University",
    department: "Electrical Engineering",
    description:
      "Evaluates whether a solar mini-grid can profitably power three unconnected villages near Zaria.",
    abstractSnippet:
      "The study modeled energy demand from 450 households and small shops against solar panel and battery costs. Projected tariffs remain affordable while still recovering installation costs within six years.",
    rating: 3.9,
    reviews: 27,
    downloads: 512,
    pages: 76,
    priceNaira: 6000,
    level: "PGD",
    year: 2019,
    thumbnailSeed: "solar-mini-grid",
    trending: true,
    addedDaysAgo: 12,
  },
  {
    id: "fair-hearing-election-tribunals-nigeria",
    title:
      "The Right to Fair Hearing Under the 1999 Constitution: A Case Study of Election Tribunals",
    type: "Research Project",
    category: "Law",
    institution: "University of Benin",
    department: "Law",
    description:
      "Examines whether election tribunal proceedings in Nigeria consistently uphold the constitutional right to fair hearing.",
    abstractSnippet:
      "The paper reviews tribunal rulings from the 2019 and 2023 general elections against Section 36 of the Constitution. It finds delays in filing judgments as the most common fair hearing complaint raised by petitioners.",
    rating: 4.8,
    reviews: 91,
    downloads: 1345,
    pages: 103,
    priceNaira: 5000,
    level: "MSc",
    year: 2024,
    thumbnailSeed: "court-gavel-law",
    addedDaysAgo: 5,
  },
];

export const categories: Category[] = [
  {
    slug: "computer-science",
    name: "Computer Science",
    resourceCount: 1284,
    iconName: "Laptop",
    accent: "violet",
  },
  {
    slug: "accounting",
    name: "Accounting",
    resourceCount: 947,
    iconName: "Calculator",
    accent: "blue",
  },
  {
    slug: "economics",
    name: "Economics",
    resourceCount: 1502,
    iconName: "ChartLineUp",
    accent: "emerald",
  },
  {
    slug: "business-administration",
    name: "Business Administration",
    resourceCount: 1836,
    iconName: "Briefcase",
    accent: "amber",
  },
  {
    slug: "mass-communication",
    name: "Mass Communication",
    resourceCount: 683,
    iconName: "Megaphone",
    accent: "rose",
  },
  {
    slug: "electrical-engineering",
    name: "Electrical Engineering",
    resourceCount: 812,
    iconName: "Lightning",
    accent: "cyan",
  },
  {
    slug: "law",
    name: "Law",
    resourceCount: 734,
    iconName: "Scales",
    accent: "violet",
  },
  {
    slug: "microbiology",
    name: "Microbiology",
    resourceCount: 566,
    iconName: "Flask",
    accent: "blue",
  },
];

export const universities: University[] = [
  {
    slug: "university-of-lagos",
    name: "University of Lagos",
    shortName: "UNILAG",
    resourceCount: 3184,
    logoSeed: "unilag-crest",
  },
  {
    slug: "university-of-ibadan",
    name: "University of Ibadan",
    shortName: "UI",
    resourceCount: 2967,
    logoSeed: "ui-crest",
  },
  {
    slug: "ahmadu-bello-university",
    name: "Ahmadu Bello University",
    shortName: "ABU Zaria",
    resourceCount: 2541,
    logoSeed: "abu-crest",
  },
  {
    slug: "university-of-nigeria-nsukka",
    name: "University of Nigeria, Nsukka",
    shortName: "UNN",
    resourceCount: 2308,
    logoSeed: "unn-crest",
  },
  {
    slug: "obafemi-awolowo-university",
    name: "Obafemi Awolowo University",
    shortName: "OAU",
    resourceCount: 1975,
    logoSeed: "oau-crest",
  },
  {
    slug: "covenant-university",
    name: "Covenant University",
    shortName: "Covenant",
    resourceCount: 1362,
    logoSeed: "covenant-crest",
  },
  {
    slug: "university-of-benin",
    name: "University of Benin",
    shortName: "UNIBEN",
    resourceCount: 1848,
    logoSeed: "uniben-crest",
  },
  {
    slug: "federal-university-of-technology-akure",
    name: "Federal University of Technology, Akure",
    shortName: "FUTA",
    resourceCount: 1206,
    logoSeed: "futa-crest",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "chiamaka-eze",
    quote:
      "I found my project topic and full material in one evening. Saved me weeks of running around the department library for nothing.",
    name: "Chiamaka Eze",
    role: "Final year, Accounting",
    institution: "University of Lagos",
    avatarSeed: "chiamaka-portrait",
    rating: 5,
  },
  {
    id: "abdulrahman-bello",
    quote:
      "The past questions for my electrical engineering courses helped me prepare properly before exams. Downloaded straight to my phone, no stress.",
    name: "Abdulrahman Bello",
    role: "ND2 student, Electrical Engineering",
    institution: "Ahmadu Bello University",
    avatarSeed: "abdulrahman-portrait",
    rating: 5,
  },
  {
    id: "ngozi-okafor",
    quote:
      "As a supervisor I recommend this site to students who struggle with topic selection. The abstracts alone save so much back and forth.",
    name: "Ngozi Okafor",
    role: "Lecturer, Department of Economics",
    institution: "University of Nigeria, Nsukka",
    avatarSeed: "ngozi-portrait",
    rating: 5,
  },
  {
    id: "tunde-adebayo",
    quote:
      "Paid with my ATM card through Paystack and had the business plan template in my inbox within two minutes.",
    name: "Tunde Adebayo",
    role: "MBA student, Business Administration",
    institution: "Covenant University",
    avatarSeed: "tunde-portrait",
    rating: 4,
  },
  {
    id: "fatima-sani",
    quote:
      "I compared three feasibility studies before writing mine. It showed me exactly how to structure the financial section.",
    name: "Fatima Sani",
    role: "Final year, Business Administration",
    institution: "Ahmadu Bello University",
    avatarSeed: "fatima-portrait",
    rating: 5,
  },
  {
    id: "emeka-nwachukwu",
    quote:
      "Customer support replied within the hour when my download link expired. Small thing but it mattered a lot that week.",
    name: "Emeka Nwachukwu",
    role: "Postgraduate student",
    institution: "University of Ibadan",
    avatarSeed: "emeka-portrait",
    rating: 4,
  },
];

export const faqs: Faq[] = [
  {
    q: "How does the download process work after I pay?",
    a: "Once payment is confirmed you get instant access to a secure download link on your order page, and a copy is also sent to your email so you can retrieve it later.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept debit cards, bank transfer and USSD through Paystack and Flutterwave, so you can pay with most Nigerian bank accounts.",
  },
  {
    q: "Can I get a refund if the material does not match my topic?",
    a: "Yes. If the resource you downloaded is clearly different from what was described on its page, contact support within 48 hours and we will refund or replace it.",
  },
  {
    q: "How do you make sure the work is original?",
    a: "Every upload is screened for duplicate content before it goes live, and each listing shows the source institution so you can judge originality yourself. We still recommend using materials as a guide, not for direct submission.",
  },
  {
    q: "What file formats are the resources available in?",
    a: "Most resources are delivered as PDF or Word documents. Past questions and datasets sometimes include an extra spreadsheet file where relevant.",
  },
  {
    q: "Do I need to create an account before I can buy something?",
    a: "You need a free account so we can attach your purchases to your order history and let you re-download at any time without paying again.",
  },
  {
    q: "What if I need help picking a topic or have another question?",
    a: "Use the chat button in the corner of the site or email support directly. Our team typically replies within a few hours during the week.",
  },
];

export const stats: PlatformStat[] = [
  {
    label: "Resources available",
    value: 12480,
    suffix: "+",
  },
  {
    label: "Universities covered",
    value: 148,
    suffix: "+",
  },
  {
    label: "Students served",
    value: 86300,
    suffix: "+",
  },
  {
    label: "Average rating",
    value: 4.7,
    suffix: "/5",
  },
];

export const trendingResources: Resource[] = resources.filter(
  (resource) => resource.trending
);

export const recentResources: Resource[] = [...resources]
  .sort((a, b) => a.addedDaysAgo - b.addedDaysAgo)
  .slice(0, 8);
