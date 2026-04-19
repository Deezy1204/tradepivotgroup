"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const team = [
  {
    name: "Khumbulani Mlambo",
    role: "Managing Director",
    image: "/images/WhatsApp Image 2026-04-18 at 13.14.15.jpeg",
    details: "Advanced Diploma in Project Management. National Certificate in Entrepreneurship."
  },
  {
    name: "James Ndachengedzwa",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    details: "Strategic operations and logistics specialist."
  },
  {
    name: "Mabutho Moyo",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2187&auto=format&fit=crop",
    details: "Expert in construction assessment and project delivery."
  },
  {
    name: "Lunga Primrose",
    role: "Quantity Surveyor",
    image: "/images/IMG-20260418-WA0001.jpg",
    details: "Cost management control and construction administration"
  }
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-32 px-8 md:px-24 bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-24"
        >
            <div className="text-silver-primary text-[11px] font-black uppercase tracking-[0.5em] mb-8">Our Team</div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter max-w-4xl leading-[0.9]">
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }} className="block">Where top-tier quality meets</motion.span></span>
                <span className="block overflow-hidden"><motion.span initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="block text-[var(--text-muted)]">trusted professionals.</motion.span></span>
            </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 100, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }}
                    viewport={{ once: true, margin: "50px" }}
                    className="group flex flex-col items-start"
                >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl mb-8 bg-[var(--card-bg)]">
                        <Image 
                            src={member.image} 
                            alt={member.name} 
                            fill 
                            className="object-cover group-hover:scale-105 transition-all duration-1000" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-[20px] font-black uppercase tracking-tight group-hover:text-silver-primary transition-colors">
                            {member.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-[var(--text-muted)] mb-4 transition-colors">
                            {member.role}
                        </p>
                        <p className="text-[12px] text-[var(--text-muted)] font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {member.details}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Global Footer call for Team */}
        <div className="mt-40 border-t border-[var(--border-subtle)] pt-20 flex flex-col md:flex-row gap-12 items-center justify-between">
             <p className="max-w-xl text-[18px] text-[var(--text-muted)] font-medium leading-relaxed tracking-tight">
                Our team of Engineers & Project Managers work together to help you make the right moves to build your project.
             </p>
             <button className="px-10 py-5 bg-[var(--foreground)] text-[var(--background)] text-[11px] font-black uppercase tracking-widest rounded-full hover:opacity-90 transition-all flex items-center gap-4">
                Join our journey <span className="text-[var(--text-muted)]">→</span>
             </button>
        </div>
      </div>
    </section>
  );
}
