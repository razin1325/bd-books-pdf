'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import BookCover from '@/components/BookCover';
import { Book, CLASSES_LIST, SUBJECTS_LIST, BookType } from '@/lib/types';
import { getBooks, createBook, updateBook, deleteBook } from '@/lib/data';
import {
  Lock,
  Plus,
  Edit,
  Trash2,
  Key,
  CheckCircle,
  Link as LinkIcon,
  XCircle,
  UploadCloud,
  Loader2,
  ClipboardCheck,
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Editing State
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  // New/Edit Book Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [className, setClassName] = useState('Class 8');
  const [classSlug, setClassSlug] = useState('class-8');
  
  // Subject State
  const [subjectMode, setSubjectMode] = useState<'standard' | 'custom'>('standard');
  const [subject, setSubject] = useState('Mathematics');
  const [subjectSlug, setSubjectSlug] = useState('math');
  const [customSubject, setCustomSubject] = useState('');

  const [bookType, setBookType] = useState<BookType>('textbook');
  const [year, setYear] = useState<number>(2026);
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isLatest, setIsLatest] = useState(false);

  // Drag & Drop Upload State
  const [uploadingCover, setUploadingCover] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Admin Book List Filtering & Searching State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [sortBy, setSortBy] = useState<'id_asc' | 'id_desc' | 'title_asc' | 'class_asc'>('id_asc');

  // Pagination State (1 2 3 4 5 6 7 ...)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Reset pagination to Page 1 whenever filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterClass, filterType, sortBy, itemsPerPage]);

  // Check login state on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchBooks();
    }
  }, []);

  // Keyboard Clipboard Paste Handler (Ctrl + V) for image upload
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!isAuthenticated) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            handleFileUpload(file);
            const uploadZone = document.getElementById('cloudinary-upload-zone');
            if (uploadZone) {
              uploadZone.scrollIntoView({ behavior: 'smooth' });
            }
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, [isAuthenticated]);

  const fetchBooks = async () => {
    setLoading(true);
    const data = await getBooks();
    setBooks(data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    if (passwordInput === correctPassword) {
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setAuthError('');
      fetchBooks();
    } else {
      setAuthError('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন। (Default password: admin123)');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  // File Upload Handler (for Drag&Drop, File Input, or Ctrl+V Clipboard Paste)
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে ছবি ফাইল (JPG, PNG, WEBP) সিলেক্ট বা পেস্ট করুন!');
      return;
    }
    setUploadingCover(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setCoverImage(data.url);
      } else {
        alert('Cloudinary Upload সমস্যা: ' + (data.error || 'অজানা ত্রুটি'));
      }
    } catch (err: any) {
      alert('আপলোড এরর: ' + err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  // Permanent Cloudinary Image Removal Handler
  const handleRemoveImage = async () => {
    if (!coverImage) return;

    if (!coverImage.includes('cloudinary.com')) {
      setCoverImage('');
      return;
    }

    if (confirm('আপনি কি নিশ্চিত যে এই ছবিটি Cloudinary সার্ভার থেকে স্থায়ীভাবে মুছে ফেলতে চান?')) {
      setUploadingCover(true);
      try {
        const res = await fetch('/api/upload', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: coverImage }),
        });
        const data = await res.json();
        if (res.ok) {
          setCoverImage('');
          setSuccessMsg('✓ Cloudinary সার্ভার থেকে ছবিটি স্থায়ীভাবে মুছে ফেলা হয়েছে!');
          setTimeout(() => setSuccessMsg(''), 4000);
        } else {
          alert('Cloudinary থেকে ডিলিট এরর: ' + (data.error || 'অজানা ত্রুটি'));
        }
      } catch (err: any) {
        alert('ছবি ডিলিট করতে সমস্যা: ' + err.message);
      } finally {
        setUploadingCover(false);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Auto generate slug from title if creating new book
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingSlug) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
    }
  };

  const handleClassSelect = (cSlug: string) => {
    const found = CLASSES_LIST.find((c) => c.slug === cSlug);
    if (found) {
      setClassName(found.name);
      setClassSlug(found.slug);
    }
  };

  const handleSubjectDropdownSelect = (val: string) => {
    if (val === 'CUSTOM') {
      setSubjectMode('custom');
      setSubjectSlug('custom');
    } else {
      setSubjectMode('standard');
      const found = SUBJECTS_LIST.find((s) => s.slug === val);
      if (found) {
        setSubject(found.name);
        setSubjectSlug(found.slug);
        setCustomSubject('');
      }
    }
  };

  // Start Editing a Book
  const handleEditClick = (book: Book) => {
    setEditingSlug(book.slug);
    setTitle(book.title);
    setSlug(book.slug);
    setClassName(book.class_name);
    setClassSlug(book.class_slug);
    
    const isStandardSubject = SUBJECTS_LIST.some((s) => s.slug === book.subject_slug);
    if (isStandardSubject) {
      setSubjectMode('standard');
      setSubject(book.subject);
      setSubjectSlug(book.subject_slug);
      setCustomSubject('');
    } else {
      setSubjectMode('custom');
      setSubjectSlug('custom');
      setCustomSubject(book.subject);
    }

    setBookType(book.book_type);
    setYear(book.year);
    setDescription(book.description || '');
    setCoverImage(book.cover_image || '');
    setPdfUrl(book.pdf_url);
    setFileSize(book.file_size || '');
    setAuthor(book.author || '');
    setPublisher(book.publisher || '');
    setIsLatest(book.is_latest ?? false);

    const formElement = document.getElementById('book-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setEditingSlug(null);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setPdfUrl('');
    setDescription('');
    setCoverImage('');
    setSubjectMode('standard');
    setCustomSubject('');
    setSubject('Mathematics');
    setSubjectSlug('math');
    setFileSize('');
    setAuthor('');
    setPublisher('');
    setIsLatest(false);
  };

  const handleSubmitBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !pdfUrl || !slug) {
      alert('অনুগ্রহ করে Title, Slug এবং PDF URL সঠিকভাবে দিন!');
      return;
    }

    setLoading(true);

    let finalSubject = subject;
    let finalSubjectSlug = subjectSlug;

    if (subjectMode === 'custom' || customSubject.trim()) {
      if (!customSubject.trim()) {
        alert('অনুগ্রহ করে কাস্টম বিষয়ের নাম লিখুন!');
        setLoading(false);
        return;
      }
      finalSubject = customSubject.trim();
      finalSubjectSlug = customSubject
        .trim()
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    const payload = {
      title,
      slug,
      class_name: className,
      class_slug: classSlug,
      subject: finalSubject,
      subject_slug: finalSubjectSlug,
      book_type: bookType,
      year,
      description: description || `${title}. ${className}-এর ${finalSubject} বিষয়ের PDF বই।`,
      cover_image: coverImage || 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&q=80',
      pdf_url: pdfUrl,
      file_size: fileSize ? fileSize.trim() : '',
      author: author || 'Education Board',
      publisher: publisher || 'Edu Library',
      is_published: true,
      is_latest: isLatest,
    };

    if (editingSlug) {
      await updateBook(editingSlug, payload);
      setSuccessMsg('বইয়ের তথ্য সফলতা সহকারে আপডেট করা হয়েছে!');
    } else {
      await createBook(payload);
      setSuccessMsg('নতুন বই সফলতা সহকারে যুক্ত করা হয়েছে!');
    }

    await fetchBooks();
    setLoading(false);
    setEditingSlug(null);
    resetForm();

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Delete Book (Also deletes cover image from Cloudinary if hosted there)
  const handleDelete = async (targetBook: Book) => {
    if (confirm(`আপনি কি নিশ্চিত যে "${targetBook.title}" বইটি মুছে ফেলতে চান?`)) {
      setLoading(true);

      if (targetBook.cover_image && targetBook.cover_image.includes('cloudinary.com')) {
        try {
          await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: targetBook.cover_image }),
          });
        } catch (err) {
          console.error('Failed to delete image from Cloudinary:', err);
        }
      }

      await deleteBook(targetBook.slug);
      await fetchBooks();
      setLoading(false);
      setSuccessMsg('✓ বইটি এবং এর কভার ছবি Cloudinary থেকে সফলভাবে মুছে ফেলা হয়েছে!');
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // Advanced Filtering, Searching and Sorting for Admin List
  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.subject.toLowerCase().includes(q) ||
          b.class_name.toLowerCase().includes(q) ||
          b.slug.toLowerCase().includes(q) ||
          b.pdf_url.toLowerCase().includes(q)
      );
    }

    // Class filter
    if (filterClass !== 'ALL') {
      result = result.filter((b) => b.class_slug === filterClass);
    }

    // Book type filter
    if (filterType !== 'ALL') {
      result = result.filter((b) => b.book_type === filterType);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title, 'bn');
      if (sortBy === 'class_asc') return a.class_slug.localeCompare(b.class_slug);
      if (sortBy === 'id_desc') return b.id.localeCompare(a.id);
      return a.id.localeCompare(b.id); // default id_asc
    });

    return result;
  }, [books, searchTerm, filterClass, filterType, sortBy]);

  // Pagination Calculation
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [filteredBooks, currentPage, itemsPerPage]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border-2 border-emerald-100 rounded-2xl p-8 shadow-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login (এডমিন প্রবেশ)</h1>
          <p className="text-sm text-gray-600">
            গুগল ড্রাইভের লিংক ও নতুন বই যুক্ত করতে এডমিন পাসওয়ার্ড লিখুন
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-1.5">
              Admin Password (পাসওয়ার্ড):
            </label>
            <div className="relative">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full py-3 pl-11 pr-4 text-base font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400 placeholder:font-normal"
                required
              />
              <Key className="w-5 h-5 text-emerald-600 absolute left-3.5 top-3.5" />
            </div>
            <p className="text-xs text-gray-500 font-medium mt-1.5">
              ডিফল্ট পাসওয়ার্ড: <code className="bg-gray-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded border border-gray-200">admin123</code>
            </p>
          </div>

          {authError && (
            <div className="text-sm font-bold text-red-700 bg-red-50 p-3 rounded-xl border-2 border-red-200">
              {authError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Enter Admin Portal (প্রবেশ করুন)
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Portal (গুগল ড্রাইভ বই ম্যানেজমেন্ট)</h1>
          <p className="text-sm text-emerald-200 mt-1">
            নতুন বই পোস্ট বা এডিট করুন (কিবোর্ডে Ctrl+V ও ফিল্টার ফিচার সক্রিয়)
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow"
        >
          Logout (লগআউট)
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 p-5 rounded-xl text-base font-bold flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Add / Edit Book Form Container */}
      <div id="book-form" className="bg-white border-2 border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
        <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingSlug ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {editingSlug ? <Edit className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
              </div>
              <span>
                {editingSlug ? 'বই এডিট করুন (Edit Book Information)' : 'নতুন বই / গাইড যোগ করুন (Add New Book)'}
              </span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {editingSlug ? `"${title}" বইটির তথ্য পরিবর্তন করা হচ্ছে` : 'নিচের ঘরগুলোতে প্রয়োজনীয় তথ্য দিয়ে সংরক্ষণ বাটনে চাপ দিন'}
            </p>
          </div>

          {editingSlug && (
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              <span>Cancel Edit (এডিট বাতিল)</span>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmitBook} className="space-y-6">
          {/* Section 1: Title & Drive Link */}
          <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-200 space-y-4">
            <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider">
              ১. বইয়ের মূল তথ্য ও গুগল ড্রাইভ লিংক (Primary Info)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  বইয়ের নাম (Book Title) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="যেমন: Class 8 Math Guide Book PDF 2026"
                  className="w-full py-3 px-4 text-base font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  গুগল ড্রাইভ PDF লিংক (Drive Link) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full py-3 pl-11 pr-4 text-sm sm:text-base font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all placeholder:text-gray-400"
                    required
                  />
                  <LinkIcon className="w-5 h-5 text-emerald-600 absolute left-3.5 top-3.5" />
                </div>
                <span className="text-2xs text-gray-500 mt-1 block">
                  এখানে গুগল ড্রাইভের শেয়ার করা ফাইল লিংক পেস্ট করুন।
                </span>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  SEO URL Slug (লিংকের স্লাগ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="class-8-math-guide-pdf-2026"
                  className="w-full py-3 px-4 text-sm font-mono font-semibold text-emerald-800 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 transition-all"
                  required
                />
                <span className="text-2xs text-gray-500 mt-1 block">
                  {editingSlug
                    ? '⚠️ টিপস: স্লাগ (URL) পরিবর্তন করলে গুগলের আগের লিংক পরিবর্তন হয়ে যাবে।'
                    : 'এটি টাইটেল লিখলে স্বয়ংক্রিয়ভাবে তৈরি হবে, চাইলে পরিবর্তনও করতে পারেন।'}
                </span>
              </div>

              {/* Latest Posts Pin Checkbox */}
              <div className="flex items-center space-x-2.5 bg-amber-50 border border-amber-300 p-3.5 rounded-xl shadow-2xs">
                <input
                  type="checkbox"
                  id="isLatestPostCheckbox"
                  checked={isLatest}
                  onChange={(e) => setIsLatest(e.target.checked)}
                  className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                />
                <label htmlFor="isLatestPostCheckbox" className="text-xs sm:text-sm font-bold text-gray-900 cursor-pointer flex items-center space-x-1.5 select-none">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Latest Posts (হোমপেজের 'সর্বশেষ পোস্টসমূহ' সেকশনে পিন/প্রদর্শন করুন)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Class, Subject & Category */}
          <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-200 space-y-4">
            <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">
              ২. শ্রেণি ও বিষয় ক্যাটাগরি (Categorization)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  শ্রেণি (Class)
                </label>
                <select
                  value={classSlug}
                  onChange={(e) => handleClassSelect(e.target.value)}
                  className="w-full py-3 px-3 text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-blue-600 transition-all"
                >
                  {CLASSES_LIST.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} ({c.bnName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  বিষয় নির্বাচন (Subject)
                </label>
                <select
                  value={subjectMode === 'custom' ? 'CUSTOM' : subjectSlug}
                  onChange={(e) => handleSubjectDropdownSelect(e.target.value)}
                  className="w-full py-3 px-3 text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-blue-600 transition-all"
                >
                  {SUBJECTS_LIST.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name} ({s.bnName})
                    </option>
                  ))}
                  <option value="CUSTOM" className="font-bold text-emerald-700 bg-emerald-50">
                    ✍️ + অন্য বিষয় লিখুন (Custom Subject)...
                  </option>
                </select>
              </div>

              {subjectMode === 'custom' && (
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-emerald-900 mb-1.5">
                    কাস্টম বিষয়ের নাম লিখুন (Custom Subject Name) *
                  </label>
                  <input
                    type="text"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    placeholder="যেমন: Higher Math 2nd Paper, ইসলামের ইতিহাস, সাধারণ জ্ঞান..."
                    className="w-full py-3 px-4 text-sm font-bold text-emerald-900 bg-white border-2 border-emerald-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-200 transition-all placeholder:font-normal placeholder:text-gray-400"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  বইয়ের ধরন (Book Type)
                </label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value as BookType)}
                  className="w-full py-3 px-3 text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-blue-600 transition-all capitalize"
                >
                  <option value="textbook">Textbook (পাঠ্যবই)</option>
                  <option value="guide">Guide (গাইড বই)</option>
                  <option value="solution">Solution (সমাধান)</option>
                  <option value="other">Other (অন্যান্য)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1.5">
                  শিক্ষাবর্ষ (Year)
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full py-3 px-4 text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-blue-600 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Extra Details & Drag and Drop Cover Upload */}
          <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-5">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              ৩. কভার ছবি আপলোড ও বিবরণ (Cloudinary Drag & Drop / Ctrl+V Clipboard Cover Image)
            </h3>

            <div className="space-y-4">
              {/* Drag and Drop Zone + Keyboard Ctrl+V Paste */}
              <div id="cloudinary-upload-zone">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    কভার ছবি আপলোড (Cloudinary Drag & Drop / Ctrl+V Clipboard Paste):
                  </label>
                  <span className="text-2xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center space-x-1">
                    <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Ctrl + V Paste Supported</span>
                  </span>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 transition-all text-center cursor-pointer flex flex-col items-center justify-center space-y-3 ${
                    isDragging
                      ? 'border-emerald-600 bg-emerald-100/80 scale-[1.01]'
                      : 'border-emerald-300 bg-white hover:bg-emerald-50/60'
                  }`}
                >
                  {uploadingCover ? (
                    <div className="flex flex-col items-center space-y-2 py-4 text-emerald-700">
                      <Loader2 className="w-10 h-10 animate-spin" />
                      <span className="font-bold text-sm">Cloudinary সার্ভার প্রসেসিং চলছে...</span>
                    </div>
                  ) : coverImage ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center py-2">
                      <div className="relative w-24 h-32 rounded-xl overflow-hidden shadow-md border border-gray-300">
                        <Image
                          src={coverImage}
                          alt="Uploaded Cover"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="text-left space-y-1.5">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                          ✓ Cloudinary Image Uploaded
                        </span>
                        <p className="text-2xs font-mono text-gray-500 max-w-sm truncate">
                          {coverImage}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                          className="text-xs text-red-600 font-extrabold hover:underline block pt-1 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg border border-red-200 transition-colors"
                        >
                          🗑️ Cloudinary থেকে ছবি স্থায়ীভাবে মুছে ফেলুন
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shadow-2xs">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-900">
                          এখানে ছবি ড্র্যাগ এন্ড ড্রপ (Drag & Drop) করুন
                        </p>
                        <p className="text-xs text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                          📋 অথবা কিবোর্ডে Ctrl + V চেপে যেকোনো ছবি সরাসরি পেস্ট (Paste) করুন!
                        </p>
                      </div>
                      <span className="text-2xs text-gray-400 font-medium">
                        Supports: PNG, JPG, WEBP, JPEG (Auto Upload & Delete from Cloudinary)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Direct Image URL Fallback */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  অথবা সরাসরি ছবি URL (Direct Image Link):
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://res.cloudinary.com/dqospi6h7/image/upload/..."
                  className="w-full py-2.5 px-3 text-xs sm:text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">
                    ফাইল সাইজ (File Size)
                  </label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={(e) => setFileSize(e.target.value)}
                    placeholder="যেমন: 14 MB"
                    className="w-full py-2.5 px-3 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">
                    বইয়ের সংক্ষিপ্ত বিবরণ (Description / SEO Text)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="বইটি সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                    className="w-full py-2.5 px-4 text-sm font-medium text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-4 text-white font-extrabold text-base rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 ${
                editingSlug ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {editingSlug ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              <span>
                {loading
                  ? 'সংরক্ষণ করা হচ্ছে...'
                  : editingSlug
                  ? 'বই আপডেট করুন (Update Book Changes)'
                  : 'নতুন বই সংরক্ষণ করুন (Publish Book)'}
              </span>
            </button>

            {editingSlug && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-sm rounded-xl transition-colors"
              >
                এডিট বাতিল
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Advanced Admin Book List with Search & Filtering */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-emerald-600" />
              <span>বর্তমানে পোস্ট করা বইয়ের তালিকা ({books.length})</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-1">
              ফিল্টার ও লাইভ সার্চ করে সহজেই বইটি এডিট বা ডিলিট করুন
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            ফলাফল: {filteredBooks.length}টি বই (মোট {books.length}টির মধ্যে)
          </span>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-emerald-700" />
            <span>এডমিন ফিল্টার ও অনুসন্ধান প্যানেল (Admin Filter Panel)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="বইয়ের নাম, বিষয় বা লিংক খুঁজুন..."
                className="w-full py-2.5 pl-9 pr-3 text-xs sm:text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all placeholder:font-normal placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-2.5 text-xs text-gray-400 hover:text-gray-700 font-bold bg-gray-100 hover:bg-gray-200 px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Class Filter */}
            <div className="relative">
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full py-2.5 pl-8 pr-3 text-xs sm:text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all appearance-none cursor-pointer"
              >
                <option value="ALL">সকল শ্রেণি (All Classes)</option>
                {CLASSES_LIST.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.bnName} ({c.name})
                  </option>
                ))}
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute left-2.5 top-3 pointer-events-none" />
            </div>

            {/* Book Type Filter */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full py-2.5 pl-8 pr-3 text-xs sm:text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all appearance-none cursor-pointer capitalize"
              >
                <option value="ALL">সকল ধরনের বই (All Types)</option>
                <option value="textbook">Textbook (পাঠ্যবই)</option>
                <option value="guide">Guide (গাইড বই)</option>
                <option value="solution">Solution (সমাধান)</option>
                <option value="other">Other (অন্যান্য)</option>
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute left-2.5 top-3 pointer-events-none" />
            </div>

            {/* Sort Control */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 pl-8 pr-3 text-xs sm:text-sm font-bold text-gray-900 bg-white border-2 border-gray-300 rounded-xl outline-none focus:border-emerald-600 transition-all appearance-none cursor-pointer"
              >
                <option value="id_asc">সিরিয়াল অনুযায়ী (১ থেকে শেষ)</option>
                <option value="id_desc">নতুন পোস্ট প্রথম (Newest First)</option>
                <option value="title_asc">বইয়ের নাম (A to Z / অ-হ)</option>
                <option value="class_asc">শ্রেণি অনুযায়ী (Class Wise)</option>
              </select>
              <ArrowUpDown className="w-4 h-4 text-gray-400 absolute left-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Books Table List */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-800 uppercase font-extrabold text-2xs border-b-2 border-gray-300 tracking-wider">
                <th className="p-3 w-12 text-center">কভার</th>
                <th className="p-3">Title (বইয়ের নাম)</th>
                <th className="p-3">Class (শ্রেণি)</th>
                <th className="p-3">Subject (বিষয়)</th>
                <th className="p-3">Type</th>
                <th className="p-3">Drive Link</th>
                <th className="p-3 text-right">Actions (এডিট / ডিলেট)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((b) => (
                  <tr key={b.id} className="hover:bg-emerald-50/50 transition-colors">
                    {/* Cover Thumbnail */}
                    <td className="p-2 text-center">
                      <div className="relative w-10 h-14 bg-gray-100 rounded border border-gray-300 overflow-hidden mx-auto shadow-2xs">
                        <BookCover
                          title={b.title}
                          coverImage={b.cover_image}
                          subject={b.subject}
                          bookType={b.book_type}
                          year={b.year}
                          showBadges={false}
                        />
                      </div>
                    </td>

                    <td className="p-3 font-bold text-gray-900 max-w-xs">
                      <div className="flex items-center space-x-1.5">
                        {b.is_latest && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-1.5 py-0.5 rounded border border-amber-300 flex items-center space-x-0.5 flex-shrink-0">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>LATEST</span>
                          </span>
                        )}
                        <span className="truncate block" title={b.title}>
                          {b.title}
                        </span>
                      </div>
                      <span className="text-3xs font-mono text-emerald-800 font-semibold block truncate">
                        Slug: /{b.class_slug}/{b.slug}
                      </span>
                    </td>

                    <td className="p-3 text-gray-800 font-semibold whitespace-nowrap">
                      {b.class_name}
                    </td>

                    <td className="p-3 text-gray-800 whitespace-nowrap">
                      {b.subject}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-3xs font-extrabold rounded-md uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {b.book_type}
                      </span>
                    </td>

                    <td className="p-3 max-w-xs truncate">
                      <a
                        href={b.pdf_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:text-emerald-900 hover:underline flex items-center space-x-1 text-2xs font-semibold"
                        title={b.pdf_url}
                      >
                        <LinkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{b.pdf_url}</span>
                      </a>
                    </td>

                    <td className="p-3 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleEditClick(b)}
                        className="px-3 py-1.5 bg-amber-100 text-amber-900 hover:bg-amber-600 hover:text-white rounded-lg transition-colors font-bold text-2xs inline-flex items-center space-x-1 shadow-2xs cursor-pointer"
                        title="Edit book info"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(b)}
                        className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-600 hover:text-white rounded-lg transition-colors font-bold text-2xs inline-flex items-center space-x-1 shadow-2xs cursor-pointer"
                        title="Delete book and cover image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500 font-bold bg-gray-50">
                    🔍 কোনো বই পাওয়া যায়নি! অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Page Counter Pagination Bar (1 2 3 4 5 6 7 ...) */}
        {filteredBooks.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <span>প্রতি পেজে বই:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="py-1 px-2.5 bg-white border border-gray-300 rounded-lg font-bold text-gray-900 outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option value={10}>১০টি</option>
                <option value={15}>১৫টি</option>
                <option value={25}>২৫টি</option>
                <option value={50}>৫০টি</option>
                <option value={100}>১০০টি</option>
              </select>
              <span className="font-semibold text-gray-500 hidden sm:inline">
                (প্রদর্শিত {Math.min((currentPage - 1) * itemsPerPage + 1, filteredBooks.length)} - {Math.min(currentPage * itemsPerPage, filteredBooks.length)}, মোট {filteredBooks.length}টি বইয়ের মধ্যে)
              </span>
            </div>

            {/* Page Number Buttons */}
            <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 rounded-lg border border-gray-300 font-bold bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                আগের পেজ
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  return (
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 2
                  );
                })
                .map((page, idx, array) => {
                  const prevPage = array[idx - 1];
                  const showEllipsis = prevPage && page - prevPage > 1;

                  return (
                    <React.Fragment key={page}>
                      {showEllipsis && <span className="px-1 text-gray-400 font-bold">...</span>}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg font-extrabold text-xs transition-all flex items-center justify-center cursor-pointer ${
                          currentPage === page
                            ? 'bg-emerald-600 text-white border border-emerald-600 shadow-sm'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-emerald-50 hover:text-emerald-700'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  );
                })}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="px-3 py-1.5 rounded-lg border border-gray-300 font-bold bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                পরের পেজ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
