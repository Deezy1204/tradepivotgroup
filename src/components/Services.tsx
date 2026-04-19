"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  { 
    id: "01", 
    name: "General Building", 
    desc: "We treat building as a high-stakes puzzle where efficiency, environment, and endurance meet. Creating structures that stand the test of time." 
  },
  { 
    id: "02", 
    name: "Civil Engineering", 
    desc: "Whether it’s road networks, water systems, or bulk earthworks, we ensure the 'bones' of your project are unbreakable." 
  },
  { 
    id: "03", 
    name: "Structural Engineering", 
    desc: "Our structural engineering team merges mathematical rigor with creative problem-solving. Integrity without compromise." 
  },
  { 
    id: "04", 
    name: "Project Management", 
    desc: "Your Project, Our Priority: Professional monitoring at every turn to ensure milestones are met with uncompromised quality." 
  },
  { 
    id: "05", 
    name: "Architectural Services", 
    desc: "Melding aesthetic vision with structural feasibility to create modern, sustainable architectural solutions." 
  },
  { 
    id: "06", 
    name: "Construction Assessment", 
    desc: "Let our team of Experts give your property a health check. Rigorous assessment for safety and longevity." 
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-8 md:px-24 bg-[var(--alt-bg)] text-[var(--foreground)] transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
        >
            <div className="text-silver-primary text-[11px] font-black uppercase tracking-[0.5em] mb-8">Expertise</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-2xl">
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="block">The Bedrock of</motion.span></span>
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="block text-[var(--text-muted)]">Structural Progress.</motion.span></span>
            </h2>
        </motion.div>

        <div className="flex flex-col border-t border-[var(--border-subtle)] overflow-hidden">
            {services.map((s, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="group border-b border-[var(--border-subtle)] py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 cursor-pointer hover:bg-[var(--foreground)]/[0.02] transition-colors duration-500 px-4 md:px-8"
                >
                    <div className="flex items-center gap-12 md:w-1/2">
                        <span className="text-[14px] font-black text-[var(--border-subtle)] group-hover:text-[var(--text-muted)] font-mono tracking-tighter transition-colors duration-500">
                            {"{"}{s.id}{"}"}
                        </span>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-700">
                            {s.name}
                        </h3>
                    </div>

                    <div className="md:w-1/3 flex flex-col gap-6">
                        <p className="text-[13px] text-[var(--text-muted)] font-medium leading-relaxed group-hover:text-[var(--foreground)] transition-colors duration-500">
                            {s.desc}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-silver-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            View Details <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
