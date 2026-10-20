import { DoubtEngine } from '../src/lib/ai/doubtEngine';

console.log('🧪 === TESTING DYNAMIC DOUBT & QUESTION ANALYSIS ENGINE ===\n');

const testContext = {
  subjectName: 'Engineering Mathematics – I',
  subjectCode: '24AF1000BS101',
  unitTitle: 'Linear Algebra - Matrices',
  topicTitle: 'Inverse of a matrix by Gauss-Jordan method',
  mode: 'DETAILED',
  groundedSnippets: [
    'For an n x n square matrix A, an inverse matrix exists if and only if det(A) != 0. Elementary row operations transform [A | I] into [I | A^-1].\\[ A A^{-1} = I \\]',
  ],
};

// Test 1: Language Detection
console.log('1. Testing Language Detection:');
const lang1 = DoubtEngine.detectLanguage('Mujhe ye bilkul aasan bhasha me samjhao bhai');
const lang2 = DoubtEngine.detectLanguage('Can you explain the mathematical derivation?');
console.log(`- "Mujhe ye bilkul aasan bhasha me samjhao bhai" => ${lang1} (Expected: hinglish)`);
console.log(`- "Can you explain the mathematical derivation?" => ${lang2} (Expected: english)`);
if (lang1 !== 'hinglish' || lang2 !== 'english') throw new Error('Language detection failed');
console.log('✅ Language detection verified!\n');

// Test 2: Intent Detection
console.log('2. Testing Intent Detection:');
const intents: Array<{ text: string; expected: string }> = [
  { text: 'Bhai samajh nahi aaya aur simple bhasha me batao', expected: 'SIMPLIFY' },
  { text: 'Determinant zero kyu nahi ho sakta? Why is det != 0 needed?', expected: 'WHY' },
  { text: 'Step 2 me row operation kaise kiya?', expected: 'STEP' },
  { text: 'Iska ek practical real-life example do', expected: 'ANALOGY' },
  { text: 'Agar matrix singular ho toh kya hoga?', expected: 'WHAT_IF' },
  { text: 'DBATU exam me ispar kitne marks ka question aayega?', expected: 'EXAM' },
];

for (const t of intents) {
  const detected = DoubtEngine.detectIntent(t.text);
  console.log(`- "${t.text}" => ${detected} (Expected: ${t.expected})`);
  if (detected !== t.expected) throw new Error(`Intent mismatch: got ${detected}, expected ${t.expected}`);
}
console.log('✅ Intent detection verified!\n');

// Test 3: Dynamic Simplification Generation (Hinglish)
console.log('3. Testing Dynamic Simplification in Hinglish:');
const respSimplifyHinglish = DoubtEngine.resolveDoubt({
  ...testContext,
  studentQuestion: 'Mujhe ye bilkul aasan bhasha me samjhao bhai',
});
console.log('Output preview:\n', respSimplifyHinglish.slice(0, 300), '...\n');
if (!respSimplifyHinglish.includes('आसान और सरल भाषा') || respSimplifyHinglish.includes('For an n x n square matrix A over the field')) {
  throw new Error('Expected simplified Hinglish response without raw textbook dump');
}
console.log('✅ Dynamic simplification verified (No raw text dump)!\n');

// Test 4: Multi-Turn Doubt Clarification (What If Condition Fails)
console.log('4. Testing Multi-Turn What-If Doubt Clarification:');
const respWhatIf = DoubtEngine.resolveDoubt({
  ...testContext,
  studentQuestion: 'Agar determinant zero ho jaye toh kya hoga?',
  conversationHistory: [
    { sender: 'ai', content: respSimplifyHinglish },
    { sender: 'user', content: 'Agar determinant zero ho jaye toh kya hoga?' },
  ],
});
console.log('Output preview:\n', respWhatIf.slice(0, 300), '...\n');
if (!respWhatIf.includes('Edge Case Analysis') && !respWhatIf.includes('singular')) {
  throw new Error('Expected edge case analysis for zero determinant');
}
console.log('✅ Multi-turn doubt clarification verified!\n');

// Test 5: Step Clarification
console.log('5. Testing Step Clarification:');
const respStep = DoubtEngine.resolveDoubt({
  ...testContext,
  studentQuestion: 'Step-by-step kaise solve karein?',
});
console.log('Output preview:\n', respStep.slice(0, 300), '...\n');
if (!respStep.includes('Step 1') || !respStep.includes('Step 2')) {
  throw new Error('Expected step breakdown');
}
console.log('✅ Step procedure breakdown verified!\n');

console.log('🎉 ALL DYNAMIC DOUBT & QUESTION ANALYSIS TESTS PASSED SUCCESSFULLY! 🎉');
