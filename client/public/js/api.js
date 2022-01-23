const api = {
  baseUrl: "http://localhost:3000/api/v1",
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
};
