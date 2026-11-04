// Photography used across the site. All photos are from Unsplash (free for
// commercial use, no attribution required) and stored in public/images/.
// Source IDs are listed in docs/IMAGE-CREDITS.md. To swap a photo, replace the
// file in public/images/ and keep the same name, or change the path here.
export interface Photo { src: string; alt: string }

export const photos = {
  hero: { src: '/images/hero-towers.jpg', alt: '' },
  cta: { src: '/images/cta-office.jpg', alt: '' },
  about: { src: '/images/about-team.jpg', alt: 'A team working together around a table' },
  ourWork: { src: '/images/work-analytics.jpg', alt: '' },
  contact: { src: '/images/contact-office.jpg', alt: '' },
} satisfies Record<string, Photo>;

export const solutionPhotos: Record<string, Photo> = {
  'enterprise-ai-strategy': { src: '/images/sol-strategy.jpg', alt: 'A leadership team planning with sticky notes on a wall' },
  'ai-workforce-transformation': { src: '/images/sol-workforce.jpg', alt: 'A training session in a meeting room' },
  'ai-process-automation': { src: '/images/sol-automation.jpg', alt: 'A team working on laptops around one table' },
  'decision-intelligence': { src: '/images/sol-decision.jpg', alt: 'An analytics dashboard on a laptop screen' },
  'enterprise-knowledge-systems': { src: '/images/sol-knowledge.jpg', alt: 'Two colleagues discussing work over a laptop' },
  'ai-agents': { src: '/images/sol-agents.jpg', alt: 'Colleagues working through a request at a computer' },
  'forward-deployed-engineers': { src: '/images/sol-fde.jpg', alt: 'An engineer working alongside a client team' },
};

export const industryPhotos: Record<string, Photo> = {
  'salon-spa': { src: '/images/ind-salon.jpg', alt: 'Styling chairs in a salon' },
  retail: { src: '/images/ind-retail.jpg', alt: 'The interior of a clothing store' },
  education: { src: '/images/ind-education.jpg', alt: 'Students in a classroom' },
  agencies: { src: '/images/ind-agencies.jpg', alt: 'A presentation to an agency team' },
};
