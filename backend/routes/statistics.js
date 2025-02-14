// API Route to fetch statistics
app.get("/api/statistics", async (req, res) => {
    try {
      const stats = await Statistics.findOne(); // Assuming only one document exists
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });