import type {
  Category,
  Faq,
  PlatformStat,
  Resource,
  Review,
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
    faculty: "Management Sciences",
    course: "ACC 408 - Accounting Information Systems",
    abstract:
      "This study examines how the adoption of mobile banking has affected the daily cash flow and business growth of small and medium enterprises operating in Lagos State. Data was gathered from 180 SME owners across three major markets, namely Alaba, Computer Village and Balogun. The findings reveal that while mobile banking has significantly reduced transaction time for traders, persistent trust issues around failed transfers continue to limit full adoption. The study recommends stronger dispute resolution channels between banks and mobile money agents to improve trader confidence.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Data Presentation and Analysis",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Physical Sciences",
    course: "CSC 411 - Software Engineering",
    abstract:
      "This project presents the design and implementation of a web based course registration system intended to replace the manual paper forms previously used by the department. The system was built using PHP, MySQL and Bootstrap to manage student login, course selection and result upload in a single portal. During testing with 40 students, the average time required to complete registration dropped from about 25 minutes to under 4 minutes. The paper also discusses the database structure and security measures used to protect student records.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: System Analysis and Design",
      "Chapter Four: Implementation and Testing",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Social Sciences",
    course: "ECO 512 - International Finance",
    abstract:
      "This paper analyzes twenty years of exchange rate data, from 2000 to 2020, to determine its effect on foreign direct investment decisions in Nigeria. Using annual data sourced from the Central Bank of Nigeria and the World Bank, a GARCH model was applied to test the relationship between naira volatility and FDI inflow. The results indicate that instability in the exchange rate discourages long term investment far more than it affects short term capital flows. The paper suggests that a more predictable exchange rate policy would attract steadier foreign investment.",
    tableOfContents: [
      "Abstract",
      "Introduction",
      "Methodology",
      "Results",
      "Discussion",
      "References",
    ],
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
    faculty: "Management Sciences",
    course: "BAM 402 - Entrepreneurship and Small Business Management",
    abstract:
      "This business plan lays out a funding ready proposal for a solar powered cold storage facility designed to reduce post harvest losses among smallholder farmers in Ogun State. It covers a detailed market analysis, a three year financial projection and the equipment costs required to run a 40 ton facility. The primary target market is tomato and pepper farmers around Sango Ota who currently lose a significant share of their produce to spoilage before it reaches buyers. The plan also outlines a phased rollout strategy and expected returns for potential investors.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Market Analysis and Financial Projections",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Management Sciences",
    course: "AGE 405 - Agribusiness Management",
    abstract:
      "This feasibility study assesses the technical and financial viability of establishing a mid-size poultry processing plant near Zaria. It reviews the cost of land, the sourcing of processing equipment and the projected demand for processed poultry from hotels and restaurants across Kaduna State. Based on moderate demand projections, the study concludes that the venture would break even within two years and seven months of operation. Recommendations are given on suitable financing structures for prospective investors.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Technical and Financial Analysis",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Engineering",
    course: "EEE 305 - Circuit Theory and Electromagnetic Fields",
    abstract:
      "This compilation brings together eight years of examination questions and marking guides for the Circuit Theory and Electromagnetic Fields course at the Federal University of Technology, Akure. Questions are grouped by topic, ranging from Kirchhoff's laws to electromagnetic wave propagation, and each comes with worked solutions. Past scripts from three different lecturers were reviewed to identify recurring question patterns across semesters. Students preparing for exams can use this set to practice under realistic conditions.",
    tableOfContents: [
      "2016 Examination Questions",
      "2018 Examination Questions",
      "2020 Examination Questions",
      "2022 Examination Questions",
      "2023 Examination Questions",
      "Marking Guide",
    ],
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
    faculty: "Social Sciences",
    course: "MAC 407 - New Media and Society",
    abstract:
      "This study investigates how the use of Twitter and WhatsApp shaped voting decisions among young people during the last general election in Benin City. A survey of 220 undergraduates was conducted to measure the relationship between social media exposure and actual voting behaviour. The results show that while social media use raised political awareness considerably, this awareness did not always translate into registered votes among first time voters. The study recommends that civic groups pair online campaigns with offline voter registration drives.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Data Presentation and Analysis",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Law",
    course: "PPL 404 - Land Law",
    abstract:
      "This work reviews how the Land Use Act of 1978 continues to restrict individual property ownership across Nigerian states. It traces court judgments from 1980 to 2022 involving governor consent requirements and compulsory acquisition disputes. The paper argues that although the Act was meant to simplify land administration, it now slows down commercial development in practice. It concludes with proposed amendments that could balance government oversight with individual property rights.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Analysis of Case Law and Findings",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Science",
    course: "MCB 404 - Food and Industrial Microbiology",
    abstract:
      "This paper tests bacterial contamination levels in 30 different sachet water brands sold around markets and motor parks within Kano metropolis. Samples were cultured in the laboratory and tested for coliform and E. coli counts against standards set by NAFDAC. Twelve of the thirty brands tested failed to meet the safe drinking water thresholds set by regulators. The study calls for stricter enforcement of production standards among local sachet water producers.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Data Analysis and Findings",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Physical Sciences",
    course: "CSC 415 - Machine Learning",
    abstract:
      "This study compares four machine learning models used to detect cassava and maize leaf diseases from photographs taken in the field. The convolutional neural network, support vector machine, random forest and k-nearest neighbours models were trained on a dataset of 3400 labelled leaf images. The convolutional neural network achieved the highest accuracy at 94.6 percent on the test set, outperforming the other three models. The paper discusses how such models could be deployed on low cost mobile devices for farmers.",
    tableOfContents: [
      "Abstract",
      "Introduction",
      "Methodology",
      "Results",
      "Discussion",
      "References",
    ],
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
    faculty: "Social Sciences",
    course: "ECO 408 - Labour Economics",
    abstract:
      "This study examines why unemployment remains high among graduates in five South Eastern states despite rising enrollment in tertiary institutions. Data from 2015 to 2020 across Enugu, Anambra and Imo states was analyzed using multiple regression techniques. Education mismatch and low industrial investment were found to be the strongest contributing factors to persistent youth unemployment. The study recommends closer alignment between university curricula and the needs of local industries.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Data Presentation and Analysis",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Management Sciences",
    course: "ACC 111 - Introduction to Financial Accounting",
    abstract:
      "This set gathers first and second semester past questions in Introduction to Financial Accounting, compiled specifically for ND level students. Each question comes with a fully worked solution covering ledger entries, trial balance preparation and final accounts. The set draws from five academic sessions to reflect the patterns commonly used by examiners in the department. Students can use this resource alongside their course textbook to practice before tests and examinations.",
    tableOfContents: [
      "2021 Examination Questions",
      "2022 Examination Questions",
      "2023 Examination Questions",
      "2024 Examination Questions",
      "2025 Examination Questions",
      "Marking Guide",
    ],
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
    faculty: "Engineering",
    course: "EEE 502 - Renewable Energy Systems",
    abstract:
      "This feasibility study evaluates whether a solar mini-grid can profitably power three unconnected villages located near Zaria in Kaduna State. Energy demand was modeled from 450 households and small shops and compared against the cost of solar panels, batteries and distribution infrastructure. Projected tariffs are shown to remain affordable to residents while still recovering installation costs within about six years. The study recommends a phased connection plan to manage upfront capital requirements.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Technical and Financial Analysis",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    faculty: "Law",
    course: "PPL 508 - Constitutional Law",
    abstract:
      "This paper examines whether election tribunal proceedings in Nigeria consistently uphold the constitutional right to fair hearing guaranteed under Section 36. Tribunal rulings from the 2019 and 2023 general elections were reviewed to identify recurring procedural complaints raised by petitioners. Delays in the filing of judgments emerged as the most common fair hearing complaint across the cases studied. The paper recommends stricter timelines for tribunals to deliver judgments after hearings conclude.",
    tableOfContents: [
      "Chapter One: Introduction",
      "Chapter Two: Literature Review",
      "Chapter Three: Research Methodology",
      "Chapter Four: Analysis of Tribunal Rulings",
      "Chapter Five: Summary, Conclusion and Recommendations",
    ],
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
    q: "How do you make sure the work is good quality?",
    a: "Every resource is reviewed and curated by the Sparklyn team before it goes live, and each one shows its source institution so you can judge it yourself. We still recommend using materials as a study guide, not for direct submission.",
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

export const reviews: Review[] = [
  {
    id: "review-01",
    resourceId: "impact-mobile-banking-sme-lagos",
    name: "Chidinma Okonkwo",
    avatarSeed: "chidinma-okonkwo",
    rating: 5,
    date: "3 weeks ago",
    body: "This project gave me a clear structure to follow for my own research on SME banking. The survey questions in the appendix saved me a lot of time. Very detailed work.",
  },
  {
    id: "review-02",
    resourceId: "impact-mobile-banking-sme-lagos",
    name: "Ibrahim Musa",
    avatarSeed: "ibrahim-musa",
    rating: 4,
    date: "2 months ago",
    body: "Good material overall, the data analysis chapter is solid. I would have liked more references from recent years but it still helped my literature review a lot.",
  },
  {
    id: "review-03",
    resourceId: "campus-course-registration-system",
    name: "Oluwaseun Adeyemi",
    avatarSeed: "oluwaseun-adeyemi",
    rating: 5,
    date: "1 month ago",
    body: "Exactly what I needed for my final year project. The source code explanation in chapter four made it easy to adapt for my own school system.",
  },
  {
    id: "review-04",
    resourceId: "campus-course-registration-system",
    name: "Blessing Etim",
    avatarSeed: "blessing-etim",
    rating: 4,
    date: "5 weeks ago",
    body: "Well documented and the database design section is easy to follow. A few screenshots were blurry but the write up more than makes up for it.",
  },
  {
    id: "review-05",
    resourceId: "exchange-rate-volatility-fdi-nigeria",
    name: "Aisha Abdullahi",
    avatarSeed: "aisha-abdullahi",
    rating: 5,
    date: "2 weeks ago",
    body: "The GARCH model explanation is one of the clearest I have read. Helped me understand how to apply it to my own economics seminar paper.",
  },
  {
    id: "review-06",
    resourceId: "exchange-rate-volatility-fdi-nigeria",
    name: "Chukwuemeka Obi",
    avatarSeed: "chukwuemeka-obi",
    rating: 3,
    date: "3 months ago",
    body: "Decent content but the data tables could be formatted better. Still useful for citing recent FDI trends in my project.",
  },
  {
    id: "review-07",
    resourceId: "solar-cold-storage-business-plan-ogun",
    name: "Folake Ogunleye",
    avatarSeed: "folake-ogunleye",
    rating: 5,
    date: "10 days ago",
    body: "Used this as a template for my own agribusiness proposal and my supervisor was impressed with the financial projections section. Worth every naira.",
  },
  {
    id: "review-08",
    resourceId: "solar-cold-storage-business-plan-ogun",
    name: "Yusuf Garba",
    avatarSeed: "yusuf-garba",
    rating: 4,
    date: "6 weeks ago",
    body: "Solid business plan with realistic numbers. The market analysis part on tomato farmers helped me understand how to structure mine for a different state.",
  },
  {
    id: "review-09",
    resourceId: "poultry-processing-plant-feasibility-zaria",
    name: "Grace Effiong",
    avatarSeed: "grace-effiong",
    rating: 4,
    date: "2 months ago",
    body: "Clear breakdown of the equipment costs and demand projections. I adapted the methodology for a fish farming feasibility study of my own.",
  },
  {
    id: "review-10",
    resourceId: "poultry-processing-plant-feasibility-zaria",
    name: "Suleiman Yakubu",
    avatarSeed: "suleiman-yakubu",
    rating: 3,
    date: "4 weeks ago",
    body: "Content is useful but the pagination felt short for the price. Still, the financial analysis section is detailed enough to reference.",
  },
  {
    id: "review-11",
    resourceId: "past-questions-circuit-theory-electromagnetic-futa",
    name: "Tobenna Nwosu",
    avatarSeed: "tobenna-nwosu",
    rating: 5,
    date: "1 week ago",
    body: "These past questions were spot on for my exam prep. The marking guide showed me exactly where I was losing marks in past attempts.",
  },
  {
    id: "review-12",
    resourceId: "past-questions-circuit-theory-electromagnetic-futa",
    name: "Halima Bello",
    avatarSeed: "halima-bello",
    rating: 5,
    date: "3 weeks ago",
    body: "Very organized by topic, made revision so much faster before my circuit theory exam. I passed with a much better grade this semester.",
  },
  {
    id: "review-13",
    resourceId: "microbial-contamination-sachet-water-kano",
    name: "Ifeoma Chukwu",
    avatarSeed: "ifeoma-chukwu",
    rating: 5,
    date: "5 days ago",
    body: "Referenced this heavily for my own seminar on water quality. The lab methodology section is thorough and easy to replicate.",
  },
  {
    id: "review-14",
    resourceId: "microbial-contamination-sachet-water-kano",
    name: "Abubakar Sadiq",
    avatarSeed: "abubakar-sadiq",
    rating: 4,
    date: "7 weeks ago",
    body: "Good scientific rigor and the NAFDAC standard comparisons were helpful. Wish there were more photos of the culture plates though.",
  },
  {
    id: "review-15",
    resourceId: "machine-learning-crop-disease-detection",
    name: "Adaeze Nnamdi",
    avatarSeed: "adaeze-nnamdi",
    rating: 5,
    date: "2 weeks ago",
    body: "One of the best written journal papers I have downloaded here. The model comparison tables made my literature review section so much stronger.",
  },
  {
    id: "review-16",
    resourceId: "machine-learning-crop-disease-detection",
    name: "Kabir Aliyu",
    avatarSeed: "kabir-aliyu",
    rating: 4,
    date: "1 month ago",
    body: "Technical but well explained. Helped me understand CNN architecture better for my own final year project on plant disease detection.",
  },
  {
    id: "review-17",
    resourceId: "past-questions-financial-accounting-nd",
    name: "Precious Udo",
    avatarSeed: "precious-udo",
    rating: 5,
    date: "4 days ago",
    body: "These past questions matched almost exactly with what came out in my exam. Worked solutions made revision so much easier for me.",
  },
  {
    id: "review-18",
    resourceId: "past-questions-financial-accounting-nd",
    name: "Musa Danladi",
    avatarSeed: "musa-danladi",
    rating: 3,
    date: "2 months ago",
    body: "Helpful for practice but some of the solutions felt rushed in places. Still better than most free materials I found online.",
  },
  {
    id: "review-19",
    resourceId: "fair-hearing-election-tribunals-nigeria",
    name: "Nkechi Umeh",
    avatarSeed: "nkechi-umeh",
    rating: 5,
    date: "6 days ago",
    body: "Excellent case law analysis. This gave me a strong foundation for my constitutional law seminar on electoral justice in Nigeria.",
  },
  {
    id: "review-20",
    resourceId: "fair-hearing-election-tribunals-nigeria",
    name: "Emmanuel Etuk",
    avatarSeed: "emmanuel-etuk",
    rating: 4,
    date: "9 weeks ago",
    body: "Well researched with recent tribunal rulings included. My supervisor asked me to expand on some points but the base material is solid.",
  },
];

export function getResourceById(id: string): Resource | undefined {
  return resources.find((resource) => resource.id === id);
}

export function getReviewsFor(resourceId: string): Review[] {
  return reviews.filter((review) => review.resourceId === resourceId);
}

// same category first, then same institution, excluding the resource itself
export function getRelatedResources(
  resource: Resource,
  limit = 4
): Resource[] {
  const sameCategory = resources.filter(
    (candidate) =>
      candidate.id !== resource.id && candidate.category === resource.category
  );
  const sameInstitution = resources.filter(
    (candidate) =>
      candidate.id !== resource.id &&
      candidate.institution === resource.institution &&
      candidate.category !== resource.category
  );
  return [...sameCategory, ...sameInstitution].slice(0, limit);
}
