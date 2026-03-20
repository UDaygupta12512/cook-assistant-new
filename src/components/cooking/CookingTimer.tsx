"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Bell, Volume2, VolumeX } from "lucide-react";

interface CookingTimerProps {
    defaultMinutes?: number;
    label?: string;
    onComplete?: () => void;
}

export function CookingTimer({ defaultMinutes = 5, label = "Timer", onComplete }: CookingTimerProps) {
    const [totalSeconds, setTotalSeconds] = useState(defaultMinutes * 60);
    const [initialSeconds, setInitialSeconds] = useState(defaultMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const playAlarm = useCallback(() => {
        if (typeof window === "undefined") return;

        type WindowWithWebkitAudio = Window & typeof globalThis & {
            webkitAudioContext?: typeof AudioContext;
        };

        const AudioContextCtor = window.AudioContext || (window as WindowWithWebkitAudio).webkitAudioContext;
        if (!AudioContextCtor) return;

        const audioContext = new AudioContextCtor();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = "sine";
        gainNode.gain.value = 0.3;

        oscillator.start();
        window.setTimeout(() => {
            oscillator.stop();
            void audioContext.close();
        }, 500);
    }, []);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

        if (isRunning && totalSeconds > 0) {
            interval = setInterval(() => {
                setTotalSeconds((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setIsComplete(true);
                        if (!isMuted) {
                            playAlarm();
                        }
                        onComplete?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, totalSeconds, isMuted, onComplete, playAlarm]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleReset = () => {
        setIsRunning(false);
        setTotalSeconds(defaultMinutes * 60);
        setInitialSeconds(defaultMinutes * 60);
        setIsComplete(false);
    };

    const adjustTime = (delta: number) => {
        if (!isRunning) {
            setTotalSeconds((prev) => Math.max(0, prev + delta));
            setInitialSeconds((prev) => Math.max(0, prev + delta));
        }
    };

    const progress = initialSeconds > 0 ? ((initialSeconds - totalSeconds) / initialSeconds) * 100 : 0;

    return (
        <div className={`relative p-6 rounded-2xl border ${isComplete ? 'bg-green-50 border-green-300 dark:bg-green-900/20' : 'bg-white dark:bg-zinc-900 border-border'} shadow-lg`}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 right-0 bg-primary/10 transition-all duration-1000"
                    style={{ height: `${progress}%` }}
                />
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-muted-foreground">{label}</span>
                    <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        aria-label={isMuted ? "Unmute timer alarm" : "Mute timer alarm"}
                        title={isMuted ? "Unmute timer alarm" : "Mute timer alarm"}
                        className="p-1.5 rounded-full hover:bg-secondary transition-colors"
                    >
                        {isMuted ? (
                            <VolumeX className="w-4 h-4 text-muted-foreground" />
                        ) : (
                            <Volume2 className="w-4 h-4 text-muted-foreground" />
                        )}
                    </button>
                </div>

                <div className="text-center mb-6">
                    <div className={`text-5xl font-bold font-mono ${isComplete ? 'text-green-600 animate-pulse' : 'text-foreground'}`}>
                        {formatTime(totalSeconds)}
                    </div>
                    {isComplete && (
                        <div className="flex items-center justify-center gap-2 mt-2 text-green-600">
                            <Bell className="w-5 h-5 animate-bounce" />
                            <span className="font-medium">Time&apos;s up!</span>
                        </div>
                    )}
                </div>

                {!isRunning && !isComplete && (
                    <div className="flex justify-center gap-2 mb-4">
                        <button type="button" onClick={() => adjustTime(-60)} className="px-3 py-1 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                            -1m
                        </button>
                        <button type="button" onClick={() => adjustTime(-10)} className="px-3 py-1 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                            -10s
                        </button>
                        <button type="button" onClick={() => adjustTime(10)} className="px-3 py-1 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                            +10s
                        </button>
                        <button type="button" onClick={() => adjustTime(60)} className="px-3 py-1 text-sm bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                            +1m
                        </button>
                    </div>
                )}

                <div className="flex justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            if (!isRunning && !isComplete) {
                                // Capture the starting seconds when the timer begins
                                setInitialSeconds(totalSeconds);
                            }
                            setIsRunning(!isRunning);
                        }}
                        disabled={totalSeconds === 0 && !isComplete}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all shadow-md hover:shadow-lg ${isRunning
                                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isRunning ? (
                            <>
                                <Pause className="w-5 h-5" />
                                Pause
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5" />
                                {isComplete ? 'Start Again' : 'Start'}
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        aria-label="Reset timer"
                        title="Reset timer"
                        className="flex items-center gap-2 px-4 py-3 rounded-full bg-secondary hover:bg-secondary/80 font-medium transition-all"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
