export interface Application {
  id: string;
  ref: string;
  learnerName: string;
  surname: string;
  dateOfBirth: string;
  gender: string;
  gradeApplying: string;
  currentSchool: string;
  currentGrade: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  stream: "Academic" | "Technical" | "Commercial";
  category: "New Admission" | "Transfer" | "Returning";
  status: "Pending" | "Under Review" | "Accepted" | "Waitlisted" | "Rejected";
  viability: "High" | "Medium" | "Low";
  submittedAt: string;
  documents: string[];
  notes: string;
}

export interface Payment {
  id: string;
  learnerName: string;
  grade: string;
  parentName: string;
  amount: number;
  dateOfPayment: string;
  method: "EFT" | "Cash" | "Card";
  reference: string;
  status: "Verified" | "Pending" | "Rejected";
  proofFile: string;
  submittedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type:
    | "Application Form"
    | "Report Card"
    | "Transfer Letter"
    | "Medical Form"
    | "Consent Form"
    | "Policy Document"
    | "Other";
  uploadedBy: string;
  linkedTo: string;
  date: string;
  status: "Active" | "Archived";
}

export interface ContentSection {
  id: string;
  page: string;
  section: string;
  content: string;
  lastUpdated: string;
}

const STORAGE_KEYS = {
  applications: "kc_admin_applications",
  payments: "kc_admin_payments",
  documents: "kc_admin_documents",
  content: "kc_admin_content",
  auth: "kc_admin_auth",
} as const;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const seedApplications: Application[] = [
  {
    id: generateId(),
    ref: "KC-2027-1001",
    learnerName: "Thando",
    surname: "Mkhize",
    dateOfBirth: "2012-03-15",
    gender: "Male",
    gradeApplying: "Grade 8",
    currentSchool: "Kokstad Primary",
    currentGrade: "Grade 7",
    parentName: "Sipho Mkhize",
    parentEmail: "sipho.mkhize@email.co.za",
    parentPhone: "082 555 1001",
    stream: "Academic",
    category: "New Admission",
    status: "Under Review",
    viability: "High",
    submittedAt: "2026-04-20",
    documents: ["Birth certificate", "School report", "Proof of residence"],
    notes: "Strong academic record, top 5 in class",
  },
  {
    id: generateId(),
    ref: "KC-2027-1002",
    learnerName: "Amahle",
    surname: "Dlamini",
    dateOfBirth: "2011-07-22",
    gender: "Female",
    gradeApplying: "Grade 9",
    currentSchool: "Franklin Primary",
    currentGrade: "Grade 8",
    parentName: "Nomsa Dlamini",
    parentEmail: "nomsa.d@email.co.za",
    parentPhone: "073 555 1002",
    stream: "Academic",
    category: "Transfer",
    status: "Accepted",
    viability: "High",
    submittedAt: "2026-04-18",
    documents: ["Birth certificate", "Transfer letter", "School report"],
    notes: "Transferring from Durban. Excellent references.",
  },
  {
    id: generateId(),
    ref: "KC-2027-1003",
    learnerName: "Luthando",
    surname: "Nkosi",
    dateOfBirth: "2012-11-05",
    gender: "Male",
    gradeApplying: "Grade 8",
    currentSchool: "Swartberg Primary",
    currentGrade: "Grade 7",
    parentName: "Bongani Nkosi",
    parentEmail: "bnkosi@email.co.za",
    parentPhone: "061 555 1003",
    stream: "Technical",
    category: "New Admission",
    status: "Pending",
    viability: "Medium",
    submittedAt: "2026-05-02",
    documents: ["Birth certificate", "School report"],
    notes: "Missing proof of residence",
  },
  {
    id: generateId(),
    ref: "KC-2027-1004",
    learnerName: "Zinhle",
    surname: "Cele",
    dateOfBirth: "2010-01-30",
    gender: "Female",
    gradeApplying: "Grade 10",
    currentSchool: "Mount Currie High",
    currentGrade: "Grade 9",
    parentName: "Thandiwe Cele",
    parentEmail: "tcele@email.co.za",
    parentPhone: "084 555 1004",
    stream: "Commercial",
    category: "Transfer",
    status: "Waitlisted",
    viability: "Medium",
    submittedAt: "2026-05-10",
    documents: ["Birth certificate", "Transfer letter", "School report", "ID copy"],
    notes: "Grade 10 classes near capacity",
  },
  {
    id: generateId(),
    ref: "KC-2027-1005",
    learnerName: "Siyabonga",
    surname: "Zondi",
    dateOfBirth: "2012-06-12",
    gender: "Male",
    gradeApplying: "Grade 8",
    currentSchool: "Kokstad Primary",
    currentGrade: "Grade 7",
    parentName: "Mandla Zondi",
    parentEmail: "mzondi@email.co.za",
    parentPhone: "079 555 1005",
    stream: "Academic",
    category: "New Admission",
    status: "Under Review",
    viability: "High",
    submittedAt: "2026-05-05",
    documents: ["Birth certificate", "School report", "Proof of residence", "Medical form"],
    notes: "Sports scholarship candidate — district rugby",
  },
  {
    id: generateId(),
    ref: "KC-2027-1006",
    learnerName: "Nosipho",
    surname: "Madonsela",
    dateOfBirth: "2012-09-08",
    gender: "Female",
    gradeApplying: "Grade 8",
    currentSchool: "Umzimkhulu Primary",
    currentGrade: "Grade 7",
    parentName: "Grace Madonsela",
    parentEmail: "grace.m@email.co.za",
    parentPhone: "063 555 1006",
    stream: "Technical",
    category: "New Admission",
    status: "Rejected",
    viability: "Low",
    submittedAt: "2026-05-12",
    documents: ["Birth certificate"],
    notes: "Incomplete application — missing multiple documents",
  },
  {
    id: generateId(),
    ref: "KC-2027-1007",
    learnerName: "Kagiso",
    surname: "Molefe",
    dateOfBirth: "2011-04-17",
    gender: "Male",
    gradeApplying: "Grade 9",
    currentSchool: "Kokstad College",
    currentGrade: "Grade 8",
    parentName: "Lerato Molefe",
    parentEmail: "lerato.m@email.co.za",
    parentPhone: "071 555 1007",
    stream: "Academic",
    category: "Returning",
    status: "Accepted",
    viability: "High",
    submittedAt: "2026-04-16",
    documents: ["School report"],
    notes: "Current learner, auto-progressing",
  },
  {
    id: generateId(),
    ref: "KC-2027-1008",
    learnerName: "Naledi",
    surname: "Khumalo",
    dateOfBirth: "2010-12-25",
    gender: "Female",
    gradeApplying: "Grade 10",
    currentSchool: "Harding Secondary",
    currentGrade: "Grade 9",
    parentName: "Themba Khumalo",
    parentEmail: "tkhumalo@email.co.za",
    parentPhone: "082 555 1008",
    stream: "Commercial",
    category: "Transfer",
    status: "Pending",
    viability: "Medium",
    submittedAt: "2026-05-15",
    documents: ["Birth certificate", "Transfer letter", "School report"],
    notes: "",
  },
];

const seedPayments: Payment[] = [
  {
    id: generateId(),
    learnerName: "Amahle Dlamini",
    grade: "Grade 9",
    parentName: "Nomsa Dlamini",
    amount: 18000,
    dateOfPayment: "2026-01-15",
    method: "EFT",
    reference: "DLAMINI-GR9",
    status: "Verified",
    proofFile: "dlamini_pop_jan.pdf",
    submittedAt: "2026-01-16",
  },
  {
    id: generateId(),
    learnerName: "Kagiso Molefe",
    grade: "Grade 9",
    parentName: "Lerato Molefe",
    amount: 1800,
    dateOfPayment: "2026-02-01",
    method: "EFT",
    reference: "MOLEFE-GR9",
    status: "Verified",
    proofFile: "molefe_pop_feb.pdf",
    submittedAt: "2026-02-02",
  },
  {
    id: generateId(),
    learnerName: "Kagiso Molefe",
    grade: "Grade 9",
    parentName: "Lerato Molefe",
    amount: 1800,
    dateOfPayment: "2026-03-01",
    method: "EFT",
    reference: "MOLEFE-GR9",
    status: "Verified",
    proofFile: "molefe_pop_mar.pdf",
    submittedAt: "2026-03-02",
  },
  {
    id: generateId(),
    learnerName: "Thando Mkhize",
    grade: "Grade 8",
    parentName: "Sipho Mkhize",
    amount: 9000,
    dateOfPayment: "2026-01-20",
    method: "Cash",
    reference: "MKHIZE-GR8",
    status: "Verified",
    proofFile: "mkhize_receipt_jan.pdf",
    submittedAt: "2026-01-20",
  },
  {
    id: generateId(),
    learnerName: "Zinhle Cele",
    grade: "Grade 10",
    parentName: "Thandiwe Cele",
    amount: 2000,
    dateOfPayment: "2026-04-05",
    method: "Card",
    reference: "CELE-GR10",
    status: "Pending",
    proofFile: "cele_pop_apr.jpg",
    submittedAt: "2026-04-06",
  },
  {
    id: generateId(),
    learnerName: "Siyabonga Zondi",
    grade: "Grade 8",
    parentName: "Mandla Zondi",
    amount: 1800,
    dateOfPayment: "2026-04-10",
    method: "EFT",
    reference: "ZONDI-GR8",
    status: "Pending",
    proofFile: "zondi_pop_apr.pdf",
    submittedAt: "2026-04-11",
  },
  {
    id: generateId(),
    learnerName: "Naledi Khumalo",
    grade: "Grade 10",
    parentName: "Themba Khumalo",
    amount: 5000,
    dateOfPayment: "2026-05-01",
    method: "EFT",
    reference: "KHUMALO-GR10",
    status: "Rejected",
    proofFile: "khumalo_pop_may.pdf",
    submittedAt: "2026-05-02",
  },
];

const seedDocuments: Document[] = [
  {
    id: generateId(),
    name: "2027 Admission Form Template",
    type: "Application Form",
    uploadedBy: "Admin",
    linkedTo: "All applicants",
    date: "2026-04-01",
    status: "Active",
  },
  {
    id: generateId(),
    name: "Thando Mkhize — Birth Certificate",
    type: "Application Form",
    uploadedBy: "Sipho Mkhize",
    linkedTo: "KC-2027-1001",
    date: "2026-04-20",
    status: "Active",
  },
  {
    id: generateId(),
    name: "Amahle Dlamini — Transfer Letter",
    type: "Transfer Letter",
    uploadedBy: "Nomsa Dlamini",
    linkedTo: "KC-2027-1002",
    date: "2026-04-18",
    status: "Active",
  },
  {
    id: generateId(),
    name: "Grade 8 Medical Form 2027",
    type: "Medical Form",
    uploadedBy: "Admin",
    linkedTo: "Grade 8 applicants",
    date: "2026-04-15",
    status: "Active",
  },
  {
    id: generateId(),
    name: "Code of Conduct 2026",
    type: "Policy Document",
    uploadedBy: "Admin",
    linkedTo: "All learners",
    date: "2026-01-10",
    status: "Active",
  },
  {
    id: generateId(),
    name: "Sports Day Consent Form",
    type: "Consent Form",
    uploadedBy: "Admin",
    linkedTo: "All learners",
    date: "2026-03-20",
    status: "Active",
  },
  {
    id: generateId(),
    name: "Excursion Consent — Durban Trip",
    type: "Consent Form",
    uploadedBy: "Admin",
    linkedTo: "Grade 10–12",
    date: "2026-05-05",
    status: "Active",
  },
  {
    id: generateId(),
    name: "2025 Matric Report Cards",
    type: "Report Card",
    uploadedBy: "Admin",
    linkedTo: "Grade 12 (2025)",
    date: "2026-01-15",
    status: "Archived",
  },
];

const seedContent: ContentSection[] = [
  {
    id: generateId(),
    page: "Home",
    section: "Welcome Message",
    content:
      "Welcome to Kokstad College — a proud institution at the heart of the Kokstad community. Since our founding in 1900, we have been committed to developing well-rounded, academically excellent, and morally grounded young South Africans. We invite you to explore our school and join our family.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "Home",
    section: "CTA Heading",
    content: "Ready to Join Kokstad College?",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "Home",
    section: "CTA Subtitle",
    content: "Applications for 2027 open 15 April 2026. Begin your child's journey today.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "About",
    section: "History",
    content:
      "Kokstad College has served the East Griqualand community for over 120 years. From humble beginnings, the school has grown into one of the leading public secondary institutions in the Harry Gwala District, with a proud heritage of producing graduates who go on to make meaningful contributions across South Africa and beyond.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "About",
    section: "Principal's Message",
    content:
      "At Kokstad College, we believe every learner carries the potential to lead, to serve, and to shape our nation's future. Our role as educators is to nurture that potential through discipline, opportunity, and unwavering support. I welcome you warmly to our school community.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "About",
    section: "Mission",
    content:
      "To provide quality education that develops each learner intellectually, socially, morally and physically.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "About",
    section: "Vision",
    content:
      "To be the leading public school in the Harry Gwala District, producing well-rounded graduates prepared for higher education and productive citizenship.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "Admissions",
    section: "Page Subtitle",
    content:
      "Applications open 15 April 2026 and close 31 August 2026. Complete all five steps below.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "Fees",
    section: "Fee Note",
    content: "Final figures to be confirmed by the school office.",
    lastUpdated: "2026-04-01",
  },
  {
    id: generateId(),
    page: "News",
    section: "Featured Article",
    content:
      "Grade 12 Achieves 95% Pass Rate — Our matric class of 2024 continues Kokstad College's proud tradition of academic excellence.",
    lastUpdated: "2026-05-12",
  },
];

function getStore<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
  } catch {
    /* ignore */
  }
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
}

function setStore<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

export function getApplications(): Application[] {
  return getStore(STORAGE_KEYS.applications, seedApplications);
}

export function saveApplications(data: Application[]): void {
  setStore(STORAGE_KEYS.applications, data);
}

export function updateApplication(id: string, updates: Partial<Application>): Application[] {
  const apps = getApplications();
  const idx = apps.findIndex((a) => a.id === id);
  if (idx !== -1) apps[idx] = { ...apps[idx], ...updates };
  saveApplications(apps);
  return apps;
}

export function getPayments(): Payment[] {
  return getStore(STORAGE_KEYS.payments, seedPayments);
}

export function savePayments(data: Payment[]): void {
  setStore(STORAGE_KEYS.payments, data);
}

export function updatePayment(id: string, updates: Partial<Payment>): Payment[] {
  const payments = getPayments();
  const idx = payments.findIndex((p) => p.id === id);
  if (idx !== -1) payments[idx] = { ...payments[idx], ...updates };
  savePayments(payments);
  return payments;
}

export function getDocuments(): Document[] {
  return getStore(STORAGE_KEYS.documents, seedDocuments);
}

export function saveDocuments(data: Document[]): void {
  setStore(STORAGE_KEYS.documents, data);
}

export function addDocument(doc: Omit<Document, "id">): Document[] {
  const docs = getDocuments();
  docs.push({ ...doc, id: generateId() });
  saveDocuments(docs);
  return docs;
}

export function deleteDocument(id: string): Document[] {
  const docs = getDocuments().filter((d) => d.id !== id);
  saveDocuments(docs);
  return docs;
}

export function getContent(): ContentSection[] {
  return getStore(STORAGE_KEYS.content, seedContent);
}

export function saveContent(data: ContentSection[]): void {
  setStore(STORAGE_KEYS.content, data);
}

export function updateContent(id: string, newContent: string): ContentSection[] {
  const content = getContent();
  const idx = content.findIndex((c) => c.id === id);
  if (idx !== -1) {
    content[idx] = {
      ...content[idx],
      content: newContent,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
  }
  saveContent(content);
  return content;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEYS.auth) === "true";
}

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin2026";

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(STORAGE_KEYS.auth, "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.auth);
}
