const BASE_URL = "https://api.github.com/repos";

export const fetchIssues = async (owner, repo) => {
    const res = await fetch(`${BASE_URL}/${owner}/${repo}/issues`);
    if (!res.ok) {
        throw new Error(`Failed to fetch issues: ${res.statusText}`);
    }
    return res.json();
};