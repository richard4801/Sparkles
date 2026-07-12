-- Sparklyn seed data for Supabase / any Postgres.
-- Run AFTER the schema migration (drizzle/0000_windy_lila_cheney.sql).
-- Loads the resource catalog + a demo and admin account.

--
-- PostgreSQL database dump
--


-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.categories VALUES (1, 'computer-science', 'Computer Science', 'Laptop', 'violet');
INSERT INTO public.categories VALUES (2, 'accounting', 'Accounting', 'Calculator', 'blue');
INSERT INTO public.categories VALUES (3, 'economics', 'Economics', 'ChartLineUp', 'emerald');
INSERT INTO public.categories VALUES (4, 'business-administration', 'Business Administration', 'Briefcase', 'amber');
INSERT INTO public.categories VALUES (5, 'mass-communication', 'Mass Communication', 'Megaphone', 'rose');
INSERT INTO public.categories VALUES (6, 'electrical-engineering', 'Electrical Engineering', 'Lightning', 'cyan');
INSERT INTO public.categories VALUES (7, 'law', 'Law', 'Scales', 'violet');
INSERT INTO public.categories VALUES (8, 'microbiology', 'Microbiology', 'Flask', 'blue');


--
-- Data for Name: universities; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.universities VALUES (1, 'university-of-lagos', 'University of Lagos', 'UNILAG', 'unilag-crest');
INSERT INTO public.universities VALUES (2, 'university-of-ibadan', 'University of Ibadan', 'UI', 'ui-crest');
INSERT INTO public.universities VALUES (3, 'ahmadu-bello-university', 'Ahmadu Bello University', 'ABU Zaria', 'abu-crest');
INSERT INTO public.universities VALUES (4, 'university-of-nigeria-nsukka', 'University of Nigeria, Nsukka', 'UNN', 'unn-crest');
INSERT INTO public.universities VALUES (5, 'obafemi-awolowo-university', 'Obafemi Awolowo University', 'OAU', 'oau-crest');
INSERT INTO public.universities VALUES (6, 'covenant-university', 'Covenant University', 'Covenant', 'covenant-crest');
INSERT INTO public.universities VALUES (7, 'university-of-benin', 'University of Benin', 'UNIBEN', 'uniben-crest');
INSERT INTO public.universities VALUES (8, 'federal-university-of-technology-akure', 'Federal University of Technology, Akure', 'FUTA', 'futa-crest');
INSERT INTO public.universities VALUES (9, 'bayero-university-kano', 'Bayero University Kano', 'BUK', 'bayero-university-kano');
INSERT INTO public.universities VALUES (10, 'university-of-ilorin', 'University of Ilorin', 'UNIVER', 'university-of-ilorin');


--
-- Data for Name: resources; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.resources VALUES ('impact-mobile-banking-sme-lagos', 'The Impact of Mobile Banking on Small and Medium Enterprises in Lagos State', 'Research Project', 2, 1, 'Accounting', 'Management Sciences', 'ACC 408 - Accounting Information Systems', 'Examines how mobile banking adoption affects daily cash flow and growth for SMEs across three Lagos markets.', 'This study examines how the adoption of mobile banking has affected the daily cash flow and business growth of small and medium enterprises operating in Lagos State. Data was gathered from 180 SME owners across three major markets, namely Alaba, Computer Village and Balogun. The findings reveal that while mobile banking has significantly reduced transaction time for traders, persistent trust issues around failed transfers continue to limit full adoption. The study recommends stronger dispute resolution channels between banks and mobile money agents to improve trader confidence.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Data Presentation and Analysis", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.6, 187, 2431, 68, 4000, 'BSc', 2023, 'mobile-banking-report', true, '2026-07-10 01:58:54.143+00');
INSERT INTO public.resources VALUES ('campus-course-registration-system', 'Design and Implementation of a Campus Course Registration System Using PHP and MySQL', 'Seminar Paper', 1, 4, 'Computer Science', 'Physical Sciences', 'CSC 411 - Software Engineering', 'Builds a working course registration portal that replaces manual paper forms used by the department.', 'This project presents the design and implementation of a web based course registration system intended to replace the manual paper forms previously used by the department. The system was built using PHP, MySQL and Bootstrap to manage student login, course selection and result upload in a single portal. During testing with 40 students, the average time required to complete registration dropped from about 25 minutes to under 4 minutes. The paper also discusses the database structure and security measures used to protect student records.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: System Analysis and Design", "Chapter Four: Implementation and Testing", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.8, 264, 3102, 81, 5000, 'BSc', 2024, 'course-registration-system', true, '2026-07-11 01:58:54.143+00');
INSERT INTO public.resources VALUES ('exchange-rate-volatility-fdi-nigeria', 'Exchange Rate Volatility and Foreign Direct Investment Inflows in Nigeria, 2000 to 2020', 'Journal', 3, 2, 'Economics', 'Social Sciences', 'ECO 512 - International Finance', 'Analyzes twenty years of exchange rate data to show its effect on foreign investment decisions in Nigeria.', 'This paper analyzes twenty years of exchange rate data, from 2000 to 2020, to determine its effect on foreign direct investment decisions in Nigeria. Using annual data sourced from the Central Bank of Nigeria and the World Bank, a GARCH model was applied to test the relationship between naira volatility and FDI inflow. The results indicate that instability in the exchange rate discourages long term investment far more than it affects short term capital flows. The paper suggests that a more predictable exchange rate policy would attract steadier foreign investment.', '["Abstract", "Introduction", "Methodology", "Results", "Discussion", "References"]', 4.3, 96, 1284, 112, 6500, 'MSc', 2022, 'exchange-rate-chart', false, '2026-07-01 01:58:54.143+00');
INSERT INTO public.resources VALUES ('solar-cold-storage-business-plan-ogun', 'A Business Plan for a Solar-Powered Cold Storage Facility for Smallholder Farmers in Ogun State', 'Business Plan', 4, 6, 'Business Administration', 'Management Sciences', 'BAM 402 - Entrepreneurship and Small Business Management', 'Lays out a funding-ready plan for a cold storage business that reduces post-harvest losses for local farmers.', 'This business plan lays out a funding ready proposal for a solar powered cold storage facility designed to reduce post harvest losses among smallholder farmers in Ogun State. It covers a detailed market analysis, a three year financial projection and the equipment costs required to run a 40 ton facility. The primary target market is tomato and pepper farmers around Sango Ota who currently lose a significant share of their produce to spoilage before it reaches buyers. The plan also outlines a phased rollout strategy and expected returns for potential investors.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Market Analysis and Financial Projections", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.9, 58, 742, 54, 7000, 'BSc', 2025, 'cold-storage-solar-farm', true, '2026-07-09 01:58:54.143+00');
INSERT INTO public.resources VALUES ('poultry-processing-plant-feasibility-zaria', 'Feasibility Study on Establishing a Poultry Processing Plant in Zaria', 'Feasibility Study', 4, 3, 'Agricultural Economics', 'Management Sciences', 'AGE 405 - Agribusiness Management', 'Assesses the technical and financial viability of a mid-size poultry processing plant near Zaria.', 'This feasibility study assesses the technical and financial viability of establishing a mid-size poultry processing plant near Zaria. It reviews the cost of land, the sourcing of processing equipment and the projected demand for processed poultry from hotels and restaurants across Kaduna State. Based on moderate demand projections, the study concludes that the venture would break even within two years and seven months of operation. Recommendations are given on suitable financing structures for prospective investors.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Technical and Financial Analysis", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.1, 44, 861, 63, 3500, 'HND', 2021, 'poultry-processing-plant', false, '2026-06-25 01:58:54.143+00');
INSERT INTO public.resources VALUES ('past-questions-circuit-theory-electromagnetic-futa', 'Past Examination Questions: Circuit Theory and Electromagnetic Fields (2016-2023)', 'Past Questions', 6, 8, 'Electrical and Electronics Engineering', 'Engineering', 'EEE 305 - Circuit Theory and Electromagnetic Fields', 'Compiles eight years of exam questions and marking guides for the Circuit Theory course at FUTA.', 'This compilation brings together eight years of examination questions and marking guides for the Circuit Theory and Electromagnetic Fields course at the Federal University of Technology, Akure. Questions are grouped by topic, ranging from Kirchhoff''s laws to electromagnetic wave propagation, and each comes with worked solutions. Past scripts from three different lecturers were reviewed to identify recurring question patterns across semesters. Students preparing for exams can use this set to practice under realistic conditions.', '["2016 Examination Questions", "2018 Examination Questions", "2020 Examination Questions", "2022 Examination Questions", "2023 Examination Questions", "Marking Guide"]', 4.5, 133, 1976, 22, 2000, 'BSc', 2024, 'circuit-theory-notes', false, '2026-07-06 01:58:54.143+00');
INSERT INTO public.resources VALUES ('social-media-political-participation-benin', 'Social Media Use and Political Participation Among Youths in Benin City', 'Research Project', 5, 7, 'Mass Communication', 'Social Sciences', 'MAC 407 - New Media and Society', 'Investigates how Twitter and WhatsApp use shaped voting decisions among young people during the last election.', 'This study investigates how the use of Twitter and WhatsApp shaped voting decisions among young people during the last general election in Benin City. A survey of 220 undergraduates was conducted to measure the relationship between social media exposure and actual voting behaviour. The results show that while social media use raised political awareness considerably, this awareness did not always translate into registered votes among first time voters. The study recommends that civic groups pair online campaigns with offline voter registration drives.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Data Presentation and Analysis", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.4, 121, 1543, 71, 3500, 'BSc', 2023, 'social-media-phone', false, '2026-06-28 01:58:54.143+00');
INSERT INTO public.resources VALUES ('land-use-act-property-rights-nigeria', 'An Appraisal of the Land Use Act and Its Effect on Property Rights in Nigeria', 'Research Project', 7, 5, 'Law', 'Law', 'PPL 404 - Land Law', 'Reviews how the Land Use Act of 1978 restricts individual property ownership across Nigerian states.', 'This work reviews how the Land Use Act of 1978 continues to restrict individual property ownership across Nigerian states. It traces court judgments from 1980 to 2022 involving governor consent requirements and compulsory acquisition disputes. The paper argues that although the Act was meant to simplify land administration, it now slows down commercial development in practice. It concludes with proposed amendments that could balance government oversight with individual property rights.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Analysis of Case Law and Findings", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.2, 77, 1092, 89, 4500, 'BSc', 2022, 'land-property-documents', false, '2026-07-03 01:58:54.143+00');
INSERT INTO public.resources VALUES ('microbial-contamination-sachet-water-kano', 'Microbial Contamination of Sachet Water Sold Within Kano Metropolis', 'Seminar Paper', 8, 9, 'Microbiology', 'Science', 'MCB 404 - Food and Industrial Microbiology', 'Tests bacterial contamination levels in 30 sachet water brands sold around Kano markets and motor parks.', 'This paper tests bacterial contamination levels in 30 different sachet water brands sold around markets and motor parks within Kano metropolis. Samples were cultured in the laboratory and tested for coliform and E. coli counts against standards set by NAFDAC. Twelve of the thirty brands tested failed to meet the safe drinking water thresholds set by regulators. The study calls for stricter enforcement of production standards among local sachet water producers.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Data Analysis and Findings", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.7, 152, 2018, 58, 3000, 'BSc', 2022, 'sachet-water-lab', true, '2026-07-08 01:58:54.143+00');
INSERT INTO public.resources VALUES ('machine-learning-crop-disease-detection', 'A Comparative Study of Machine Learning Algorithms for Crop Disease Detection', 'Journal', 1, 10, 'Computer Science', 'Physical Sciences', 'CSC 415 - Machine Learning', 'Compares four machine learning models used to detect cassava and maize leaf diseases from photographs.', 'This study compares four machine learning models used to detect cassava and maize leaf diseases from photographs taken in the field. The convolutional neural network, support vector machine, random forest and k-nearest neighbours models were trained on a dataset of 3400 labelled leaf images. The convolutional neural network achieved the highest accuracy at 94.6 percent on the test set, outperforming the other three models. The paper discusses how such models could be deployed on low cost mobile devices for farmers.', '["Abstract", "Introduction", "Methodology", "Results", "Discussion", "References"]', 4.9, 39, 621, 168, 9000, 'PhD', 2020, 'crop-disease-leaf', false, '2026-06-23 01:58:54.143+00');
INSERT INTO public.resources VALUES ('youth-unemployment-south-east-nigeria', 'Determinants of Youth Unemployment in South East Nigeria', 'Research Project', 3, 4, 'Economics', 'Social Sciences', 'ECO 408 - Labour Economics', 'Studies why unemployment stays high among graduates in five South Eastern states despite rising enrollment.', 'This study examines why unemployment remains high among graduates in five South Eastern states despite rising enrollment in tertiary institutions. Data from 2015 to 2020 across Enugu, Anambra and Imo states was analyzed using multiple regression techniques. Education mismatch and low industrial investment were found to be the strongest contributing factors to persistent youth unemployment. The study recommends closer alignment between university curricula and the needs of local industries.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Data Presentation and Analysis", "Chapter Five: Summary, Conclusion and Recommendations"]', 4, 68, 934, 97, 5500, 'MSc', 2021, 'unemployment-graph', false, '2026-07-04 01:58:54.143+00');
INSERT INTO public.resources VALUES ('past-questions-financial-accounting-nd', 'Past Questions and Answers: Introduction to Financial Accounting (ND Level)', 'Past Questions', 2, 1, 'Accounting', 'Management Sciences', 'ACC 111 - Introduction to Financial Accounting', 'Gathers first and second semester financial accounting past questions with fully worked solutions for ND students.', 'This set gathers first and second semester past questions in Introduction to Financial Accounting, compiled specifically for ND level students. Each question comes with a fully worked solution covering ledger entries, trial balance preparation and final accounts. The set draws from five academic sessions to reflect the patterns commonly used by examiners in the department. Students can use this resource alongside their course textbook to practice before tests and examinations.', '["2021 Examination Questions", "2022 Examination Questions", "2023 Examination Questions", "2024 Examination Questions", "2025 Examination Questions", "Marking Guide"]', 4.6, 210, 2870, 34, 1500, 'ND', 2025, 'accounting-ledger-book', false, '2026-06-27 01:58:54.143+00');
INSERT INTO public.resources VALUES ('mini-grid-solar-electrification-kaduna', 'Feasibility Study on Mini-Grid Solar Electrification for Rural Communities in Kaduna State', 'Feasibility Study', 6, 3, 'Electrical Engineering', 'Engineering', 'EEE 502 - Renewable Energy Systems', 'Evaluates whether a solar mini-grid can profitably power three unconnected villages near Zaria.', 'This feasibility study evaluates whether a solar mini-grid can profitably power three unconnected villages located near Zaria in Kaduna State. Energy demand was modeled from 450 households and small shops and compared against the cost of solar panels, batteries and distribution infrastructure. Projected tariffs are shown to remain affordable to residents while still recovering installation costs within about six years. The study recommends a phased connection plan to manage upfront capital requirements.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Technical and Financial Analysis", "Chapter Five: Summary, Conclusion and Recommendations"]', 3.9, 27, 512, 76, 6000, 'PGD', 2019, 'solar-mini-grid', true, '2026-06-30 01:58:54.143+00');
INSERT INTO public.resources VALUES ('fair-hearing-election-tribunals-nigeria', 'The Right to Fair Hearing Under the 1999 Constitution: A Case Study of Election Tribunals', 'Research Project', 7, 7, 'Law', 'Law', 'PPL 508 - Constitutional Law', 'Examines whether election tribunal proceedings in Nigeria consistently uphold the constitutional right to fair hearing.', 'This paper examines whether election tribunal proceedings in Nigeria consistently uphold the constitutional right to fair hearing guaranteed under Section 36. Tribunal rulings from the 2019 and 2023 general elections were reviewed to identify recurring procedural complaints raised by petitioners. Delays in the filing of judgments emerged as the most common fair hearing complaint across the cases studied. The paper recommends stricter timelines for tribunals to deliver judgments after hearings conclude.', '["Chapter One: Introduction", "Chapter Two: Literature Review", "Chapter Three: Research Methodology", "Chapter Four: Analysis of Tribunal Rulings", "Chapter Five: Summary, Conclusion and Recommendations"]', 4.8, 91, 1345, 103, 5000, 'MSc', 2024, 'court-gavel-law', false, '2026-07-07 01:58:54.143+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('e649693c-84d0-44d2-9934-238b479a8538', 'Adaeze Chukwuma', 'demo@sparklyn.ng', '$2b$10$T9TBAPjHG4rbdaJ.lypTVeMtLAOkCqjnE7Pgd0WUOwfPdgGYviCEC', 'adaeze-chukwuma-portrait', 'University of Nigeria, Nsukka', 'Computer Science', 'BSc', 'user', '2026-07-12 01:58:54.253+00', '2026-07-12 01:58:54.254461+00');
INSERT INTO public.users VALUES ('d6a502ba-3027-4d74-b712-1884a923eedf', 'Sparklyn Admin', 'admin@sparklyn.ng', '$2b$10$EbDYy9C/2VKO5WchHpM03OF6gJkZ5T08kfDs2zBzYip1yemSXCGa2', 'sparklyn-admin', '', '', 'BSc', 'admin', '2026-07-12 01:58:54.345+00', '2026-07-12 01:58:54.346308+00');
INSERT INTO public.users VALUES ('09f31933-720f-459e-945f-10de642f3e59', 'Ngozi Balogun', 'test.user.1783822291763@sparklyn.ng', '$2b$10$BFyGcARpbuLvjm41oC.u8ed1KDxB7ytOvvNOa6X6o2xYbpIywUFc2', 'new-student', '', '', 'BSc', 'user', NULL, '2026-07-12 02:11:32.768001+00');


--
-- Data for Name: downloads; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.downloads VALUES ('download-01', 'e649693c-84d0-44d2-9934-238b479a8538', 'microbial-contamination-sachet-water-kano', 'Microbial Contamination of Sachet Water Sold Within Kano Metropolis', 'Seminar Paper', 'yesterday', 4.6);
INSERT INTO public.downloads VALUES ('download-02', 'e649693c-84d0-44d2-9934-238b479a8538', 'campus-course-registration-system', 'Design and Implementation of a Campus Course Registration System Using PHP and MySQL', 'Seminar Paper', '3 days ago', 6.4);
INSERT INTO public.downloads VALUES ('download-03', 'e649693c-84d0-44d2-9934-238b479a8538', 'past-questions-circuit-theory-electromagnetic-futa', 'Past Examination Questions: Circuit Theory and Electromagnetic Fields (2016-2023)', 'Past Questions', '5 days ago', 2.1);
INSERT INTO public.downloads VALUES ('download-04', 'e649693c-84d0-44d2-9934-238b479a8538', 'past-questions-financial-accounting-nd', 'Past Questions and Answers: Introduction to Financial Accounting (ND Level)', 'Past Questions', '5 days ago', 1.8);
INSERT INTO public.downloads VALUES ('download-05', 'e649693c-84d0-44d2-9934-238b479a8538', 'machine-learning-crop-disease-detection', 'A Comparative Study of Machine Learning Algorithms for Crop Disease Detection', 'Journal', '1 week ago', 12.4);
INSERT INTO public.downloads VALUES ('download-06', 'e649693c-84d0-44d2-9934-238b479a8538', 'youth-unemployment-south-east-nigeria', 'Determinants of Youth Unemployment in South East Nigeria', 'Research Project', '2 weeks ago', 7.9);
INSERT INTO public.downloads VALUES ('download-07', 'e649693c-84d0-44d2-9934-238b479a8538', 'impact-mobile-banking-sme-lagos', 'The Impact of Mobile Banking on Small and Medium Enterprises in Lagos State', 'Research Project', '3 weeks ago', 5.3);
INSERT INTO public.downloads VALUES ('download-08', 'e649693c-84d0-44d2-9934-238b479a8538', 'campus-course-registration-system', 'Design and Implementation of a Campus Course Registration System Using PHP and MySQL', 'Seminar Paper', '3 weeks ago', 6.4);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.notifications VALUES ('notification-01', 'e649693c-84d0-44d2-9934-238b479a8538', 'purchase', 'Payment confirmed', 'Your payment for ''Microbial Contamination of Sachet Water Sold Within Kano Metropolis'' was successful.', '2h ago', false);
INSERT INTO public.notifications VALUES ('notification-02', 'e649693c-84d0-44d2-9934-238b479a8538', 'price-drop', 'Price drop alert', '''Feasibility Study on Mini-Grid Solar Electrification for Rural Communities in Kaduna State'' dropped from 7000 to 6000 naira.', '6h ago', false);
INSERT INTO public.notifications VALUES ('notification-03', 'e649693c-84d0-44d2-9934-238b479a8538', 'new-match', 'New match for your saved search', '3 new resources match ''youth unemployment Nigeria economics''.', '1d ago', false);
INSERT INTO public.notifications VALUES ('notification-04', 'e649693c-84d0-44d2-9934-238b479a8538', 'system', 'Download link refreshed', 'We refreshed your download link for ''A Comparative Study of Machine Learning Algorithms for Crop Disease Detection'' after it expired.', '2d ago', true);
INSERT INTO public.notifications VALUES ('notification-05', 'e649693c-84d0-44d2-9934-238b479a8538', 'purchase', 'Order receipt sent', 'Receipt for order SPK-10587 was emailed to your inbox.', '3d ago', true);
INSERT INTO public.notifications VALUES ('notification-06', 'e649693c-84d0-44d2-9934-238b479a8538', 'new-match', 'New match for your saved search', '6 new resources match ''final year project topics computer science''.', '1w ago', true);
INSERT INTO public.notifications VALUES ('notification-07', 'e649693c-84d0-44d2-9934-238b479a8538', 'system', 'Account verified', 'Your student email was verified successfully. You now get early access to new uploads.', '2w ago', true);


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES ('SPK-10428', 'e649693c-84d0-44d2-9934-238b479a8538', '14 Jan 2026', 5000, 'Paid', 'Paystack', '2026-07-12 01:58:54.353627+00');
INSERT INTO public.orders VALUES ('SPK-10469', 'e649693c-84d0-44d2-9934-238b479a8538', '2 Feb 2026', 3500, 'Paid', 'Flutterwave', '2026-07-12 01:58:54.359933+00');
INSERT INTO public.orders VALUES ('SPK-10512', 'e649693c-84d0-44d2-9934-238b479a8538', '19 Feb 2026', 9000, 'Paid', 'Paystack', '2026-07-12 01:58:54.363802+00');
INSERT INTO public.orders VALUES ('SPK-10587', 'e649693c-84d0-44d2-9934-238b479a8538', '3 Apr 2026', 5500, 'Refunded', 'Paystack', '2026-07-12 01:58:54.367505+00');
INSERT INTO public.orders VALUES ('SPK-10634', 'e649693c-84d0-44d2-9934-238b479a8538', '27 Apr 2026', 4000, 'Paid', 'Flutterwave', '2026-07-12 01:58:54.370846+00');
INSERT INTO public.orders VALUES ('SPK-10701', 'e649693c-84d0-44d2-9934-238b479a8538', '9 Jun 2026', 3000, 'Pending', 'Paystack', '2026-07-12 01:58:54.375078+00');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.order_items VALUES (1, 'SPK-10428', 'campus-course-registration-system', 'Design and Implementation of a Campus Course Registration System Using PHP and MySQL', 0);
INSERT INTO public.order_items VALUES (2, 'SPK-10469', 'past-questions-circuit-theory-electromagnetic-futa', 'Past Examination Questions: Circuit Theory and Electromagnetic Fields (2016-2023)', 0);
INSERT INTO public.order_items VALUES (3, 'SPK-10469', 'past-questions-financial-accounting-nd', 'Past Questions and Answers: Introduction to Financial Accounting (ND Level)', 0);
INSERT INTO public.order_items VALUES (4, 'SPK-10512', 'machine-learning-crop-disease-detection', 'A Comparative Study of Machine Learning Algorithms for Crop Disease Detection', 0);
INSERT INTO public.order_items VALUES (5, 'SPK-10587', 'youth-unemployment-south-east-nigeria', 'Determinants of Youth Unemployment in South East Nigeria', 0);
INSERT INTO public.order_items VALUES (6, 'SPK-10634', 'impact-mobile-banking-sme-lagos', 'The Impact of Mobile Banking on Small and Medium Enterprises in Lagos State', 0);
INSERT INTO public.order_items VALUES (7, 'SPK-10701', 'microbial-contamination-sachet-water-kano', 'Microbial Contamination of Sachet Water Sold Within Kano Metropolis', 0);


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.purchases VALUES ('purchase-01', 'e649693c-84d0-44d2-9934-238b479a8538', 'campus-course-registration-system', 5000, '14 Jan 2026', 3, '2026-07-12 01:58:54.349929+00');
INSERT INTO public.purchases VALUES ('purchase-02', 'e649693c-84d0-44d2-9934-238b479a8538', 'past-questions-circuit-theory-electromagnetic-futa', 2000, '2 Feb 2026', 5, '2026-07-12 01:58:54.349929+00');
INSERT INTO public.purchases VALUES ('purchase-03', 'e649693c-84d0-44d2-9934-238b479a8538', 'past-questions-financial-accounting-nd', 1500, '2 Feb 2026', 2, '2026-07-12 01:58:54.349929+00');
INSERT INTO public.purchases VALUES ('purchase-04', 'e649693c-84d0-44d2-9934-238b479a8538', 'machine-learning-crop-disease-detection', 9000, '19 Feb 2026', 1, '2026-07-12 01:58:54.349929+00');
INSERT INTO public.purchases VALUES ('purchase-05', 'e649693c-84d0-44d2-9934-238b479a8538', 'youth-unemployment-south-east-nigeria', 5500, '3 Apr 2026', 4, '2026-07-12 01:58:54.349929+00');
INSERT INTO public.purchases VALUES ('purchase-06', 'e649693c-84d0-44d2-9934-238b479a8538', 'impact-mobile-banking-sme-lagos', 4000, '27 Apr 2026', 1, '2026-07-12 01:58:54.349929+00');
INSERT INTO public.purchases VALUES ('purchase-07', 'e649693c-84d0-44d2-9934-238b479a8538', 'microbial-contamination-sachet-water-kano', 3000, '9 Jun 2026', 2, '2026-07-12 01:58:54.349929+00');


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.reviews VALUES ('review-01', 'impact-mobile-banking-sme-lagos', 'Chidinma Okonkwo', 'chidinma-okonkwo', 5, '3 weeks ago', 'This project gave me a clear structure to follow for my own research on SME banking. The survey questions in the appendix saved me a lot of time. Very detailed work.');
INSERT INTO public.reviews VALUES ('review-02', 'impact-mobile-banking-sme-lagos', 'Ibrahim Musa', 'ibrahim-musa', 4, '2 months ago', 'Good material overall, the data analysis chapter is solid. I would have liked more references from recent years but it still helped my literature review a lot.');
INSERT INTO public.reviews VALUES ('review-03', 'campus-course-registration-system', 'Oluwaseun Adeyemi', 'oluwaseun-adeyemi', 5, '1 month ago', 'Exactly what I needed for my final year project. The source code explanation in chapter four made it easy to adapt for my own school system.');
INSERT INTO public.reviews VALUES ('review-04', 'campus-course-registration-system', 'Blessing Etim', 'blessing-etim', 4, '5 weeks ago', 'Well documented and the database design section is easy to follow. A few screenshots were blurry but the write up more than makes up for it.');
INSERT INTO public.reviews VALUES ('review-05', 'exchange-rate-volatility-fdi-nigeria', 'Aisha Abdullahi', 'aisha-abdullahi', 5, '2 weeks ago', 'The GARCH model explanation is one of the clearest I have read. Helped me understand how to apply it to my own economics seminar paper.');
INSERT INTO public.reviews VALUES ('review-06', 'exchange-rate-volatility-fdi-nigeria', 'Chukwuemeka Obi', 'chukwuemeka-obi', 3, '3 months ago', 'Decent content but the data tables could be formatted better. Still useful for citing recent FDI trends in my project.');
INSERT INTO public.reviews VALUES ('review-07', 'solar-cold-storage-business-plan-ogun', 'Folake Ogunleye', 'folake-ogunleye', 5, '10 days ago', 'Used this as a template for my own agribusiness proposal and my supervisor was impressed with the financial projections section. Worth every naira.');
INSERT INTO public.reviews VALUES ('review-08', 'solar-cold-storage-business-plan-ogun', 'Yusuf Garba', 'yusuf-garba', 4, '6 weeks ago', 'Solid business plan with realistic numbers. The market analysis part on tomato farmers helped me understand how to structure mine for a different state.');
INSERT INTO public.reviews VALUES ('review-09', 'poultry-processing-plant-feasibility-zaria', 'Grace Effiong', 'grace-effiong', 4, '2 months ago', 'Clear breakdown of the equipment costs and demand projections. I adapted the methodology for a fish farming feasibility study of my own.');
INSERT INTO public.reviews VALUES ('review-10', 'poultry-processing-plant-feasibility-zaria', 'Suleiman Yakubu', 'suleiman-yakubu', 3, '4 weeks ago', 'Content is useful but the pagination felt short for the price. Still, the financial analysis section is detailed enough to reference.');
INSERT INTO public.reviews VALUES ('review-11', 'past-questions-circuit-theory-electromagnetic-futa', 'Tobenna Nwosu', 'tobenna-nwosu', 5, '1 week ago', 'These past questions were spot on for my exam prep. The marking guide showed me exactly where I was losing marks in past attempts.');
INSERT INTO public.reviews VALUES ('review-12', 'past-questions-circuit-theory-electromagnetic-futa', 'Halima Bello', 'halima-bello', 5, '3 weeks ago', 'Very organized by topic, made revision so much faster before my circuit theory exam. I passed with a much better grade this semester.');
INSERT INTO public.reviews VALUES ('review-13', 'microbial-contamination-sachet-water-kano', 'Ifeoma Chukwu', 'ifeoma-chukwu', 5, '5 days ago', 'Referenced this heavily for my own seminar on water quality. The lab methodology section is thorough and easy to replicate.');
INSERT INTO public.reviews VALUES ('review-14', 'microbial-contamination-sachet-water-kano', 'Abubakar Sadiq', 'abubakar-sadiq', 4, '7 weeks ago', 'Good scientific rigor and the NAFDAC standard comparisons were helpful. Wish there were more photos of the culture plates though.');
INSERT INTO public.reviews VALUES ('review-15', 'machine-learning-crop-disease-detection', 'Adaeze Nnamdi', 'adaeze-nnamdi', 5, '2 weeks ago', 'One of the best written journal papers I have downloaded here. The model comparison tables made my literature review section so much stronger.');
INSERT INTO public.reviews VALUES ('review-16', 'machine-learning-crop-disease-detection', 'Kabir Aliyu', 'kabir-aliyu', 4, '1 month ago', 'Technical but well explained. Helped me understand CNN architecture better for my own final year project on plant disease detection.');
INSERT INTO public.reviews VALUES ('review-17', 'past-questions-financial-accounting-nd', 'Precious Udo', 'precious-udo', 5, '4 days ago', 'These past questions matched almost exactly with what came out in my exam. Worked solutions made revision so much easier for me.');
INSERT INTO public.reviews VALUES ('review-18', 'past-questions-financial-accounting-nd', 'Musa Danladi', 'musa-danladi', 3, '2 months ago', 'Helpful for practice but some of the solutions felt rushed in places. Still better than most free materials I found online.');
INSERT INTO public.reviews VALUES ('review-19', 'fair-hearing-election-tribunals-nigeria', 'Nkechi Umeh', 'nkechi-umeh', 5, '6 days ago', 'Excellent case law analysis. This gave me a strong foundation for my constitutional law seminar on electoral justice in Nigeria.');
INSERT INTO public.reviews VALUES ('review-20', 'fair-hearing-election-tribunals-nigeria', 'Emmanuel Etuk', 'emmanuel-etuk', 4, '9 weeks ago', 'Well researched with recent tribunal rulings included. My supervisor asked me to expand on some points but the base material is solid.');


--
-- Data for Name: saved_searches; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.saved_searches VALUES ('saved-search-01', 'e649693c-84d0-44d2-9934-238b479a8538', 'final year project topics computer science', 'Computer Science, BSc', 6, '2 weeks ago');
INSERT INTO public.saved_searches VALUES ('saved-search-02', 'e649693c-84d0-44d2-9934-238b479a8538', 'feasibility study solar energy', 'Electrical Engineering, Feasibility Study', 2, '1 month ago');
INSERT INTO public.saved_searches VALUES ('saved-search-03', 'e649693c-84d0-44d2-9934-238b479a8538', 'past questions accounting ND level', 'Accounting, ND', 0, '5 days ago');
INSERT INTO public.saved_searches VALUES ('saved-search-04', 'e649693c-84d0-44d2-9934-238b479a8538', 'youth unemployment Nigeria economics', 'Economics, MSc', 3, '3 weeks ago');


--
-- Data for Name: wishlists; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.wishlists VALUES (1, 'e649693c-84d0-44d2-9934-238b479a8538', 'exchange-rate-volatility-fdi-nigeria');
INSERT INTO public.wishlists VALUES (2, 'e649693c-84d0-44d2-9934-238b479a8538', 'solar-cold-storage-business-plan-ogun');
INSERT INTO public.wishlists VALUES (3, 'e649693c-84d0-44d2-9934-238b479a8538', 'poultry-processing-plant-feasibility-zaria');
INSERT INTO public.wishlists VALUES (4, 'e649693c-84d0-44d2-9934-238b479a8538', 'past-questions-circuit-theory-electromagnetic-futa');
INSERT INTO public.wishlists VALUES (5, 'e649693c-84d0-44d2-9934-238b479a8538', 'social-media-political-participation-benin');


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.order_items_id_seq', 7, true);


--
-- Name: universities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.universities_id_seq', 10, true);


--
-- Name: wishlists_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.wishlists_id_seq', 5, true);


--
-- PostgreSQL database dump complete
--


