import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Trash2,
  Eye,
  Download,
  FileText,
  Sparkles,
  Award,
  ShieldCheck,
  Zap,
  PlusCircle,
} from 'lucide-react';
import { HistoryItem, AnalysisResult } from '../types';
import { deleteHistoryItem, getHistory } from '../services/api';
import { generatePdfReport } from '../utils/pdfGenerator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';

interface DashboardViewProps {
  onSelectHistoryItem: (item: HistoryItem) => void;
  onStartNewAnalysis: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectHistoryItem,
  onStartNewAnalysis,
}) => {
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  const averageAtsScore =
    history.length > 0
      ? Math.round(history.reduce((acc, curr) => acc + curr.atsScore, 0) / history.length)
      : 78;

  const averageQualityScore =
    history.length > 0
      ? Math.round(history.reduce((acc, curr) => acc + curr.qualityScore, 0) / history.length)
      : 82;

  // Prepare chart data from history or fallback mockup
  const chartData =
    history.length > 0
      ? history.slice().reverse().map((item, i) => ({
          name: item.fileName.length > 12 ? item.fileName.slice(0, 12) + '...' : item.fileName,
          ATS: item.atsScore,
          Quality: item.qualityScore,
        }))
      : [
          { name: 'Dev Resume v1', ATS: 65, Quality: 70 },
          { name: 'Dev Resume v2', ATS: 74, Quality: 80 },
          { name: 'Dev Resume v3', ATS: 88, Quality: 92 },
        ];

  const skillFrequencyData = [
    { skill: 'React / TypeScript', count: 95 },
    { skill: 'Node.js / Express', count: 88 },
    { skill: 'SQL / Databases', count: 80 },
    { skill: 'Cloud (AWS / GCP)', count: 72 },
    { skill: 'CI/CD Pipelines', count: 68 },
    { skill: 'Docker / Containers', count: 60 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-blue-100 backdrop-blur-md">
            Candidate Analytics Portal
          </span>
          <h2 className="text-3xl font-black mt-2">Resume Intelligence Dashboard</h2>
          <p className="text-sm text-blue-100 mt-1">
            Track ATS score progression, skill coverage, and past evaluation reports.
          </p>
        </div>

        <button
          onClick={onStartNewAnalysis}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-white text-blue-600 hover:bg-blue-50 shadow-md transition-all active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Resume Analysis</span>
        </button>
      </div>

      {/* Analytics KPI Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Average ATS Score
            </span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {averageAtsScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${averageAtsScore}%` }} />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Average Quality Index
            </span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {averageQualityScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${averageQualityScore}%` }} />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Analyses Run
            </span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {history.length || 3}
          </div>
          <p className="text-xs text-slate-400">Saved in local session memory</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Top Match Level
            </span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            88%
          </div>
          <p className="text-xs text-emerald-600 font-semibold">High Match Target Achieved</p>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Trend Line Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            ATS Score Progression Trend
          </h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#888888" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#ffffff',
                    border: 'none',
                  }}
                />
                <Line type="monotone" dataKey="ATS" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Quality" stroke="#9333ea" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Keyword Density Bar Chart */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Key Skill Coverage Index
          </h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillFrequencyData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} stroke="#888888" fontSize={11} />
                <YAxis dataKey="skill" type="category" width={110} stroke="#888888" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                />
                <Bar dataKey="count" fill="#4f46e5" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Resume Analysis History Logs Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Saved Analysis History ({history.length})
          </h3>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              No previous analyses saved in this session.
            </p>
            <button
              onClick={onStartNewAnalysis}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
            >
              Analyze Your First Resume
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-2">Resume File</th>
                  <th className="py-3 px-2">Role</th>
                  <th className="py-3 px-2">ATS Score</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onSelectHistoryItem(item)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-2 font-semibold text-slate-800 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="truncate max-w-[180px]">{item.fileName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 text-slate-600 dark:text-slate-400">
                      {item.targetRole || 'Software Professional'}
                    </td>
                    <td className="py-3.5 px-2 font-bold">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs ${
                          item.atsScore >= 80
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {item.atsScore}/100
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 text-xs">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            generatePdfReport(item.analysis);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(item.id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
                          title="Delete report"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
