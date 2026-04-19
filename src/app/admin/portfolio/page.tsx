"use client";

import { useState, useEffect } from 'react';
// import { db, storage } from '@/lib/firebase';
// import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, X, Upload, Save, MapPin, Ruler, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  location: string;
  size: string;
  status: string;
  description: string;
  longDesc: string;
  image: string;
}

export default function PortfolioManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    // MOCK DATA INSTEAD OF FIREBASE
    setTimeout(() => {
        if (projects.length === 0) {
            setProjects([
                {
                    id: 'mock-1',
                    title: 'Sample Project Alpha',
                    location: 'Bulawayo, ZW',
                    size: '5,000',
                    status: '100% Complete',
                    description: 'A brief placeholder description.',
                    longDesc: 'Extended placeholder description for the modal context.',
                    image: '/images/2026_04_18_08_33_40_IMG_9018.JPG'
                }
            ]);
        }
        setLoading(false);
    }, 1000);

    /*
    // REAL FIREBASE LOGIC
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    
    // MOCK SAVE LOGIC
    setTimeout(() => {
        let imageUrl = currentProject.image || "/images/2026_04_18_08_33_37_IMG_9021.JPG"; // fallback mock image
        if (imageFile) {
            imageUrl = URL.createObjectURL(imageFile);
        }

        const projectData = {
            id: currentProject.id || `mock-${Date.now()}`,
            title: currentProject.title || '',
            location: currentProject.location || '',
            size: currentProject.size || '',
            status: currentProject.status || 'Under Construction',
            description: currentProject.description || '',
            longDesc: currentProject.longDesc || '',
            image: imageUrl,
        };

        if (currentProject.id) {
            setProjects(projects.map(p => p.id === currentProject.id ? projectData : p));
        } else {
            setProjects([projectData, ...projects]);
        }

        closeModal();
        setUploading(false);
    }, 1500);

    /*
    // REAL FIREBASE LOGIC
    try {
      let imageUrl = currentProject.image || "";

      // If new image file uploaded
      if (imageFile) {
        const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const projectData = {
        title: currentProject.title,
        location: currentProject.location,
        size: currentProject.size,
        status: currentProject.status,
        description: currentProject.description,
        longDesc: currentProject.longDesc,
        image: imageUrl,
        updatedAt: new Date().toISOString()
      };

      if (currentProject.id) {
        await updateDoc(doc(db, "projects", currentProject.id), projectData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date().toISOString()
        });
      }

      fetchProjects();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Error saving project");
    } finally {
      setUploading(false);
    }
    */
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    // MOCK DELETE LOGIC
    setProjects(projects.filter(p => p.id !== id));

    /*
    // REAL FIREBASE LOGIC
    try {
      await deleteDoc(doc(db, "projects", id));
      // Cleanup image if it was in Storage (starts with https)
      if (imageUrl.startsWith('https://firebasestorage')) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef).catch(e => console.log("Image likely already deleted or external"));
      }
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
    */
  };

  const openModal = (project?: Project) => {
    setCurrentProject(project || {
        title: "",
        location: "",
        size: "",
        status: "Under Construction",
        description: "",
        longDesc: ""
    });
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentProject({});
    setImageFile(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
            <div className="text-silver-primary text-[10px] font-black uppercase tracking-[0.5em] mb-2">Content Manager</div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Portfolio.</h1>
        </div>
        <button 
            onClick={() => openModal()}
            className="px-6 py-3 bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center gap-3"
        >
            <Plus size={14} /> Add New Project
        </button>
      </header>

      {loading ? (
        <div className="text-center py-24 text-[11px] font-black uppercase tracking-widest animate-pulse">
            Syncing Database...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
                <div key={p.id} className="group bg-[var(--card-bg)] rounded-xl border border-[var(--border-subtle)] overflow-hidden flex flex-col">
                    <div className="relative aspect-[4/3] w-full">
                        <Image unoptimized src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button onClick={() => openModal(p)} className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-silver-primary hover:text-black transition-all">
                                <Edit3 size={14} />
                            </button>
                            <button onClick={() => handleDelete(p.id, p.image)} className="p-2.5 bg-red-500/10 backdrop-blur-md rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                        <div className="text-[9px] uppercase font-black text-silver-primary tracking-widest mb-1">{p.location}</div>
                        <h3 className="text-lg font-black uppercase tracking-tight truncate">{p.title}</h3>
                        <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 italic">"{p.description}"</p>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isEditing && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={closeModal}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-3xl bg-[var(--background)] rounded-xl border border-[var(--border-subtle)] overflow-hidden shadow-2xl"
                >
                    <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto hidden-scrollbar">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black uppercase tracking-tighter">
                                {currentProject.id ? 'Edit Project' : 'New Project'}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Title</label>
                                    <input 
                                        type="text" value={currentProject.title || ''}
                                        onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                                        className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg py-3 px-4 text-[13px] outline-none focus:border-silver-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1/2 space-y-1.5">
                                        <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Location</label>
                                        <input 
                                            type="text" value={currentProject.location || ''}
                                            onChange={(e) => setCurrentProject({...currentProject, location: e.target.value})}
                                            className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg py-3 px-4 text-[13px] outline-none focus:border-silver-primary transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 space-y-1.5">
                                        <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Size (SQM)</label>
                                        <input 
                                            type="text" value={currentProject.size || ''}
                                            onChange={(e) => setCurrentProject({...currentProject, size: e.target.value})}
                                            className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg py-3 px-4 text-[13px] outline-none focus:border-silver-primary transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Status</label>
                                    <select 
                                        value={currentProject.status || ''}
                                        onChange={(e) => setCurrentProject({...currentProject, status: e.target.value})}
                                        className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg py-3 px-4 text-[13px] outline-none focus:border-silver-primary transition-all appearance-none"
                                        required
                                    >
                                        <option value="Under Construction">Under Construction</option>
                                        <option value="100% Complete">100% Complete</option>
                                        <option value="Now Occupied">Now Occupied</option>
                                        <option value="Assessment Complete">Assessment Complete</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Short Description</label>
                                    <input 
                                        type="text" value={currentProject.description || ''}
                                        onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                                        className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg py-3 px-4 text-[13px] outline-none focus:border-silver-primary transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Long Case Study</label>
                                    <textarea 
                                        rows={4} value={currentProject.longDesc || ''}
                                        onChange={(e) => setCurrentProject({...currentProject, longDesc: e.target.value})}
                                        className="w-full bg-[var(--card-bg)] border border-[var(--border-subtle)] rounded-lg py-3 px-4 text-[13px] outline-none focus:border-silver-primary transition-all resize-none"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[9px] uppercase font-black tracking-widest text-[var(--text-muted)] ml-2">Project Image</label>
                                    <div className="relative group/upload h-24 rounded-lg border-2 border-dashed border-[var(--border-subtle)] hover:border-silver-primary transition-all flex flex-col items-center justify-center cursor-pointer">
                                        <input 
                                            type="file" accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload size={16} className="mb-2 text-[var(--text-muted)] group-hover/upload:text-silver-primary transition-colors" />
                                        <div className="text-[9px] font-bold uppercase tracking-widest">{imageFile ? imageFile.name : 'Choose File'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-6 flex gap-4">
                                <button 
                                    type="submit" disabled={uploading}
                                    className="flex-1 py-3 bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
                                >
                                    {uploading ? 'Processing...' : (
                                        <> <Save size={14} /> Save Details </>
                                    )}
                                </button>
                                <button 
                                    type="button" onClick={closeModal}
                                    className="px-6 py-3 border border-[var(--border-subtle)] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
