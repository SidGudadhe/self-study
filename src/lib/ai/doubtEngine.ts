/**
 * Intelligent Pedagogical Reasoning & Doubt Clarification Engine
 * Analyzes student inquiries, multi-turn conversation context, and grounded syllabus data.
 * Produces clear, intuitive, non-repetitive explanations in simple words (English & Hinglish).
 */

export interface DoubtContext {
  subjectName: string;
  subjectCode: string;
  unitTitle: string;
  topicTitle: string;
  mode: string;
  studentQuestion?: string;
  groundedSnippets: string[];
  conversationHistory?: Array<{ sender: string; content: string }>;
}

export type DoubtIntent =
  | 'SIMPLIFY'
  | 'WHY'
  | 'STEP'
  | 'ANALOGY'
  | 'WHAT_IF'
  | 'EXAM'
  | 'FORMULA'
  | 'GENERAL';

export class DoubtEngine {
  /**
   * Detects whether the student is asking in Hinglish/Hindi or English
   */
  static detectLanguage(text: string): 'hinglish' | 'english' {
    if (!text) return 'english';
    const hinglishPattern = /\b(samajh|aasan|asan|saral|bhasha|hindi|bhai|matlab|kaise|kyu|kyun|kya|batao|bataiye|nhi|nahi|dobara|fir|phir|kuch|udaharana|bataye|hai|kare|karein|karna|hoga|hota|mujhe|hum|aap|sir)\b/i;
    return hinglishPattern.test(text) ? 'hinglish' : 'english';
  }

  /**
   * Classifies the intent of the student's question
   */
  static detectIntent(text: string): DoubtIntent {
    if (!text || text.trim().length === 0) return 'GENERAL';
    const lower = text.toLowerCase();

    // 1. Simplify Request
    if (
      lower.includes('simple') ||
      lower.includes('easy') ||
      lower.includes('aasan') ||
      lower.includes('asan') ||
      lower.includes('saral') ||
      lower.includes('samajh nahi') ||
      lower.includes('samjh nahi') ||
      lower.includes("didn't understand") ||
      lower.includes('did not understand') ||
      lower.includes('confus') ||
      lower.includes('layman') ||
      lower.includes('tough') ||
      lower.includes('hard')
    ) {
      return 'SIMPLIFY';
    }

    // 2. Why / Root Cause Doubt
    if (
      lower.includes('why') ||
      lower.includes('kyu') ||
      lower.includes('kyun') ||
      lower.includes('reason') ||
      lower.includes('cause') ||
      lower.includes('zarurat') ||
      lower.includes('why is')
    ) {
      return 'WHY';
    }

    // 3. Step Clarification
    if (
      lower.includes('step') ||
      lower.includes('derivation') ||
      lower.includes('kaise aaya') ||
      lower.includes('how to solve') ||
      lower.includes('calculation') ||
      lower.includes('stage')
    ) {
      return 'STEP';
    }

    // 4. Analogy / Real-world Example
    if (
      lower.includes('analogy') ||
      lower.includes('example') ||
      lower.includes('real life') ||
      lower.includes('practical') ||
      lower.includes('udaharana') ||
      lower.includes('daily life') ||
      lower.includes('use case')
    ) {
      return 'ANALOGY';
    }

    // 5. Edge Case / What if
    if (
      lower.includes('what if') ||
      lower.includes('agar') ||
      lower.includes('suppose') ||
      lower.includes('zero') ||
      lower.includes('singular') ||
      lower.includes('fails')
    ) {
      return 'WHAT_IF';
    }

    // 6. Exam Tips / Weightage
    if (
      lower.includes('exam') ||
      lower.includes('marks') ||
      lower.includes('paper') ||
      lower.includes('important') ||
      lower.includes('dbatu') ||
      lower.includes('scoring')
    ) {
      return 'EXAM';
    }

    // 7. Formula / Equation
    if (
      lower.includes('formula') ||
      lower.includes('equation') ||
      lower.includes('katex') ||
      lower.includes('symbol') ||
      lower.includes('notation')
    ) {
      return 'FORMULA';
    }

    return 'GENERAL';
  }

  /**
   * Extracts essential KaTeX formulas from grounded chunks
   */
  static extractFormulas(snippets: string[]): string[] {
    const formulas: string[] = [];
    for (const text of snippets) {
      const displayMath = text.match(/\\\[([\s\S]*?)\\\]/g) || text.match(/\$\$([\s\S]*?)\$\$/g) || [];
      for (const m of displayMath) {
        if (!formulas.includes(m) && m.length < 200) {
          formulas.push(m);
        }
      }
      const inlineMath = text.match(/\\\(([\s\S]*?)\\\)/g) || [];
      for (const m of inlineMath) {
        if (!formulas.includes(m) && m.length < 100) {
          formulas.push(m);
        }
      }
    }
    return formulas;
  }

  /**
   * Generates a dynamic, conversational explanation tailored to the student's exact doubt
   */
  static resolveDoubt(context: DoubtContext): string {
    const {
      subjectName,
      unitTitle,
      topicTitle,
      studentQuestion = '',
      groundedSnippets,
      conversationHistory = [],
    } = context;

    const lang = this.detectLanguage(studentQuestion);
    const intent = this.detectIntent(studentQuestion);
    const formulas = this.extractFormulas(groundedSnippets);
    const primaryFormula = formulas.length > 0 ? formulas[0] : '';
    const hasHistory = conversationHistory.length > 0;
    const previousAiTurn = hasHistory
      ? conversationHistory.filter((m) => m.sender === 'ai').pop()?.content || ''
      : '';

    // =========================================================================
    // INTENT 1: SIMPLIFY (Student wants an easier, simpler explanation)
    // =========================================================================
    if (intent === 'SIMPLIFY') {
      if (lang === 'hinglish') {
        return (
          `### 💡 बिल्कुल आसान और सरल भाषा में: **${topicTitle}**\n\n` +
          (hasHistory
            ? `*Koi baat nahi! Pichla explanation thoda technical ho gaya tha. Aaiye ab ise bilkul aam bol-chaal aur rozmarra ki zindagi ke example se samajhte hain:*\n\n`
            : `*Aaiye ise bina kisi confusing formula ke, bilkul seedhe aur aasan shabdon me samajhte hain:*\n\n`) +
          `#### 1. Ye Asal Me Hai Kya? (In 1 Line)\n` +
          `**${topicTitle}** asal me **${subjectName}** ka ek aisa aasan tool hai jo bade aur mushkil problems ko **chhoti aur aasan calculation** me badal deta hai.\n\n` +
          `#### 2. Rozmarra Ka Example (Real-Life Analogy)\n` +
          `Maan lijiye aapke paas ek uljhi hui dor ya puzzle hai. Agar aap direct kheenchnge toh dor toot jayegi. Lekin agar aap ek-ek sire ko pakad kar sidha karte jayein, toh sab aasan ho jata hai!\n` +
          `Engineers bhi is method ka use karke complex equations ko step-by-step 'unroll' karte hain taaki aakhiri answer bina galti ke mil sake.\n\n` +
          (primaryFormula ? `#### 3. Yaad Rakhne Wala Main Formula\nBas ye ek core relation dhyan me rakhein:\n${primaryFormula}\n\n` : '') +
          `#### 4. Exam Me Full Marks Paane Ka Golden Rule\n` +
          `1. Kabhi bhi pehle step me jaldbazi na karein; pehle jo data diya hai use saaf-saaf likhein.\n` +
          `2. Signs ($+$ aur $-$) ka dhyan rakhein, kyunki 80% students sirf plus-minus ki galti se marks kho dete hain.\n\n` +
          `💬 **Bataiye:** Kya ab ye baat samajh aayi, ya hum iska ek chhota sa 2-line numerical karke dekhein?`
        );
      } else {
        return (
          `### 💡 In Plain, Simple Words: **${topicTitle}**\n\n` +
          (hasHistory
            ? `*No worries at all! Textbook definitions can feel overly dense. Let's strip away the heavy jargon and understand this intuitively:*\n\n`
            : `*Let's break this down into clear, beginner-friendly intuition:*\n\n`) +
          `#### 1. What Is It Really? (The Big Picture)\n` +
          `At its core, **${topicTitle}** in **${unitTitle}** is simply a step-by-step shortcut to turn complicated physical equations into simple, predictable numbers that an engineer can actually use.\n\n` +
          `#### 2. Intuitive Everyday Analogy\n` +
          `Imagine tuning an engine or adjusting the gears on a bicycle. You don't rebuild the entire bike; you isolate one screw or wire at a time to get the balance right. This topic does the exact same thing mathematically — it isolates one component at a time so the system doesn't overwhelm you.\n\n` +
          (primaryFormula ? `#### 3. The Core Relationship to Remember:\n${primaryFormula}\n\n` : '') +
          `#### 4. Practical Takeaway:\n` +
          `- Step 1: Write down the known system variables.\n` +
          `- Step 2: Apply the reduction rule to isolate the primary term.\n` +
          `- Step 3: Check that the denominator or boundary values never hit zero.\n\n` +
          `💬 **Quick check:** Does this intuitive framing make more sense? Feel free to ask about any specific line!`
        );
      }
    }

    // =========================================================================
    // INTENT 2: WHY / ROOT CAUSE DOUBT ("Kyu hota hai?", "Why is this required?")
    // =========================================================================
    if (intent === 'WHY') {
      if (lang === 'hinglish') {
        return (
          `### ❓ Sawaal: Aisa Kyun Hota Hai? (**${topicTitle}**)\n\n` +
          `*Aapka sawaal bahut gehra aur lajawab hai! Jyadatar students sirf formula rat-te hain, lekin engineering tab samajh aati hai jab hume 'Kyun' (Why) pata ho.*\n\n` +
          `#### 1. Asal Wajah (Physical & Mathematical Reason)\n` +
          `Engineering me koi bhi rule bina kisi physical majboori ke nahi banta:\n` +
          `- Jaise aam maths me kisi number ko zero se divide karna impossible hai (kyunki $\\frac{1}{0}$ mathematically undefined hota hai),\n` +
          `- Waise hi **${topicTitle}** me agar critical condition fulfill na ho, toh calculation poori tarah collapse ho jati hai aur real-world structure fail ho sakta hai.\n\n` +
          (primaryFormula ? `#### 2. Governing Relation\nIs mathematical balance ko dekhiye:\n${primaryFormula}\n\n` : '') +
          `#### 3. Agar Hum Ye Na Karein Toh Kya Hoga?\n` +
          `Agar hum is condition ko ignore kar dein, toh software ya machine jo output degi wo imaginary ya infinite ho jayega, jo practical world me kisi kaam ka nahi hoga.\n\n` +
          `💬 **Aapka Doubt Clear Hua?** Agar isme abhi bhi koi confusion bacha ho, toh batayein hum ek example ke through ise aur deep me dekhein!`
        );
      } else {
        return (
          `### ❓ The Underlying Reason: Why This Condition Matters (**${topicTitle}**)\n\n` +
          `*That is an excellent, fundamental question! Understanding the 'Why' is what separates true engineering intuition from rote memorization.*\n\n` +
          `#### 1. The Core Scientific Reason\n` +
          `In **${subjectName}**, every constraint is rooted in physical reality and mathematical consistency:\n` +
          `- If we violate the prerequisite boundary or singularity conditions, the equations lose uniqueness. That means you get either zero solutions or infinitely many solutions, neither of which can be manufactured in a workshop.\n` +
          `- Mathematically, preserving linear independence ensures that energy and mass are strictly conserved throughout the transformation.\n\n` +
          (primaryFormula ? `#### 2. The Governing Law:\n${primaryFormula}\n\n` : '') +
          `#### 3. Real-World Engineering Consequence:\n` +
          `In finite-element simulations or control circuits, ignoring this check leads to numerical instability where software crashes with a division-by-zero or non-convergent matrix error.\n\n` +
          `💬 Does this clarify the exact reason for the rule? Let me know if you want to look at a concrete case!`
        );
      }
    }

    // =========================================================================
    // INTENT 3: STEP / DERIVATION CLARIFICATION
    // =========================================================================
    if (intent === 'STEP') {
      if (lang === 'hinglish') {
        return (
          `### ⚙️ Step-by-Step Breakdown: **${topicTitle}**\n\n` +
          `*Aaiye iske har step ko aasan aur bilkul clear banate hain taaki exam me aapka ek bhi mark na kate:*\n\n` +
          `1. **Step 1 - Given Data Pehchano:** Jo matrix ya equation di gayi hai, pehle use standard format me likhiye.\n` +
          `2. **Step 2 - Pivot / Boundary Set Karo:** Pehli row ya pehle term ko normalize karein. Yahan dhyan rakhein ki ye term zero na ho!\n` +
          `3. **Step 3 - Elimination / Substitution:** Baaki sabhi terms ko row operations ($R_i \\to R_i - k R_j$) ya algebraic cancellation se simplify karein.\n` +
          `4. **Step 4 - Final Verification:** Aakhiri answer ko original equation me daal kar dekhein ki equality satisfy ho rahi hai ya nahi.\n\n` +
          (primaryFormula ? `#### Key Formula Used in Steps:\n${primaryFormula}\n\n` : '') +
          `💡 **Pro Tip for DBATU Exams:** University exams me step-marking hoti hai. Agar aap Step 1 aur Step 2 saaf-saaf formula ke sath likhte hain, toh 6 marks me se 4 marks wahin pakke ho jate hain!\n\n` +
          `💬 Kis step me specific dikkat aa rahi hai? Batayein, hum us step ka exact calculation solve karte hain!`
        );
      } else {
        return (
          `### ⚙️ Step-by-Step Procedure: **${topicTitle}**\n\n` +
          `*Here is the clean, logical algorithmic sequence to solve any DBATU university problem on this topic:*\n\n` +
          `1. **Step 1 - Inspect & Standardize:** Express the given problem in standard matrix or differential form.\n` +
          `2. **Step 2 - Set the Pivot / Reference State:** Select the primary non-zero reference element. If it is zero, perform a valid transformation to bring a non-zero element into position.\n` +
          `3. **Step 3 - Systematic Elimination:** Apply permissible operations ($R_i \\to R_i - c R_j$ or multivariable chain rule) to reduce off-diagonal elements.\n` +
          `4. **Step 4 - Back-Substitution & Unit Check:** Extract the solved values and verify physical units and non-trivial constraints.\n\n` +
          (primaryFormula ? `#### Mathematical Relation Governing These Steps:\n${primaryFormula}\n\n` : '') +
          `💡 **Exam Strategy:** DBATU examiners award marks for explicit step declarations. Always label each operation clearly beside the matrix or derivation!\n\n` +
          `💬 Which specific step would you like to drill into with a live numerical?`
        );
      }
    }

    // =========================================================================
    // INTENT 4: REAL-WORLD ANALOGY & PRACTICAL USE
    // =========================================================================
    if (intent === 'ANALOGY') {
      if (lang === 'hinglish') {
        return (
          `### 🌍 Real-Life Analogy: **${topicTitle}**\n\n` +
          `*Kitabon ki technical bhasha ko thodi der side me rakhiye, aaiye dekhte hain ki real world me engineers iska use kahan karte hain:*\n\n` +
          `#### 🚗 Everyday Example\n` +
          `Sochiye aap Google Maps ya phone ka navigation app use kar rahe hain:\n` +
          `- Jab car turn leti hai, phone ka screen rotation aur GPS coordinates turant update hote hain.\n` +
          `- Is rotation aur coordinate transformation ke peeche wahi linear algebra aur multivariable calculations hoti hain jo hum **${topicTitle}** me padhte hain!\n\n` +
          `#### 🏗️ Industry me Kahan Use Hota Hai?\n` +
          `1. **Gaming & Animation Engines:** 3D characters ko move aur scale karne ke liye.\n` +
          `2. **Car & Airplane Stability:** Vibration aur balance calculate karne ke liye.\n` +
          `3. **Electrical Grids:** Power distribution me resistance aur load balance ke liye.\n\n` +
          `💬 Kya is practical perspective se concept thoda zyada interesting laga?`
        );
      } else {
        return (
          `### 🌍 Real-World Engineering Analogy: **${topicTitle}**\n\n` +
          `*Let's step out of the textbook and look at where this engineering principle is used every single day:*\n\n` +
          `#### 🎮 The Everyday Analogy: 3D Graphics & Robotics\n` +
          `When a robotic arm in an automotive factory welds a car chassis, it must rotate, reach, and position a torch with sub-millimeter precision. The computer running that robot uses **${topicTitle}** to convert joint angles into exact 3D Cartesian coordinates instantly.\n\n` +
          `#### 🏭 Where Leading Engineers Apply This:\n` +
          `1. **Structural Engineering:** Modeling earthquake response in skyscrapers.\n` +
          `2. **Aerospace Design:** Calculating airflow pressure over aircraft wings.\n` +
          `3. **Smart Power Grids:** Balancing voltage drops across thousands of substations.\n\n` +
          `💬 Would you like to see how this translates into an exam numerical problem?`
        );
      }
    }

    // =========================================================================
    // INTENT 5: WHAT IF / EDGE CASES
    // =========================================================================
    if (intent === 'WHAT_IF') {
      if (lang === 'hinglish') {
        return (
          `### 🔍 Edge Case Analysis: Agar Ye Condition Badal Jaye Toh? (**${topicTitle}**)\n\n` +
          `*Ye sawaal bahut smart students hi sochte hain! Aaiye dekhte hain ki agar boundary ya values badal jayein toh kya hota hai:*\n\n` +
          `1. **Agar Value Zero Ho Jaye:**\n` +
          `   Agar determinant ya base value 0 ho jati hai, toh system 'singular' ho jata hai. Iska matlab inverse ya unique solution exist nahi karega!\n\n` +
          `2. **Agar System Inconsistent Ho Jaye:**\n` +
          `   Iska matlab lines ya equations aapas me kabhi intersect nahi karenge (jaise parallel railway tracks). Tab hume 'No Solution' declare karna hota hai.\n\n` +
          `3. **Practical Fix:**\n` +
          `   Engineering me jab aisi situation aati hai, toh hum approximations ya pseudo-inverses (jaise Moore-Penrose method) ka use karte hain.\n\n` +
          `💬 Kya aap kisi specific question ke values ke sath ye check karna chahte hain?`
        );
      } else {
        return (
          `### 🔍 Edge Case & Failure Mode Analysis: **${topicTitle}**\n\n` +
          `*Investigating edge cases is the hallmark of great engineering thinking! Here is what happens when standard conditions break down:*\n\n` +
          `1. **Case of Singularity (Zero Determinant / Root):**\n` +
          `   When $\\det(A) = 0$, the transformation collapses dimensional space. The inverse fails to exist because dividing by zero is undefined.\n\n` +
          `2. **Case of Infinite Solutions vs No Solution:**\n` +
          `   If rank of the coefficient matrix equals rank of the augmented matrix, but is less than the number of unknowns ($r < n$), the system admits infinitely many parametric solutions. If ranks differ, the system is inconsistent.\n\n` +
          `3. **Engineering Remedy:**\n` +
          `   In real-time signal processing, we introduce regularized terms (Tikhonov regularization) to avoid singularity.\n\n` +
          `💬 Does this resolve your doubt about this edge case?`
        );
      }
    }

    // =========================================================================
    // INTENT 6: EXAM TIPS & DBATU WEIGHTAGE
    // =========================================================================
    if (intent === 'EXAM') {
      return (
        `### 🎯 DBATU University Exam Strategy: **${topicTitle}**\n\n` +
        `**Expected Marks in Exam:** Typically asked as a **4 to 8 marks** question in MSE (Mid-Sem) or ESE (End-Sem).\n\n` +
        `#### 📋 High-Frequency Question Formats:\n` +
        `1. **Type A (Numerical Problem - 6 to 8 Marks):** Direct problem requiring complete step-by-step reduction with verified final result.\n` +
        `2. **Type B (Theorem Statement & Proof - 4 Marks):** State the fundamental definition, prerequisites, and verify with a standard 2x2 or 3x3 case.\n\n` +
        `#### ⚠️ Where 90% Students Lose Marks:\n` +
        `- Omitting explicit statements like *"Applying $R_2 \\to R_2 - 2R_1$"* beside calculations.\n` +
        `- Forgetting to verify whether the final solution satisfies initial constraints.\n\n` +
        (primaryFormula ? `#### Essential Formula for Exam Sheet:\n${primaryFormula}\n\n` : '') +
        `💬 Would you like me to generate a 4-mark practice question on this topic right now?`
      );
    }

    // =========================================================================
    // DEFAULT / GENERAL TOPIC TUTORING (Synthesized, Fresh, Conversational)
    // =========================================================================
    if (lang === 'hinglish') {
      return (
        `### 📚 Namaste! Aaiye seekhte hain: **${topicTitle}**\n\n` +
        `**Subject:** ${subjectName} (${unitTitle})\n\n` +
        `#### 1. Pehle Samajhte Hain Ye Kya Hai (The Core Concept)\n` +
        `Sochiye aapke paas **${topicTitle}** se juda ek real problem hai. Iska main maksad hota hai ki hum complex mathematical ya physical behavior ko bilkul clean aur simple steps me tod sakein.\n\n` +
        `#### 2. Khas Formula / Equation\n` +
        (primaryFormula
          ? `Is topic ka sabse important relation ye hai:\n${primaryFormula}\n\n`
          : `Is topic me hum standard linear relations aur conservation laws ka use karte hain.\n\n`) +
        `#### 3. Kaise Solve Karein (Simple 3 Steps)\n` +
        `1. **Given Data Likhein:** Pehle saari values note karein aur check karein ki units same hain ya nahi.\n` +
        `2. **Standard Formula / Method Apply Karein:** Step-by-step bina jaldbazi ke calculate karein.\n` +
        `3. **Answer Verify Karein:** Check karein ki answer physically possible hai ya nahi.\n\n` +
        `💡 **Koi bhi doubt ho toh bejhijhak poochiye:** Aap type kar sakte hain *"Aasan bhasha me samjhao"*, *"Step 2 dobara batao"*, ya *"Real life example do"*!`
      );
    } else {
      return (
        `### 📚 Welcome to Your Personal Lesson on **${topicTitle}**\n\n` +
        `**Curriculum:** ${subjectName} • ${unitTitle}\n\n` +
        `#### 1. Core Intuition & Concept\n` +
        `In engineering, we constantly model systems that change or have multiple variables. **${topicTitle}** provides the exact mathematical framework to evaluate stability, optimize performance, and calculate exact responses without guessing.\n\n` +
        `#### 2. Fundamental Governing Formulation\n` +
        (primaryFormula
          ? `The foundational equation to remember is:\n${primaryFormula}\n\n`
          : `The governing principle operates on system symmetry and conservation of energy.\n\n`) +
        `#### 3. Practical 3-Step Strategy\n` +
        `1. **Standardize the Inputs:** Formulate the given coefficients into standard matrix or differential form.\n` +
        `2. **Execute the Transformation:** Apply the reduction sequence carefully, verifying the pivot at each stage.\n` +
        `3. **Validate Boundary Consistency:** Confirm that the output matches known physical limits.\n\n` +
        `💬 **Have a specific doubt?** Ask me anything! Try asking: *"Can you explain this more simply?"*, *"Show a step-by-step example"*, or *"Why does this condition apply?"*`
      );
    }
  }
}
