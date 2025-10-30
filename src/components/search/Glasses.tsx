import React, { useEffect, useState } from "react";
import axios from "axios";

interface GlassesProps {
    onSelectGlass: (glass: string) => void;
}

export default function Glasses({ onSelectGlass }: GlassesProps) {
    // Reading and settings glasses filter options
    const [glasses, setGlasses] = useState<string[]>([]);
    // Changning active glasses as filter options
    const [active, setActive] = useState<string>("");

    // GET from Solvro API - glasses of cocktails
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

