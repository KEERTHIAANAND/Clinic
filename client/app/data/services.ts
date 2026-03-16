export type ServiceKey =
  | "orthopedic-rehab"
  | "sports-injury-clinic"
  | "neurological-physio"
  | "geriatric-care"
  | "post-op-recovery"
  | "pain-management";

export type ServiceCatalogItem = {
  key: ServiceKey;
  title: string;
  desc: string;
};

export const SERVICE_CATALOG: readonly ServiceCatalogItem[] = [
  {
    key: "orthopedic-rehab",
    title: "Orthopedic Rehab",
    desc: "Specialized recovery for bone, joint, and muscle surgeries or injuries.",
  },
  {
    key: "sports-injury-clinic",
    title: "Sports Injury Clinic",
    desc: "Rapid recovery programs for athletes to return to their peak performance.",
  },
  {
    key: "neurological-physio",
    title: "Neurological Physio",
    desc: "Focused care for stroke, Parkinson's, and other nerve-related conditions.",
  },
  {
    key: "geriatric-care",
    title: "Geriatric Care",
    desc: "Improve mobility and quality of life for the elderly through gentle therapy.",
  },
  {
    key: "post-op-recovery",
    title: "Post-Op Recovery",
    desc: "Personalized programs to ensure safe and fast healing after surgery.",
  },
  {
    key: "pain-management",
    title: "Pain Management",
    desc: "Advanced techniques to relieve chronic back, neck, and joint pain.",
  },
] as const;
