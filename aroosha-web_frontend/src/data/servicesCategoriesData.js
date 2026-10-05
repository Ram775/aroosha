// src/data/servicesCategoriesData.js
export const servicesCategories = [
  {
    id: "website-development",
    name: "Website Development",
    icon: "🌐",
    tagline: "High-performance websites and custom storefronts designed to scale with your business.",
    description: "We build modern, responsive websites that engage users and drive conversions. From simple landing pages to complex e-commerce platforms, our team delivers high-performance web solutions tailored to your business needs.",
    features: [
      "Custom Website Design",
      "Responsive Development",
      "E-commerce Solutions",
      "CMS Integration",
      "SEO Optimization",
      "Performance Optimization",
      "Analytics & Tracking",
      "Maintenance & Support"
    ],
    technologies: ["React", "Next.js", "WordPress", "Tailwind CSS", "Node.js", "AWS", "Vercel"],
    process: [
      { title: "Discovery", desc: "Understand your goals and requirements" },
      { title: "Design", desc: "Create wireframes and design mockups" },
      { title: "Development", desc: "Build and develop your website" },
      { title: "Launch", desc: "Deploy and launch your website" }
    ],
    benefits: [
      "Increased online presence",
      "Higher conversion rates",
      "Better user experience",
      "Scalable architecture"
    ]
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development",
    icon: "📱",
    tagline: "Native and cross-platform mobile applications for iOS and Android.",
    description: "We create powerful mobile apps for iOS and Android that deliver seamless user experiences. Using React Native and Flutter, we build apps that are fast, beautiful, and production-ready.",
    features: [
      "Native iOS Development",
      "Native Android Development",
      "Cross-Platform Apps",
      "App Store Deployment",
      "Push Notifications",
      "Offline Support",
      "In-App Purchases",
      "Analytics & Crash Reporting"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "MongoDB"],
    process: [
      { title: "Ideation", desc: "Define app features and requirements" },
      { title: "Design", desc: "Create UI/UX design and prototypes" },
      { title: "Development", desc: "Build and develop your app" },
      { title: "Launch", desc: "Deploy to App Store and Play Store" }
    ],
    benefits: [
      "Reach wider audience",
      "Better user engagement",
      "Seamless user experience",
      "Scalable architecture"
    ]
  },
  {
    id: "software-development",
    name: "Software Development",
    icon: "💻",
    tagline: "Custom software, SaaS, and desktop applications.",
    description: "We develop scalable software solutions that streamline your business operations. From SaaS platforms to internal tools and microservice architectures, our software is built for reliability and growth.",
    features: [
      "Custom Software Development",
      "SaaS Platforms",
      "API Development",
      "Microservices Architecture",
      "Legacy System Migration",
      "DevOps Implementation",
      "Security & Compliance",
      "24/7 Support"
    ],
    technologies: ["Python", "Java", "C#", "Node.js", "Docker", "Kubernetes", "AWS", "Azure"],
    process: [
      { title: "Assessment", desc: "Analyze your business needs" },
      { title: "Architecture", desc: "Design the system architecture" },
      { title: "Development", desc: "Build and develop the software" },
      { title: "Deployment", desc: "Deploy and maintain the software" }
    ],
    benefits: [
      "Streamlined operations",
      "Increased productivity",
      "Better scalability",
      "Reduced costs"
    ]
  },
  {
    id: "cloud-services",
    name: "Cloud Services",
    icon: "☁️",
    tagline: "Cloud migration, infrastructure, and hosting.",
    description: "We help you migrate to the cloud and manage your infrastructure efficiently. Our cloud engineers design resilient, cost-effective architectures with monitoring, auto-scaling, and disaster recovery strategies.",
    features: [
      "Cloud Migration",
      "Infrastructure as Code",
      "Container Orchestration",
      "Disaster Recovery",
      "Cloud Security",
      "Cost Optimization",
      "Monitoring & Alerting",
      "Managed Hosting"
    ],
    technologies: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible", "Prometheus"],
    process: [
      { title: "Assessment", desc: "Evaluate your current infrastructure" },
      { title: "Migration", desc: "Plan and execute the migration" },
      { title: "Optimization", desc: "Optimize for cost and performance" },
      { title: "Management", desc: "Manage and monitor the infrastructure" }
    ],
    benefits: [
      "Improved scalability",
      "Better reliability",
      "Reduced operational costs",
      "Enhanced security"
    ]
  },
  {
    id: "it-consulting",
    name: "IT Consulting",
    icon: "🛡️",
    tagline: "Technology strategy, architecture, and risk management.",
    description: "We provide expert IT consulting to help you make informed technology decisions. Our consultants help you align your technology strategy with your business goals.",
    features: [
      "Technology Strategy",
      "Architecture Design",
      "Security & Compliance",
      "Risk Management",
      "Digital Transformation",
      "Proof of Concepts",
      "Technology Assessment",
      "Roadmap Planning"
    ],
    technologies: ["Enterprise Architecture", "Cloud Strategy", "Security Framework", "Agile Methodology"],
    process: [
      { title: "Discovery", desc: "Understand your business needs" },
      { title: "Assessment", desc: "Evaluate your current state" },
      { title: "Strategy", desc: "Define the technology roadmap" },
      { title: "Implementation", desc: "Execute the strategy" }
    ],
    benefits: [
      "Strategic alignment",
      "Reduced risks",
      "Better technology decisions",
      "Improved ROI"
    ]
  },
  {
    id: "amc-it-support",
    name: "AMC & IT Support",
    icon: "🔧",
    tagline: "Annual maintenance, helpdesk, and support services.",
    description: "We provide comprehensive IT support and maintenance to keep your systems running smoothly. Our team offers 24/7 support, regular updates, and proactive maintenance.",
    features: [
      "Annual Maintenance Contract",
      "24/7 Helpdesk Support",
      "Patch Management",
      "Hardware Support",
      "Software Updates",
      "Security Monitoring",
      "Data Backup",
      "Emergency Support"
    ],
    technologies: ["ITIL", "ServiceNow", "Jira", "Slack", "Monitoring Tools"],
    process: [
      { title: "Onboarding", desc: "Set up your support account" },
      { title: "Monitoring", desc: "Monitor your systems 24/7" },
      { title: "Maintenance", desc: "Regular maintenance and updates" },
      { title: "Support", desc: "Provide support when needed" }
    ],
    benefits: [
      "Reduced downtime",
      "Proactive maintenance",
      "Cost-effective support",
      "Peace of mind"
    ]
  },
  {
    id: "erp-crm-solutions",
    name: "ERP & CRM Solutions",
    icon: "⚙️",
    tagline: "Streamline your business operations with integrated ERP and CRM solutions.",
    description: "We implement and customize ERP and CRM solutions that streamline your business operations, improve efficiency, and enhance customer relationships.",
    features: [
      "ERP Implementation",
      "CRM Customization",
      "Workflow Automation",
      "Data Integration",
      "Business Intelligence",
      "Reporting & Analytics",
      "Customer Management",
      "Inventory Management"
    ],
    technologies: ["SAP", "Salesforce", "Odoo", "Zoho", "Microsoft Dynamics", "Custom Solutions"],
    process: [
      { title: "Assessment", desc: "Analyze your business needs" },
      { title: "Implementation", desc: "Configure and deploy the system" },
      { title: "Integration", desc: "Integrate with existing systems" },
      { title: "Training", desc: "Train your team on the new system" }
    ],
    benefits: [
      "Streamlined operations",
      "Improved efficiency",
      "Better customer insights",
      "Data-driven decisions"
    ]
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    icon: "🚀",
    tagline: "Process modernization, automation, and change management.",
    description: "We help businesses transform digitally with modern technologies and processes. From automation to AI integration, we guide you through your digital journey.",
    features: [
      "Process Modernization",
      "Automation & RPA",
      "AI Integration",
      "Cloud Strategy",
      "Change Management",
      "Digital Strategy",
      "Legacy System Migration",
      "Innovation Consulting"
    ],
    technologies: ["RPA", "AI", "IoT", "Analytics", "Cloud", "Automation", "ML"],
    process: [
      { title: "Discovery", desc: "Understand your current state" },
      { title: "Strategy", desc: "Define the digital roadmap" },
      { title: "Execution", desc: "Execute the transformation" },
      { title: "Evolution", desc: "Continuously improve" }
    ],
    benefits: [
      "Improved efficiency",
      "Better decision making",
      "Enhanced customer experience",
      "Future-ready business"
    ]
  },
  {
    id: "seo-blogging",
    name: "SEO & Blogging Services",
    icon: "📈",
    tagline: "SEO optimization, content strategy, and blog writing.",
    description: "We help you rank higher on search engines with effective SEO and content strategies. From keyword research to content creation, we drive organic traffic and engagement.",
    features: [
      "Search Engine Optimization",
      "Content Strategy",
      "Blog Writing",
      "Technical SEO Audits",
      "Link Building",
      "Keyword Research",
      "Analytics & Reporting",
      "Social Media Integration"
    ],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Yoast", "WordPress", "Social Media Tools"],
    process: [
      { title: "Research", desc: "Keyword and competitor research" },
      { title: "Strategy", desc: "Define the SEO strategy" },
      { title: "Execution", desc: "Implement the strategy" },
      { title: "Monitor", desc: "Monitor and optimize" }
    ],
    benefits: [
      "Increased organic traffic",
      "Higher search rankings",
      "Better brand visibility",
      "More leads and conversions"
    ]
  }
];

export default servicesCategories;