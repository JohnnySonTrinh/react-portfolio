import { BrowserRouter as Router } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import { AchievementsProvider } from "./hooks/achievements/useAchievement";
import { SiteSettingsProvider } from "./hooks/useSiteSettings";
import AppRoutes from "./routes/AppRoutes";
import "./styles/app.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <SiteSettingsProvider>
      <AchievementsProvider>
        <Router>
          <SpeedInsights />
          <AppShell>
            <AppRoutes />
          </AppShell>
        </Router>
      </AchievementsProvider>
    </SiteSettingsProvider>
  );
};

export default App;
