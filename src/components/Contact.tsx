import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const DEFAULT_DESCRIPTION = 'For Skills Sessions, Private Groups, Team Training, Camps/Clinics, and media requests, please use the form or reach out directly.';
const DEFAULT_EMAIL = 'erincoykendalllax@gmail.com';
const DEFAULT_INSTAGRAM = 'https://www.instagram.com/erincoykendall/?hl=en';

export default function Contact() {
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [instagram, setInstagram] = useState(DEFAULT_INSTAGRAM);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/site-content`)
      .then(res => res.json())
      .then((data: any[]) => {
        const map: Record<string, string> = {};
        data.forEach((item: any) => { map[item.sectionKey] = item.content; });
        if (map['contact_description']) setDescription(map['contact_description']);
        if (map['contact_email']) setEmail(map['contact_email']);
        if (map['contact_instagram']) setInstagram(map['contact_instagram']);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="contact" className="py-24 bg-zinc-900 border-t border-zinc-800">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase mb-6 text-white">
              Get In <span className="text-accent">Touch</span>
            </h2>
            <p className="text-zinc-400 mb-12 max-w-md leading-relaxed">
              {description}
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors">
                <div className="w-12 h-12 bg-zinc-950 flex items-center justify-center border border-zinc-800">
                  <Mail className="text-accent" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-1">Email</p>
                  <p className="font-medium">{email}</p>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-4">Follow the Journey</p>
              <div className="flex gap-4">
                <a 
                  href={instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 bg-zinc-950 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-accent hover:border-accent transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-950 p-8 md:p-12 border border-zinc-800 relative"
          >
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-accent/30 -mt-2 -mr-2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-accent/30 -mb-2 -ml-2 pointer-events-none" />
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const firstName = formData.get('firstName');
              const lastName = formData.get('lastName');
              const formEmail = formData.get('email');
              const phone = formData.get('phone') || 'Not provided';
              const message = formData.get('message');
              
              const subject = encodeURIComponent(`Website Inquiry from ${firstName} ${lastName}`);
              const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${formEmail}\nPhone: ${phone}\n\nMessage:\n${message}`);
              
              window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-2">Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                  placeholder="How can we collaborate?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-accent text-zinc-950 font-display font-bold uppercase tracking-wider py-4 hover:bg-white transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
