const api = {
  /* URL de notre API d'enregistrements des scores */
  baseUrl: "https://amaury-memory-back.herokuapp.com/api/v1",
  /**
   *Fonction qui effectue une requête POST vers l'api pour enregistrer notre score
   * @param {*} score  le score stocké dans notre game correspondant au score de la partie terminée
   * @param {*} pseudo  le pseudo entré par l'utilisateur avant la validation du formulaire
   * @returns
   */
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
  /**
   * Fonction pour récupérer tous les scores
   * @returns tableau de tous nos scores stockés en BDD
   */
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
  /**
   *
   * @returns tableau de tous les themes de cartes enregistrés en BDD
   */
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
