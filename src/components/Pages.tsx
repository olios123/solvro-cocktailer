import React from 'react';

interface Meta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl: string;
    lastPageUrl: string;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
}

interface PagesProps {
    meta: Meta;
    onChangePage: (page: number) => void;
}

export default function Pages({ meta, onChangePage }: PagesProps) {
    const currentPage = Number(meta.currentPage);
    const lastPage = Number(meta.lastPage);

    const firstCocktail = (meta.currentPage - 1) * meta.perPage + 1;
    let lastCocktail = meta.currentPage * meta.perPage;
    if (lastCocktail > meta.total) lastCocktail = meta.total;

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];

        // Always show 1-st page
        pages.push(1);

        // Ip space after frist
        if (currentPage > 3) pages.push("...");

        // Previous, current, next
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < lastPage) pages.push(i);
        }

        // If space before last
        if (currentPage < lastPage - 2) pages.push("...");

        // Always show last page
        if (lastPage > 1) pages.push(lastPage);

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="page-list">
            <ol>
                {visiblePages.map((p, i) =>
                    p === "..." ? (
                        <li key={`dots-${i}`}>
                            ...
                        </li>
                    ) : (
                        <li key={p}>
                            <button
                                onClick={() => onChangePage(p as number)}
                                className={`${
                                    p === currentPage ? "current" : ""
                                }`}
                            >
                                {p}
                            </button>
                        </li>
                    )
                )}
            </ol>

            <p className="text-sm text-gray-600">
                Showing {firstCocktail}-{lastCocktail} of {meta.total}
            </p>
        </div>
    );
}