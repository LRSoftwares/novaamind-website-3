// Site-wide settings. Change contact details and links here.
export const site = {
  name: 'Novaamind',
  legalName: 'Novaamind AI Solutions',
  url: 'https://novaamind.com',
  tagline:
    'Novaamind helps organisations put AI to work in business operations, enterprise knowledge, workforce capability, and executive decision-making.',
  email: 'raghav@novaamind.com',
  city: 'Chennai, India',
  linkedin: 'https://www.linkedin.com/company/143637956/',
  primaryCta: { label: 'Book an Executive AI Discovery Session', href: '/contact/' },
};

// Solution groups used in the navigation (fixes the old "AI Embeded" typo).
export const solutionGroups = [
  { id: 'enablement', title: 'AI Enablement' },
  { id: 'workforce', title: 'AI Workforce Transformation' },
  { id: 'embedded', title: 'AI Embedded Solutions' },
] as const;

export const solutionUrl = (id: string) => `/solutions/${id}/`;
export const industryUrl = (id: string) => `/industries/${id}/`;
export const resourceUrl = (id: string) => `/resources/${id}/`; // id = "<category>/<slug>"
export const categoryUrl = (id: string) => `/resources/${id}/`;
