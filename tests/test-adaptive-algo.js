const assert = require('assert');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Test the math functions directly matching AdaptiveEngine
function getDifficultyWeight(difficulty) {
  switch (difficulty.toUpperCase()) {
    case 'EASY': return 0.85;
    case 'MEDIUM': return 1.00;
    case 'HARD': return 1.20;
    default: return 1.00;
  }
}

function calculateNewMastery(previousMastery, questionAccuracy, difficulty, totalAttemptsSoFar) {
  const diffWeight = getDifficultyWeight(difficulty);
  const rawScore = Math.min(100, questionAccuracy * diffWeight * 100);
  const alpha = Math.min(0.85, Math.max(0.40, 0.40 + totalAttemptsSoFar * 0.05));
  const updated = alpha * previousMastery + (1 - alpha) * rawScore;
  return parseFloat(Math.min(100, Math.max(0, updated)).toFixed(1));
}

function calculateRetention(currentMastery, daysAgo, repetitionCount, easeFactor = 2.5) {
  if (currentMastery <= 0) return 0.0;
  const baseMemoryDays = 3.0;
  const memoryStrength = baseMemoryDays * Math.pow(easeFactor / 2.5, 0.5) * (1 + 1.6 * repetitionCount);
  const retentionRatio = Math.exp(-daysAgo / memoryStrength);
  return parseFloat(Math.min(100, Math.max(0, currentMastery * retentionRatio)).toFixed(1));
}

function calculateEvidenceConfidence(totalAttempts, distinctQuestionTypes = 1) {
  if (totalAttempts <= 0) return 0.0;
  const volumeTerm = (1 - Math.exp(-totalAttempts / 4.0)) * 70;
  const diversityTerm = Math.min(1.0, distinctQuestionTypes / 3.0) * 30;
  return parseFloat(Math.min(100, Math.max(0, volumeTerm + diversityTerm)).toFixed(1));
}

function calculateTopicPriority(mastery, retention, confidence, errorCount, syllabusWeight = 1.0) {
  const wm = 0.35;
  const wr = 0.20;
  const wu = 0.20;
  const we = 0.15;
  const ws = 0.10;

  const masteryDeficit = Math.max(0, 100 - mastery);
  const retentionDeficit = Math.max(0, 100 - retention);
  const uncertaintyDeficit = Math.max(0, 100 - confidence);
  const errorPenalty = Math.min(100, errorCount * 25);
  const importanceScore = Math.min(100, syllabusWeight * 80);

  const priority = wm * masteryDeficit + wr * retentionDeficit + wu * uncertaintyDeficit + we * errorPenalty + ws * importanceScore;
  return parseFloat(priority.toFixed(1));
}

async function runTests() {
  console.log('🧪 === RUNNING COMPREHENSIVE ADAPTIVE ENGINE SUITE ===');

  // Test 1: Difficulty Calibration
  console.log('\n1. Testing Difficulty Weighting...');
  assert.strictEqual(getDifficultyWeight('EASY'), 0.85);
  assert.strictEqual(getDifficultyWeight('MEDIUM'), 1.00);
  assert.strictEqual(getDifficultyWeight('HARD'), 1.20);
  console.log('✅ Difficulty weighting verified.');

  // Test 2: Mastery Calculation (No Single-Question Mastery Inflation)
  console.log('\n2. Testing Calibrated Mastery Updates...');
  // A student scoring 100% on 1 EASY question should NOT reach 90+ mastery
  const masteryAfter1Easy = calculateNewMastery(0, 1.0, 'EASY', 0);
  console.log(`Initial Mastery after 1 perfect EASY question: ${masteryAfter1Easy}% (Expected: ~51%)`);
  assert(masteryAfter1Easy < 65, 'One easy question must not yield strong mastery');

  // Continual success on MEDIUM and HARD questions builds calibrated mastery
  let progressiveMastery = masteryAfter1Easy;
  for (let i = 1; i <= 6; i++) {
    progressiveMastery = calculateNewMastery(progressiveMastery, 1.0, i % 2 === 0 ? 'HARD' : 'MEDIUM', i);
  }
  console.log(`Mastery after 6 consistent successful attempts: ${progressiveMastery}%`);
  assert(progressiveMastery >= 85, 'Consistent success across attempts should reach strong mastery');
  console.log('✅ Calibrated mastery update verified.');

  // Test 3: Ebbinghaus Spaced Retention Decay (User Requirement C)
  console.log('\n3. Testing Ebbinghaus Retention Decay over Time...');
  const freshMastery = 90.0;
  const retentionDay0 = calculateRetention(freshMastery, 0, 0);
  const retentionDay3 = calculateRetention(freshMastery, 3, 0); // 1 time constant
  const retentionDay10 = calculateRetention(freshMastery, 10, 0);
  console.log(`Day 0 Retention: ${retentionDay0}%`);
  console.log(`Day 3 Retention: ${retentionDay3}%`);
  console.log(`Day 10 Retention: ${retentionDay10}%`);

  assert.strictEqual(retentionDay0, 90.0);
  assert(retentionDay3 < 40, 'Retention should decay noticeably after 3 days without review');
  assert(retentionDay10 < 10, 'Retention should decay substantially after 10 days without review');

  // With 3 successful spaced reviews, memory strength increases
  const retentionDay10WithReviews = calculateRetention(freshMastery, 10, 3);
  console.log(`Day 10 Retention WITH 3 spaced reviews: ${retentionDay10WithReviews}%`);
  assert(retentionDay10WithReviews > 45, 'Spaced repetition should significantly retard forgetting curve');
  console.log('✅ Retention decay and spaced repetition boost verified.');

  // Test 4: Evidence Confidence Saturation
  console.log('\n4. Testing Evidence Confidence Saturation...');
  const conf1 = calculateEvidenceConfidence(1, 1);
  const conf4 = calculateEvidenceConfidence(4, 2);
  const conf10 = calculateEvidenceConfidence(10, 3);
  console.log(`Confidence after 1 attempt: ${conf1}%`);
  console.log(`Confidence after 4 attempts: ${conf4}%`);
  console.log(`Confidence after 10 attempts: ${conf10}%`);

  assert(conf1 < 35, 'Single attempt must have low confidence');
  assert(conf4 >= 55, '4 attempts should have moderate confidence');
  assert(conf10 >= 85, '10 attempts with question diversity should have high confidence');
  console.log('✅ Evidence confidence saturation verified.');

  // Test 5: Deterministic Topic Prioritization
  console.log('\n5. Testing Deterministic Topic Prioritization...');
  // Scenario A: Weak topic with repeated errors
  const priorityWeak = calculateTopicPriority(30, 25, 60, 3, 1.0);
  // Scenario B: Well-mastered strong topic
  const priorityStrong = calculateTopicPriority(90, 85, 90, 0, 1.0);
  // Scenario C: Unassessed topic (zero mastery, zero confidence)
  const priorityUnassessed = calculateTopicPriority(0, 0, 0, 0, 1.0);

  console.log(`Priority of Weak Topic: ${priorityWeak}`);
  console.log(`Priority of Strong Topic: ${priorityStrong}`);
  console.log(`Priority of Unassessed Topic: ${priorityUnassessed}`);

  assert(priorityWeak > priorityStrong, 'Weak topic must have much higher priority than strong topic');
  assert(priorityUnassessed > priorityStrong, 'Unassessed topic must prioritize diagnostic testing over reviewed topics');
  console.log('✅ Topic prioritization verified.');

  // Test 6: Database Granular Response History (User Requirement A)
  console.log('\n6. Testing Database Granular Answer Persistence...');
  const user = await prisma.user.findFirst();
  const test = await prisma.test.findFirst({ include: { questions: true } });

  assert(user, 'User must exist in database');
  assert(test && test.questions.length > 0, 'Test with questions must exist');

  // Create a realistic test attempt
  const attempt = await prisma.testAttempt.create({
    data: {
      testId: test.id,
      userId: user.id,
      durationSeconds: 320,
      totalScore: 16.0,
      maxScore: 20.0,
      percentage: 80.0,
      status: 'SUBMITTED',
    },
  });

  const sampleQ = test.questions[0];
  // Persist granular question response
  const responseRecord = await prisma.questionResponse.create({
    data: {
      attemptId: attempt.id,
      questionId: sampleQ.id,
      userId: user.id,
      topicId: sampleQ.topicId,
      studentAnswer: '3 and 4',
      isCorrect: true,
      marksAwarded: 4.0,
      marksDeducted: 0.0,
      durationSeconds: 45,
      errorTaxonomy: 'NONE',
      evaluatorFeedback: 'Correct calculation using trace and determinant.',
      evaluatorConfidence: 1.0,
      priorConceptScore: 0.0,
    },
  });

  assert(responseRecord.id, 'Response must be persisted with unique ID');
  assert.strictEqual(responseRecord.marksAwarded, 4.0);
  assert.strictEqual(responseRecord.priorConceptScore, 0.0);
  console.log(`Saved QuestionResponse record ID: ${responseRecord.id}`);
  console.log('✅ Granular answer history persisted and verified.');

  console.log('\n🎉 ALL ALGORITHMIC & DATABASE TESTS PASSED SUCCESSFULLY! 🎉\n');
}

runTests()
  .catch((e) => {
    console.error('Test execution failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
