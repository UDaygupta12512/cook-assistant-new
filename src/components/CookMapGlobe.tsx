"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

// Generate random points for "Real-time" recipe generation pings
const N = 20;

const COLORS = ['#ff4d4d', '#ff9933', '#10b981', '#3b82f6', '#8b5cf6'];

interface Ping {
    lat: number;
    lng: number;
    size: number;
    color: string;
    label: string;
    dish: string;
}

const DISHES = [
    "Paneer Tikka - New Delhi",
    "Pasta Carbonara - Rome",
    "Spicy Tuna Roll - Tokyo",
    "Tacos al Pastor - Mexico City",
    "Croissant - Paris",
    "Poutine - Montreal",
    "Beef Wellington - London",
    "Pad Thai - Bangkok",
    "Dim Sum - Hong Kong",
    "Feijoada - Rio de Janeiro"
];

function generateRandomPings(count: number): Ping[] {
    return Array.from({ length: count }).map(() => ({
        lat: (Math.random() - 0.5) * 160,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        label: "AI Recipe Generated",
        dish: DISHES[Math.floor(Math.random() * DISHES.length)]
    }));
}

function rollPings(previous: Ping[]): Ping[] {
    const newPing = generateRandomPings(1)[0];
    return [...previous.slice(1), newPing];
}

export default function CookMapGlobe() {
    const globeEl = useRef<GlobeMethods | undefined>(undefined);
    const [pings, setPings] = useState<Ping[]>(() => generateRandomPings(N));

    useEffect(() => {
        // Setup simple auto-rotation
        const controls = globeEl.current?.controls?.();
        if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.0;
        }

        // Periodically add new pings taking away old ones to simulate real-time
        const interval = window.setInterval(() => {
            setPings((prev) => rollPings(prev));
        }, 3000);

        return () => window.clearInterval(interval);
    }, []);

    // Dark theme globe options
    return (
        <div className="w-full h-[600px] flex items-center justify-center rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.3)] border-2 border-primary/20 bg-black/90">
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundColor="rgba(0,0,0,0)"

                // Rings (Pings)
                ringsData={pings}
                ringColor={(d: object) => (d as Ping).color}
                ringMaxRadius={(d: object) => (d as Ping).size * 5}
                ringPropagationSpeed={(d: object) => (d as Ping).size * 2}
                ringRepeatPeriod={(d: object) => (d as Ping).size * 1000}

                // Labels (Popups when hovering)
                labelsData={pings}
                labelLat={(d: object) => (d as Ping).lat}
                labelLng={(d: object) => (d as Ping).lng}
                labelText={(d: object) => {
                    const ping = d as Ping;
                    return `${ping.label}: ${ping.dish}`;
                }}
                labelSize={() => 1.5}
                labelDotRadius={0.5}
                labelColor={() => 'white'}
                labelResolution={2}
            />
        </div>
    );
}
