import { Router } from "express";
import { Company } from "../../../models/company";

export default (router: Router) => {
  const route = Router();
  router.use("/companies", route);

  // List all companies
  route.get("/", async (req, res) => {
    const companyService = req.scope.resolve("companyService");
    const companies = await companyService.list();
    res.json({ companies });
  });

  // Get a single company
  route.get("/:id", async (req, res) => {
    const companyService = req.scope.resolve("companyService");
    const company = await companyService.retrieve(req.params.id);
    res.json({ company });
  });

  // Create a company
  route.post("/", async (req, res) => {
    const companyService = req.scope.resolve("companyService");
    const company = await companyService.create(req.body);
    res.status(201).json({ company });
  });

  // Update a company
  route.post("/:id", async (req, res) => {
    const companyService = req.scope.resolve("companyService");
    const company = await companyService.update(req.params.id, req.body);
    res.json({ company });
  });

  // Delete a company
  route.delete("/:id", async (req, res) => {
    const companyService = req.scope.resolve("companyService");
    await companyService.delete(req.params.id);
    res.status(204).send();
  });

  return route;
};
