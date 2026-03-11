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

const DEFAULT_PROFILE: UserDietaryProfile = {
    goal: 'Standard',
    allergies: [],
    dislikedIngredients: [],
};

// Singleton-style state for cross-component sync
let listeners: Array<(profile: UserDietaryProfile) => void> = [];
let currentProfile: UserDietaryProfile = DEFAULT_PROFILE;

// Initialize from localStorage on first import (client-side only)
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            currentProfile = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse dietary profile", e);
        }
    }
}

const updateProfile = (newProfile: UserDietaryProfile) => {
    currentProfile = newProfile;
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
    }
    listeners.forEach(l => l(currentProfile));
};

export const useDietaryStore = () => {
    const [profile, setProfileState] = useState<UserDietaryProfile>(currentProfile);

    useEffect(() => {
        const listener = (updatedProfile: UserDietaryProfile) => {
            setProfileState(updatedProfile);
        };
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    const setGoal = (goal: DietaryGoal) => {
        updateProfile({ ...currentProfile, goal });
    };

    const toggleAllergy = (allergy: string) => {
        const allergies = currentProfile.allergies.includes(allergy)
            ? currentProfile.allergies.filter(a => a !== allergy)
            : [...currentProfile.allergies, allergy];
        updateProfile({ ...currentProfile, allergies });
    };

    const setProfile = (profile: UserDietaryProfile) => {
        updateProfile(profile);
    };

    return {
        profile,
        setGoal,
        toggleAllergy,
        setProfile
    };
};
