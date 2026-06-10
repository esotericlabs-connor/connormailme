// ============================================================
//  SITE CONFIGURATION — edit everything here
// ============================================================

// ------ Personal info ----------------------------------------
export const personal = {
  name: "Connor Remsen",
  title: "IT & Security Engineer",
  subtitle: "Founder of Esoteric Labs",
  location: "Seattle, WA",
  tagline:
    "Seattle-based specialist in IT infrastructure, security operations, and private AI intelligence. With a focus on robust, efficient solutions, I help clients streamline their systems, maintain control, and protect their digital assets with cutting-edge security practices.",
};

// ------ Navigation links -------------------------------------
export const navLinks = {
  github: "https://github.com/esotericlabs-connor",
  contact: "https://form.jotform.com/260608732697063",
};

// ------ Hero section -----------------------------------------
export const hero = {
  ctaText: "Request Support",
  ctaUrl: "https://form.jotform.com/260608732697063",
};

// ------ About page -------------------------------------------
export const about = {
  heading: "About Me",
  subheading:
    "Passionate about building secure, resilient systems that empower businesses to thrive in an increasingly complex digital landscape.",

  storyHeading: "Building Secure Solutions",
  storyParagraphs: [                
    "Based in Seattle, I specialize in creating robust IT infrastructure and security solutions that meet the challenges of modern enterprises. With years of experience in security operations, network architecture, and private AI systems, I help organizations protect their most valuable assets while maintaining operational efficiency.",
    "My approach combines deep technical expertise with a practical understanding of business needs. Whether you're looking to secure your infrastructure, implement private AI solutions, or streamline your operations, I deliver solutions that are both technically sound and business-aligned.",
    "I believe in the power of open-source software and contribute to the community through projects like OpenKeyFlow and MONOLITH, helping others build more secure and efficient systems.",
  ],

  ctaHeading: "Let's Work Together",
  ctaBody:
    "Ready to enhance your security posture or optimize your infrastructure? Get in touch to discuss how I can help your organization succeed.",
  ctaText: "Get in Touch",
  ctaUrl: "https://form.jotform.com/260608732697063",
};

// ------ Expertise cards (About page) -------------------------
// icon must be a name from lucide-react
export const expertise = [
  {
    icon: "Shield",
    title: "Security Operations",
    description: "Comprehensive security audits, threat detection, and incident response",
  },
  {
    icon: "Server",
    title: "IT Infrastructure",
    description: "Design and implementation of scalable, reliable infrastructure solutions",
  },
  {
    icon: "Brain",
    title: "Private AI Intelligence",
    description: "Secure, on-premise AI systems that protect your data sovereignty",
  },
  {
    icon: "Lock",
    title: "Data Protection",
    description: "Advanced encryption and access control strategies",
  },
  {
    icon: "Code",
    title: "System Automation",
    description: "Efficient workflows and infrastructure as code",
  },
  {
    icon: "Users",
    title: "Consulting Services",
    description: "Expert guidance on security best practices and compliance",
  },
];

// ------ Featured projects ------------------------------------
export const projects = [
  {
    title: "GovMap",
    description:
      "A free, nonpartisan civic platform giving every American a real-time view of their entire government — from city council to Congress. Work in progress.",
    logo: "/assets/govmap-logo.png",
    link: "https://demo.govmap.us",
    linkLabel: "View Demo",
    wip: true,
  },
  {
    title: "ADR — Automated Diagnostic Report",
    description:
      "Standalone diagnostic scripts for Windows, Mac, and Linux that give repair shops and MSPs automated hardware and software reports. Work in progress.",
    logo: "/assets/adr-logo.png",
    link: "https://github.com/esotericlabs-connor/ADR",
    wip: true,
  },
  {
    title: "OpenKeyFlow",
    description:
      "A free, open-source text expander that boosts productivity with customizable shortcuts and cross-platform support.",
    logo: "/assets/openkeyflow-logo.png",
    link: "https://github.com/esotericlabs-connor/OpenKeyFlow",
  },
  {
    title: "MONOLITH",
    description:
      "A secure Linux router solution focused on privacy, performance, and comprehensive network protection.",
    logo: "/assets/monolith-logo.png",
    link: "https://github.com/esotericlabs-connor/MONOLITH",
  },
];
