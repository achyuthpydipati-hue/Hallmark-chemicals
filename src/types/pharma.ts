export type CategoryType = 
  | 'All' 
  | 'Oncology' 
  | 'Cardiology' 
  | 'Neurology' 
  | 'Respiratory' 
  | 'Anti-Infectives' 
  | 'Metabolic' 
  | 'Immunology' 
  | 'Gastroenterology';

export type DosageFormType = 'Tablets' | 'Capsules' | 'Injectables' | 'Inhalers' | 'Oral Suspension' | 'Topicals';

export interface PharmaProduct {
  id: string;
  name: string;
  genericName: string;
  category: CategoryType;
  dosageForm: DosageFormType;
  strength: string;
  indication: string;
  shortDescription: string;
  fullOverview: string;
  keyBenefits: string[];
  composition: {
    activeIngredient: string;
    concentration: string;
    excipients: string[];
  };
  dosageAndAdministration: string;
  packagingInfo: string;
  storageConditions: string;
  shelfLife: string;
  regulatoryApprovals: string[];
  isFeatured?: boolean;
  isNewLaunch?: boolean;
  leafletCode: string;
  imageUrl: string;
  rxRequired: boolean;
}

export interface RDPipelineItem {
  id: string;
  code: string;
  moleculeName: string;
  therapeuticArea: string;
  indication: string;
  phase: 'Phase I' | 'Phase II' | 'Phase III' | 'Registration' | 'Commercial';
  progressPercentage: number;
  deliverySystem: string;
  expectedCompletion: string;
}

export interface Certification {
  id: string;
  title: string;
  authority: string;
  code: string;
  validity: string;
  scope: string;
  iconName: string;
  accentColor: string;
}

export interface ExecutiveLeader {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  bio: string;
  image: string;
  experienceYears: number;
}

export interface FacilityLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  type: 'Global Headquarters' | 'R&D Innovation Hub' | 'cGMP Manufacturing Plant' | 'Regional Distribution Center';
  address: string;
  phone: string;
  email: string;
  lat: number;
  lng: number;
  certifications: string[];
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  inquiryType: 'Bulk Supply' | 'Contract Manufacturing (CDMO)' | 'Clinical Licensing' | 'Medical Information' | 'General Inquiry';
  productInterest?: string;
  message: string;
  acceptTerms: boolean;
}
