import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import { PublicLayout } from './layouts/PublicLayout';
import { LearnerLayout } from './layouts/LearnerLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';
import { DemoPage } from './pages/public/DemoPage';
import { HelpPage } from './pages/public/HelpPage';
import { AccessibilityPage } from './pages/public/AccessibilityPage';
import { NotFoundPage } from './pages/public/NotFoundPage';

// Learner Journey Pages
import { LearnerDashboardPage } from './pages/learner/LearnerDashboardPage';
import { CompetencyProfilePage } from './pages/learner/CompetencyProfilePage';
import { SkillGapsPage } from './pages/learner/SkillGapsPage';
import { PersonalizedLearningPage } from './pages/learner/PersonalizedLearningPage';
import { LearningDetailPage } from './pages/learner/LearningDetailPage';
import { AssessmentsPage } from './pages/learner/AssessmentsPage';
import { AssessmentGenerationPage } from './pages/learner/AssessmentGenerationPage';
import { AdaptiveAssessmentPage } from './pages/learner/AdaptiveAssessmentPage';
import { AssessmentResultPage } from './pages/learner/AssessmentResultPage';
import { ProgressPage } from './pages/learner/ProgressPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCompetencyGapsPage } from './pages/admin/AdminCompetencyGapsPage';
import { TrainingEffectivenessPage } from './pages/admin/TrainingEffectivenessPage';
import { SkillDemandPage } from './pages/admin/SkillDemandPage';
import { AdminOfficialsPage } from './pages/admin/AdminOfficialsPage';
import { AdminOfficialDetailPage } from './pages/admin/AdminOfficialDetailPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="colored" />
        <Routes>
          {/* ============================================================
              FULL-FIDELITY IMMERSIVE LANDING PAGE
             ============================================================ */}
          <Route path="/" element={<LandingPage />} />

          {/* ============================================================
              PUBLIC WORKFLOW PAGES
             ============================================================ */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
          </Route>

          {/* ============================================================
              LEARNER ROUTES (Protected: role === 'learner' & officialId)
             ============================================================ */}
          <Route element={<ProtectedRoute allowedRole="learner" />}>
            <Route element={<LearnerLayout />}>
              <Route path="/learner" element={<LearnerDashboardPage />} />
              <Route path="/learner/profile" element={<CompetencyProfilePage />} />
              <Route path="/learner/gaps" element={<SkillGapsPage />} />
              <Route path="/learner/learning" element={<PersonalizedLearningPage />} />
              <Route path="/learner/learning/:id" element={<LearningDetailPage />} />
              <Route path="/learner/assessments" element={<AssessmentsPage />} />
              <Route path="/learner/assessments/new" element={<AssessmentGenerationPage />} />
              <Route path="/learner/assessments/:sessionId" element={<AdaptiveAssessmentPage />} />
              <Route path="/learner/assessments/:sessionId/result" element={<AssessmentResultPage />} />
              <Route path="/learner/progress" element={<ProgressPage />} />
            </Route>
          </Route>

          {/* ============================================================
              ADMIN ROUTES (Protected: role === 'admin')
             ============================================================ */}
          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/competencies" element={<AdminCompetencyGapsPage />} />
              <Route path="/admin/training" element={<TrainingEffectivenessPage />} />
              <Route path="/admin/demand" element={<SkillDemandPage />} />
              <Route path="/admin/officials" element={<AdminOfficialsPage />} />
              <Route path="/admin/officials/:id" element={<AdminOfficialDetailPage />} />
            </Route>
          </Route>

          {/* ============================================================
              404 & CATCH-ALL ROUTE
             ============================================================ */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
