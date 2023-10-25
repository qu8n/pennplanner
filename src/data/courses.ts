// Supabase SQL query: select json_agg(course_catalog) from public.course_catalog

export const courses = [
  {
    course_id: 'CIS 5150',
    course_name:
      'Fundamentals of Linear Algebra & Optimization (Math for Machine Learning)',
    course_unit: 1,
    course_description:
      'There are hardly any machine learning problems whose solutions do not make use of linear algebra. This course presents tools from linear algebra and basic optimization that are used to solve various machine learning and computer science problems. It places emphasis on linear regression, data compression, support vector machines and more, which will provide a basis for further study in machine learning, computer vision, and data science. Both theoretical and algorithmic aspects will be discussed, and students will apply theory to real-world situations through MATLAB projects.',
    course_prereqs:
      'Calculus (Chapters 8, 9, 10, and 48 of Schaum’s Outlines of Calculus fifth edition by Frank Ayers and Elliott Mendelssohn) Suggested: Undergraduate course in linear algebra (helpful but not required), Chapters 1 through 3 of Schaums Outline of Linear Algebra, fourth version by Seymour Lipschitz and Marc Lipson',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: true,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5500',
    course_name: 'Database & Information Systems',
    course_unit: 1,
    course_description:
      'Structured information is the lifeblood of commerce, government, and science today. This course provides an introduction to the broad field of information management systems, covering a range of topics relating to structured data, from data modeling to logical foundations and popular languages, to system implementations. We will study the relational data model; SQL; database design using the Entity-Relationship model and relational design theory; transactions and updates; efficient storage of data; indexes; query execution and query optimization; and “big data” and NoSQL systems.',
    course_prereqs:
      'CIT 5910 Introduction to Software Development, CIT 5920 Mathematical Foundations of Computer Science | Knowledge of Javascript & Web Development (HTML, CSS) is recommended. | Recommended Corequisite: CIT 5960 Algorithms & Computation',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: true,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5210',
    course_name: 'Artificial Intelligence',
    course_unit: 1,
    course_description:
      'This course investigates algorithms to implement resource-limited knowledge-based agents which sense and act in the world. Topics include: search, machine learning, probabilistic reasoning, natural language processing, knowledge representation and logic. After a brief introduction to the language, programming assignments will be in Python.',
    course_prereqs: 'CIT 5910, CIT 5920, CIT 5940, and CIT 5960',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5300',
    course_name: 'Natural Language Processing',
    course_unit: 1,
    course_description:
      'This course provides an overview of the field of natural language processing. The goal of the field is to build technologies that will allow machines to understand human languages. Applications include machine translation, automatic summarization, question answering systems, and dialog systems. NLP is used in technologies like Amazon Alexa and Google Translate.',
    course_prereqs:
      'CIT 5910 Introduction to Software Development, CIT 5920 Mathematical Foundations of Computer Science , and CIT 5940 Data Structures & Software Design. Recommended: CIT 5960',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5470',
    course_name: 'Software Analysis',
    course_unit: 1,
    course_description:
      'This course provides a rigorous and hands-on introduction to the field of software analysis — a body of powerful techniques and tools for analyzing modern software, with applications to systematically uncover insidious bugs, prevent security vulnerabilities, automate testing and debugging, and improve our confidence that software will behave as intended. Topics covered include dynamic analysis, random testing, automated test generation, dataflow analysis, constraint solving, type inference, and symbolic execution. Lectures present software analysis concepts and algorithms in a language-independent manner, while weekly programming labs involve realizing them concretely in C++ using the LLVM compiler infrastructure. This course will enable you to become a better software engineer or security analyst by learning a rich repertoire of software analysis ideas and know-how to apply them to specific scenarios in practice.',
    course_prereqs:
      'CIT 5920 Mathematical Foundations of Computer Science, CIT 5940 Data Structures & Software Design, CIT 5950 Computer Systems Programming. Specifically: Assignments involve programming in C++ using the LLVM compiler infrastructure. Lectures and exams presume basic knowledge of algorithms (e.g. graph traversal and asymptotic analysis) and basic background in logic (e.g. set theory and boolean algebra).',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: true,
  },
  {
    course_id: 'CIT 5920',
    course_name: 'Mathematical Foundations of Computer Science',
    course_unit: 1,
    course_description:
      'This course introduces students to math concepts that form the backbone of the majority of computer science. Topics covered include sets, functions, permutations and combinations, discrete probability, expectation, mathematical induction, and graph theory. The goal of the course is to ensure that students are comfortable enough with the math required for most of the CIS electives.',
    course_prereqs:
      'There are no college-level prerequisites for this class. However, reviewing the algebra learned in high school will be very useful. No prior programming background is expected nor will this course assign any programming exercises.',
    mcit_core_course: true,
    mcit_open_elective: false,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIT 5930',
    course_name: 'Introduction to Computer Systems',
    course_unit: 1,
    course_description:
      'This course provides an introduction to fundamental concepts of computer systems and computer architecture. Students learn the C programming language and an instruction set (machine language) as a basis for understanding how computers represent data, process information, and execute programs.',
    course_prereqs:
      'This course does not have prerequisites, but CIT 5910 Introduction to Software Development is a co-requisite.',
    mcit_core_course: true,
    mcit_open_elective: false,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIT 5940',
    course_name: 'Data Structures & Software Design',
    course_unit: 1,
    course_description:
      'This course focuses on data structures, software design, and advanced Java. The course starts off with an introduction to data structures and basics of the analysis of algorithms. Important data structures covered include arrays, lists, stacks, queues, trees, hash maps, and graphs. The course also focuses on software design and advanced Java topics such as software architectures, design patterns, and concurrency.',
    course_prereqs:
      'Students in this course are expected to have completed or waived CIT 5910 Introduction to Software Development.',
    mcit_core_course: true,
    mcit_open_elective: false,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'DATS 5750',
    course_name: 'Cloud Technologies Practicum (.5 CU)',
    course_unit: 0.5,
    course_description:
      'Cloud computing is the heart of modern digital applications. This course provides practical, hands-on knowledge and understanding of distributed computing principles to design and develop applications that utilize public clouds such as Google Cloud, Amazon Web Services, Azure, etc. The course will cover cloud infrastructure services for computing, storage, networking, data analytics, machine learning, and modern application development. Students will learn to architect and implement complex applications utilizing different cloud infrastructure components to engineer robust, scalable solutions across practical industry use cases.',
    course_prereqs: 'CIT 5910, CIT 5920, CIT 5930, CIT 5940, and CIT 5950',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: true,
  },
  {
    course_id: 'CIS 5530',
    course_name: 'Networked Systems',
    course_unit: 1,
    course_description:
      'This course provides an introduction to fundamental concepts in the design and implementation of networked systems, their protocols, and applications. Topics to be covered include: Internet architecture, network applications, addressing, routing, transport protocols, peer-to-peer networks, software-defined networks, and distributed systems. The course involves regular quizzes, two large group-based networked systems implementation projects, and two written exams.',
    course_prereqs:
      'CIT 5950 Computer Systems Programming; Data structures and basic probability. Course projects require knowledge of C/C++.',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: true,
  },
  {
    course_id: 'CIS 5550',
    course_name: 'Internet and Web Systems',
    course_unit: 1,
    course_description:
      'This course focuses on the issues encountered in building Internet and Web systems, such as scalability, interoperability, consistency, replication, fault tolerance, and security. We will examine how services like Google or Amazon handle billions of requests from all over the world each day, (almost) without failing or becoming unreachable. We will study how to collect massive-scale data sets, how to process them, and how to extract useful information from them, and we will have a look at the massive, heavily distributed infrastructure that is used to run these services (and similar cloud-based services) today.',
    course_prereqs:
      'Notice that this is NOT a course on web design, or on web application development! Instead of learning how to use a web server such as Apache or a scalable analytics system such as Spark, we will actually build our own little web server, and a little mini-“Spark”, from scratch. As a side effect, you will learn about some aspects of large-scale software development, such as working with APIs and specifications, thinking about modularity, reading other people’s code, managing versions, and debugging.',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIT 5950',
    course_name: 'Computer Systems Programming',
    course_unit: 1,
    course_description:
      'This course is a continuation of CIT 5930 and introduces students to fundamental concepts in computing systems. The course is divided into two parts. The first half of the course introduces important concepts in modern operating systems: processes, scheduling, caching, and virtual memory. The second half of the course provides an introduction to fundamental concepts in the design and implementation of networked systems, their protocols, and applications. The course will use the C program language, and will develop your knowledge on C system calls, and libraries for process/thread creation and manipulation, synchronization, and network communication.',
    course_prereqs: 'CIT 5930',
    mcit_core_course: true,
    mcit_open_elective: false,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: true,
  },
  {
    course_id: 'CIT 5960',
    course_name: 'Algorithms & Computation',
    course_unit: 1,
    course_description:
      'This course focuses primarily on the design and analysis of algorithms. It begins with sorting and searching algorithms and then investigates graph algorithms. In order to study graph algorithms, general algorithm design patterns like dynamic programming and greedy algorithms are introduced. A section of this course is also devoted to understanding NP-Completeness.',
    course_prereqs:
      'CIT 5920 | Co-requisite: CIT 5940 (Taking concurrently is allowed but taking beforehand is preferred)',
    mcit_core_course: true,
    mcit_open_elective: false,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: true,
  },
  {
    course_id: 'CIT 5910',
    course_name: 'Introduction to Software Development',
    course_unit: 1,
    course_description:
      'This course is an introduction to fundamental concepts of programming and computer science for students who have little or no experience in these areas. Includes an introduction to programming using Python, where students are introduced to core programming concepts like data structures, conditionals, loops, variables, and functions. Also provides an introduction to basic data science techniques using Python. The second half of this course is an introduction to object-oriented programming using Java, where students are introduced to polymorphism, inheritance, abstract classes, interfaces, and advanced data structures. Students will also learn how to read and write to files, connect to databases, and use regular expressions to parse text. This course includes substantial programming assignments in both Python and Java, and teaches techniques for test-driven development and debugging code.',
    course_prereqs: 'No Pre-Requisites',
    mcit_core_course: true,
    mcit_open_elective: false,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'ESE 5420',
    course_name: 'Statistics for Data Science',
    course_unit: 1,
    course_description:
      'The course covers the methodological foundations of data science, emphasizing basic concepts in statistics and learning theory, but also modern methodologies. Learning of distributions and their parameters. Testing of multiple hypotheses. Linear and nonlinear regression and prediction. Classification. Uncertainty quantification. Model validation. Clustering. Dimensionality reduction. Probably approximately correct (PAC) learning. Such theoretical concepts are further complemented by exemplar applications, case studies (datasets), and programming exercises (in Python) drawn from electrical engineering, computer science, the life sciences, finance, and social networks.',
    course_prereqs:
      'CIT 5920 Mathematical Foundations of Computer Science, Programming background, Basic Probability',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: true,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'ESE 5460',
    course_name: 'Principles of Deep Learning',
    course_unit: 1,
    course_description:
      'Deep networks are at the heart of modern approaches in computer vision, natural language processing and robotics. Design of these networks requires a combination of intuition, theoretical foundation and empirical experience; this course discusses general principles of deep learning that cut across these three. It develops insight into popular empirical practices with a focus on the training of deep networks, builds theoretical skills to develop new ideas in deep learning and to deploy deep networks in real world applications. A fair degree of mathematical and programming proficiency is necessary to complete the coursework.',
    course_prereqs: 'CIT 5910, CIT 5920, and CIS 5150 or ESE 5410 or ESE 5420',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5510',
    course_name: 'Computer & Network Security',
    course_unit: 1,
    course_description:
      'This is an introduction to topics in the security of computer systems and communication on networks of computers. The course covers four major areas: fundamentals of cryptography, security for communication protocols, security for operating systems and mobile programs, and security for electronic commerce. Sample specific topics include: passwords and offline attacks, DES, RSA, DSA, SHA, SSL, CBC, IPSec, SET, DDoS attacks, biometric authentication, PKI, smart cards, S/MIME, privacy on the Web, viruses, security models, wireless security, and sandboxing. Students will be expected to display knowledge of both theory and practice through written examinations and programming assignments.',
    course_prereqs:
      'CIT 5920 Mathematical Foundations of Computer Science; CIT 5930 Intro to Computer Systems; CIT 5950 Computer Systems Programming',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'ESE 5410',
    course_name: 'Machine Learning for Data Science',
    course_unit: 1,
    course_description:
      'In this course, students will learn a broad range of statistical and computational tools to analyze large datasets. This course provides a solid foundation of data science, statistics and machine learning to make data-driven predictions via statistical modeling and inference. Using case studies and hands-on exercises, the student will have the opportunity to practice and increase their data analysis skills using Python. The objective of these case studies is to identify and implement appropriate modeling and analysis techniques in order to extract meaningful information from large datasets.',
    course_prereqs:
      'CIT 5920 Mathematical Foundations of Computer Science, Programming background, Basic Probability',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: true,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'EAS 5830',
    course_name: 'Blockchains (0.5 CU)',
    course_unit: 0.5,
    course_description:
      'This course introduces the technology that powers blockchains like Bitcoin and Ethereum. We will cover the key cryptographic tools that enable blockchains – collision-resistant hash functions and digital signature schemes. We’ll learn about the architecture of different blockchains, their consensus mechanisms, economics and how to interact with them. The assignments in this course are primarily coding-based. We will learn to read and write from the blockchain using Python libraries and write our own smart contracts in Solidity. At the end of this course, students should understand the power and limitations of blockchain technology, and be able to develop software that interacts with current blockchain platforms. Coding languages: Python, Solidity',
    course_prereqs: 'CIT 5910, CIT 5920',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'EAS 5850',
    course_name: 'Imaging Informatics (.5 CU)',
    course_unit: 0.5,
    course_description:
      'This 0.5 CU course provides a comprehensive introduction to the field of imaging informatics, with a focus on radiology as the clinical imaging domain. Students will learn about the importance of informatics to the clinical practice of radiology, the unique types of data encountered, relevant data and transactional standards, the growing role of artificial intelligence in radiology, and the challenges faced by imaging informaticists around the globe.',
    course_prereqs: 'CIT 5910, CIT 5920, and CIT 5940',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5450',
    course_name: 'Big Data Analytics',
    course_unit: 1,
    course_description:
      'In the new era of big data, we are increasingly faced with the challenges of processing vast volumes of data. Given the limits of individual machines (compute power, memory, bandwidth), increasingly the solution is to process the data in parallel on many machines. This course focuses on the fundamentals of scaling computation to handle common data analytics tasks. You will learn about basic tasks in collecting, wrangling, and structuring data; programming models for performing certain kinds of computation in a scalable way across many compute nodes; common approaches to converting algorithms to such programming models; standard toolkits for data analysis consisting of a wide variety of primitives; and popular distributed frameworks for analytics tasks such as filtering, graph analysis, clustering, and classification.',
    course_prereqs:
      'CIT 5910 Introduction to Software Development or equivalent programming experience; Broad familiarity with probability and statistics, as well as programming in Python; Additional background in statistics, data analysis (e.g., in Matlab or R), and machine learning is helpful (example: ESE 5420 Statistics for Data Science: An Applied Machine Learning Course)',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: true,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5810',
    course_name: 'Computer Vision & Computational Photography',
    course_unit: 1,
    course_description:
      'This is an introductory course to computer vision and computational photography. This course will explore four topics: 1) image feature detection, 2) image morphing, 3) image stitching, and 4) deep learning related to images. This course is intended to provide a hands-on experience with interesting things to do on images/pixels. The world is becoming image-centric. Cameras are now found everywhere: in our cell phones, automobiles, and even in medical surgery tools. In addition, computer vision technology has led to innovations in areas such as movie production, medical diagnosis, biometrics, and digital library. This course is suited for students with any engineering background who have a basic understanding of linear algebra and programming, along with plenty of imagination.',
    course_prereqs:
      'CIT 5910 Introduction to Software Development, CIT 5920 Mathematical Foundations of Computer Science, CIT 5930 Introduction to Computer Systems and CIT 5940 Data Structures & Software Design. Students may take CIT 5950 Computer Systems Programming and/or CIT 5960 Algorithms & Computation concurrently with this elective.',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'EAS 5740',
    course_name: 'How to Use Data (.5 CU)',
    course_unit: 0.5,
    course_description:
      'This 0.5 CU course is an excellent introduction for those who want to learn about the mechanics of data, performing data analysis to gain insights, applying data science techniques to make predictions, and applying data analytics to answer questions and to address interesting business problems. Students will learn how to interpret and frame business problems to be addressed by analytics. The course will also cover different elements of the data analytics process, including data wrangling and cleaning, data exploration and descriptive analytics, data modeling, machine learning, predictive analytics, data visualization and the presentation of analysis and insights using data storytelling.',
    course_prereqs: 'CIT 5910',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: true,
    mse_ds_open_elective: false,
  },
  {
    course_id: 'CIS 5490',
    course_name:
      'Wireless Communications for Mobile Networks and Internet of Things',
    course_unit: 1,
    course_description:
      'This course covers today’s state-of-the-art wireless technology 4G LTE, the next-generation wireless technology, 5G NR, and Wi-Fi technologies. Internet of Things (IoT) and the network slicing technologies in the 4G and 5G mobile networks, which are the parts of the main drivers for 5G, and the Docker container and Kubernetes will be also covered. Students will use an end-to-end LTE and Wi-Fi application performance simulation platform to analyze network protocols and analyze the impact on end-to-end application performance over the wireless network. Students will also build a simple IoT service with an IoT client device emulator and a real IoT server platform on the Internet. The course starts with the fundamental wireless technology background and networking topics with hands-on projects to help students build a foundation for the course, and the course includes contemporary research paper readings, assignments to utilize the simulation platform and implementation projects. The simulation platform provides network protocol stacks and base source code.',
    course_prereqs:
      'CIT 5930 Introduction to Computer Systems and CIT 5950 Computer Systems Programming',
    mcit_core_course: false,
    mcit_open_elective: true,
    mse_ds_core_course: false,
    mse_ds_technical_elective: false,
    mse_ds_open_elective: true,
  },
]
