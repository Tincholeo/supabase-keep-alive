module.exports = async function handler(req, res) {
 
   const projects = [
  {
    name: "CorrectorIA",
    url: process.env.SUPABASE_1_URL,
    key: process.env.SUPABASE_1_KEY,
  },
  {
    name: "BarberShift",
    url: process.env.SUPABASE_2_URL,
    key: process.env.SUPABASE_2_KEY,
  },
];

  const results = [];

  for (const project of projects) {
    try {
      const response = await fetch(
        `${project.url}/rest/v1/keep_alive?select=id&limit=1`,
        {
          headers: {
            apikey: project.key,
          },
        }
      );

      results.push({
        project: project.name,
        ok: response.ok,
        status: response.status,
      });
    } catch (error) {
      results.push({
        project: project.name,
        ok: false,
        error: error.message,
      });
    }
  }

  return res.status(200).json({
    executedAt: new Date().toISOString(),
    results,
  });
}
