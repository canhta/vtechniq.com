import { envConfig } from 'src/configs/env';

export const getGitHubStars = async (repoLink: string): Promise<number> => {
  const [owner, repo] = repoLink.split('/').slice(-2);

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${envConfig.github.token}`,
      },
    }
  );

  if (!response.ok) {
    return 0;
  }

  const data = await response.json();
  return data.stargazers_count || 0;
};
