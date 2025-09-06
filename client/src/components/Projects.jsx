import './project.css';
import React, { useEffect, useRef, useState } from 'react';

function Project() {
    const timelineRef = useRef(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    const href = p.url || p.repoUrl || p.link || '#';
                    return (
                        <div className={`container ${side} reveal`} key={p._id || p.id || idx}>
                            <a href={href} target='_blank'>
                                <div className="pointer"></div>
                                <div className="card">
                                    <div className="title">{p.title || 'Untitled Project'}</div>
                                    <div className="date">{p.date || p.dateLabel || ''}</div>
                                </div>
                                <div className="content">
                                    <div className="description">
                                        <p>{p.description || ''}</p>
                                    </div>
                                    {p.imageUrl && (
                                        <div className="picture">
                                            <img src={p.imageUrl} />
                                        </div>
                                    )}
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>


        </div>
    )
};
export default Project;