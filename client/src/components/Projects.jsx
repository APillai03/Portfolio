import './project.css';
import React, { useEffect, useRef, useState } from 'react';

function Project() {
    const timelineRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState({});

    // Reveal on scroll
    useEffect(() => {
        const root = timelineRef.current;
        if (!root) return;
        const items = Array.from(root.querySelectorAll('.container'));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );
        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [projects]);

    // Fetch projects from API
    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json();
                if (!cancelled && Array.isArray(data)) {
                    setProjects(data);
                }
            } catch (e) {
                console.error('Failed to load projects', e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className='Projects' id="projects">
            <div className="cover">
                <h1>Project Timeline</h1>
                <p className="cover-sub">A chronological view of selected work</p>
            </div>

            <div className="Timeline" ref={timelineRef}>
                {loading && (
                    <div style={{ textAlign: 'center', padding: '24px', opacity: 0.7 }}>Loading projects…</div>
                )}
                {!loading && projects.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '24px', opacity: 0.7 }}>No projects found.</div>
                )}
                {!loading && projects.map((p, idx) => {
                    const side = idx % 2 === 0 ? 'left-container' : 'right-container';
                    const href = p.url || p.repoUrl || p.link || '';
                    const idKey = p._id || p.id || idx;
                    const isOpen = !!expanded[idKey];
                    const isRight = side === 'right-container';
                    const name = p.name || p.projectName || p.client || p.company || p.title || 'Project';
                    const title = p.title || p.role || '';

                    const toggle = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setExpanded((prev) => ({ ...prev, [idKey]: !prev[idKey] }));
                    };
                    

                    return (
                        <div className={`container ${side} reveal`} key={idKey}>
                            <div className="pointer"></div>
                            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
                                {/* Desktop Row: Date | Title | +/-  (hidden on mobile via CSS) */}
                                <div className="header-row" style={{ alignItems: 'center', gap: 10, minWidth: 0 }}>
                                    {(p.date || p.dateLabel) && (
                                        <div className="date" style={{ whiteSpace: 'nowrap', opacity: 0.85, flex: '0 0 auto', width: 'auto', order: isRight ? 1 : 1 }}>
                                            {p.date || p.dateLabel}
                                        </div>
                                    )}
                                    {title && (
                                        <div
                                            className="title"
                                            style={{
                                                flex: '1 1 auto',
                                                minWidth: 0,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                width: 'auto',
                                                order: isRight ? 2 : 2
                                            }}
                                            title={title}
                                        >
                                            {title}
                                        </div>
                                    )}
                                    <button
                                        onClick={toggle}
                                        aria-expanded={isOpen}
                                        aria-label={isOpen ? 'Collapse project' : 'Expand project'}
                                        className="expand-toggle"
                                        style={{
                                            border: '1px solid rgba(0,0,0,0.15)',
                                            background: 'linear-gradient(180deg, #fff, #f5f5f5)',
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            fontSize: 18,
                                            lineHeight: '30px',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                                            order: isRight ? 0 : 3,
                                            marginLeft: isRight ? 8 : 'auto',
                                            marginRight: isRight ? 10 : 8
                                        }}
                                    >
                                        <span style={{
                                            display: 'inline-block',
                                            fontWeight: 600,
                                            transform: 'translateY(-1px)'
                                        }}>
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </button>
                                </div>

                                {/* Mobile: +/- on left, then Date and Title */}
                                <div className="header-mobile" style={{ alignItems: 'center', justifyContent: 'flex-start', padding: '6px 8px', gap: 8 }}>
                                    <button
                                        onClick={toggle}
                                        aria-expanded={isOpen}
                                        aria-label={isOpen ? 'Collapse project' : 'Expand project'}
                                        className="expand-toggle"
                                        style={{
                                            border: '1px solid rgba(0,0,0,0.15)',
                                            background: 'linear-gradient(180deg, #fff, #f5f5f5)',
                                            width: 32,
                                            height: 32,
                                            borderRadius: 16,
                                            fontSize: 18,
                                            lineHeight: '30px',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.08)'
                                        }}
                                    >
                                        <span style={{ display: 'inline-block', fontWeight: 600, transform: 'translateY(-1px)' }}>
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </button>

                                    {(p.date || p.dateLabel) && (
                                        <div className="date" style={{ whiteSpace: 'nowrap', opacity: 0.85, flex: '0 0 auto' }}>
                                            {p.date || p.dateLabel}
                                        </div>
                                    )}
                                    {title && (
                                        <div
                                            className="title"
                                            style={{
                                                flex: '1 1 auto',
                                                minWidth: 0,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                            title={title}
                                        >
                                            {title}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isOpen && (
                                <div className="content">
                                    {/* Preserve existing fields when expanded */}
                                    <div className="description">
                                        {/* Show name prominently in expanded view if available */}
                                        {name && (
                                            <div style={{ fontWeight: 600, marginBottom: 6 }}>{name}</div>
                                        )}
                                        <p>{p.description || ''}</p>
                                        {href && (
                                            <div style={{ marginTop: 12 }}>
                                                <a href={href} target="_blank" rel="noreferrer" className="open-link">Open ↗</a>
                                            </div>
                                        )}
                                    </div>
                                    {p.imageUrl && (
                                        <div className="picture">
                                            <img src={p.imageUrl} />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>


        </div>
    )
};
export default Project;