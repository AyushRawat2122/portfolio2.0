import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import HoverDetail from "./HoverDetail";

const GitHubContributionGrid = ({
    username,
    showTotal = true,
    darkMode, // kept for compatibility; not used for styling
    className,
}) => {
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [weeks, setWeeks] = useState([]);
    const [total, setTotal] = useState(0);

    // Date range (last 365 days)
    const to = useMemo(() => new Date(), []);
    const from = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() - 365);
        return d;
    }, []);

    const token = useMemo(() => {
        const nodeToken =
            typeof process !== "undefined" ? process.env?.GITHUB_TOKEN : undefined;
        const viteToken =
            typeof import.meta !== "undefined"
                ? import.meta.env?.VITE_GITHUB_TOKEN
                : undefined;
        return nodeToken || viteToken || "";
    }, []);

    useEffect(() => {
        let aborted = false;
        const run = async () => {
            setLoading(true);
            setErr("");
            try {
                if (!token) throw new Error("Missing GitHub token");

                const query = `
          query($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }
        `;

                const variables = {
                    login: username,
                    from: from.toISOString(),
                    to: to.toISOString(),
                };

                const resp = await fetch("https://api.github.com/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ query, variables }),
                });

                if (!resp.ok) {
                    const text = await resp.text();
                    throw new Error(`GitHub GraphQL error: ${resp.status} ${text}`);
                }

                const json = await resp.json();

                if (json.errors?.length) {
                    throw new Error(json.errors.map((e) => e.message).join("; "));
                }

                const cal =
                    json?.data?.user?.contributionsCollection?.contributionCalendar;
                if (!cal) throw new Error("No contribution calendar found");

                if (!aborted) {
                    setWeeks(cal.weeks || []);
                    setTotal(cal.totalContributions || 0);
                }
            } catch (e) {
                console.error("[GH] Error", e);
                if (!aborted) setErr(e.message || "Failed to load contributions");
            } finally {
                if (!aborted) setLoading(false);
            }
        };

        run();
        return () => {
            aborted = true;
        };
    }, [username, token, from, to]);

    // Grid sizing
    const square = 15; // px
    const gap = 4; // px

    // Detect dark mode without new props (works with Tailwind's .dark or passed prop if present)
    const isDark = useMemo(() => {
        if (typeof document !== "undefined") {
            return document.documentElement.classList.contains("dark") || !!darkMode;
        }
        return !!darkMode;
    }, [darkMode]);

    // Light and dark palettes (legend + cell intensities)
    const grayScaleLight = ["#d1d5db", "#9ca3af", "#6b7280", "#4b5563", "#374151"];
    const grayScaleDark = ["#1f2937", "#334155", "#475569", "#64748b", "#94a3b8"]; // slate-ish for dark bg
    const scale = isDark ? grayScaleDark : grayScaleLight;

    // Flatten to compute max
    const allDays = useMemo(
        () => weeks.flatMap((w) => w.contributionDays || []),
        [weeks]
    );
    const maxCount = useMemo(
        () => Math.max(0, ...allDays.map((d) => d.contributionCount || 0)),
        [allDays]
    );

    const colorForCount = (count) => {
        // Darker "no activity" for dark mode instead of bright white
        if (count === 0) return isDark ? "#111827" /* gray-900 */ : "#f5f5f5";
        if (!maxCount) return scale[0];
        const idx = Math.min(4, Math.max(0, Math.floor((count / maxCount) * 4)));
        return scale[idx];
    };

    // Helper: label only when month changes at this week
    const monthAbbr = (iso) =>
        new Date(iso).toLocaleDateString(undefined, { month: "short" });
    const getMonthLabelAt = (wi) => {
        const firstDay = weeks[wi]?.contributionDays?.[0]?.date;
        if (!firstDay) return "";
        const thisM = new Date(firstDay).getMonth();
        const prevFirst = weeks[wi - 1]?.contributionDays?.[0]?.date;
        const prevM = prevFirst ? new Date(prevFirst).getMonth() : -1;
        return thisM !== prevM ? monthAbbr(firstDay) : "";
    };

    if (loading) {
        return (
            <div className={className}>
                <div className={`text-sm text-gray-600 dark:text-gray-300`}>
                    Loading contributions…
                </div>
            </div>
        );
    }
    if (err) {
        return (
            <div className={className}>
                <div className={`text-sm text-red-600 dark:text-red-300`}>
                    Error: {err}
                </div>
            </div>
        );
    }
    if (!weeks.length) {
        return (
            <div className={className}>
                <div className={`text-sm text-gray-600 dark:text-gray-300`}>
                    No contributions found.
                </div>
            </div>
        );
    }

    return (
        <div className={`w-full flex flex-col items-center ${className || ""}`}>
            <div className="overflow-x-auto overflow-y-visible pb-2 max-w-full">
                {/* Per-week columns: label + 7-day column, keeps perfect alignment */}
                <div className="flex" style={{ columnGap: `${gap}px`, gap }}>
                    {weeks.map((week, wi) => (
                        <div
                            key={`w-${wi}`}
                            className="flex flex-col items-center"
                            style={{ width: 15 }}
                        >
                            {/* Month label */}
                            <div
                                className="h-4 flex items-center justify-center"
                                style={{ width: 15 }}
                            >
                                {(() => {
                                    const label = getMonthLabelAt(wi);
                                    return label ? (
                                        <span className={`block text-[10px] pb-2 pl-0.5 text-gray-500 dark:text-gray-400`}>
                                            {label}
                                        </span>
                                    ) : null;
                                })()}
                            </div>

                            {/* 7-day column */}
                            <div
                                className="grid grid-rows-7"
                                style={{ rowGap: `4px` }}
                            >
                                {week.contributionDays.map((day, di) => {
                                    const count = day.contributionCount || 0;
                                    const color = colorForCount(count);
                                    const dateStr = new Date(day.date).toLocaleDateString(
                                        undefined,
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    );
                                    return (
                                        <HoverDetail
                                            key={`${wi}-${di}`}
                                            detail={`${count} contributions on ${dateStr}`}
                                        >
                                            <motion.div
                                                className="rounded-sm"
                                                style={{
                                                    width: 15,
                                                    height: 15,
                                                    backgroundColor: color,
                                                }}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    duration: 0.25,
                                                    delay: (wi * 7 + di) * 0.002,
                                                }}
                                                aria-label={`${count} contributions on ${dateStr}`}
                                                title=""
                                            />
                                        </HoverDetail>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-between w-full mt-4">
                {showTotal && (
                    <div className={`mt-2 text-sm text-gray-700 dark:text-gray-300`}>
                        Total contributions: {total.toLocaleString()}
                    </div>
                )}
                <div className="mt-3 flex items-center justify-center gap-2">
                    <span className={`text-xs text-gray-500 dark:text-gray-400`}>
                        Less
                    </span>
                    <div className="flex items-center gap-1">
                        {scale.map((c, i) => (
                            <span
                                key={i}
                                className="inline-block rounded"
                                style={{ width: 12, height: 12, backgroundColor: c }}
                            />
                        ))}
                    </div>
                    <span className={`text-xs text-gray-500 dark:text-gray-400`}>
                        More
                    </span>
                </div>
            </div>
        </div>
    );
};

export default GitHubContributionGrid;
