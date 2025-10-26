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

    // TODO broken
    const getVisiblePages = () => {
        const pages: (number | string)[] = [];

        // Zawsze pokazujemy pierwszą stronę
        pages.push(1);

        // Jeśli jest przerwa po pierwszej
        if (currentPage > 3) pages.push("...");

        // Poprzednia, aktualna, następna
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < lastPage) pages.push(i);
        }

        // Jeśli jest przerwa przed ostatnią
        if (currentPage < lastPage - 2) pages.push("...");

        // Zawsze pokazujemy ostatnią stronę
        if (lastPage > 1) pages.push(lastPage);

        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex flex-col items-center mt-4 gap-2">
            <ol className="flex gap-2 justify-center">
                {/* Poprzednia */}
                <li>
                    <button
                        onClick={() => onChangePage(currentPage - 1)}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        <i className="fi fi-sr-angle-small-left"></i> Poprzednia
                    </button>
                </li>

                {/* Numery stron */}
                {visiblePages.map((p, i) =>
                    p === "..." ? (
                        <li key={`dots-${i}`} className="px-2 text-gray-500">
                            ...
                        </li>
                    ) : (
                        <li key={p}>
                            <button
                                onClick={() => onChangePage(p as number)}
                                className={`px-3 py-1 rounded ${
                                    p === currentPage
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                {p}
                            </button>
                        </li>
                    )
                )}

                {/* Następna */}
                <li>
                    <button
                        onClick={() => onChangePage(currentPage + 1)}
                        disabled={currentPage >= lastPage}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Następna <i className="fi fi-sr-angle-small-right"></i>
                    </button>
                </li>
            </ol>

            <p className="text-sm text-gray-600">
                Showing {firstCocktail}-{lastCocktail} of {meta.total}
            </p>
        </div>
    );
}