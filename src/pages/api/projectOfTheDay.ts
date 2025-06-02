import { NextApiRequest, NextApiResponse } from 'next';
import { GeminiService } from '../../utils/geminiService';

// Cache the response for 1 hour (in milliseconds)
const CACHE_DURATION = 1 * 60 * 60 * 1000;
let cachedData: any = null;
let cacheTime = 0;

// Function to check if a repository has links
const hasLinks = (repo: any): boolean => {
  // Check for homepage URL
  if (repo.homepage && repo.homepage.trim() !== '' && repo.homepage !== repo.html_url) {
    return true;
  }
  
  // Check for URLs in description
  if (repo.description && 
      (repo.description.includes('http://') || 
       repo.description.includes('https://') || 
       repo.description.includes('www.'))) {
    return true;
  }
  
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if a specific repo was requested
    const requestedRepo = req.query.repo as string;
    
    // Check if we have cached data that's still valid
    const now = Date.now();
    if (!requestedRepo && cachedData && now - cacheTime < CACHE_DURATION) {
      return res.status(200).json(cachedData);
    }

    // Set up GitHub API authentication
    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    };

    // Fetch repos from GitHub
    const githubUsername = 'lohitkolluri';
    const reposResponse = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=30`,
      { headers }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.statusText}`);
    }

    const repos = await reposResponse.json();
    
    // Filter repositories that have links
    const reposWithLinks = repos.filter(hasLinks);
    
    // Use repos with links if available, otherwise use all repos
    const eligibleRepos = reposWithLinks.length > 0 ? reposWithLinks : repos;
    
    // Select a project based on the requested repo or randomly
    let selectedRepo;
    
    if (requestedRepo) {
      // Find the requested repo by name
      selectedRepo = repos.find((repo: any) => 
        repo.name.toLowerCase() === requestedRepo.toLowerCase()
      );
      
      // If not found, fall back to random selection
      if (!selectedRepo) {
        const randomIndex = Math.floor(Math.random() * eligibleRepos.length);
        selectedRepo = eligibleRepos[randomIndex];
      }
    } else {
      // Random selection from eligible repos
      const randomIndex = Math.floor(Math.random() * eligibleRepos.length);
      selectedRepo = eligibleRepos[randomIndex];
    }
    
    // Get more details about the selected repo
    const repoDetailsResponse = await fetch(
      `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}`,
      { headers }
    );
    
    if (!repoDetailsResponse.ok) {
      throw new Error(`GitHub API error: ${repoDetailsResponse.statusText}`);
    }
    
    const repoDetails = await repoDetailsResponse.json();
    
    // Fetch the latest commit date
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${githubUsername}/${selectedRepo.name}/commits?per_page=1`,
      { headers }
    );
    
    let lastCommitDate = repoDetails.updated_at; // Default fallback
    
    if (commitsResponse.ok) {
      const commits = await commitsResponse.json();
      if (commits.length > 0) {
        lastCommitDate = commits[0].commit.committer.date;
      }
    }
    
    // Determine technologies used by checking languages in the repo
    const languagesResponse = await fetch(
      repoDetails.languages_url,
      { headers }
    );
    
    if (!languagesResponse.ok) {
      throw new Error(`GitHub API error: ${languagesResponse.statusText}`);
    }
    
    const languages = await languagesResponse.json();
    const technologies = Object.keys(languages);
    
    // Get AI insight using Gemini
    const aiInsight = await GeminiService.getProjectInsight(
      repoDetails.name,
      repoDetails.description || `A ${repoDetails.name} project by ${githubUsername}`,
      technologies.length > 0 ? technologies : ['JavaScript', 'TypeScript']
    );
    
    // Format the data
    const projectOfTheDay = {
      name: repoDetails.name,
      description: repoDetails.description || `A ${repoDetails.name} project by ${githubUsername}`,
      url: repoDetails.html_url,
      homepage: repoDetails.homepage || repoDetails.html_url,
      stars: repoDetails.stargazers_count,
      forks: repoDetails.forks_count,
      language: repoDetails.language,
      technologies,
      lastUpdate: repoDetails.updated_at,
      lastCommitDate: lastCommitDate,
      aiInsight,
      owner: {
        username: githubUsername,
        avatar: repoDetails.owner.avatar_url,
      },
    };
    
    // Cache the data
    cachedData = projectOfTheDay;
    cacheTime = now;
    
    // Return the data
    return res.status(200).json(projectOfTheDay);
  } catch (error: any) {
    console.error('Error fetching project of the day:', error);
    
    // If there's an error, return a fallback project
    return res.status(500).json({
      error: 'Error fetching project of the day',
      message: error.message,
    });
  }
} 