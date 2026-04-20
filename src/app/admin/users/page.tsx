"use client";

import { useState, useEffect } from 'react';
// import { db } from '@/lib/firebase';
// import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Users, Shield, Trash2, Mail, Clock } from 'lucide-react';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // MOCK DATA INSTEAD OF FIREBASE
    setTimeout(() => {
        if (users.length === 0) {
            setUsers([
                { id: 'usr-1', email: 'nkezieprosper@gmail.com', role: 'Super Admin', createdAt: new Date().toISOString() },
                { id: 'usr-2', email: 'admin@gmail.com', role: 'Editor', createdAt: new Date().toISOString() }
            ]);
        }
        setLoading(false);
    }, 1000);

    /*
    // REAL FIREBASE LOGIC
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AdminUser));
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    */
  };

  const handleDelete = async (id: string, email: string) => {
    if (email === "nkezieprosper@gmail.com" || email === "admin@gmail.com") {
        alert("The primary administrator account cannot be deleted.");
        return;
    }
    if (!confirm(`Revoke access for ${email}?`)) return;
    
    // MOCK DELETE LOGIC
    setUsers(users.filter(u => u.id !== id));

    /*
    // REAL FIREBASE LOGIC
    try {
      await deleteDoc(doc(db, "users", id));
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
    */
  };

  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        <div>
            <div className="text-silver-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">Security</div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Access Control.</h1>
        </div>
        <div className="text-[11px] font-black uppercase tracking-widest text-[var(--text-muted)] italic max-w-xs text-right">
            Manage personnel authorized to modify site content and system configurations.
        </div>
      </header>

      {loading ? (
        <div className="text-center py-24 text-[11px] font-black uppercase tracking-widest animate-pulse">
            Auditing Access Logs...
        </div>
      ) : (
        <div className="bg-[var(--card-bg)] rounded-[2.5rem] border border-[var(--border-subtle)] overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--foreground)]/[0.02]">
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Administrator</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Clearance</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Enrolled On</th>
                        <th className="p-8 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b border-[var(--border-subtle)] hover:bg-[var(--foreground)]/[0.01] transition-colors">
                            <td className="p-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-silver-primary">
                                        <Users size={16} />
                                    </div>
                                    <span className="text-[14px] font-bold">{user.email}</span>
                                </div>
                            </td>
                            <td className="p-8">
                                <div className="flex items-center gap-2">
                                    <Shield size={12} className="text-silver-primary" />
                                    <span className="text-[11px] font-black uppercase tracking-widest">{user.role}</span>
                                </div>
                            </td>
                            <td className="p-8 text-[13px] text-[var(--text-muted)] font-medium">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-8 text-right">
                                <button 
                                    onClick={() => handleDelete(user.id, user.email)}
                                    className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all"
                                    title="Revoke Access"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
      
      <div className="p-10 bg-silver-primary/5 border border-silver-primary/10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
            <Mail className="text-silver-primary shrink-0" size={32} />
            <p className="text-[14px] text-[var(--text-muted)] leading-relaxed">
                To add a new administrator, they must first sign up through the Firebase Auth system or be created by an existing admin using the <code className="text-silver-primary">createUser</code> protocol.
            </p>
        </div>
        <button className="whitespace-nowrap px-8 py-4 border border-silver-primary text-silver-primary text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-silver-primary hover:text-black transition-all">
            Invite Administrator
        </button>
      </div>
    </div>
  );
}
