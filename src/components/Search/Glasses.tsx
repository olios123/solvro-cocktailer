// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
//
// function Glasses() {
//     const [glasses, setGlasses] = useState<string[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     useEffect(() => {
//         axios.get("https://cocktails.solvro.pl/api/v1/cocktails/glasses")
//             .then(res => setGlasses(res.data.data))
//             .catch(err => console.log(err))
//             .finally(() => setLoading(false));
//     }, []);
//
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//
//     return (
//         <>
//             {glasses.map((glass) => (
//                 <p key={glass}>{glass}</p>
//             ))}
//         </>
//     );
// }
//
// export default Glasses;

import React, { useEffect, useState } from "react";
import axios from "axios";

interface GlassesProps {
    onSelectGlass: (glass: string) => void;
}

export default function Glasses({ onSelectGlass }: GlassesProps) {
    const [glasses, setGlasses] = useState<string[]>([]);
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        axios.get("https://cocktails.solvro.pl/api/v1/cocktails/glasses")
            .then(res => setGlasses(res.data.data))
            .catch(err => console.log(err))
            // .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {glasses.map((glass) => (
                <p
                    key={glass}
                    onClick={() => {
                        if (active == glass) {
                            setActive("");
                            onSelectGlass("");
                        } else {
                            setActive(glass);
                            onSelectGlass(glass);
                        }
                    }}
                    className={`${
                        active === glass
                            ? "selected"
                            : ""
                    }`}
                >
                    {glass}
                </p>
            ))}
        </>
    );
}

