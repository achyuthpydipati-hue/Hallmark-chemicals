import { RDPipelineItem, Certification, ExecutiveLeader, FacilityLocation } from '../types/pharma';

export const COMPANY_STATS = [
  { value: '85+', label: 'Export Countries', subtext: 'Global regulatory compliance' },
  { value: '2.5B+', label: 'Doses / Year', subtext: 'cGMP automated capacity' },
  { value: '150+', label: 'Patents Granted', subtext: 'Novel delivery systems & APIs' },
  { value: '27+', label: 'Primary Bio-Formulations', subtext: 'Across 8 therapeutic categories' },
  { value: '2,400+', label: 'Global Workforce', subtext: 'Including 420+ R&D scientists' },
  { value: '100%', label: 'Zero-Defect Standard', subtext: 'AI-assisted visual inspection' },
];

export const CORE_VALUES = [
  {
    iconName: 'ShieldCheck',
    title: 'Uncompromising Quality',
    description: 'Every batch undergoes 100+ automated analytical checkpoints meeting US-FDA and EU-GMP regulatory benchmarks.'
  },
  {
    iconName: 'Dna',
    title: 'Scientific Innovation',
    description: 'Pioneering targeted nano-encapsulation, extended-release micro-beads, and peptide stabilization technologies.'
  },
  {
    iconName: 'HeartHandshake',
    title: 'Patient-Centric Empathy',
    description: 'Developing affordable, life-transforming medicines that expand access for underserved patient populations.'
  },
  {
    iconName: 'Globe2',
    title: 'Global Responsibility',
    description: 'Operating zero-carbon manufacturing facilities with 100% water recycling and eco-friendly packaging.'
  }
];

export const RD_PIPELINE: RDPipelineItem[] = [
  {
    id: 'rd-101',
    code: 'HMC-702',
    moleculeName: 'Tarlatamab Nanoparticle Injectable',
    therapeuticArea: 'Oncology',
    indication: 'Small Cell Lung Cancer (SCLC) & Neuroendocrine Tumors',
    phase: 'Phase III',
    progressPercentage: 82,
    deliverySystem: 'Targeted Bispecific T-cell Engager (BiTE) Liposome',
    expectedCompletion: 'Q4 2026'
  },
  {
    id: 'rd-102',
    code: 'HMC-409',
    moleculeName: 'Inhaled Infigratinib Dry Powder',
    therapeuticArea: 'Respiratory',
    indication: 'Idiopathic Pulmonary Fibrosis (IPF)',
    phase: 'Phase II',
    progressPercentage: 58,
    deliverySystem: 'MicroFlow Breath-Actuated Dry Powder Inhaler',
    expectedCompletion: 'Q2 2027'
  },
  {
    id: 'rd-103',
    code: 'HMC-914',
    moleculeName: 'Oral Peptide GLP-1/GIP Agonist',
    therapeuticArea: 'Metabolic',
    indication: 'Non-Alcoholic Steatohepatitis (NASH) & Type 2 Diabetes',
    phase: 'Phase III',
    progressPercentage: 89,
    deliverySystem: 'Permeation-Enhanced Enteric Coated Tablet',
    expectedCompletion: 'Q1 2027'
  },
  {
    id: 'rd-104',
    code: 'HMC-305',
    moleculeName: 'Sublingual Amyloid Plaque Modulator',
    therapeuticArea: 'Neurology',
    indication: 'Early-Stage Alzheimer’s Disease Cognitive Preservation',
    phase: 'Phase I',
    progressPercentage: 35,
    deliverySystem: 'Rapid Dissolving Nanofiber Strip',
    expectedCompletion: 'Q3 2028'
  },
  {
    id: 'rd-105',
    code: 'HMC-112',
    moleculeName: 'Injectable Extended-Release PCSK9 siRNA',
    therapeuticArea: 'Cardiology',
    indication: 'Familial Hypercholesterolemia & ASCVD Risk Mitigation',
    phase: 'Registration',
    progressPercentage: 96,
    deliverySystem: 'Bi-Monthly Subcutaneous Depot Injection',
    expectedCompletion: 'Q4 2026'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'US FDA cGMP Compliance',
    authority: 'United States Food and Drug Administration',
    code: 'FDA-FEI-3009418210',
    validity: 'Valid through 2028',
    scope: 'Sterile Injectables & Oral Solid Dosage Lines',
    iconName: 'Award',
    accentColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'cert-2',
    title: 'EU GMP Certificate',
    authority: 'European Medicines Agency (EMA)',
    code: 'EMA/GMP/2025/8892',
    validity: 'Valid through 2028',
    scope: 'Aseptic Manufacturing & Biologics Packaging',
    iconName: 'ShieldCheck',
    accentColor: 'from-sky-600 to-cyan-700'
  },
  {
    id: 'cert-3',
    title: 'WHO GMP Certification',
    authority: 'World Health Organization',
    code: 'WHO-PQ-CERT-2026',
    validity: 'Valid through 2027',
    scope: 'Essential Anti-Infective & Chronic Formulations',
    iconName: 'Globe',
    accentColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'cert-4',
    title: 'ISO 14001 & ISO 45001',
    authority: 'International Organization for Standardization',
    code: 'ISO-ENV-SAFETY-9001',
    validity: 'Valid through 2029',
    scope: 'Zero Waste & Occupational Health Excellence',
    iconName: 'CheckCircle2',
    accentColor: 'from-cyan-600 to-blue-700'
  }
];

export const LEADERSHIP: ExecutiveLeader[] = [
  {
    id: 'lead-1',
    name: 'Dr. Evelyn Vance, Ph.D.',
    role: 'Chief Executive Officer & Founder',
    qualifications: 'Ph.D. Chemical Engineering (MIT), Post-Doc Molecular Pharmacology (Stanford)',
    bio: 'Dr. Vance brings 25+ years of chemical and biopharmaceutical executive leadership. Former VP of Global R&D at Novartis, she has overseen the successful FDA approval of 14 landmark therapeutics.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    experienceYears: 26
  },
  {
    id: 'lead-2',
    name: 'Dr. Marcus Sterling, M.D., FACC',
    role: 'Chief Medical Officer',
    qualifications: 'M.D. Harvard Medical School, Board Certified Cardiologist',
    bio: 'Pioneer in cardiovascular precision medicine and clinical trial execution. Dr. Sterling directs Hallmark Chemicals’ global Phase I-IV clinical development programs across 45 worldwide medical hubs.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    experienceYears: 22
  },
  {
    id: 'lead-3',
    name: 'Elena Rostova',
    role: 'Head of Global Quality & Regulatory Affairs',
    qualifications: 'M.S. Industrial Pharmacy (ETH Zürich)',
    bio: 'Former senior auditor for the European Medicines Agency. Elena oversees Hallmark Chemicals’ total quality management system across 5 global cGMP manufacturing centers.',
    image: 'https://images.unsplash.com/photo-1580281657557-2b69d0309908?auto=format&fit=crop&q=80&w=600',
    experienceYears: 20
  },
  {
    id: 'lead-4',
    name: 'Dr. Rajiv Menon, Ph.D.',
    role: 'Vice President of Chemical R&D',
    qualifications: 'Ph.D. Nanotechnology & Polymer Chemistry (Imperial College London)',
    bio: 'Author of 48 peer-reviewed drug delivery and active chemical patents. Dr. Menon leads Hallmark Chemicals’ novel oral delivery and targeted liposomal nano-carrier technology labs.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    experienceYears: 18
  }
];

export const MANUFACTURING_STEPS = [
  {
    step: '01',
    title: 'Ultra-Pure Synthesis',
    description: 'Active Pharmaceutical Ingredients (APIs) & fine chemicals synthesized under ISO Class 5 laminar air conditions with online NIR chemical verification.',
    iconName: 'Microscope'
  },
  {
    step: '02',
    title: 'Precision Nano-Formulation',
    description: 'High-shear wet granulation, fluid bed drying, and micro-encapsulation to ensure optimal bio-availability and steady dissolution.',
    iconName: 'Cpu'
  },
  {
    step: '03',
    title: 'Automated High-Speed Blistering',
    description: 'Alu-Alu cold forming with 3D optical camera vision inspection inspecting 1,200 tablets/minute for surface or dimension flaws.',
    iconName: 'PackageCheck'
  },
  {
    step: '04',
    title: 'End-to-End Cold Chain Logistics',
    description: 'IoT-monitored climate-controlled storage with real-time temperature telemetry from factory floor to global hospital pharmacies.',
    iconName: 'Truck'
  }
];

export const FACILITY_LOCATIONS: FacilityLocation[] = [
  {
    id: 'loc-1',
    name: 'Hallmark Global Discovery Hub',
    city: 'Boston, MA',
    country: 'United States',
    type: 'Global Headquarters',
    address: '400 Technology Square, Cambridge, MA 02139',
    phone: '+1 (617) 555-0190',
    email: 'boston.hq@hallmarkchem.com',
    lat: 42.3656,
    lng: -71.1033,
    certifications: ['US FDA Approved', 'CLIA Certified', 'ISO 9001:2015']
  },
  {
    id: 'loc-2',
    name: 'European Fine Chemical & cGMP Plant',
    city: 'Basel',
    country: 'Switzerland',
    type: 'cGMP Manufacturing Plant',
    address: 'BioCampus Hochbergerstrasse 60, 4057 Basel',
    phone: '+41 61 555 4200',
    email: 'basel.plant@hallmarkchem.com',
    lat: 47.5596,
    lng: 7.5886,
    certifications: ['EU EMA cGMP', 'Swissmedic Approved', 'ISO 14001']
  },
  {
    id: 'loc-3',
    name: 'Asia-Pacific Chemical Formulation Center',
    city: 'Singapore',
    country: 'Singapore',
    type: 'R&D Innovation Hub',
    address: '10 Biopolis Road, Chromos Building #08-01, Singapore 138670',
    phone: '+65 6789 2200',
    email: 'singapore.rd@hallmarkchem.com',
    lat: 1.3000,
    lng: 103.7900,
    certifications: ['HSA Singapore Certified', 'WHO GMP', 'PMDA Compliant']
  },
  {
    id: 'loc-4',
    name: 'LATAM Regional Distribution Hub',
    city: 'São Paulo',
    country: 'Brazil',
    type: 'Regional Distribution Center',
    address: 'Av. das Nações Unidas, 12901 - Brooklin Paulista, São Paulo',
    phone: '+55 11 3090 8800',
    email: 'latam.enquiry@hallmarkchem.com',
    lat: -23.5505,
    lng: -46.6333,
    certifications: ['ANVISA Approved', 'Cold Chain Certified']
  }
];
