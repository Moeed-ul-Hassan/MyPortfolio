import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { socialLinks } from '@/data/constants';

const contactInfo = [
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    description: 'For any inquiries or questions.',
    link: 'mailto:moeed@example.com',
    linkText: 'moeed@example.com'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    description: 'Based in Pakistan',
    additionalText: 'Available for remote work worldwide'
  },
  {
    icon: 'fas fa-user-clock',
    title: 'Working Hours',
    description: 'Monday - Friday: 9 AM - 6 PM PKT',
    additionalText: 'Weekend: Available for urgent matters'
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 overflow-hidden relative">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-40 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-primary font-medium mb-1">
              Get In Touch
            </motion.p>
            <motion.h2 
              variants={fadeInUp} 
              className="text-3xl md:text-4xl font-heading font-bold text-foreground"
            >
              Let's <span className="text-primary relative inline-block">
                Connect
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-foreground/70 max-w-2xl mx-auto mt-4">
              Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities in React and Node.js development.
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Decorative element */}
              <motion.div
                className="absolute -top-10 -left-10 w-24 h-24 border border-primary/20 rounded-lg"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              <div className="space-y-8 relative z-10">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start group bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
                    variants={fadeInUp}
                    whileHover={{ 
                      x: 5, 
                      boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.2)" 
                    }}
                  >
                    <motion.div 
                      className="mt-1 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mr-4"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.2)" }}
                    >
                      <motion.i 
                        className={`${item.icon} text-primary`}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      ></motion.i>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-foreground/70 mb-1">{item.description}</p>
                      {item.link && (
                        <motion.a 
                          href={item.link} 
                          className="text-primary hover:text-primary/80 transition-colors relative inline-block"
                          whileHover={{ x: 2 }}
                        >
                          {item.linkText}
                          <motion.span 
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/50" 
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      )}
                      {item.additionalText && (
                        <p className="text-foreground/70">{item.additionalText}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12"
                variants={fadeInUp}
              >
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link, index) => (
                    <motion.a 
                      key={link.name}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors relative overflow-hidden"
                      aria-label={link.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2, type: "spring", stiffness: 400 }
                      }}
                    >
                      <motion.i 
                        className={link.icon}
                        whileHover={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      ></motion.i>
                      <motion.div 
                        className="absolute inset-0 bg-primary"
                        initial={{ y: "100%" }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.i 
                        className={`${link.icon} absolute inset-0 flex items-center justify-center text-background`}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      ></motion.i>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              {/* Decorative element */}
              <motion.div
                className="absolute -bottom-5 -right-5 w-16 h-16 border border-primary/20 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7,
                type: "spring",
                stiffness: 100
              }}
              className="relative"
            >
              {/* Form wrapper with card effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10 rounded-xl blur-xl -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.div
                className="border border-border/50 rounded-xl overflow-hidden p-1 backdrop-blur-sm"
                whileHover={{ boxShadow: "0 30px 60px -12px rgba(var(--primary), 0.25)" }}
                transition={{ duration: 0.5 }}
              >
                <ContactForm />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
