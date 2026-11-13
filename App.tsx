import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteFrame from "./components/SiteFrame";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import "./language-panels.css";

const Home = lazy(() => import("./pages/Home"));
const LearnPage = lazy(() => import("./pages/Learn").then(module => ({ default: module.LearnPage })));
const CourseDetail = lazy(() => import("./pages/Learn").then(module => ({ default: module.CourseDetail })));
const Exam = lazy(() => import("./pages/Exam"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Downloads = lazy(() => import("./pages/Downloads"));
const EthicalHacker = lazy(() => import("./pages/EthicalHacker"));
const GameLab = lazy(() => import("./pages/GameLab"));
const LuaPanel = lazy(() => import("./pages/LuaPanel"));
const PythonPanel = lazy(() => import("./pages/PythonPanel"));

function Page({ children }: { children: React.ReactNode }) {
  return <SiteFrame><Suspense fallback={<RouteLoading />}>{children}</Suspense></SiteFrame>;
}

function RouteLoading() {
  const { language } = useLanguage();
  return <main className="container route-loading" aria-live="polite" aria-busy="true">{language === "uz" ? "Sahifa ochilmoqda…" : "Loading page…"}</main>;
}

function Router() {
  return <Switch>
    <Route path="/">{() => <Page><Home /></Page>}</Route>
    <Route path="/learn">{() => <Page><LearnPage /></Page>}</Route>
    <Route path="/hackers">{() => <Page><EthicalHacker /></Page>}</Route>
    <Route path="/games">{() => <Page><GameLab /></Page>}</Route>
    <Route path="/lua">{() => <Page><LuaPanel /></Page>}</Route>
    <Route path="/python">{() => <Page><PythonPanel /></Page>}</Route>
    <Route path="/courses/:slug">{() => <Page><CourseDetail /></Page>}</Route>
    <Route path="/exam">{() => <Page><Exam /></Page>}</Route>
    <Route path="/profile">{() => <Page><Profile /></Page>}</Route>
    <Route path="/admin">{() => <Page><Admin /></Page>}</Route>
    <Route path="/download">{() => <Page><Downloads /></Page>}</Route>
    <Route path="/404">{() => <Page><NotFound /></Page>}</Route>
    <Route>{() => <Page><NotFound /></Page>}</Route>
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><LanguageProvider><TooltipProvider><Toaster /><Router /></TooltipProvider></LanguageProvider></ErrorBoundary>;
}
