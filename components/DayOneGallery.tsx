import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, RefreshCw, Sparkles, Scan, Zap } from 'lucide-react';
import { TRANSLATIONS, FALLBACK_INSIGHTS } from '../constants';
import { Language, VisionAnalysisResponse } from '../types';
import { analyzeImage, getHumorStyleForImage } from '../services/visionAnalysis';
import { getCachedInsight, setCachedInsight } from '../utils/imageCache';

const IMAGES = [
    '/images/day-1/02057cdb-c576-4658-9853-1c0efa62ad5a.JPG',
    '/images/day-1/07cef934-bf43-4636-9f34-2fe4c972ce4d.JPG',
    '/images/day-1/0cc61055-8832-4115-9a0b-ee0e96536075.JPG',
    '/images/day-1/10a47bfb-b28e-4988-a9b6-51728b1afc1e.JPG',
    '/images/day-1/117a748e-21c5-439e-a893-c16d1912647f.JPG',
    '/images/day-1/24135536-ebfe-499c-9929-556d8db2dfcc.JPG',
    '/images/day-1/3acd42d2-0366-4264-8374-060447d945a1.JPG',
    '/images/day-1/6b5be185-82e2-4cfe-bd90-5636a3cf850b.JPG',
    '/images/day-1/IMG_2086.JPG',
    '/images/day-1/IMG_6640.JPG',
    '/images/day-1/IMG_7678.JPG',
    '/images/day-1/a46001a0-00a9-49c6-a4c7-8aeef112411c.JPG',
    '/images/day-1/a5cceff7-1933-4722-a8c8-2e1417d94d02.JPG',
    '/images/day-1/b28a5947-a7bd-43f8-857e-c243133ee11c.JPG',
    '/images/day-1/be2a3ff9-3873-4fc5-b81a-806e30364663.JPG',
    '/images/day-1/d8d77a44-9849-4d14-a448-673ab2b874e5.JPG',
    '/images/day-1/dea13fa2-93fa-493a-a029-9ad252a74846.JPG',
    '/images/day-1/f49c9fcf-db33-40d5-984d-a4fe7a7d7def.JPG',
];

// Real AI Vision Analysis (no more mock data!)

interface DayOneGalleryProps {
    lang: Language;
}

const DayOneGallery: React.FC<DayOneGalleryProps> = ({ lang }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const [isShuffling, setIsShuffling] = useState(false);

    // AI State
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResponse | null>(null);

    const t = TRANSLATIONS[lang];

    // Initialize with random images
    useEffect(() => {
        shuffleImages();
    }, []);

    const shuffleImages = () => {
        setIsShuffling(true);
        setTimeout(() => {
            const shuffled = [...IMAGES].sort(() => 0.5 - Math.random());
            setVisibleImages(shuffled.slice(0, 5));
            setIsShuffling(false);
        }, 300);
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        setAnalysisResult(null);

        const imageFilename = selectedImage.split('/').pop();
        console.log(`[Gallery] Analyzing: ${imageFilename} (${lang})`);

        try {
            // Check cache first
            const cached = getCachedInsight(selectedImage, lang);
            if (cached) {
                console.log(`[Gallery] Cache HIT for ${imageFilename}: "${cached.title}"`);
                // Add small delay for UX (feels more natural)
                await new Promise(resolve => setTimeout(resolve, 800));
                setAnalysisResult(cached);
                setIsAnalyzing(false);
                return;
            }

            console.log(`[Gallery] Cache MISS for ${imageFilename} - calling AI`);

            // Determine humor style based on image index (rotation)
            const imageIndex = IMAGES.indexOf(selectedImage);
            const humorStyle = getHumorStyleForImage(imageIndex);

            // Real AI vision analysis with timestamp for uniqueness
            const insight = await analyzeImage(selectedImage, lang, humorStyle);

            console.log(`[Gallery] AI returned for ${imageFilename}: "${insight.title}"`);

            // Cache the result
            setCachedInsight(selectedImage, lang, insight);
            setAnalysisResult(insight);

        } catch (error) {
            console.error(`[Gallery] Analysis failed for ${imageFilename}:`, error);
            // Fallback to graceful generic message
            setAnalysisResult(FALLBACK_INSIGHTS[lang]);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Handle language switching: check cache for new language
    useEffect(() => {
        if (selectedImage && analysisResult) {
            const cached = getCachedInsight(selectedImage, lang);
            if (cached) {
                setAnalysisResult(cached);
            } else {
                // Clear result, user must re-analyze in new language
                setAnalysisResult(null);
            }
        }
    }, [lang, selectedImage]);

    const closeLightbox = () => {
        setSelectedImage(null);
        setAnalysisResult(null);
        setIsAnalyzing(false);
    };

    return (
        <section id="gallery" className="py-12 sm:py-20 scroll-mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 sm:mb-16 gap-6">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 tracking-tight">{t.galleryTitle}</h2>
                        <p className="text-slate-500 max-w-2xl">
                            {t.gallerySubtitle}
                        </p>
                    </div>

                    <button
                        onClick={shuffleImages}
                        disabled={isShuffling}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 hover:text-brand-blue transition-all active:scale-95 shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
                        <span>{t.galleryShuffle}</span>
                    </button>
                </div>

                {/* Desktop "Living Grid" */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`hidden lg:flex h-[600px] gap-2 p-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden transition-opacity duration-300 ${isShuffling ? 'opacity-50' : 'opacity-100'}`}
                >
                    {visibleImages.map((src, idx) => (
                        <motion.div
                            key={`${src}-${idx}`}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="relative flex-1 hover:flex-[3] transition-all duration-500 ease-out group cursor-pointer rounded-2xl overflow-hidden"
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery image`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                                        <Sparkles className="w-3 h-3 text-yellow-300" />
                                        <span>{t.galleryAlfredReady}</span>
                                    </div>
                                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-slate-900">
                                        <Maximize2 className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mobile/Tablet Grid */}
                <div className={`lg:hidden grid grid-cols-2 md:grid-cols-3 gap-4 transition-opacity duration-300 ${isShuffling ? 'opacity-50' : 'opacity-100'}`}>
                    {visibleImages.map((src, idx) => (
                        <motion.div
                            key={`${src}-${idx}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="aspect-square relative rounded-xl overflow-hidden cursor-pointer active:scale-95 transition-transform"
                            onClick={() => setSelectedImage(src)}
                        >
                            <img
                                src={src}
                                alt={`Gallery image`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400 italic">{t.galleryExplore}</p>
                </div>

            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative rounded-lg overflow-hidden shadow-2xl group"
                            >
                                <img
                                    src={selectedImage}
                                    alt="Gallery Fullscreen"
                                    className="max-w-full max-h-[80vh] object-contain"
                                />

                                {/* AI Scanning Overlay */}
                                {isAnalyzing && (
                                    <div className="absolute inset-0 z-10 pointer-events-none">
                                        <div className="absolute inset-0 bg-brand-blue/10 animate-pulse"></div>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-white font-mono flex items-center gap-3 border border-white/10">
                                                <Sparkles className="w-5 h-5 text-brand-blue animate-spin" />
                                                {t.galleryAnalyzing}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* AI Result Overlay */}
                                {analysisResult && !isAnalyzing && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80"
                                    >
                                        <div className="bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-white/20">
                                            <div className="mb-3">
                                                <h3 className="text-lg font-bold text-slate-900">{analysisResult.title}</h3>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {analysisResult.tags.map((tag, i) => (
                                                    <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-sm text-slate-500 mt-3 italic leading-relaxed">
                                                {analysisResult.quip}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Controls */}
                            <div className="mt-6 flex items-center gap-4">
                                {!analysisResult && !isAnalyzing && (
                                    <button
                                        onClick={handleAnalyze}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-purple-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-brand-blue/25 transition-all active:scale-95 group"
                                    >
                                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                        {t.galleryAskAlfred}
                                    </button>
                                )}

                                {analysisResult && (
                                    <button
                                        onClick={handleAnalyze}
                                        className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-700 transition-all active:scale-95"
                                    >
                                        <RefreshCw className="w-4 h-4" />
                                        {t.galleryReAnalyze}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
        </section>
    );
};

export default DayOneGallery;
