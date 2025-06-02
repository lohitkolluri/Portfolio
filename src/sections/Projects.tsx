import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Star, Clock, Award, Tag, Sparkles, Zap, GitFork, Loader2, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Button3D from '@/components/Button3D';

function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectOfTheDay, setProjectOfTheDay] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [manualRepoInput, setManualRepoInput] = useState('');
  const [showRepoSelector, setShowRepoSelector] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const projectsData = [
    {
      video: 'https://www.youtube.com/embed/LurWJ21sPGQ',
      projectName: 'KubeWise',
      projectLink: 'https://github.com/lohitkolluri/KubeWise',
      projectDescription:
        'AI-powered guardian for Kubernetes that autonomously detects anomalies, diagnoses issues, and remediates problems. Built with Python, Google Gemini AI, and Prometheus for intelligent cluster management.',
      projectTech: ['Kubernetes', 'Google Gemini AI', 'Prometheus', 'FastAPI'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/KubeWise',
        externalLink: 'https://github.com/lohitkolluri/KubeWise',
      },
      featured: true,
      timeframe: '2023',
      accolades: 'Runner Up at DevSummit 2025 (DevTrails University Hackathon) among 700+ teams',
    },
    {
      video: 'https://www.youtube.com/embed/_zZ1Ndt5diU',
      projectName: 'QueryLens',
      projectLink: 'https://trynlp2sql.streamlit.app/',
      projectDescription:
        'A natural language to SQL query converter that transforms text input into structured SQL queries for database execution, streamlining database interactions through intuitive language processing.',
      projectTech: ['Streamlit', 'Azure OpenAI', 'SQLite3', 'Altair'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/NLP2SQL',
        externalLink: 'https://trynlp2sql.streamlit.app/',
      },
      featured: true,
      timeframe: '2024',
      accolades: '2nd Runner Up at SEED Global Education Hackathon among 700+ teams',
    },
    {
      image: '/projects/project2.webp',
      projectName: 'FlaskPost',
      projectLink: 'https://flask-post.vercel.app/',
      projectDescription:
        'A FastAPI-powered mass email platform featuring SMTP configuration, CSV recipient management, and HTML template customization with live preview functionality.',
      projectTech: ['FastAPI', 'REST API', 'Jinja2', 'Fast Mail'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/FlaskPost',
        externalLink: 'https://github.com/lohitkolluri/FlaskPost',
      },
      featured: false,
      timeframe: '2024',
    },
  ];

  // Additional projects for daily rotation
  const extraProjects = [
    {
      projectName: 'Auto-GPT',
      projectDescription: 'An autonomous AI agent that can perform complex tasks through self-directed decision making and API interactions',
      projectTech: ['Python', 'OpenAI', 'Agents', 'Machine Learning'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/auto-gpt-clone',
        externalLink: 'https://github.com/lohitkolluri/auto-gpt-clone',
      },
      timeframe: '2024',
      image: '/projects/default-project.webp',
    },
    {
      projectName: 'DevPortfolio',
      projectDescription: 'A modern developer portfolio template built with Next.js, React, and TypeScript',
      projectTech: ['Next.js', 'React', 'TypeScript', 'SCSS'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/portfolio',
        externalLink: 'https://lohitkolluri.com',
      },
      timeframe: '2024',
      image: '/projects/default-project.webp',
    },
    {
      projectName: 'CloudGuard',
      projectDescription: 'Security monitoring and cost optimization tool for AWS cloud infrastructure',
      projectTech: ['AWS', 'Python', 'Terraform', 'CloudWatch'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/cloudguard',
        externalLink: 'https://github.com/lohitkolluri/cloudguard',
      },
      timeframe: '2023',
      image: '/projects/default-project.webp',
    }
  ];

  // Select a fallback project if API fails
  const selectFallbackProject = () => {
    const allProjects = [...projectsData, ...extraProjects];
    const today = new Date();
    const dayOfMonth = today.getDate();
    const projectIndex = dayOfMonth % allProjects.length;
    
    const selectedProject = {
      ...allProjects[projectIndex],
      lastActivity: getRandomDateWithinLastWeek(),
      aiInsight: generateAIInsight(
        allProjects[projectIndex].projectName, 
        allProjects[projectIndex].projectTech
      ),
    };
    
    setProjectOfTheDay(selectedProject);
  };

  // Generate a random recent date for "last commit" or "last activity"
  const getRandomDateWithinLastWeek = () => {
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const randomTime = lastWeek.getTime() + Math.random() * (today.getTime() - lastWeek.getTime());
    const randomDate = new Date(randomTime);
    
    return randomDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Generate an AI insight about the project
  const generateAIInsight = (projectName: string, technologies: string[]) => {
    const insights = [
      `${projectName} shows strong potential for CI/CD integration to streamline deployments.`,
      `Adding unit tests would improve the maintainability of ${projectName}.`,
      `The codebase is well-structured with clear separation of concerns.`,
      `Consider implementing a more modular architecture for better scalability.`,
      `Adding more comprehensive documentation would make this project more accessible.`,
      `Performance optimizations could enhance user experience significantly.`,
      `This project effectively leverages ${technologies[0]} best practices.`,
      `Integrating with ${technologies[technologies.length-1]} could expand functionality.`,
      `Code quality metrics indicate a well-maintained repository.`,
      `Consider containerizing this application for easier deployment.`
    ];
    
    return insights[Math.floor(Math.random() * insights.length)];
  };

  // Function to manually change the project of the day
  const changeProjectOfTheDay = async (repoName?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const apiUrl = repoName 
        ? `/api/projectOfTheDay?repo=${encodeURIComponent(repoName)}`
        : '/api/projectOfTheDay';
        
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error('Failed to fetch project of the day');
      }
      
      const data = await response.json();
      
      // Format the project data
      const formattedProject = {
        projectName: data.name,
        projectDescription: data.description,
        projectLink: data.homepage || data.url,
        projectTech: data.technologies || [data.language],
        projectExternalLinks: {
          github: data.url,
          externalLink: data.homepage || data.url,
        },
        image: '/projects/default-project.webp',
        lastActivity: new Date(data.lastCommitDate || data.lastUpdate).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        }),
        aiInsight: data.aiInsight,
        stars: data.stars,
        forks: data.forks,
      };
      
      setProjectOfTheDay(formattedProject);
      setIframeLoaded(false);
      setIframeError(false);
      setManualRepoInput('');
      setShowRepoSelector(false);
    } catch (err) {
      console.error('Error fetching project of the day:', err);
      setError('Failed to load project of the day');
      
      // Use fallback data
      selectFallbackProject();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch Project of the Day data on initial load
  useEffect(() => {
    changeProjectOfTheDay();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const featuredProjects = projectsData.filter(project => project.featured);

  // Helper function to check if project has a valid external link
  const hasValidExternalLink = (project: any): boolean => {
    if (!project) return false;
    const link = project.projectLink || project.projectExternalLinks?.externalLink;
    return Boolean(link) && 
      link.startsWith('http') && 
      !link.includes('github.com') &&
      !link.includes('localhost');
  };

  // Helper function to get the valid external link
  const getValidExternalLink = (project: any): string => {
    return project.projectLink || project.projectExternalLinks?.externalLink || '';
  };

  // Handle iframe load success
  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setIframeLoaded(false);
    setIframeError(true);
  };

  return (
    <div id="work" className="projects" style={{ paddingTop: '170px' }} ref={containerRef}>
      <motion.div
        className="title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: -50 },
          hidden: { opacity: 0, y: 0 },
        }}
      >
        <h2>Some Things I&apos;ve Built</h2>
      </motion.div>

      {/* Project of the Day */}
      {isLoading ? (
        <motion.div 
          className="project-of-the-day-loading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Loader2 className="loading-spinner" size={32} />
          <p>Loading project of the day...</p>
        </motion.div>
      ) : error ? (
        <motion.div 
          className="project-of-the-day-error"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p>Couldn&apos;t load the project of the day. Showing a fallback project instead.</p>
        </motion.div>
      ) : projectOfTheDay && (
        <motion.div 
          className="project-of-the-day"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="potd-header">
            <h3>
              <Sparkles size={18} className="sparkle-icon" />
              Project of the Day
              <span className="date-pill">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              <button 
                className="change-project-btn"
                onClick={() => setShowRepoSelector(!showRepoSelector)}
                aria-label="Change project"
                title="Change project of the day"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"></path>
                  <path d="M3 12h18"></path>
                  <path d="M12 2a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 1 0 9 4.5 4.5 0 0 1-4.5-4.5"></path>
                  <path d="M12 11v8"></path>
                  <path d="M8 14l4 4 4-4"></path>
                </svg>
              </button>
            </h3>
            
            {showRepoSelector && (
              <motion.div 
                className="repo-selector"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="repo-selector-form">
                  <input
                    type="text"
                    placeholder="Enter repository name"
                    value={manualRepoInput}
                    onChange={(e) => setManualRepoInput(e.target.value)}
                    className="repo-input"
                  />
                  <button 
                    className="apply-btn"
                    onClick={() => changeProjectOfTheDay(manualRepoInput)}
                    disabled={!manualRepoInput.trim()}
                  >
                    Apply
                  </button>
                  <button 
                    className="random-btn"
                    onClick={() => changeProjectOfTheDay()}
                    title="Select a random project"
                  >
                    Random
                  </button>
                </div>
                <p className="repo-tip">Enter a GitHub repository name to feature it as Project of the Day</p>
              </motion.div>
            )}
            
            <div className="potd-header-bar"></div>
          </div>

          <motion.div 
            className="potd-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="potd-project">
              <div className="potd-details">
                <div className="potd-status">
                  <div className="github-activity">
                    <span className="activity-dot"></span> 
                    Last commit: {projectOfTheDay.lastActivity}
                  </div>
                  
                  <div className="github-stats">
                    {projectOfTheDay.stars !== undefined && (
                      <div className="stat-item">
                        <Star size={14} className="stat-icon" />
                        <span>{projectOfTheDay.stars}</span>
                      </div>
                    )}
                    {projectOfTheDay.forks !== undefined && (
                      <div className="stat-item">
                        <GitFork size={14} className="stat-icon" />
                        <span>{projectOfTheDay.forks}</span>
                      </div>
                    )}
                  </div>
                </div>
                <h4>{projectOfTheDay.projectName}</h4>
                <p>{projectOfTheDay.projectDescription}</p>
                
                <div className="potd-ai-insight">
                  <div className="insight-header">
                    <Zap size={16} />
                    <span>Gemini AI Insight</span>
                  </div>
                  <p>{projectOfTheDay.aiInsight}</p>
                </div>
                
                <div className="potd-tech">
                  {projectOfTheDay.projectTech && projectOfTheDay.projectTech.map((tech: string) => (
                    <span key={tech} className="tech-tag">
                      <Tag size={12} />
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="potd-actions">
                  <Button3D
                    text="View Project"
                    link={projectOfTheDay.projectLink || projectOfTheDay.projectExternalLinks.externalLink}
                    color="primary"
                    className="mr-3"
                    animated={true}
                  />
                  <Button3D
                    text="GitHub"
                    link={projectOfTheDay.projectExternalLinks.github}
                    color="secondary"
                    icon={<Github size={16} />}
                  />
                </div>
              </div>
              
              {/* Website Preview for projects with external links */}
              {hasValidExternalLink(projectOfTheDay) && (
                <motion.div 
                  className="potd-preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="preview-header">
                    <Globe size={16} />
                    <span>Website Preview</span>
                  </div>
                  <div className="preview-container">
                    <div className="browser-chrome">
                      <div className="browser-buttons">
                        <span className="browser-button close"></span>
                        <span className="browser-button minimize"></span>
                        <span className="browser-button maximize"></span>
                      </div>
                      <div className="browser-address">
                        <span className="browser-url">{getValidExternalLink(projectOfTheDay)}</span>
                      </div>
                    </div>
                    
                    <div className="preview-content">
                      {!iframeError ? (
                        <>
                          <iframe 
                            src={getValidExternalLink(projectOfTheDay)}
                            title={`${projectOfTheDay.projectName} preview`}
                            className={`website-preview ${iframeLoaded ? 'loaded' : ''}`}
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms"
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                          />
                          {!iframeLoaded && (
                            <div className="iframe-loading">
                              <Loader2 className="loading-spinner" size={28} />
                              <p>Loading preview...</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="iframe-fallback">
                          <Globe size={36} className="fallback-icon" />
                          <p>Preview unavailable</p>
                          <small>Click below to visit the website</small>
                        </div>
                      )}
                    </div>
                    
                    <div className="preview-overlay">
                      <Button3D
                        text="Open Website"
                        link={getValidExternalLink(projectOfTheDay)}
                        color="accent"
                        icon={<ExternalLink size={16} />}
                        animated={true}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div 
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ opacity }}
      >
        {projectsData.map(
          ({
            image = '/projects/default-project.webp',
            video,
            projectDescription,
            projectLink,
            projectExternalLinks,
            projectName,
            projectTech,
            featured,
            timeframe,
            accolades,
          }, index) => {
            const hasVideo = video && (projectName === 'QueryLens' || projectName === 'KubeWise');
            const isEven = index % 2 === 1;
            
            return (
              <motion.div
                className={`project bg-gradient-to-tr from-purple-600/20 via-indigo-500/10 to-pink-500/20 p-[1px] rounded-xl transition-transform transform hover:scale-[1.02] duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 ${
                  hoveredProject === projectName ? 'is-hovered' : ''
                } ${isEven ? 'even-project' : 'odd-project'}`}
                key={projectName}
                variants={itemVariants}
                onMouseEnter={() => setHoveredProject(projectName)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{
                  boxShadow: "0 10px 30px -15px rgba(100, 255, 218, 0.2)",
                  borderColor: "rgba(100, 255, 218, 0.3)",
                }}
              >
                <div className="project-inner bg-[#0f0f0f] rounded-[inherit]">
                  <div 
                    className={`project-image ${hasVideo ? 'has-video' : ''}`}
                    onClick={hasVideo ? undefined : () => window.open(projectLink, '_blank')}
                  >
                    <div className="project-image-overlay"></div>
                    <div className="project-image-container">
                      {hasVideo ? (
                        <iframe
                          src={video}
                          title={projectName}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="project-video"
                        ></iframe>
                      ) : (
                        <Image src={image} fill loading="lazy" alt={projectName} quality={100} />
                      )}
                    </div>
                    {featured && (
                      <motion.div 
                        className="featured-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <Star size={14} />
                        <span>Top Project</span>
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    className="project-info"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="project-meta">
                      <div className="meta-flex">
                      </div>
                    </div>
                    <h3 className="project-info-title">
                      <motion.span
                        className="cursor-pointer"
                        onClick={() => window.open(projectLink, '_blank')}
                        whileHover={{ color: 'var(--theme-color)' }}
                      >
                        {projectName}
                      </motion.span>
                    </h3>
                    <motion.div 
                      className="project-info-description"
                      whileHover={{ 
                        boxShadow: "0 15px 30px -15px rgba(2,12,27,0.8)",
                        y: -5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{projectDescription}</p>
                      {accolades && (
                        <div className="project-accolades">
                          <Award size={14} />
                          <span>{accolades}</span>
                        </div>
                      )}
                    </motion.div>
                    <ul className="project-info-tech-list">
                      {projectTech.map((tech) => (
                        <motion.li
                          className="project-info-tech-list-item"
                          key={tech}
                          whileHover={{ y: -2, color: 'var(--theme-color)' }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="project-info-links mt-4">
                      <Button3D
                        text="View Project"
                        link={projectLink}
                        color="primary"
                        className="mr-3"
                      />
                      <Button3D
                        text="GitHub"
                        link={projectExternalLinks.github}
                        color="secondary"
                        icon={<Github size={16} />}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          },
        )}
      </motion.div>
    </div>
  );
}

export default Projects;
