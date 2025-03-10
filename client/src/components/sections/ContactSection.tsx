import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/ContactForm';
import { socialLinks } from '@/data/constants';

const contactInfo = [
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    description: 'For any inquiries or questions.',
    link: 'mailto:contact@johndoe.com',
    linkText: 'contact@johndoe.com'
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'Location',
    description: 'Based in San Francisco, California',
    additionalText: 'Available for remote work worldwide'
  },
  {
    icon: 'fas fa-user-clock',
    title: 'Working Hours',
    description: 'Monday - Friday: 9 AM - 5 PM PST',
    additionalText: 'Weekend: Available for urgent matters'
  }
];

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-medium mb-1">Get In Touch</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
              Have a project in mind or just want to chat? Feel free to reach out. I'm always open to discussing new opportunities.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="mt-1 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mr-4">
                      <i className={`${item.icon} text-primary`}></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-foreground/70 mb-1">{item.description}</p>
                      {item.link && (
                        <a href={item.link} className="text-primary hover:text-primary/80 transition-colors">
                          {item.linkText}
                        </a>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                      aria-label={link.name}
                    >
                      <i className={link.icon}></i>
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
