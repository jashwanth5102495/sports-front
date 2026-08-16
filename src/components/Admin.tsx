import { useState, useEffect } from 'react';
import { ArrowLeft, LayoutDashboard, Shield, LogOut, UploadCloud, Calendar, Newspaper, Image as ImageIcon, Trash2, FileText, Plus, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

// Helper to extract YouTube video ID
function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  
  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImageBase64, setEventImageBase64] = useState('');
  const [eventList, setEventList] = useState<any[]>([]);

  // Image Form State
  const [imageTitle, setImageTitle] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  
  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  // Site Content State
  const [aboutBio, setAboutBio] = useState('');
  const [aboutPlayingStyle, setAboutPlayingStyle] = useState('');
  const [aboutHighSchool, setAboutHighSchool] = useState('');
  const [aboutPersonal, setAboutPersonal] = useState('');
  const [journeyDescription, setJourneyDescription] = useState('');
  const [achievementsDescription, setAchievementsDescription] = useState('');
  const [featuredYear, setFeaturedYear] = useState('');
  const [featuredTitle, setFeaturedTitle] = useState('');
  const [featuredDescription, setFeaturedDescription] = useState('');
  const [contentStatus, setContentStatus] = useState('');

  // Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoFeatured, setVideoFeatured] = useState(false);
  const [videosList, setVideosList] = useState<any[]>([]);

  // Statistics State
  type StatItem = { label: string; value: string };
  const [statistics, setStatistics] = useState<StatItem[]>([]);
  const [heroStats, setHeroStats] = useState<StatItem[]>([]);

  // Contact State
  const [contactDescription, setContactDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactInstagram, setContactInstagram] = useState('');

  // Events empty state message
  const [eventsEmptyMessage, setEventsEmptyMessage] = useState('');
  const [eventsMessageStatus, setEventsMessageStatus] = useState('');

  const DEFAULT_STATISTICS: StatItem[] = [
    { label: 'CAREER POINTS', value: '368' },
    { label: 'CAREER ASSISTS', value: '197' },
    { label: 'CAREER GOALS', value: '171' },
    { label: 'NCAA NATIONAL CHAMPION', value: '1' },
    { label: 'ALL-AMERICAN', value: '2' },
    { label: 'BIG TEN CHAMPIONSHIPS', value: '3' },
    { label: 'ESPN SPORTSCENTER TOP 10', value: '4' },
  ];

  const DEFAULT_HERO_STATS: StatItem[] = [
    { label: 'POINTS', value: '368' },
    { label: 'GOALS', value: '171' },
    { label: 'ASSISTS', value: '197' },
    { label: 'ALL-AMER', value: '2' },
    { label: "NAT'L CHAMP", value: '1' },
    { label: 'ALL-B1G', value: '3' },
  ];

  const parseStatItems = (json: string | undefined, fallback: StatItem[]): StatItem[] => {
    if (!json) return fallback;
    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) return fallback;
      return parsed.map((item: any) => ({
        label: String(item.label ?? ''),
        value: String(item.value ?? ''),
      }));
    } catch {
      return fallback;
    }
  };

  const serializeStatItems = (items: StatItem[]) =>
    JSON.stringify(items.map(item => ({
      label: item.label,
      value: isNaN(Number(item.value)) ? item.value : Number(item.value),
    })));

  const [status, setStatus] = useState('');
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check if token exists in session storage on mount
    const savedToken = sessionStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/images`);
      const data = await res.json();
      setGalleryImages(data);
    } catch (err) {
      console.error('Failed to fetch images');
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/events`);
      const data = await res.json();
      setEventList(data);
    } catch (err) {
      console.error('Failed to fetch events');
    }
  };

  const fetchSiteContent = async () => {
    try {
      const res = await fetch(`${API_URL}/api/site-content`);
      const data = await res.json();
      const map: Record<string, string> = {};
      data.forEach((item: any) => { map[item.sectionKey] = item.content; });
      setAboutBio(map['about_bio'] || '');
      setAboutPlayingStyle(map['about_playingStyle'] || '');
      setAboutHighSchool(map['about_highSchool'] || '');
      setAboutPersonal(map['about_personal'] || '');
      setJourneyDescription(map['journey_description'] || '');
      setAchievementsDescription(map['achievements_description'] || '');
      setFeaturedYear(map['featured_year'] || '');
      setFeaturedTitle(map['featured_title'] || '');
      setFeaturedDescription(map['featured_description'] || '');
      setStatistics(parseStatItems(map['statistics'], DEFAULT_STATISTICS));
      setHeroStats(parseStatItems(map['hero_stats'], DEFAULT_HERO_STATS));
      setContactDescription(map['contact_description'] || 'For Skills Sessions, Private Groups, Team Training, Camps/Clinics, and media requests, please use the form or reach out directly.');
      setContactEmail(map['contact_email'] || 'erincoykendalllax@gmail.com');
      setContactInstagram(map['contact_instagram'] || 'https://www.instagram.com/erincoykendall/?hl=en');
      setEventsEmptyMessage(map['events_empty_message'] || 'Updates will be posted here. Check back soon for upcoming events and appearances.');
    } catch (err) {
      console.error('Failed to fetch site content');
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setContentStatus('Saving content...');
    try {
      const res = await fetch(`${API_URL}/api/site-content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify([
          { sectionKey: 'about_bio', content: aboutBio },
          { sectionKey: 'about_playingStyle', content: aboutPlayingStyle },
          { sectionKey: 'about_highSchool', content: aboutHighSchool },
          { sectionKey: 'about_personal', content: aboutPersonal },
          { sectionKey: 'journey_description', content: journeyDescription },
          { sectionKey: 'achievements_description', content: achievementsDescription },
          { sectionKey: 'featured_year', content: featuredYear },
          { sectionKey: 'featured_title', content: featuredTitle },
          { sectionKey: 'featured_description', content: featuredDescription },
          { sectionKey: 'statistics', content: serializeStatItems(statistics) },
          { sectionKey: 'hero_stats', content: serializeStatItems(heroStats) },
          { sectionKey: 'contact_description', content: contactDescription },
          { sectionKey: 'contact_email', content: contactEmail },
          { sectionKey: 'contact_instagram', content: contactInstagram },
          { sectionKey: 'events_empty_message', content: eventsEmptyMessage },
        ])
      });
      if (res.ok) {
        setContentStatus('Content saved successfully!');
      } else {
        setContentStatus('Failed to save content. Token might be invalid.');
      }
    } catch (err) {
      setContentStatus('Error connecting to server.');
    }
  };

  const handleSaveEventsMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setEventsMessageStatus('Saving message...');
    try {
      const res = await fetch(`${API_URL}/api/site-content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify([
          { sectionKey: 'events_empty_message', content: eventsEmptyMessage },
        ])
      });
      if (res.ok) {
        setEventsMessageStatus('Empty state message saved!');
      } else {
        setEventsMessageStatus('Failed to save message. Token might be invalid.');
      }
    } catch {
      setEventsMessageStatus('Error connecting to server.');
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/videos`);
      const data = await res.json();
      setVideosList(data);
    } catch (err) {
      console.error('Failed to fetch videos');
    }
  };

  const submitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl) return alert('Provide a YouTube URL first.');
    setStatus('Submitting video...');
    try {
      const res = await fetch(`${API_URL}/api/videos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: videoTitle,
          youtubeUrl: videoUrl,
          duration: videoDuration || '03:00',
          featured: videoFeatured
        })
      });
      if (res.ok) {
        setStatus('Video added successfully!');
        setVideoTitle('');
        setVideoUrl('');
        setVideoDuration('');
        setVideoFeatured(false);
        fetchVideos();
      } else {
        setStatus('Failed to publish video. Token might be invalid.');
      }
    } catch (err) {
      setStatus('Error connecting to database.');
    }
  };

  const handleDeleteVideo = async (id: string | number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      const res = await fetch(`${API_URL}/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setVideosList(videosList.filter(v => v.id !== id));
        setStatus('Video deleted successfully!');
      } else {
        setStatus('Failed to delete video.');
      }
    } catch (err) {
      setStatus('Error connecting to database.');
    }
  };

  const updateStatItem = (
    items: StatItem[],
    setter: (items: StatItem[]) => void,
    index: number,
    field: 'label' | 'value',
    value: string
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setter(updated);
  };

  useEffect(() => {
    if (activeTab === 'gallery') {
      fetchImages();
    } else if (activeTab === 'events') {
      fetchEvents();
      fetchSiteContent();
    } else if (activeTab === 'content') {
      fetchSiteContent();
    } else if (activeTab === 'videos') {
      fetchVideos();
    }
  }, [activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        alert(data.error || 'Invalid credentials');
      }
    } catch (err) {
      alert('Error connecting to database');
    }
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus('Updating password...');
    try {
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username: 'admin', oldPassword, newPassword })
      });
      const data = await res.json();
      
      if (res.ok) {
        setPasswordStatus('Password updated successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        setPasswordStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      setPasswordStatus('Error connecting to server.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventImageBase64) return alert('Select an image first.');
    setStatus('Submitting event...');
    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: eventTitle,
          date: eventDate,
          description: eventDescription,
          image: eventImageBase64
        })
      });
      if (res.ok) {
        setStatus('Event published successfully!');
        setEventTitle(''); setEventDate(''); setEventDescription(''); setEventImageBase64('');
        fetchEvents();
      } else {
        setStatus('Failed to publish event. Token might be invalid.');
      }
    } catch (err) {
      setStatus('Error connecting to database.');
    }
  };

  const submitImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageBase64) return alert('Select an image first.');
    
    setStatus('Uploading image...');
    try {
      const res = await fetch(`${API_URL}/api/images`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: imageTitle,
          base64Data: imageBase64
        })
      });
      if (res.ok) {
        setStatus('Image uploaded successfully!');
        setImageTitle('');
        setImageBase64('');
        fetchImages(); // Refresh the gallery
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatus(`Failed to upload: ${errData.error || 'Unknown Server Error'}`);
      }
    } catch (err: any) {
      setStatus(`Error connecting to database: ${err.message}`);
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    try {
      const res = await fetch(`${API_URL}/api/images/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setGalleryImages(galleryImages.filter(img => img.id !== id));
        setStatus('Image deleted successfully!');
      } else {
        setStatus('Failed to delete image.');
      }
    } catch (err) {
      setStatus('Error connecting to database.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setEventList(eventList.filter(ev => ev.id !== id));
        setStatus('Event deleted successfully!');
      } else {
        setStatus('Failed to delete event.');
      }
    } catch (err) {
      setStatus('Error connecting to database.');
    }
  };

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex w-full font-sans bg-white">
        {/* Left Side Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Link to="/" className="absolute top-6 left-6 z-10 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition backdrop-blur-sm">
            <ArrowLeft size={20} />
          </Link>
          <img 
            src="/gal/8.webp" 
            alt="Login Background" 
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-white text-black relative">
          
          <Link to="/" className="lg:hidden absolute top-6 left-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black rounded-full flex items-center justify-center transition">
            <ArrowLeft size={20} />
          </Link>

          <div className="w-full max-w-[440px]">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Welcome Back</h2>
            <p className="text-gray-500 mb-8">
              Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email/Username Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 block">Username or Email</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)} 
                  className="w-full bg-white border border-gray-300 rounded-lg p-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-gray-400"
                  placeholder="Username"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 block">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    className="w-full bg-white border border-gray-300 rounded-lg p-3.5 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-gray-400"
                    placeholder="Password"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline font-medium">Forgot password?</a>
              </div>

              <button 
                type="submit" 
                className="w-full bg-black text-white font-semibold py-3.5 rounded-lg hover:bg-gray-800 transition shadow-sm mt-4"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080D] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-display font-bold text-white uppercase tracking-tighter">Dashboard</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('events')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition", activeTab === 'events' ? "bg-accent text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}
          >
            <Calendar size={18} /> Upcoming Events
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition", activeTab === 'gallery' ? "bg-accent text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}
          >
            <ImageIcon size={18} /> Gallery
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition", activeTab === 'content' ? "bg-accent text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}
          >
            <FileText size={18} /> Content
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition", activeTab === 'videos' ? "bg-accent text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}
          >
            <Play size={18} /> Videos
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={cn("w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition", activeTab === 'security' ? "bg-accent text-white" : "text-white/60 hover:bg-white/5 hover:text-white")}
          >
            <Shield size={18} /> Security
          </button>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider text-white/60 hover:bg-white/5 hover:text-white transition">
            <LayoutDashboard size={18} /> View Site
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider text-red-400 hover:bg-red-400/10 transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        
        {status && ['events', 'gallery', 'videos'].includes(activeTab) && <div className="bg-accent/20 border border-accent text-white p-4 rounded mb-8 font-bold">{status}</div>}
        {contentStatus && activeTab === 'content' && <div className="bg-accent/20 border border-accent text-white p-4 rounded mb-8 font-bold">{contentStatus}</div>}
        {eventsMessageStatus && activeTab === 'events' && <div className="bg-accent/20 border border-accent text-white p-4 rounded mb-8 font-bold">{eventsMessageStatus}</div>}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="max-w-2xl bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><Calendar className="text-accent" /> Empty Events Message</h2>
              <p className="text-white/50 text-sm mb-6">This message is shown on the public site when no upcoming events have been added yet.</p>
              <form onSubmit={handleSaveEventsMessage} className="space-y-4">
                <textarea
                  value={eventsEmptyMessage}
                  onChange={e => setEventsEmptyMessage(e.target.value)}
                  className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-24 focus:outline-none focus:border-accent"
                  placeholder="Updates will be posted here..."
                />
                <button type="submit" className="bg-accent text-white font-bold uppercase tracking-wider px-6 py-3 rounded hover:bg-accent-hover transition">Save Message</button>
              </form>
            </div>

            <div className="max-w-2xl bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Calendar className="text-accent" /> Add Upcoming Event</h2>
              <form onSubmit={submitEvent} className="space-y-4">
                <input required type="text" placeholder="Event Title" value={eventTitle} onChange={e => setEventTitle(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <input required type="text" placeholder="Event Date (e.g., Nov 24, 2026 @ 8PM EST)" value={eventDate} onChange={e => setEventDate(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <textarea required placeholder="Event description and details..." value={eventDescription} onChange={e => setEventDescription(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-32 focus:outline-none focus:border-accent" />
                
                <div className="pt-2">
                  <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Event Image</label>
                  <input required type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEventImageBase64)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white file:bg-accent file:border-none file:text-white file:px-4 file:py-2 file:rounded file:mr-4 file:cursor-pointer file:font-bold file:uppercase file:tracking-wider file:text-[11px]" />
                </div>
                
                {eventImageBase64 && <img src={eventImageBase64} alt="Preview" className="w-full h-48 object-cover rounded border border-white/10 mt-4" />}
                
                <button type="submit" className="w-full bg-accent text-white font-bold uppercase tracking-wider p-3 rounded hover:bg-accent-hover transition mt-6">Publish Event</button>
              </form>
            </div>

            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Calendar className="text-accent" /> Manage Existing Events</h2>
              {eventList.length === 0 ? (
                <p className="text-white/50">No events published yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {eventList.map((ev) => (
                    <div key={ev.id} className="relative group rounded overflow-hidden border border-white/10 aspect-video bg-black/50">
                      {ev.image ? (
                        <img src={ev.image} alt={ev.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-50" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20"><Calendar size={32} /></div>
                      )}
                      
                      {/* Delete Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                          title="Delete Event"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                        <p className="text-white text-xs font-bold truncate">{ev.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            <div className="max-w-2xl bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><ImageIcon className="text-accent" /> Upload Gallery Image</h2>
              <form onSubmit={submitImage} className="space-y-4">
                <input type="text" placeholder="Image Title (Optional)" value={imageTitle} onChange={e => setImageTitle(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <input required type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setImageBase64)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white file:bg-accent file:border-none file:text-white file:px-4 file:py-2 file:rounded file:mr-4 file:cursor-pointer file:font-bold file:uppercase file:tracking-wider file:text-[11px]" />
                {imageBase64 && <img src={imageBase64} alt="Preview" className="w-full h-48 object-cover rounded border border-white/10" />}
                <button type="submit" className="w-full bg-accent text-white font-bold uppercase tracking-wider p-3 rounded hover:bg-accent-hover transition mt-4">Upload Image</button>
              </form>
            </div>

            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><ImageIcon className="text-accent" /> Manage Existing Images</h2>
              {galleryImages.length === 0 ? (
                <p className="text-white/50">No images uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative group rounded overflow-hidden border border-white/10 aspect-video bg-black/50">
                      <img src={img.base64Data} alt={img.title || 'Gallery image'} className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-50" />
                      
                      {/* Delete Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleDeleteImage(img.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                          title="Delete Image"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {img.title && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                          <p className="text-white text-xs font-bold truncate">{img.title}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === 'content' && (
          <div className="max-w-3xl space-y-8">
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><FileText className="text-accent" /> Edit Site Content</h2>
            <p className="text-white/50 text-sm mb-8">Modify the text content displayed across the About, Journey, Achievements, Stats, and Get In Touch sections.</p>

            <form onSubmit={handleSaveContent} className="space-y-8">

              {/* About Section */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-6">Built Through Discipline (About)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Bio</label>
                    <textarea value={aboutBio} onChange={e => setAboutBio(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-32 focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Playing Style</label>
                    <textarea value={aboutPlayingStyle} onChange={e => setAboutPlayingStyle(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-24 focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">High School Highlights</label>
                    <textarea value={aboutHighSchool} onChange={e => setAboutHighSchool(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-24 focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Personal Background</label>
                    <textarea value={aboutPersonal} onChange={e => setAboutPersonal(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-24 focus:outline-none focus:border-accent" />
                  </div>
                </div>
              </div>

              {/* Journey Section */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-6">The Journey</h3>
                <div>
                  <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Journey Description</label>
                  <textarea value={journeyDescription} onChange={e => setJourneyDescription(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-32 focus:outline-none focus:border-accent" />
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-6">Achievements</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Section Description</label>
                    <textarea value={achievementsDescription} onChange={e => setAchievementsDescription(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-20 focus:outline-none focus:border-accent" />
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-4 font-bold">Featured Achievement</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Year</label>
                        <input type="text" value={featuredYear} onChange={e => setFeaturedYear(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                      </div>
                      <div>
                        <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Title</label>
                        <input type="text" value={featuredTitle} onChange={e => setFeaturedTitle(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Description</label>
                      <textarea value={featuredDescription} onChange={e => setFeaturedDescription(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-20 focus:outline-none focus:border-accent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Section */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">Stats Marquee</h3>
                <p className="text-white/50 text-sm mb-6">Edit the scrolling stats shown in the STATS section. Add or remove stat entries as needed.</p>
                <div className="space-y-3">
                  {statistics.map((stat, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <input
                        type="text"
                        value={stat.label}
                        onChange={e => updateStatItem(statistics, setStatistics, index, 'label', e.target.value)}
                        placeholder="Label (e.g. CAREER POINTS)"
                        className="flex-1 bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        value={stat.value}
                        onChange={e => updateStatItem(statistics, setStatistics, index, 'value', e.target.value)}
                        placeholder="Value"
                        className="w-28 bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent"
                      />
                      <button
                        type="button"
                        onClick={() => setStatistics(statistics.filter((_, i) => i !== index))}
                        className="p-3 text-red-400 hover:bg-red-400/10 rounded transition"
                        title="Remove stat"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setStatistics([...statistics, { label: '', value: '' }])}
                    className="flex items-center gap-2 text-accent hover:text-white text-sm font-bold uppercase tracking-wider transition"
                  >
                    <Plus size={16} /> Add Stat
                  </button>
                </div>
              </div>

              {/* Hero Career Stats */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-2">Hero Career Stats Card</h3>
                <p className="text-white/50 text-sm mb-6">Edit the 6 stat counts shown in the hero section career stats card.</p>
                <div className="space-y-3">
                  {heroStats.map((stat, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <input
                        type="text"
                        value={stat.label}
                        onChange={e => updateStatItem(heroStats, setHeroStats, index, 'label', e.target.value)}
                        placeholder="Label (e.g. POINTS)"
                        className="flex-1 bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        value={stat.value}
                        onChange={e => updateStatItem(heroStats, setHeroStats, index, 'value', e.target.value)}
                        placeholder="Value"
                        className="w-28 bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent"
                      />
                      <button
                        type="button"
                        onClick={() => setHeroStats(heroStats.filter((_, i) => i !== index))}
                        className="p-3 text-red-400 hover:bg-red-400/10 rounded transition"
                        title="Remove stat"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setHeroStats([...heroStats, { label: '', value: '' }])}
                    className="flex items-center gap-2 text-accent hover:text-white text-sm font-bold uppercase tracking-wider transition"
                  >
                    <Plus size={16} /> Add Stat
                  </button>
                </div>
              </div>

              {/* Get In Touch Section */}
              <div className="bg-white/5 p-8 rounded-xl border border-white/10">
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Section Description</label>
                    <textarea value={contactDescription} onChange={e => setContactDescription(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white h-24 focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Email Address</label>
                    <input type="email" value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                  </div>
                  <div>
                    <label className="block text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">Instagram URL</label>
                    <input type="url" value={contactInstagram} onChange={e => setContactInstagram(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-accent text-white font-bold uppercase tracking-wider p-4 rounded hover:bg-accent-hover transition text-lg">Save All Content</button>
            </form>
          </div>
        )}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && (
          <div className="space-y-8">
            <div className="max-w-2xl bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2"><Play className="text-accent" size={20} /> Add YouTube Video</h2>
              <form onSubmit={submitVideo} className="space-y-4">
                <input required type="text" placeholder="Video Title" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <input required type="url" placeholder="YouTube Video Link (e.g., https://www.youtube.com/watch?v=...)" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <input type="text" placeholder="Duration (e.g., 05:12)" value={videoDuration} onChange={e => setVideoDuration(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                
                <label className="flex items-center gap-3 text-white cursor-pointer select-none">
                  <input type="checkbox" checked={videoFeatured} onChange={e => setVideoFeatured(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-black/50" />
                  <span className="text-sm font-semibold">Set as Featured Video (Highlight on top of Videos page)</span>
                </label>

                <button type="submit" className="w-full bg-accent text-white font-bold uppercase tracking-wider p-3 rounded hover:bg-accent-hover transition mt-6">Publish Video</button>
              </form>
            </div>

            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-xl font-display font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Play className="text-accent" size={20} /> Manage Existing Videos</h2>
              {videosList.length === 0 ? (
                <p className="text-white/50">No dynamic videos published yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {videosList.map((video) => {
                    const ytId = getYouTubeId(video.youtubeUrl || '');
                    const thumb = video.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=600');
                    return (
                      <div key={video.id} className="relative group rounded overflow-hidden border border-white/10 aspect-video bg-black/50">
                        <img src={thumb} alt={video.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110 group-hover:opacity-50" />
                        
                        {/* Delete Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            type="button"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            title="Delete Video"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                          <p className="text-white text-xs font-bold truncate">
                            {video.featured && <span className="text-accent mr-1">[FEATURED]</span>}
                            {video.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="max-w-xl">
             <h2 className="text-2xl font-display font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-2"><Shield className="text-accent" /> Security Settings</h2>
             
             <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h3 className="text-lg font-bold text-white mb-2">Change Administrator Password</h3>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">Ensure your new password is strong. As a security measure, rate limits are applied to prevent brute-force attacks.</p>
              
              {passwordStatus && <div className="mb-6 p-4 bg-black/50 border border-accent text-sm font-bold text-accent rounded">{passwordStatus}</div>}
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <input required type="password" placeholder="Current Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <input required type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-black/50 border border-white/20 rounded p-3 text-white focus:outline-none focus:border-accent" />
                <button type="submit" className="w-full bg-accent text-white font-bold uppercase tracking-wider p-3 rounded hover:bg-accent-hover transition mt-4">Update Password</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
