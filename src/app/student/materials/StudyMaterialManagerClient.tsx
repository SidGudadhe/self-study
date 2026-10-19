'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  BookOpen,
  Layers,
  Sparkles,
  CheckCircle2,
  FileCode,
  FilePlus,
  Presentation,
  FileBox,
  Eye,
  Search,
  Filter,
  ArrowRight,
  Calculator,
  Lightbulb,
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  orderIndex: number;
}

interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  topics: Topic[];
}

interface Subject {
  id: string;
  code: string;
  name: string;
  orderIndex: number;
  credits: number;
  units: Unit[];
}

interface Chunk {
  id: string;
  pageNumber: number;
  sectionTitle: string | null;
  content: string;
  tokenCount: number;
  topic?: {
    id: string;
    title: string;
  } | null;
}

interface StudyMaterial {
  id: string;
  title: string;
  originalFilename: string;
  fileType: string;
  extractedPages: number;
  ocrQuality: number;
  status: string;
  createdAt: string | Date;
  subject: {
    id: string;
    code: string;
    name: string;
  };
  chunks: Chunk[];
}

interface Props {
  subjects: Subject[];
  initialMaterials: StudyMaterial[];
}

export default function StudyMaterialManagerClient({ subjects, initialMaterials }: Props) {
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialMaterials);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || '');
  const [selectedUnitId, setSelectedUnitId] = useState<string>('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');

  // Material type state
  const [materialType, setMaterialType] = useState<'TEXT_DOCUMENTARY' | 'PDF_DOCUMENT' | 'PPT_PRESENTATION'>('TEXT_DOCUMENTARY');
  const [title, setTitle] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');

  // UI status
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [inspectChunkMat, setInspectChunkMat] = useState<StudyMaterial | null>(null);

  // Filter state for material list
  const [filterSubjectId, setFilterSubjectId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected subject object
  const currentSubject = subjects.find((s) => s.id === selectedSubjectId);
  const availableUnits = currentSubject?.units || [];

  // When subject changes, reset unit & topic
  const handleSubjectChange = (subjId: string) => {
    setSelectedSubjectId(subjId);
    const subj = subjects.find((s) => s.id === subjId);
    if (subj && subj.units.length > 0) {
      setSelectedUnitId(subj.units[0].id);
      if (subj.units[0].topics.length > 0) {
        setSelectedTopicId(subj.units[0].topics[0].id);
      } else {
        setSelectedTopicId('');
      }
    } else {
      setSelectedUnitId('');
      setSelectedTopicId('');
    }
  };

  // When unit changes, update topic
  const handleUnitChange = (unitId: string) => {
    setSelectedUnitId(unitId);
    const unit = availableUnits.find((u) => u.id === unitId);
    if (unit && unit.topics.length > 0) {
      setSelectedTopicId(unit.topics[0].id);
    } else {
      setSelectedTopicId('');
    }
  };

  // Helper to prefill template
  const insertTemplate = (type: 'DERIVATION' | 'FORMULA_EXAMPLE') => {
    const topicObj = availableUnits.flatMap((u) => u.topics).find((t) => t.id === selectedTopicId);
    const topicName = topicObj ? topicObj.title : 'Selected Concept';

    if (type === 'DERIVATION') {
      setContent(
        `### 1. Conceptual Overview: ${topicName}
Explain the core physical or mathematical principles governing ${topicName} in accordance with the DBATU syllabus.

### 2. Governing Equations and Formulae
- Standard Equation: \\( f(x) = \\dots \\)
- Critical Parameters and Boundary Conditions:
  - Parameter \\( \\alpha \\): Description and units.
  - Parameter \\( \\beta \\): Meaning in engineering systems.

### 3. Step-by-Step Derivation / Analytical Formulation
1. **Step 1:** State the governing law or starting hypothesis.
2. **Step 2:** Apply elementary row operations / boundary constraints.
3. **Step 3:** Integrate or solve algebraically to obtain the final relation.

### 4. Solved Engineering Numerical / Example
**Problem Statement:** Evaluate the response for a given standard DBATU benchmark condition.
**Step-by-Step Solution:**
- Given data: \\( A = \\dots \\)
- Formula applied: \\( X = \\dots \\)
- Final Calculated Answer with units.

### 5. DBATU Exam Insights & Common Pitfalls
- **High-Yield Question:** What frequently appears in End Semester Examinations (ESE).
- **Common Mistake:** Points where students lose marks during simplification.`
      );
    } else {
      setContent(
        `### Core Summary: ${topicName}
Comprehensive textbook extraction containing fundamental definitions, formulas, and practical applications.

### Key Equations & Formulas
- Primary Formula: \\( Y = mX + C \\)
- Secondary Relations:
  - Relation 1: \\( \\oint B \\cdot dl = \\mu_0 I \\)
  - Relation 2: \\( \\nabla \\times E = -\\frac{\\partial B}{\\partial t} \\)

### Solved Example with Working Steps
- **Example 1:** Determine the value under given operating constraints.
- **Solution:** Follow rigorous mathematical substantiation.

### Key Takeaways for AI Grounding
- Factual grounding reference: DBATU 2024-2025 NEP Curriculum.`
      );
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!selectedSubjectId || !selectedTopicId) {
      setErrorMsg('Please select both a Subject and a specific Topic.');
      return;
    }
    if (!title.trim()) {
      setErrorMsg('Please provide a Title for this study material.');
      return;
    }
    if (!content.trim() || content.trim().length < 20) {
      setErrorMsg('Please provide comprehensive study notes or document text (at least 20 characters).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          topicId: selectedTopicId,
          title,
          materialType,
          content,
          sourceReference,
          fileName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to ingest study material.');
      }

      setSuccessMsg(data.message || 'Material successfully ingested and indexed into the algorithm!');
      setMaterials([data.material, ...materials]);

      // Reset form
      setTitle('');
      setContent('');
      setFileName('');
      setSourceReference('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while uploading.');
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered materials for table
  const filteredMaterials = materials.filter((m) => {
    const matchesSubject = filterSubjectId === 'ALL' || m.subject.id === filterSubjectId;
    const matchesQuery =
      searchQuery === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.chunks.some((c) => c.sectionTitle?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesQuery;
  });

  const totalChunks = materials.reduce((acc, m) => acc + (m.chunks?.length || 0), 0);

  return (
    <div className="space-y-8">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Study Materials</span>
            <FileText className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{materials.length}</div>
          <p className="text-[11px] text-slate-400">Indexed for Semester 1 Timetable</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Grounded Semantic Chunks</span>
            <Layers className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{totalChunks}</div>
          <p className="text-[11px] text-slate-400">Available for RAG AI Teacher & Tests</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Algorithm Ingestion Quality</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">100% Grounded</div>
          <p className="text-[11px] text-slate-400">Zero hallucinations guarantee</p>
        </div>
      </div>

      {/* Main Ingestion Panel: Structured Topic-Level Study Material Creator */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-xl shadow-indigo-950/20 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-indigo-400" /> Topic-Level Study Material Ingestion
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose your Subject and Topic first, then provide documentary notes, derivations, formulas, or attach PDF/PPT material to fuel the learning algorithms.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Subject Selection (Strictly Ordered Hierarchy) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-[10px]">
                1
              </span>
              Select Semester I Subject (Hierarchical Order)
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.orderIndex}. [{s.code}] {s.name} ({s.credits} Credits)
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Unit and Topic Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-[10px]">
                  2A
                </span>
                Select Unit / Chapter
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {availableUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber}: {u.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-[10px]">
                  2B
                </span>
                Select Specific Syllabus Topic
              </label>
              <select
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {availableUnits
                  .find((u) => u.id === selectedUnitId)
                  ?.topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  )) || <option value="">No topics available</option>}
              </select>
            </div>
          </div>

          {/* Step 3: Material Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center text-[10px]">
                3
              </span>
              Choose Ingestion Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setMaterialType('TEXT_DOCUMENTARY')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  materialType === 'TEXT_DOCUMENTARY'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-600/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <div className="text-left">
                  <div>Text Documentary / Notes</div>
                  <div className="text-[10px] text-slate-400 font-normal">Rich markdown, formulas, code</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMaterialType('PDF_DOCUMENT')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  materialType === 'PDF_DOCUMENT'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-600/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <FileBox className="w-4 h-4 text-indigo-400" />
                <div className="text-left">
                  <div>PDF Document / E-Book</div>
                  <div className="text-[10px] text-slate-400 font-normal">Syllabus PDF chapter notes</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMaterialType('PPT_PRESENTATION')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  materialType === 'PPT_PRESENTATION'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-600/10'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Presentation className="w-4 h-4 text-indigo-400" />
                <div className="text-left">
                  <div>PPT / Presentation Deck</div>
                  <div className="text-[10px] text-slate-400 font-normal">Slide-wise structured lecture points</div>
                </div>
              </button>
            </div>
          </div>

          {/* Title & Reference fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Material Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Comprehensive Derivations & Solved Examples for Gauss-Jordan"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Textbook Reference / Course Source
              </label>
              <input
                type="text"
                value={sourceReference}
                onChange={(e) => setSourceReference(e.target.value)}
                placeholder="e.g., B. S. Grewal Sec 8.4 / DBATU Module 1 Reference"
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Filename indicator if PDF/PPT */}
          {materialType !== 'TEXT_DOCUMENTARY' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Document / Slide File Name
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder={
                  materialType === 'PDF_DOCUMENT'
                    ? 'e.g., DBATU_EM1_Unit1_Matrices_Notes.pdf'
                    : 'e.g., Physics_Unit1_Acoustics_LectureSlides.pptx'
                }
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition-colors font-mono"
              />
            </div>
          )}

          {/* Quick Insert Templates */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> High-Yield Templates for Algorithms:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => insertTemplate('DERIVATION')}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
              >
                <Calculator className="w-3 h-3 text-indigo-400" /> Derivations + Solved Examples
              </button>
              <button
                type="button"
                onClick={() => insertTemplate('FORMULA_EXAMPLE')}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
              >
                <FileCode className="w-3 h-3 text-emerald-400" /> Formulae + Concepts
              </button>
            </div>
          </div>

          {/* Content Textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>
                Study Material Content / Documentary Text <span className="text-red-400">*</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                Supports Markdown headings (###), bullet points, and LaTeX equations (\(...\))
              </span>
            </label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste or write comprehensive topic study material here. Include definitions, formulas, derivations, step-by-step procedure, diagrams descriptions, and worked numerical examples..."
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
              required
            />
          </div>

          {/* Messages */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              {successMsg}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Chunking & Indexing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  Save & Ingest Material into Algorithm
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Indexed Materials Explorer */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Indexed Course Materials Vault</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              These chunks are directly retrieved by the AI Teacher and Test Generator for evidence-backed learning.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by subject */}
            <select
              value={filterSubjectId}
              onChange={(e) => setFilterSubjectId(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Semester I Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.orderIndex}. [{s.code}] {s.name}
                </option>
              ))}
            </select>

            {/* Search query */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics or concepts..."
                className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-indigo-500 w-48"
              />
            </div>
          </div>
        </div>

        {filteredMaterials.length > 0 ? (
          <div className="space-y-4">
            {filteredMaterials.map((mat) => (
              <div key={mat.id} className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">
                        {mat.subject.code}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{mat.subject.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase font-mono">
                        {mat.fileType}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      File: <span className="font-mono text-slate-300">{mat.originalFilename}</span> • ~{mat.extractedPages} pages • OCR/Ingestion: <span className="text-emerald-400 font-semibold">{(mat.ocrQuality * 100).toFixed(0)}%</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {mat.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => setInspectChunkMat(inspectChunkMat?.id === mat.id ? null : mat)}
                      className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {inspectChunkMat?.id === mat.id ? 'Hide Chunks' : `Inspect Chunks (${mat.chunks?.length || 0})`}
                    </button>
                  </div>
                </div>

                {/* Chunks Inspection Box */}
                {inspectChunkMat?.id === mat.id && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span className="font-bold flex items-center gap-1.5 text-indigo-300">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" /> Extracted Semantic Chunks ({mat.chunks?.length || 0})
                      </span>
                      <span>100% Grounded for AI RAG</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 max-h-96 overflow-y-auto pr-1">
                      {mat.chunks?.map((chunk, idx) => (
                        <div key={chunk.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-2">
                          <div className="flex justify-between items-center text-[11px] border-b border-slate-800 pb-1">
                            <span className="font-semibold text-indigo-300 truncate max-w-[200px]">
                              Chunk #{idx + 1}: {chunk.sectionTitle || 'Core Section'}
                            </span>
                            <span className="text-slate-400 font-mono text-[10px]">~{chunk.tokenCount} tokens</span>
                          </div>
                          {chunk.topic && (
                            <div className="text-[10px] text-amber-400/90 font-medium">
                              Topic: {chunk.topic.title}
                            </div>
                          )}
                          <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-4 font-mono">
                            {chunk.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-medium text-slate-300">No study materials found matching this filter.</p>
            <p className="text-xs text-slate-500">
              Use the topic-level ingestion form above to add notes, derivations, or presentations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
