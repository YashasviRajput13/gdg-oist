import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
    playSound: (soundType: 'hover' | 'click' | 'success' | 'transition') => void;
    startMusic: () => void;
    stopMusic: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUND_URLS = {
    hover: 'https://cdn.pixabay.com/audio/2022/03/24/audio_805cb7e4c8.mp3', // Soft blip
    click: 'https://cdn.pixabay.com/audio/2022/03/10/audio_d8dbe06c94.mp3', // Light tap
    success: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c507e0c80a.mp3', // Subtle chime
    transition: 'https://cdn.pixabay.com/audio/2022/03/15/audio_4d85046c0a.mp3', // Soft whoosh
};

const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/02/22/audio_d1718ab41b.mp3'; // Calm ambient loop

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem('gdg_sound_muted');
        return saved ? JSON.parse(saved) : false;
    });

    const [audioCache] = useState<Record<string, HTMLAudioElement>>({});
    const musicRef = React.useRef<HTMLAudioElement | null>(null);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);

    useEffect(() => {
        // Preload sounds
        Object.entries(SOUND_URLS).forEach(([key, url]) => {
            const audio = new Audio(url);
            audio.preload = 'auto';
            audioCache[key] = audio;
        });

        // Setup music
        const music = new Audio(MUSIC_URL);
        music.loop = true;
        music.volume = 0.15; // Low background volume
        music.preload = 'auto';
        musicRef.current = music;

        return () => {
            if (musicRef.current) {
                musicRef.current.pause();
                musicRef.current = null;
            }
        };
    }, [audioCache]);

    // Handle mute state changes for music
    useEffect(() => {
        if (musicRef.current) {
            musicRef.current.muted = isMuted;
            if (!isMuted && isMusicPlaying) {
                musicRef.current.play().catch(() => {
                    console.debug('Music play blocked by browser on mute toggle');
                });
            }
        }
    }, [isMuted, isMusicPlaying]);

    const toggleMute = useCallback(() => {
        setIsMuted((prev: boolean) => {
            const newState = !prev;
            localStorage.setItem('gdg_sound_muted', JSON.stringify(newState));
            return newState;
        });
    }, []);

    const playSound = useCallback((soundType: keyof typeof SOUND_URLS) => {
        if (isMuted) return;

        const audio = audioCache[soundType];
        if (audio) {
            const playInstance = audio.cloneNode() as HTMLAudioElement;
            playInstance.volume = 0.3;
            playInstance.play().catch(() => {
                console.debug('Audio playback blocked by browser');
            });
        }
    }, [isMuted, audioCache]);

    const startMusic = useCallback(() => {
        if (musicRef.current && !isMusicPlaying) {
            setIsMusicPlaying(true);
            musicRef.current.play().catch(() => {
                console.debug('Initial music playback blocked by browser');
            });
        }
    }, [isMusicPlaying]);

    const stopMusic = useCallback(() => {
        if (musicRef.current && isMusicPlaying) {
            setIsMusicPlaying(false);
            musicRef.current.pause();
        }
    }, [isMusicPlaying]);

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute, playSound, startMusic, stopMusic }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useSound must be used within a SoundProvider');
    }
    return context;
};
