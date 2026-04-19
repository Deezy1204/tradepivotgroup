"use client";

import { useState, useEffect } from 'react';
// import { db, storage } from '@/lib/firebase';
// import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Trash2, Upload, Plus, X } from 'lucide-react';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  image: string;
  createdAt: string;
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    // MOCK DATA INSTEAD OF FIREBASE
    setTimeout(() => {
      if (items.length === 0) {
        setItems([
          { id: 'mock-1', image: '/images/2026_04_18_08_33_37_IMG_9021.JPG', createdAt: new Date().toISOString() },
          { id: 'mock-2', image: '/images/2026_04_18_08_33_38_IMG_9019.JPG', createdAt: new Date().toISOString() }
        ]);
      }
      setLoading(false);
    }, 1000);

    /*
    // REAL FIREBASE LOGIC
    try {
      const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // MOCK UPLOAD LOGIC
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      setItems([{ id: `mock-${Date.now()}`, image: mockUrl, createdAt: new Date().toISOString() }, ...items]);
      setUploading(false);
    }, 1500);

    /*
    // REAL FIREBASE LOGIC
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "gallery"), {
        image: url,
        createdAt: new Date().toISOString()
      });

      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
    */
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Remove this image from gallery?")) return;
    
    // MOCK DELETE LOGIC
    setItems(items.filter(item => item.id !== id));

    /*
    // REAL FIREBASE LOGIC
    try {
      await deleteDoc(doc(db, "gallery", id));
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef).catch(e => console.log("Cleanup failed"));
      fetchGallery();
    } catch (err) {
      console.error(err);
    }
    */
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
            <div className="text-silver-primary text-[10px] font-black uppercase tracking-[0.5em] mb-2">Content Manager</div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Gallery.</h1>
        </div>
        
        <div className="relative">
            <input 
                type="file" accept="image/*" 
                onChange={handleUpload}
                disabled={uploading}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <button className="px-6 py-3 bg-silver-primary text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:opacity-90 transition-all flex items-center gap-3">
                {uploading ? (
                    <span className="animate-pulse">Uploading...</span>
                ) : (
                    <> <Upload size={14} /> Upload to Gallery </>
                )}
            </button>
        </div>
      </header>

      {loading ? (
        <div className="text-center py-24 text-[11px] font-black uppercase tracking-widest animate-pulse">
            Syncing Assets...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
                <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden bg-[var(--card-bg)] border border-[var(--border-subtle)]">
                    <Image unoptimized src={item.image} alt="Gallery item" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                            onClick={() => handleDelete(item.id, item.image)}
                            className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
