import React from 'react';

export default function Footer()
{
    return (
        <footer>
            <p>
                Drink responsibly • It is not recommended to drink during classes at Wrocław University of Science and Technology.
            </p>
            <p>
                Oliwier Kądziołka &copy; {new Date().getFullYear()} for Solvro
            </p>
        </footer>
    )
}