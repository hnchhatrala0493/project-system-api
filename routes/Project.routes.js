const express = require("express");
const routes = express.Router();
const isAuth = require("../middleware/auth");
const ProjectController = require("../controllers/Project.controller");

routes.post("/add-project-", isAuth, ProjectController.AddProject);
routes.delete(
  "/project-delete/:projectId",
  isAuth,
  ProjectController.ProjectDelete
);
routes.put("/project-update", isAuth, ProjectController.UpdateProject);
routes.get("/project-details/:projectId", isAuth, ProjectController.GetDetailsByProjectId);
routes.get("/project-list/:userId", isAuth, ProjectController.GetList);

module.exports = routes;
