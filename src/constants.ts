export type FieldType = "text" | "textarea" | "date" | "email";

export interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: FieldType;
  required?: boolean;
}

export interface DocumentType {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: FormField[];
  placeholder: string;
}

export const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    description: "Protect confidential information shared between parties.",
    icon: "ShieldCheck",
    placeholder: "# NON-DISCLOSURE AGREEMENT\n\nThis Non-Disclosure Agreement (the \"Agreement\") is entered into as of [Effective Date], by and between [Disclosing Party Name] (\"Disclosing Party\") and [Receiving Party Name] (\"Receiving Party\").\n\n### 1. Purpose\nThe parties wish to explore a business opportunity related to [Purpose of Disclosure].\n\n### 2. Confidential Information\n\"Confidential Information\" means any information disclosed by Disclosing Party to Receiving Party that is either marked as confidential or would reasonably be understood to be confidential given the nature of the information.\n\n### 3. Obligations\nReceiving Party shall hold the Confidential Information in strict confidence and shall not disclose it to any third party without prior written consent.\n\n### 4. Duration\nThis Agreement shall remain in effect for a period of [Duration] from the Effective Date.",
    fields: [
      { name: "disclosingParty", label: "Disclosing Party Name", placeholder: "e.g. Acme Corp", type: "text", required: true },
      { name: "receivingParty", label: "Receiving Party Name", placeholder: "e.g. John Doe", type: "text", required: true },
      { name: "purpose", label: "Purpose of Disclosure", placeholder: "e.g. Discussing a potential partnership", type: "textarea", required: true },
      { name: "duration", label: "Duration of Confidentiality", placeholder: "e.g. 2 years", type: "text", required: true },
      { name: "effectiveDate", label: "Effective Date", placeholder: "", type: "date", required: true },
    ],
  },
  {
    id: "freelance-contract",
    title: "Freelance Service Agreement",
    description: "Define terms for freelance work, payments, and deliverables.",
    icon: "FileText",
    placeholder: "# FREELANCE SERVICE AGREEMENT\n\nThis Agreement is made between [Client Name] (the \"Client\") and [Freelancer Name] (the \"Freelancer\").\n\n### 1. Services\nThe Freelancer agrees to provide the following services: [Scope of Services].\n\n### 2. Payment\nThe Client shall pay the Freelancer [Payment Terms] for the completion of the services.\n\n### 3. Deadline\nThe services shall be completed by [Project Deadline].\n\n### 4. Ownership\nUpon full payment, the Client shall own all rights to the work product created by the Freelancer.",
    fields: [
      { name: "clientName", label: "Client Name", placeholder: "e.g. Tech Solutions Inc", type: "text", required: true },
      { name: "freelancerName", label: "Freelancer Name", placeholder: "e.g. Jane Smith", type: "text", required: true },
      { name: "services", label: "Scope of Services", placeholder: "e.g. Web Development and UI Design", type: "textarea", required: true },
      { name: "paymentTerms", label: "Payment Terms", placeholder: "e.g. $5000 total, 50% upfront", type: "text", required: true },
      { name: "deadline", label: "Project Deadline", placeholder: "", type: "date", required: true },
    ],
  },
  {
    id: "rent-agreement",
    title: "Residential Rent Agreement",
    description: "Standard agreement for renting residential property.",
    icon: "Home",
    placeholder: "# RESIDENTIAL RENT AGREEMENT\n\nThis Lease Agreement is made between [Landlord Name] (the \"Landlord\") and [Tenant Name] (the \"Tenant\").\n\n### 1. Property\nThe Landlord agrees to rent the property located at [Property Address] to the Tenant.\n\n### 2. Term\nThe lease term shall be for [Lease Term], starting on the date of signing.\n\n### 3. Rent\nThe Tenant shall pay a monthly rent of [Monthly Rent Amount].\n\n### 4. Security Deposit\nA security deposit of [Security Deposit] shall be paid upon signing this Agreement.",
    fields: [
      { name: "landlordName", label: "Landlord Name", placeholder: "e.g. Robert Brown", type: "text", required: true },
      { name: "tenantName", label: "Tenant Name", placeholder: "e.g. Alice Green", type: "text", required: true },
      { name: "propertyAddress", label: "Property Address", placeholder: "e.g. 123 Maple St, Springfield", type: "textarea", required: true },
      { name: "monthlyRent", label: "Monthly Rent Amount", placeholder: "e.g. $1200", type: "text", required: true },
      { name: "securityDeposit", label: "Security Deposit", placeholder: "e.g. $2400", type: "text", required: true },
      { name: "leaseTerm", label: "Lease Term", placeholder: "e.g. 12 months", type: "text", required: true },
    ],
  },
  {
    id: "employment-letter",
    title: "Employment Offer Letter",
    description: "Formal offer of employment to a candidate.",
    icon: "Briefcase",
    placeholder: "# EMPLOYMENT OFFER LETTER\n\nDear [Candidate Name],\n\nWe are pleased to offer you the position of [Job Title] at [Company Name].\n\n### 1. Salary\nYour annual salary will be [Annual Salary], payable in accordance with our standard payroll schedule.\n\n### 2. Start Date\nYour employment will begin on [Start Date].\n\n### 3. Responsibilities\nIn this role, you will be responsible for the duties outlined in the job description and as assigned by your supervisor.\n\nWe look forward to having you join our team!",
    fields: [
      { name: "companyName", label: "Company Name", placeholder: "e.g. Innovate LLC", type: "text", required: true },
      { name: "candidateName", label: "Candidate Name", placeholder: "e.g. Mark Wilson", type: "text", required: true },
      { name: "candidateEmail", label: "Candidate Email", placeholder: "e.g. mark@example.com", type: "email", required: true },
      { name: "jobTitle", label: "Job Title", placeholder: "e.g. Senior Software Engineer", type: "text", required: true },
      { name: "salary", label: "Annual Salary", placeholder: "e.g. $90,000", type: "text", required: true },
      { name: "startDate", label: "Start Date", placeholder: "", type: "date", required: true },
    ],
  },
  {
    id: "partnership-deed",
    title: "Partnership Deed",
    description: "Establish a business partnership between two or more parties.",
    icon: "Users",
    placeholder: "# PARTNERSHIP DEED\n\nThis Partnership Deed is made between [Partner 1 Name] and [Partner 2 Name].\n\n### 1. Business Name\nThe name of the partnership shall be [Business Name].\n\n### 2. Capital Contribution\nThe partners shall contribute capital as follows: [Capital Contribution Details].\n\n### 3. Profit Sharing\nProfits and losses shall be shared in the following ratio: [Profit Sharing Ratio].\n\n### 4. Management\nBoth partners shall have equal rights in the management of the business unless otherwise agreed.",
    fields: [
      { name: "businessName", label: "Business Name", placeholder: "e.g. Synergy Partners", type: "text", required: true },
      { name: "partner1", label: "Partner 1 Name", placeholder: "e.g. David Lee", type: "text", required: true },
      { name: "partner2", label: "Partner 2 Name", placeholder: "e.g. Sarah Chen", type: "text", required: true },
      { name: "capitalContribution", label: "Capital Contribution Details", placeholder: "e.g. 50/50 split of $20,000", type: "textarea", required: true },
      { name: "profitSharing", label: "Profit Sharing Ratio", placeholder: "e.g. Equal share", type: "text", required: true },
    ],
  },
];
