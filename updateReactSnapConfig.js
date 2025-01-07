import fs from "fs";

const reactSnapConfigPath = "./package.json";
const routesFilePath = "./prerender-routes.json";

try {
  const packageJson = JSON.parse(fs.readFileSync(reactSnapConfigPath, "utf-8"));
  const routes = JSON.parse(fs.readFileSync(routesFilePath, "utf-8"));

  // Update reactSnap include property
  packageJson.reactSnap.include = routes;

  // Write back to package.json
  fs.writeFileSync(reactSnapConfigPath, JSON.stringify(packageJson, null, 2));
  console.log("React Snap configuration updated successfully!");
} catch (error) {
  console.error("Error updating React Snap configuration:", error);
}
