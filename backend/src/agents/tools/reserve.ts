import { tool } from '@langchain/core/tools';
import { z } from 'zod';

export const reserve = tool(
  async ({ lieu, date }) => {
    try {
      const url = `http://127.0.0.1:1234/v1/chat`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dolphin3.0-llama3.1-8b:2',
          messages: [
            {
              role: 'user',
              content: `Trouve-moi une salle à ${lieu} le ${date}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          return `❌ Aucune salle trouvée pour cette date et ce lieu.`;
        }
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content ?? 'Pas de réponse';
    } catch (error) {
      console.error('Erreur réservation:', error);
      return `❌ Impossible de récupérer les salles pour cette date et ce lieu.`;
    }
  },
  {
    name: 'reserve',
    description:
      'Je suis un agent qui trouve des salles à proposer suivant un lieu et une date',
    schema: z.object({
      lieu: z.string(),
      date: z.string(),
    }),
  },
);
