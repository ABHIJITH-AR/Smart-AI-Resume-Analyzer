import { jsPDF } from 'jspdf';
import { AnalysisResult } from '../types';

export function generatePdfReport(analysis: AnalysisResult) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  // Header Banner Background
  doc.setFillColor(37, 99, 235); // Blue 600
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Smart AI Resume Analysis Report', 14, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`File: ${analysis.fileName} | Role: ${analysis.targetRole || 'N/A'} | Generated: ${new Date(analysis.createdAt).toLocaleDateString()}`, 14, 20);

  y = 38;

  // Scores Grid
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Executive Score Card', 14, y);
  y += 8;

  const scoreBoxes = [
    { label: 'ATS Score', val: `${analysis.atsScore}/100`, color: [37, 99, 235] },
    { label: 'Quality Score', val: `${analysis.qualityScore}/100`, color: [147, 51, 234] },
    { label: 'Grammar', val: `${analysis.grammarScore}/100`, color: [16, 185, 129] },
    { label: 'Formatting', val: `${analysis.formatScore}/100`, color: [245, 158, 11] },
  ];

  const boxWidth = (pageWidth - 28 - 9) / 4;
  scoreBoxes.forEach((box, idx) => {
    const x = 14 + idx * (boxWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, boxWidth, 18, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(box.color[0], box.color[1], box.color[2]);
    doc.text(box.val, x + boxWidth / 2, y + 8, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(box.label, x + boxWidth / 2, y + 14, { align: 'center' });
  });

  y += 26;

  // Overall Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Executive Summary', 14, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);

  const summaryLines = doc.splitTextToSize(analysis.overallSummary, pageWidth - 28);
  doc.text(summaryLines, 14, y);
  y += summaryLines.length * 5 + 6;

  // Strengths & Weaknesses
  const colW = (pageWidth - 28 - 6) / 2;

  // Strengths
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129);
  doc.text('Key Strengths', 14, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  let tempY = y + 5;
  analysis.strengths.slice(0, 4).forEach((str) => {
    const lines = doc.splitTextToSize(`• ${str}`, colW);
    doc.text(lines, 14, tempY);
    tempY += lines.length * 4.5;
  });

  // Weaknesses
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(239, 68, 68);
  doc.text('Areas for Improvement', 14 + colW + 6, y);

  let tempY2 = y + 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  analysis.weaknesses.slice(0, 4).forEach((wk) => {
    const lines = doc.splitTextToSize(`• ${wk}`, colW);
    doc.text(lines, 14 + colW + 6, tempY2);
    tempY2 += lines.length * 4.5;
  });

  y = Math.max(tempY, tempY2) + 8;

  // Job Match if available
  if (analysis.jobMatch) {
    doc.setFillColor(243, 244, 246);
    doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(37, 99, 235);
    doc.text(`Job Description Match: ${analysis.jobMatch.matchPercentage}% Alignment`, 18, y + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text(`Matched Keywords: ${analysis.jobMatch.matchedKeywords.slice(0, 6).join(', ')}`, 18, y + 12);
    doc.text(`Missing Keywords: ${analysis.jobMatch.missingKeywords.slice(0, 6).join(', ') || 'None'}`, 18, y + 16);

    y += 26;
  }

  // Top AI Recommendations
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('AI Summary Rewrite Suggestion', 14, y);
  y += 6;

  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);

  const rewriteText = analysis.aiRecommendations.summaryRewrite;
  const rewriteLines = doc.splitTextToSize(rewriteText, pageWidth - 36);
  const boxH = rewriteLines.length * 5 + 6;

  doc.roundedRect(14, y, pageWidth - 28, boxH, 2, 2, 'FD');

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(67, 56, 202);
  doc.text(rewriteLines, 18, y + 5);

  y += boxH + 10;

  // Action Verbs & Skills
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Recommended Action Verbs to Include:', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(37, 99, 235);
  doc.text(analysis.actionVerbs.suggestedStrongVerbs.join('  •  '), 14, y);

  // Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated by Smart AI Resume Analyzer - Powered by Advanced AI Engine', pageWidth / 2, 285, { align: 'center' });

  doc.save(`${analysis.fileName.replace(/\.[^/.]+$/, '')}_AI_Report.pdf`);
}
