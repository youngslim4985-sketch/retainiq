import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Customer Data
  const customers = [
    {
      id: "1",
      name: "Acme Corp",
      score: 32,
      status: "red",
      churn: "78%",
      mrr: "$2,400",
      lastActive: "10 days ago",
      risks: ["No login in 10 days", "3 failed payments"]
    },
    {
      id: "2",
      name: "Beta Inc",
      score: 55,
      status: "amber",
      churn: "42%",
      mrr: "$1,200",
      lastActive: "3 days ago",
      risks: ["Feature usage dropped"]
    },
    {
      id: "3",
      name: "Gamma Systems",
      score: 88,
      status: "green",
      churn: "5%",
      mrr: "$5,600",
      lastActive: "2 hours ago",
      risks: []
    }
  ];

  // API Routes
  app.get("/api/customers", (req, res) => {
    res.json(customers);
  });

  app.post("/api/playbook/trigger", (req, res) => {
    const { customerId } = req.body;
    console.log(`Triggering retention playbook for customer: ${customerId}`);
    res.json({ success: true, message: `Playbook triggered for ${customerId}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
