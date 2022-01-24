const api = {
  baseUrl: "https://amaury-memory-back.herokuapp.com/api/v1",
  storeScore: async (score, pseudo) => {
    try {
      const data = {
        score: score,
        pseudo: pseudo,
      };
      const response = await fetch(`${api.baseUrl}/scores`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    } catch (error) {
      return await response.json();
    }
  },
  getAllScores: async () => {
    try {
      const response = await fetch(`${api.baseUrl}/scores`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const scores = await response.json();
      return scores;
    } catch (error) {
      return error;
    }
  },
  getAllThemes: async () => {
    try {
      const response = await fetch(`${api.baseUrl}/themes`);
      if (!response.ok) {
        throw new Error(response.status);
      }
      const themes = await response.json();
      return themes;
    } catch (error) {
      return error;
    }
  },
};
