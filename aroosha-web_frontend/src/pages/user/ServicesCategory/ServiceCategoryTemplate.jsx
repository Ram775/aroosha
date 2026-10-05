import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ServiceCategoryTemplate({ 
  icon, 
  title, 
  tagline, 
  description, 
  features = [], 
  technologies = [], 
  benefits = [],
  process = [],
  ctaText = "Get a Quote",
  ctaLink = "/contact"
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto py-8 px-4"
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/services")}
        className="text-muted hover:text-primary transition-colors mb-6 flex items-center gap-2 text-sm"
      >
        ← Back to All Services
      </button>

      {/* Header */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-heading">{title}</h1>
            <p className="text-muted">{tagline}</p>
          </div>
        </div>
        <p className="text-text-body leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-heading mb-4">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10"
              >
                <span className="text-primary text-lg">✓</span>
                <span className="text-text-body text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-heading mb-4">Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Process */}
      {process.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-heading mb-4">Our Process</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {process.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-heading text-sm">{step.title}</p>
                  <p className="text-muted text-xs">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {benefits.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-xl font-bold text-heading mb-4">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl"
              >
                <span className="text-primary text-lg">✦</span>
                <span className="text-text-body text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center">
        <h3 className="text-xl font-bold text-heading mb-2">Ready to Get Started?</h3>
        <p className="text-muted text-sm mb-4">Let's discuss your project and how we can help.</p>
        <button onClick={() => navigate(ctaLink)} className="btn-primary">
          {ctaText} →
        </button>
      </div>
    </motion.div>
  );
}