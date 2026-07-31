"use client";

import { useState, useEffect } from 'react';

/**
 * ZUSTAND-FREE DIETARY STORE
 * This uses native React state and LocalStorage to manage dietary profiles
 * without requiring external dependencies like 'zustand'.
 */

export type DietaryGoal = 'Keto' | 'High Protein' | 'Low Carb' | 'Vegan' | 'Vegetarian' | 'Paleo' | 'Standard';

export interface UserDietaryProfile {
    goal: DietaryGoal;
    allergies: string[];
    dislikedIngredients: string[];
}

const STORAGE_KEY = 'cook-dietary-profile';
const VALID_GOALS: DietaryGoal[] = ['Keto', 'High Protein', 'Low Carb', 'Vegan', 'Vegetarian', 'Paleo', 'Standard'];

const DEFAULT_PROFILE: UserDietaryProfile = {
    goal: 'Standard',
    allergies: [],
    dislikedIngredients: [],
};

// Validate profile data structure
function isValidProfile(profile: unknown): profile is UserDietaryProfile {
    if (!profile || typeof profile !== 'object') return false;
    const p = profile as Partial<UserDietaryProfile>;

    if (!p.goal || !VALID_GOALS.includes(p.goal as DietaryGoal)) return false;
    if (!Array.isArray(p.allergies) || !p.allergies.every(a => typeof a === 'string')) return false;
    if (!Array.isArray(p.dislikedIngredients) || !p.dislikedIngredients.every(d => typeof d === 'string')) return false;

    return true;
}

// Safely load profile from localStorage
function loadProfileFromStorage(): UserDietaryProfile {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return DEFAULT_PROFILE;

        const parsed = JSON.parse(saved);
        if (isValidProfile(parsed)) {
            return parsed;
        }
        console.warn('Invalid profile data in localStorage, using default');
        return DEFAULT_PROFILE;
    } catch (e) {
        console.error("Failed to parse dietary profile", e);
        return DEFAULT_PROFILE;
    }
}

// Singleton-style state for cross-component sync
let listeners: Array<(profile: UserDietaryProfile) => void> = [];
let currentProfile: UserDietaryProfile = loadProfileFromStorage();

// Safely save to localStorage with quota handling
function saveProfileToStorage(profile: UserDietaryProfile): boolean {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        return true;
    } catch (e) {
        if (e instanceof Error && e.name === 'QuotaExceededError') {
            console.error('localStorage quota exceeded. Cannot save dietary profile.');
        } else {
            console.error('Failed to save dietary profile:', e);
        }
        return false;
    }
}

const updateProfile = (newProfile: UserDietaryProfile) => {
    // Validate before updating
    if (!isValidProfile(newProfile)) {
        console.error('Invalid profile update attempt, ignoring');
        return;
    }

    currentProfile = { ...newProfile }; // Deep copy to avoid mutations
    saveProfileToStorage(currentProfile);

    // Notify all listeners in next tick to avoid state update during render
    setTimeout(() => {
        listeners.forEach(l => {
            try {
                l(currentProfile);
            } catch (err) {
                console.error('Error in dietary profile listener:', err);
            }
        });
    }, 0);
};

export const useDietaryStore = () => {
    const [profile, setProfileState] = useState<UserDietaryProfile>(() => currentProfile);

    useEffect(() => {
        const listener = (updatedProfile: UserDietaryProfile) => {
            setProfileState({ ...updatedProfile }); // Ensure new reference for React updates
        };
        listeners.push(listener);

        // Sync with current profile on mount
        setProfileState({ ...currentProfile });

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    const setGoal = (goal: DietaryGoal) => {
        if (!VALID_GOALS.includes(goal)) {
            console.error(`Invalid goal: ${goal}`);
            return;
        }
        updateProfile({ ...currentProfile, goal });
    };

    const toggleAllergy = (allergy: string) => {
        if (!allergy || typeof allergy !== 'string') return;

        const normalizedAllergy = allergy.trim();
        if (!normalizedAllergy) return;

        const allergies = currentProfile.allergies.includes(normalizedAllergy)
            ? currentProfile.allergies.filter(a => a !== normalizedAllergy)
            : [...currentProfile.allergies, normalizedAllergy];
        updateProfile({ ...currentProfile, allergies });
    };

    const addDislikedIngredient = (ingredient: string) => {
        if (!ingredient || typeof ingredient !== 'string') return;

        const normalized = ingredient.trim();
        if (!normalized || currentProfile.dislikedIngredients.includes(normalized)) return;

        updateProfile({
            ...currentProfile,
            dislikedIngredients: [...currentProfile.dislikedIngredients, normalized]
        });
    };

    const removeDislikedIngredient = (ingredient: string) => {
        updateProfile({
            ...currentProfile,
            dislikedIngredients: currentProfile.dislikedIngredients.filter(d => d !== ingredient)
        });
    };

    const setProfile = (profile: UserDietaryProfile) => {
        if (!isValidProfile(profile)) {
            console.error('Invalid profile provided');
            return;
        }
        updateProfile(profile);
    };

    const resetProfile = () => {
        updateProfile(DEFAULT_PROFILE);
    };

    return {
        profile,
        setGoal,
        toggleAllergy,
        addDislikedIngredient,
        removeDislikedIngredient,
        setProfile,
        resetProfile
    };
};
