const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Detailed syllabus-grounded educational study data for all 9 DBATU Semester 1 timetable subjects
// Sourced from official DBATU NEP 2024-2025 curriculum and benchmark reference textbooks

const ALL_STUDY_MATERIALS = [
  // =========================================================================
  // SUBJECT 1: ENGINEERING MATHEMATICS - I (24AF1000BS101)
  // =========================================================================
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Inverse of a matrix by Gauss-Jordan method',
    materialTitle: 'Comprehensive Theory, Derivation and Solved Examples: Gauss-Jordan Inversion',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Advanced Engineering Mathematics Sec 8.4 & B.S. Grewal',
    chunks: [
      {
        sectionTitle: 'Definition and Invertibility Criteria',
        pageNumber: 1,
        content: `### 1. Conceptual Foundation of Matrix Inversion
For an \\( n \\times n \\) square matrix \\( A \\) over the field of real numbers, an inverse matrix \\( A^{-1} \\) exists if and only if \\( A \\) is non-singular, which requires \\( \\det(A) \\neq 0 \\).
When the inverse exists, it satisfies the identity relation:
\\[ A A^{-1} = A^{-1} A = I_n \\]
where \\( I_n \\) denotes the \\( n \\times n \\) identity matrix.

The Gauss-Jordan elimination method is an exact direct algebraic method based on elementary row operations (EROs) that transforms the augmented matrix \\( [A \\mid I_n] \\) into \\( [I_n \\mid A^{-1}] \\). Unlike Cramer's rule or classical adjoint methods which require \\( O(n!) \\) or \\( O(n^4) \\) cofactor evaluations, Gauss-Jordan operates in \\( O(n^3) \\) computational complexity, making it the industry standard for computational linear algebra.`
      },
      {
        sectionTitle: 'Elementary Row Operations & Algorithmic Procedure',
        pageNumber: 2,
        content: `### 2. Gauss-Jordan Elimination Algorithm
The Gauss-Jordan procedure applies three permissible elementary row operations:
1. Interchange of any two rows: \\( R_i \\leftrightarrow R_j \\)
2. Multiplication of any row by a non-zero scalar \\( k \\): \\( R_i \\to k R_i \\quad (k \\neq 0) \\)
3. Addition of a scalar multiple of one row to another: \\( R_i \\to R_i + k R_j \\)

**Algorithmic Sequence:**
1. Form the augmented matrix \\( M = [A \\mid I_n] \\) of size \\( n \\times 2n \\).
2. For each column \\( j = 1, 2, \\dots, n \\):
   - Pivot Selection: Locate the non-zero pivot element \\( a_{jj} \\). If \\( a_{jj} = 0 \\), perform row interchange \\( R_j \\leftrightarrow R_k \\) where \\( a_{kj} \\neq 0 \\). If no non-zero pivot exists in column \\( j \\), \\( \\det(A) = 0 \\) and \\( A \\) is singular (no inverse exists).
   - Normalize the pivot row: \\( R_j \\to \\frac{1}{a_{jj}} R_j \\), making the diagonal element equal to 1.
   - Eliminate all off-diagonal entries in column \\( j \\) (both above and below the pivot): for every row \\( i \\neq j \\), apply \\( R_i \\to R_i - a_{ij} R_j \\).
3. Upon completion of column \\( n \\), the left partition is reduced to \\( I_n \\) and the right partition contains \\( A^{-1} \\):
\\[ [A \\mid I_n] \\xrightarrow{\\text{Elementary Row Operations}} [I_n \\mid A^{-1}] \\]`
      },
      {
        sectionTitle: 'Fully Solved DBATU Numerical Example',
        pageNumber: 3,
        content: `### 3. Step-by-Step Solved Problem
**Problem:** Find the inverse of matrix \\( A \\) using the Gauss-Jordan method:
\\[ A = \\begin{bmatrix} 1 & 1 & 3 \\\\ 1 & 3 & -3 \\\\ -2 & -4 & -4 \\end{bmatrix} \\]

**Step 1: Set up the Augmented Matrix \\( [A \\mid I] \\):**
\\[ \\left[\\begin{array}{ccc|ccc} 1 & 1 & 3 & 1 & 0 & 0 \\\\ 1 & 3 & -3 & 0 & 1 & 0 \\\\ -2 & -4 & -4 & 0 & 0 & 1 \\end{array}\\right] \\]

**Step 2: Eliminate column 1 entries below pivot \\( a_{11} = 1 \\):**
Apply \\( R_2 \\to R_2 - R_1 \\) and \\( R_3 \\to R_3 + 2R_1 \\):
\\[ \\left[\\begin{array}{ccc|ccc} 1 & 1 & 3 & 1 & 0 & 0 \\\\ 0 & 2 & -6 & -1 & 1 & 0 \\\\ 0 & -2 & 2 & 2 & 0 & 1 \\end{array}\\right] \\]

**Step 3: Normalize pivot in row 2 and eliminate column 2 entries:**
Apply \\( R_2 \\to \\frac{1}{2} R_2 \\):
\\[ \\left[\\begin{array}{ccc|ccc} 1 & 1 & 3 & 1 & 0 & 0 \\\\ 0 & 1 & -3 & -1/2 & 1/2 & 0 \\\\ 0 & -2 & 2 & 2 & 0 & 1 \\end{array}\\right] \\]
Apply \\( R_1 \\to R_1 - R_2 \\) and \\( R_3 \\to R_3 + 2R_2 \\):
\\[ \\left[\\begin{array}{ccc|ccc} 1 & 0 & 6 & 3/2 & -1/2 & 0 \\\\ 0 & 1 & -3 & -1/2 & 1/2 & 0 \\\\ 0 & 0 & -4 & 1 & 1 & 1 \\end{array}\\right] \\]

**Step 4: Normalize pivot in row 3 and eliminate column 3 entries:**
Apply \\( R_3 \\to -\\frac{1}{4} R_3 \\):
\\[ \\left[\\begin{array}{ccc|ccc} 1 & 0 & 6 & 3/2 & -1/2 & 0 \\\\ 0 & 1 & -3 & -1/2 & 1/2 & 0 \\\\ 0 & 0 & 1 & -1/4 & -1/4 & -1/4 \\end{array}\\right] \\]
Apply \\( R_1 \\to R_1 - 6R_3 \\) and \\( R_2 \\to R_2 + 3R_3 \\):
\\[ \\left[\\begin{array}{ccc|ccc} 1 & 0 & 0 & 3 & 1 & 3/2 \\\\ 0 & 1 & 0 & -5/4 & -1/4 & -3/4 \\\\ 0 & 0 & 1 & -1/4 & -1/4 & -1/4 \\end{array}\\right] \\]

**Final Result:**
\\[ A^{-1} = \\begin{bmatrix} 3 & 1 & 3/2 \\\\ -5/4 & -1/4 & -3/4 \\\\ -1/4 & -1/4 & -1/4 \\end{bmatrix} = \\frac{1}{4} \\begin{bmatrix} 12 & 4 & 6 \\\\ -5 & -1 & -3 \\\\ -1 & -1 & -1 \\end{bmatrix} \\]
**Verification:** Multiplying \\( A \\times A^{-1} \\) yields the exact identity matrix \\( I_3 \\).`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Rank and Normal form of a matrix',
    materialTitle: 'Matrix Rank Evaluation & Canonical Normal Form Reduction [Ir 0; 0 0]',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Unit 1 Syllabus & P.N. Wartikar Applied Mathematics',
    chunks: [
      {
        sectionTitle: 'Mathematical Definition of Rank and Echelon Form',
        pageNumber: 1,
        content: `### 1. Rank of a Matrix
A non-zero matrix \\( A \\) of order \\( m \\times n \\) is said to have rank \\( r \\), denoted as \\( \\rho(A) = r \\), if:
1. There exists at least one non-zero minor of order \\( r \\) of \\( A \\).
2. Every minor of order \\( (r + 1) \\) and higher vanishes identically.

**Properties of Rank:**
- If \\( A \\) is of order \\( m \\times n \\), then \\( \\rho(A) \\le \\min(m, n) \\).
- \\( \\rho(A) = 0 \\iff A \\) is the null matrix.
- Rank is invariant under all elementary transformations (row and column operations).
- If \\( A \\) is an \\( n \\times n \\) matrix with \\( \\det(A) \\neq 0 \\), then \\( \\rho(A) = n \\) (full rank).`
      },
      {
        sectionTitle: 'Reduction to Normal / Canonical Form',
        pageNumber: 2,
        content: `### 2. Normal Form (Canonical Form)
Every non-zero matrix \\( A \\) of rank \\( r \\) can be reduced by a sequence of finite elementary row and column operations to one of the four standard Normal Forms:
1. \\( [I_r] \\) when \\( m = n = r \\)
2. \\( [I_r \\mid 0] \\) when \\( m = r < n \\)
3. \\( \\begin{bmatrix} I_r \\\\ 0 \\end{bmatrix} \\) when \\( n = r < m \\)
4. \\( \\begin{bmatrix} I_r & 0 \\\\ 0 & 0 \\end{bmatrix} \\) when \\( r < m \\) and \\( r < n \\)

Here \\( I_r \\) is the identity matrix of order \\( r \\), and \\( 0 \\) represents zero matrices of suitable dimensions.
The integer order \\( r \\) of the identity block \\( I_r \\) directly equals the rank of matrix \\( A \\).

**Equivalence Transformation Theorem:**
For any matrix \\( A \\) of rank \\( r \\), there exist non-singular matrices \\( P \\) (representing row operations) and \\( Q \\) (representing column operations) such that:
\\[ P A Q = \\begin{bmatrix} I_r & 0 \\\\ 0 & 0 \\end{bmatrix} \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Consistency of Linear Systems',
    materialTitle: 'Rouché-Capelli Theorem & Systematic Solution of Linear Equations',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Mathematics I Unit 1',
    chunks: [
      {
        sectionTitle: 'Rouché-Capelli Theorem & Classification Criteria',
        pageNumber: 1,
        content: `### 1. Mathematical Theory of Consistency
Consider a system of \\( m \\) linear equations in \\( n \\) unknowns represented in matrix form as:
\\[ A X = B \\]
where \\( A \\) is the \\( m \\times n \\) coefficient matrix, \\( X = [x_1, x_2, \\dots, x_n]^T \\) is the column vector of unknowns, and \\( B = [b_1, b_2, \\dots, b_m]^T \\) is the constants vector.
The augmented matrix is denoted as \\( [A \\mid B] \\).

**The Rouché-Capelli Theorem:**
1. **Consistent System:** The system has at least one solution if and only if:
   \\[ \\rho(A) = \\rho(A \\mid B) = r \\]
   - **Case A: Unique Solution:** If \\( r = n \\) (rank equals number of unknowns), the system possesses exactly one unique solution.
   - **Case B: Infinitely Many Solutions:** If \\( r < n \\), the system possesses an infinite family of solutions with \\( (n - r) \\) linearly independent arbitrary parameters.
2. **Inconsistent System (No Solution):** If \\( \\rho(A) \\neq \\rho(A \\mid B) \\) (specifically \\( \\rho(A) < \\rho(A \\mid B) \\)), the system has no solution.`
      },
      {
        sectionTitle: 'Homogeneous Systems AX = 0',
        pageNumber: 2,
        content: `### 2. Homogeneous Linear Systems
When \\( B = 0 \\), the system simplifies to \\( A X = 0 \\).
Since the augmented column is always zero, \\( \\rho(A) = \\rho(A \\mid 0) \\) is identically satisfied, meaning a homogeneous system is **always consistent**.

- **Trivial Solution:** \\( X = 0 \\) (i.e. \\( x_1 = x_2 = \\dots = x_n = 0 \\)) is always a solution.
- **Non-Trivial Solutions:** Non-zero solutions exist if and only if \\( \\rho(A) = r < n \\).
- For a square system (\\( n \\) equations in \\( n \\) unknowns), non-trivial solutions exist if and only if \\( \\det(A) = 0 \\).`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Eigen values and Eigen vectors',
    materialTitle: 'Characteristic Equation, Spectrum, and Eigenvector Determination',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Sec 8.1 - 8.3 & B.S. Grewal',
    chunks: [
      {
        sectionTitle: 'Characteristic Equation & Fundamental Theorems',
        pageNumber: 1,
        content: `### 1. Eigenvalues and Eigenvectors
Let \\( A \\) be an \\( n \\times n \\) square matrix. A non-zero column vector \\( X \\in \\mathbb{R}^n \\) is called an **eigenvector** of \\( A \\) corresponding to eigenvalue \\( \\lambda \\) if:
\\[ A X = \\lambda X \\iff (A - \\lambda I) X = 0 \\]

Since \\( X \\neq 0 \\), non-trivial solutions require the characteristic determinant to vanish:
\\[ |A - \\lambda I| = 0 \\]
This polynomial equation of degree \\( n \\) is called the **characteristic equation** of \\( A \\):
\\[ (-1)^n \\lambda^n + c_{n-1} \\lambda^{n-1} + \\dots + c_1 \\lambda + c_0 = 0 \\]
The roots \\( \\lambda_1, \\lambda_2, \\dots, \\lambda_n \\) are the eigenvalues (latent roots or characteristic values).

**Fundamental Algebraic Properties:**
1. The sum of eigenvalues equals the trace of \\( A \\): \\( \\sum_{i=1}^n \\lambda_i = \\text{tr}(A) \\).
2. The product of eigenvalues equals the determinant: \\( \\prod_{i=1}^n \\lambda_i = \\det(A) \\).
3. If \\( \\lambda \\) is an eigenvalue of \\( A \\), then \\( \\lambda^k \\) is an eigenvalue of \\( A^k \\).
4. If \\( A \\) is invertible, \\( \\frac{1}{\\lambda} \\) is an eigenvalue of \\( A^{-1} \\).
5. The eigenvalues of a symmetric real matrix are always real.`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Cayley-Hamilton Theorem and Applications',
    materialTitle: 'Cayley-Hamilton Theorem Proof Concept, Inverse Calculation and Matrix Powers',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Mathematics I Unit 1',
    chunks: [
      {
        sectionTitle: 'Statement and Inverse Matrix Computation',
        pageNumber: 1,
        content: `### 1. Statement of Cayley-Hamilton Theorem
**Theorem:** Every square matrix satisfies its own characteristic equation.
That is, if the characteristic equation of an \\( n \\times n \\) matrix \\( A \\) is:
\\[ |A - \\lambda I| = (-1)^n \\left( \\lambda^n + c_{n-1} \\lambda^{n-1} + c_{n-2} \\lambda^{n-2} + \\dots + c_1 \\lambda + c_0 \\right) = 0 \\]
then replacing the scalar parameter \\( \\lambda \\) with matrix \\( A \\) (and scalar constant \\( c_0 \\) with \\( c_0 I \\)) gives the null matrix:
\\[ A^n + c_{n-1} A^{n-1} + c_{n-2} A^{n-2} + \\dots + c_1 A + c_0 I = 0 \\]

### 2. Applications
1. **Finding Inverse \\( A^{-1} \\):**
   If \\( \\det(A) \\neq 0 \\implies c_0 \\neq 0 \\). Multiply the Cayley-Hamilton relation throughout by \\( A^{-1} \\):
   \\[ A^{n-1} + c_{n-1} A^{n-2} + \\dots + c_1 I + c_0 A^{-1} = 0 \\]
   Isolating \\( A^{-1} \\):
   \\[ A^{-1} = -\\frac{1}{c_0} \\left( A^{n-1} + c_{n-1} A^{n-2} + \\dots + c_1 I \\right) \\]

2. **Computation of High Matrix Powers \\( A^m \\) (\\( m > n \\)):**
   By polynomial division, express \\( \\lambda^m = Q(\\lambda) P(\\lambda) + R(\\lambda) \\), where \\( \\deg(R) < n \\).
   Substituting \\( \\lambda = A \\) gives \\( A^m = R(A) \\), reducing higher powers to a polynomial of degree at most \\( n-1 \\).`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 2: ENGINEERING PHYSICS (24AF2PHYBS202)
  // =========================================================================
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Acoustics of Buildings & Sabine’s Formula',
    materialTitle: 'Acoustical Planning of Buildings, Reverberation Time and Sabine Equation',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Physics Unit 1 & M.N. Avadhanulu',
    chunks: [
      {
        sectionTitle: 'Acoustics Fundamentals and Reverberation',
        pageNumber: 1,
        content: `### 1. Reverberation and Reverberation Time
When a sound source in an enclosed hall is switched off, the sound does not stop immediately due to repeated reflections from walls, ceiling, and floor. The persistence of sound in an enclosed hall as a result of repeated reflections is called **reverberation**.

**Reverberation Time (\\( T \\)):**
The time required for the sound energy density to fall to one-millionth (\\( 10^{-6} \\)) of its initial steady-state value after the source has stopped emitting sound. This corresponds to an acoustic intensity drop of \\( 60 \\text{ dB} \\).

### 2. Sabine's Formula
W.C. Sabine established the fundamental relation for reverberation time \\( T \\):
\\[ T = \\frac{0.161 V}{\\sum a_i S_i} = \\frac{0.161 V}{A} \\]
where:
- \\( V \\) = Volume of the hall in cubic meters (\\( \\text{m}^3 \\))
- \\( S_i \\) = Surface area of the \\( i^{\\text{th}} \\) material in square meters (\\( \\text{m}^2 \\))
- \\( a_i \\) = Sound absorption coefficient of the \\( i^{\\text{th}} \\) material (dimensionless, O.W.U. - Open Window Unit)
- \\( A = \\sum a_i S_i \\) = Total sound absorption in the room in metric Sabins.`
      },
      {
        sectionTitle: 'Acoustical Defects and Architectural Design Guidelines',
        pageNumber: 2,
        content: `### 3. Factors Affecting Architectural Acoustics & Remedial Measures
1. **Optimum Reverberation Time:**
   - For Music: \\( 1.2 \\text{ to } 1.8 \\text{ s} \\)
   - For Speech / Lecture Halls: \\( 0.8 \\text{ to } 1.2 \\text{ s} \\)
   - If \\( T \\) is too high, successive syllables overlap causing indistinct speech. If \\( T \\) is too low, sound sounds dull and 'dead'.

2. **Common Acoustic Defects and Remedies:**
   - **Echoes:** Caused by reflection from distant large walls (distance \\( > 17 \\text{ m} \\)). Remedy: cover rear walls with acoustic perforated tiles or mineral wool.
   - **Flutter Echoes:** Repeated reflections between parallel smooth walls. Remedy: splay walls at angles of \\( 5^{\\circ} - 10^{\\circ} \\).
   - **Focusing & Dead Spots:** Curved or domed ceilings focus sound at focal points, starving other areas. Remedy: avoid hemispherical domes or insert convex acoustic diffusers.
   - **Resonance:** Hall dimensions matching natural acoustic frequencies produce standing waves. Remedy: install porous acoustic absorptive baffles.`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Ultrasonic Wave Generation and Applications',
    materialTitle: 'Magnetostriction & Piezoelectric Production of Ultrasound and Engineering NDT',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Physics Unit 1 & R.K. Gaur',
    chunks: [
      {
        sectionTitle: 'Properties and Magnetostriction Generator',
        pageNumber: 1,
        content: `### 1. Ultrasonic Waves Characteristics
Ultrasonic waves are acoustic longitudinal waves having frequencies greater than \\( 20 \\text{ kHz} \\) (beyond human audible range).
**Salient Properties:**
- Highly directional beam with negligible divergence due to extremely small wavelength (\\( \\lambda \\)).
- High energy and intense acoustic pressure gradients.
- Exhibits cavitation in liquid media.

### 2. Magnetostriction Method
**Principle:** When a ferromagnetic rod (Nickel or Permalloy) is placed in a longitudinal magnetic field, it undergoes elastic dimensional strain along its length (Joule magnetostriction). When an alternating magnetic field is applied, the rod oscillates at twice the applied field frequency (or at the fundamental frequency if polarized with DC bias).

**Resonance Condition:**
Resonance occurs when the natural frequency of the rod matches the tank circuit frequency:
\\[ f = \\frac{1}{2L} \\sqrt{\\frac{Y}{\\rho}} \\]
where:
- \\( L \\) = Length of the ferromagnetic rod
- \\( Y \\) = Young's modulus of rod material
- \\( \\rho \\) = Density of rod material
- Applicable for generating frequencies up to \\( 100 \\text{ kHz} \\).`
      },
      {
        sectionTitle: 'Piezoelectric Oscillator and Engineering Applications',
        pageNumber: 2,
        content: `### 3. Piezoelectric Generator (Langevin / Hartley Oscillator)
**Principle:** Inverse Piezoelectric effect (Lippmann effect). When an alternating electric potential is applied across opposite faces of a piezoelectric crystal (e.g. Quartz cut perpendicular to X-axis), mechanical compressive and tensile stresses are developed, setting the crystal into resonant vibration.

**Resonant Frequency:**
\\[ f = \\frac{p}{2t} \\sqrt{\\frac{Y}{\\rho}} \\]
where \\( t \\) is crystal thickness, \\( p = 1, 2, \\dots \\) is mode of vibration. Suitable for frequencies from \\( 100 \\text{ kHz} \\) to \\( 500 \\text{ MHz} \\).

### 4. Major Engineering Applications
1. **Non-Destructive Testing (NDT) Flaw Detection:** Transmitting ultrasonic pulses into metallic forged shafts or weldments; internal voids or cracks reflect echoes back to the transducer prior to the back-wall echo, pinpointing depth and size of internal defects.
2. **SONAR (Sound Navigation and Ranging):** Measuring sea depth and tracking submerged submarines using pulse echo transit time \\( d = \\frac{v \\cdot t}{2} \\).
3. **Ultrasonic Cleaning & Cavitation Machining:** Microscopic bubble collapse creates shockwaves that strip oxide films and machine brittle ceramics without heat damage.`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Interference in Thin Films & Newton’s Rings',
    materialTitle: 'Thin Film Interference by Reflection, Wedge Film and Newton Rings Wavelength',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Physics Unit 2 Optics',
    chunks: [
      {
        sectionTitle: 'Thin Film Reflected System Path Difference',
        pageNumber: 1,
        content: `### 1. Interference in Thin Films (Reflected Light)
Consider a transparent thin film of thickness \\( t \\) and refractive index \\( \\mu \\). A light ray incident at angle \\( i \\) undergoes partial reflection at the top surface and partial refraction into the film followed by reflection at the lower surface.

**Geometric Path Difference:**
\\[ \\Delta = 2 \\mu t \\cos r \\]
**Stokes' Phase Reversal:** Reflection at the upper boundary occurs from a denser medium, introducing an automatic phase shift of \\( \\pi \\) radians (equivalent to an optical path difference of \\( \\frac{\\lambda}{2} \\)).

**Total Effective Path Difference:**
\\[ \\Delta_{\\text{eff}} = 2 \\mu t \\cos r - \\frac{\\lambda}{2} \\]

**Conditions for Interference:**
- **Constructive Interference (Bright Fringe):**
  \\[ 2 \\mu t \\cos r = (2n + 1) \\frac{\\lambda}{2}, \\quad n = 0, 1, 2, \\dots \\]
- **Destructive Interference (Dark Fringe):**
  \\[ 2 \\mu t \\cos r = n \\lambda, \\quad n = 1, 2, 3, \\dots \\]`
      },
      {
        sectionTitle: 'Newton’s Rings Experiment and Ring Diameter Formulae',
        pageNumber: 2,
        content: `### 2. Newton's Rings Formation
When the convex surface of a plano-convex lens of large radius of curvature \\( R \\) is placed on a flat glass plate, an air film of variable thickness (wedge of circular symmetry) is formed between them.
At the point of contact, film thickness \\( t = 0 \\), producing a central **dark spot** due to the \\( \\frac{\\lambda}{2} \\) phase shift.

**Diameter Formulae:**
By geometry, the thickness of air film at distance \\( r \\) from contact point is \\( t \\approx \\frac{r^2}{2R} \\).
- **Dark Rings:** \\( 2t = n \\lambda \\implies r_n^2 = n R \\lambda \\implies D_n^2 = 4n R \\lambda \\)
  Hence, the diameters of dark rings are proportional to square roots of natural numbers:
  \\[ D_n \\propto \\sqrt{n} \\]
- **Bright Rings:** \\( D_n^2 = 2(2n - 1) R \\lambda \\implies D_n \\propto \\sqrt{2n - 1} \\)

**Experimental Determination of Wavelength \\( \\lambda \\):**
Measuring diameters of \\( (n+p)^{\\text{th}} \\) and \\( n^{\\text{th}} \\) dark rings eliminates zero-error:
\\[ \\lambda = \\frac{D_{n+p}^2 - D_n^2}{4 p R} \\]`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 3: BASIC ELECTRICAL AND ELECTRONICS ENGINEERING (24AF1000ES206)
  // =========================================================================
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'DC Circuit Analysis: KCL, KVL, Mesh, Nodal & Star-Delta',
    materialTitle: 'Fundamental Circuit Laws, Mesh & Nodal Matrix Analysis, Star-Delta Equations',
    materialType: 'text_documentary',
    sourceReference: 'D.P. Kothari & I.J. Nagrath Basic Electrical Engineering',
    chunks: [
      {
        sectionTitle: 'Kirchhoff’s Laws and Nodal/Mesh Formulation',
        pageNumber: 1,
        content: `### 1. Kirchhoff's Circuit Laws
1. **Kirchhoff's Current Law (KCL):**
   The algebraic sum of currents entering any electrical node is zero at every instant of time:
   \\[ \\sum_{k=1}^N i_k(t) = 0 \\]
   KCL is a direct manifestation of the principle of conservation of electric charge.

2. **Kirchhoff's Voltage Law (KVL):**
   The algebraic sum of all branch voltages around any closed loop or mesh is zero:
   \\[ \\sum_{k=1}^M v_k(t) = 0 \\]
   KVL is a direct consequence of the conservation of energy in conservative electric fields.

### 2. Systematic Analysis Techniques
- **Mesh Current Method:** For planar circuits with \\( B \\) branches and \\( N \\) nodes, there are \\( M = B - N + 1 \\) independent loops. Matrix equation:
  \\[ [R] [I] = [V] \\]
  where diagonal elements \\( R_{kk} \\) represent self-resistance of mesh \\( k \\), and off-diagonal \\( R_{jk} = -(\\text{mutual resistance}) \\).
- **Nodal Voltage Method:** Choose one reference ground node; for the remaining \\( N-1 \\) independent nodes, apply KCL in conductance form:
  \\[ [G] [V] = [I] \\]`
      },
      {
        sectionTitle: 'Star-Delta Transformations with Derivations',
        pageNumber: 2,
        content: `### 3. Star-Delta (T - \\(\\Pi\\)) Transformation
When three resistors are connected between three terminals \\( A, B, C \\):

**Delta to Star Conversion (\\(\\Delta \\to Y\\)):**
Given delta resistances \\( R_{ab}, R_{bc}, R_{ca} \\), the equivalent star resistances are:
\\[ R_a = \\frac{R_{ab} R_{ca}}{R_{ab} + R_{bc} + R_{ca}} \\]
\\[ R_b = \\frac{R_{ab} R_{bc}}{R_{ab} + R_{bc} + R_{ca}} \\]
\\[ R_c = \\frac{R_{bc} R_{ca}}{R_{ab} + R_{bc} + R_{ca}} \\]
*Rule:* Star resistance at any node equals product of adjacent delta branches divided by sum of all three delta branches.

**Star to Delta Conversion (\\(Y \\to \\Delta\\)):**
Given star resistances \\( R_a, R_b, R_c \\), the equivalent delta branches are:
\\[ R_{ab} = R_a + R_b + \\frac{R_a R_b}{R_c} \\]
\\[ R_{bc} = R_b + R_c + \\frac{R_b R_c}{R_a} \\]
\\[ R_{ca} = R_c + R_a + \\frac{R_c R_a}{R_b} \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'Single Phase Transformer',
    materialTitle: 'Working Principle, EMF Equation, Equivalent Circuit, Losses & Efficiency',
    materialType: 'text_documentary',
    sourceReference: 'B.L. Theraja Electrical Technology Vol II & Kothari Nagrath',
    chunks: [
      {
        sectionTitle: 'Working Principle & EMF Equation Derivation',
        pageNumber: 1,
        content: `### 1. Transformer Principle of Operation
A transformer is a static electromagnetic device that transfers electrical energy between two or more circuits through electromagnetic mutual induction at constant frequency.

### 2. Derivation of EMF Equation
Let:
- \\( N_1 \\) = Primary turns, \\( N_2 \\) = Secondary turns
- \\( \\Phi_m \\) = Maximum core flux in Webers (\\( \\Phi_m = B_m A \\))
- \\( f \\) = Frequency of AC supply in Hz

Flux variation: \\( \\phi(t) = \\Phi_m \\sin(2\\pi f t) \\).
According to Faraday's law of electromagnetic induction, induced EMF:
\\[ e_1 = -N_1 \\frac{d\\phi}{dt} = -N_1 \\Phi_m (2\\pi f) \\cos(2\\pi f t) = 2\\pi f N_1 \\Phi_m \\sin(2\\pi f t - 90^{\\circ}) \\]
Peak value: \\( E_{m1} = 2\\pi f N_1 \\Phi_m \\).
RMS value:
\\[ E_1 = \\frac{E_{m1}}{\\sqrt{2}} = \\frac{2\\pi}{\\sqrt{2}} f N_1 \\Phi_m = 4.44 f N_1 \\Phi_m \\]
Similarly for secondary winding:
\\[ E_2 = 4.44 f N_2 \\Phi_m \\]
Transformation Ratio:
\\[ K = \\frac{E_2}{E_1} = \\frac{N_2}{N_1} \\approx \\frac{V_2}{V_1} = \\frac{I_1}{I_2} \\]`
      },
      {
        sectionTitle: 'Transformer Losses, Efficiency & Voltage Regulation',
        pageNumber: 2,
        content: `### 3. Losses in Transformers
1. **Core / Iron Losses (\\( P_i \\)):** Constant losses occurring in magnetic core, independent of load:
   - **Hysteresis Loss:** \\( P_h = K_h f B_m^{1.6} V \\) (minimized by high silicon steel).
   - **Eddy Current Loss:** \\( P_e = K_e f^2 B_m^2 t^2 V \\) (minimized by thin insulated laminations of thickness \\( 0.35 - 0.5 \\text{ mm} \\)).
2. **Copper Losses (\\( P_{cu} \\)):** Variable \\( I^2 R \\) losses in windings depending on load current:
   \\[ P_{cu} = x^2 P_{cu,\\text{full-load}} \\quad (x = \\text{fraction of full load}) \\]

### 4. Efficiency (\\( \\eta \\))
\\[ \\eta = \\frac{\\text{Output Power}}{\\text{Input Power}} = \\frac{x \\cdot S \\cdot \\cos\\phi}{x \\cdot S \\cdot \\cos\\phi + P_i + x^2 P_{cu,\\text{FL}}} \\times 100 \\% \\]
**Condition for Maximum Efficiency:** Variable copper loss equals constant core loss:
\\[ x^2 P_{cu,\\text{FL}} = P_i \\implies x = \\sqrt{\\frac{P_i}{P_{cu,\\text{FL}}}} \\]`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 4: BASIC CIVIL AND MECHANICAL ENGINEERING (24AF2CMEES208)
  // =========================================================================
  {
    subjectCode: '24AF2CMEES208',
    topicTitle: 'Engineering Properties and Uses of Civil Materials',
    materialTitle: 'Structural Properties and Engineering Selection of Construction Materials',
    materialType: 'text_documentary',
    sourceReference: 'Anurag Kandya Elements of Civil Engineering & Sushil Kumar',
    chunks: [
      {
        sectionTitle: 'Fundamental Civil Engineering Materials',
        pageNumber: 1,
        content: `### 1. Classification & Properties of Construction Materials
1. **Bricks:** Standard nominal size \\( 190 \\times 90 \\times 90 \\text{ mm} \\) (modular with mortar: \\( 200 \\times 100 \\times 100 \\text{ mm} \\)). Must exhibit compressive strength \\( \\ge 10.5 \\text{ N/mm}^2 \\) (First class) and water absorption \\( \\le 20\\% \\) by dry weight after 24 hours immersion.
2. **Cement:** Ordinary Portland Cement (OPC grades 33, 43, 53). Initial setting time \\( \\ge 30 \\text{ minutes} \\), final setting time \\( \\le 600 \\text{ minutes} \\) (10 hours). Composed of Tricalcium silicate (\\( C_3S \\), early strength), Dicalcium silicate (\\( C_2S \\), progressive strength), Tricalcium aluminate (\\( C_3A \\), flash set).
3. **Concrete:** Composite material consisting of cement, fine aggregate (sand), coarse aggregate (crushed stone), and water. Compressive strength denoted by grade (e.g. M20 has characteristic 28-day cube strength \\( f_{ck} = 20 \\text{ N/mm}^2 \\)). Water-cement ratio (typically 0.45 - 0.55) governs durability and compressive strength as described by Abrams' Law.
4. **Structural Steel:** Fe250 (Mild steel), Fe415, Fe500, Fe550 (Thermo-Mechanically Treated TMT bars with high ductility, corrosion resistance, and high yield strength).`
      }
    ]
  },
  {
    subjectCode: '24AF2CMEES208',
    topicTitle: 'Laws of Thermodynamics & IC Engines',
    materialTitle: 'Laws of Thermodynamics & Internal Combustion Engine 4-Stroke/2-Stroke Cycles',
    materialType: 'text_documentary',
    sourceReference: 'P.K. Nag Engineering Thermodynamics & DBATU Part II Mechanical',
    chunks: [
      {
        sectionTitle: 'Laws of Thermodynamics',
        pageNumber: 1,
        content: `### 1. Fundamental Laws of Thermodynamics
- **Zeroth Law:** If two bodies \\( A \\) and \\( B \\) are each in thermal equilibrium with a third body \\( C \\), they are in thermal equilibrium with each other. This establishes the physical basis of temperature measurement.
- **First Law (Conservation of Energy):**
  For a closed system undergoing a thermodynamic cycle:
  \\[ \\oint \\delta Q = \\oint \\delta W \\]
  For a process between states 1 and 2:
  \\[ Q_{1-2} = W_{1-2} + \\Delta U \\]
  where \\( \\Delta U = m c_v (T_2 - T_1) \\) is change in internal energy.
- **Second Law of Thermodynamics:**
  - **Kelvin-Planck Statement:** It is impossible to construct a cyclic heat engine whose sole purpose is to convert heat completely into work without rejecting heat to a cold sink (no heat engine can have \\( 100\\% \\) efficiency).
  - **Clausius Statement:** It is impossible to construct a device operating in a cycle that transfers heat from a colder body to a hotter body without external work input.`
      },
      {
        sectionTitle: 'Internal Combustion (IC) Engine Cycles',
        pageNumber: 2,
        content: `### 2. IC Engine Principles and Otto vs Diesel Comparison
**Engine Terminology:**
- Bore (\\( D \\)): Cylinder inner diameter.
- Stroke (\\( L \\)): Distance between Top Dead Center (TDC) and Bottom Dead Center (BDC).
- Swept Volume: \\( V_s = \\frac{\\pi}{4} D^2 L \\).
- Compression Ratio: \\( r = \\frac{V_s + V_c}{V_c} \\).

**Comparison:**
| Feature | 4-Stroke Petrol (SI Engine) | 4-Stroke Diesel (CI Engine) |
| :--- | :--- | :--- |
| **Thermodynamic Cycle** | Otto Cycle (constant volume heat addition) | Diesel Cycle (constant pressure heat addition) |
| **Suction Stroke** | Air + Petrol fuel mixture drawn via carburetor | Fresh atmospheric air alone drawn into cylinder |
| **Compression Ratio (r)**| \\( 6 : 1 \\text{ to } 10 : 1 \\) | \\( 14 : 1 \\text{ to } 22 : 1 \\) |
| **Ignition Mechanism** | Electric spark plug fires | Self-ignition due to high compression temperature |
| **Thermal Efficiency** | Lower (approx \\( 25-30\\% \\)) | Higher (approx \\( 35-42\\% \\)) |`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 5: ENGINEERING GRAPHICS (24AF2EGRES204)
  // =========================================================================
  {
    subjectCode: '24AF2EGRES204',
    topicTitle: 'Drawing Standards, Lettering and Scales',
    materialTitle: 'BIS SP-46 Drawing Conventions, Line Types, Dimensioning, and Scale Construction',
    materialType: 'text_documentary',
    sourceReference: 'N.D. Bhatt Engineering Drawing 46th Edition',
    chunks: [
      {
        sectionTitle: 'BIS Drawing Conventions & Line Types',
        pageNumber: 1,
        content: `### 1. Bureau of Indian Standards (BIS SP-46: 2003) Rules
- **Standard Sheet Sizes:**
  - A0: \\( 841 \\times 1189 \\text{ mm} \\) (Area \\( = 1 \\text{ m}^2 \\))
  - A1: \\( 594 \\times 841 \\text{ mm} \\)
  - A2: \\( 420 \\times 594 \\text{ mm} \\)
  - A3: \\( 297 \\times 420 \\text{ mm} \\)
  - A4: \\( 210 \\times 297 \\text{ mm} \\)

- **Line Types and Applications:**
  - **Continuous Thick (Type A, ~0.5 mm):** Visible outlines, crests of screw threads.
  - **Continuous Thin (Type B, ~0.2 mm):** Dimension lines, extension lines, leader lines, hatching lines.
  - **Dashed Medium (Type E, ~0.3 mm):** Hidden outlines and hidden edges.
  - **Chain Thin (Type G, ~0.2 mm):** Center lines, lines of symmetry, pitch circles.`
      },
      {
        sectionTitle: 'Representative Fraction (RF) & Scale Construction',
        pageNumber: 2,
        content: `### 2. Engineering Scales
**Representative Fraction (RF):**
\\[ \\text{RF} = \\frac{\\text{Length of drawing on sheet}}{\\text{Actual physical dimension of object}} \\]

**Length of Scale (LOS):**
\\[ \\text{LOS} = \\text{RF} \\times \\text{Maximum length to be measured} \\]

- **Plain Scale:** Measures up to two consecutive units (e.g. meters and decimeters).
- **Diagonal Scale:** Based on principle of similar triangles; measures three consecutive units (e.g. meters, decimeters, centimeters) or two units to two decimal places.
- **Vernier Scale:** Consists of main scale and vernier scale; least count is \\( LC = \\text{MSD} - \\text{VSD} \\).`
      }
    ]
  },
  {
    subjectCode: '24AF2EGRES204',
    topicTitle: 'Projections of Lines in Various Quadrants',
    materialTitle: 'Orthographic Line Projections: True Length, Reference Angles & Traces (HT/VT)',
    materialType: 'text_documentary',
    sourceReference: 'N.D. Bhatt Chapter 9 & 10',
    chunks: [
      {
        sectionTitle: 'First Angle Projection & Line Inclination Principles',
        pageNumber: 1,
        content: `### 1. Orthographic Projection Fundamentals
In First Angle Projection (Standard Indian & European practice):
- Object is placed in Quadrant 1 (between observer and reference plane).
- Top view appears below reference line \\( XY \\).
- Front view appears above reference line \\( XY \\).

### 2. Line Inclined to Both HP and VP
Let line \\( AB \\) have True Length \\( TL \\), true inclination \\( \\theta \\) with HP, and true inclination \\( \\phi \\) with VP.
- Apparent Front View length: \\( a'b' = TL \\cos\\phi \\), inclined at apparent angle \\( \\alpha > \\theta \\).
- Apparent Top View length: \\( ab = TL \\cos\\theta \\), inclined at apparent angle \\( \\beta > \\phi \\).
- **Rotating Line Method:**
  1. Assume line parallel to VP, rotate to find true length and \\( \\theta \\).
  2. Rotate plan view to find \\( \\phi \\) and locus lines of point \\( B \\).
  3. Loci of \\( b' \\) in front view and \\( b \\) in top view remain parallel to the \\( XY \\) reference line.`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 6: ENERGY AND ENVIRONMENTAL ENGINEERING (24AF1EEEES209)
  // =========================================================================
  {
    subjectCode: '24AF1EEEES209',
    topicTitle: 'Structure and Segments of the Environment',
    materialTitle: 'Atmospheric Layers, Ecosystem Dynamics, Food Webs & Bioaccumulation',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Environmental Studies Unit 1 & S.P. Mishra',
    chunks: [
      {
        sectionTitle: 'Atmospheric Layers and Biogeochemical Segments',
        pageNumber: 1,
        content: `### 1. Four Major Segments of the Earth
1. **Atmosphere:** The gaseous envelope surrounding the Earth, structured into concentric layers:
   - **Troposphere (0 - 12 km):** Contains \\( 75\\% \\) of total atmospheric mass; temperature decreases with altitude at standard environmental lapse rate (\\( -6.5^{\\circ}\\text{C/km} \\)).
   - **Stratosphere (12 - 50 km):** Contains the protective ozone layer (\\( O_3 \\)) absorbing hazardous solar ultraviolet (UV-B and UV-C) radiation.
   - **Mesosphere (50 - 85 km):** Coldest layer with temperatures reaching \\( -90^{\\circ}\\text{C} \\).
   - **Thermosphere (> 85 km):** Highly ionized layer (ionosphere) essential for long-range radio wave communication.
2. **Hydrosphere:** Encompasses all liquid water resources; \\( 97.5\\% \\) is saline seawater, while only \\( 2.5\\% \\) is freshwater (with \\( 68.7\\% \\) trapped in glaciers).
3. **Lithosphere:** Earth's solid crust and upper mantle containing mineral resources and agricultural soils.
4. **Biosphere:** The global biological zone where life interacts with air, water, and soil.`
      }
    ]
  },
  {
    subjectCode: '24AF1EEEES209',
    topicTitle: 'Air Pollutants, Acid Rain and Global Warming',
    materialTitle: 'Criteria Pollutants, Photochemical Smog, Acid Deposition Chemistry & ESP Control',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Unit 4 Environmental Studies',
    chunks: [
      {
        sectionTitle: 'Air Pollutants and Atmospheric Impacts',
        pageNumber: 1,
        content: `### 1. Criteria Air Pollutants & Chemical Mechanisms
- **Particulate Matter (\\( PM_{2.5}, PM_{10} \\)):** Inhalable aerosol particles causing alveolar lung damage and cardiovascular disease.
- **Sulfur Oxides (\\( SO_x \\)):** Generated by coal combustion in thermal power plants. Undergoes atmospheric oxidation to produce sulfurous and sulfuric acids:
  \\[ SO_2 + H_2O \\to H_2SO_3, \\quad 2SO_2 + O_2 \\xrightarrow{\\text{catalyst}} 2SO_3, \\quad SO_3 + H_2O \\to H_2SO_4 \\]
- **Nitrogen Oxides (\\( NO_x \\)):** High-temperature combustion converts atmospheric nitrogen into \\( NO \\) and \\( NO_2 \\), triggering acid rain and ground-level ozone.

### 2. Acid Rain & Global Warming
- **Acid Rain:** Rainwater with \\( \\text{pH} < 5.6 \\) resulting from dissolved \\( H_2SO_4 \\) and \\( HNO_3 \\). Damages architectural structures (marble leprosy \\( CaCO_3 + H_2SO_4 \\to CaSO_4 + CO_2 + H_2O \\)) and causes aquatic acidification.
- **Greenhouse Effect:** Carbon dioxide (\\( CO_2 \\)), methane (\\( CH_4 \\)), and nitrous oxide (\\( N_2O \\)) transmit incoming shortwave solar radiation but absorb and re-emit outgoing infrared thermal radiation, increasing mean global surface temperatures.`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 7: DESIGN THINKING (24AF1000VS211)
  // =========================================================================
  {
    subjectCode: '24AF1000VS211',
    topicTitle: 'The Five Stages: Empathize, Define, Ideate, Prototype, Test',
    materialTitle: 'Stanford d.school Design Thinking Methodology & Real-World Case Studies',
    materialType: 'text_documentary',
    sourceReference: 'Tim Brown Change by Design & DBATU Unit 2 Syllabus',
    chunks: [
      {
        sectionTitle: 'The Five Iterative Stages of Design Thinking',
        pageNumber: 1,
        content: `### 1. The Human-Centric Innovation Framework
Design Thinking is an iterative, non-linear problem-solving methodology that prioritizes understanding human needs, reframing problems in human-centric ways, generating multiple solutions, and rigorous prototyping.

**The Five Stanford d.school Stages:**
1. **Empathize:** Conduct research to develop deep understanding of users. Techniques include observational shadowing, open-ended interviews, and Empathy Mapping (categorized into Says, Thinks, Does, Feels).
2. **Define:** Synthesize observations into a core human-centric problem statement called Point of View (POV):
   \\[ \\text{User} + \\text{Need} + \\text{Surprising Insight} \\]
   From POV, formulate actionable 'How Might We' (HMW) springboard questions.
3. **Ideate:** Generate a large volume of creative solutions using divergent thinking. Apply brainstorming protocols: defer judgment, encourage wild ideas, build on the ideas of others, and aim for quantity over perfection.
4. **Prototype:** Build tangible, inexpensive representations of selected ideas (low-fidelity sketches, cardboard mockups, digital wireframes) to explore design feasibility and stimulate physical user interaction.
5. **Test:** Place prototypes into the hands of real users in representative environments. Observe user interaction, solicit candid feedback, and loop back to re-refine hypotheses.`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 8: INDIAN KNOWLEDGE SYSTEM (24AF1000IK210)
  // =========================================================================
  {
    subjectCode: '24AF1000IK210',
    topicTitle: 'Civil Town Planning, Stepwells and Corrosion-Resistant Metallurgy',
    materialTitle: 'Ancient Indian Civil Engineering, Stepwell Architecture & Wootz Metallurgy',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IKS Unit 3 Syllabus',
    chunks: [
      {
        sectionTitle: 'Harappan Town Planning & Stepwell Hydraulic Engineering',
        pageNumber: 1,
        content: `### 1. Civil Engineering in Ancient India
- **Harappan Urban Engineering (3000 - 1500 BCE):** Cities like Mohenjo-daro, Harappa, and Dholavira exhibited sophisticated municipal engineering:
  - Standardized burnt brick dimensions conforming to strict volumetric ratio \\( 1 : 2 : 4 \\) (thickness : width : length).
  - Gridiron street layout aligned with cardinal directions to facilitate natural wind ventilation.
  - Advanced covered underground stormwater drainage and domestic wastewater systems with inspection manholes and soak pits.
  - Massive hydraulic engineering at Dholavira: interconnected series of 16 rock-cut reservoirs harvesting seasonal storm runoff from monsoon rivulets.
- **Stepwells (Vavs/Baolis):** Multilevel subterranean hydraulic structures (e.g. Rani ki Vav, Patan; Chand Baori, Abhaneri). Combined water conservation with passive geothermal microclimate cooling and community civic architecture.`
      },
      {
        sectionTitle: 'Corrosion-Resistant Iron & Wootz Crucible Steel',
        pageNumber: 2,
        content: `### 2. Metallurgy & Materials Engineering
1. **The Delhi Iron Pillar (4th Century CE):**
   A forge-welded high-purity wrought iron pillar of height \\( 7.21 \\text{ m} \\) and weight \\( > 6 \\text{ tonnes} \\) that has remained corrosion-free for over 1600 years in tropical monsoon conditions.
   - **Metallurgical Reason:** High phosphorus content (\\( \\approx 0.25\\% \\)) with absence of sulfur and manganese. Under alternating wet/dry atmospheric cycles, phosphorus acts as a catalyst to form a protective, tightly adherent passive surface film of amorphous iron oxyhydroxide (Misawite - \\( \\delta\\text{-FeOOH} \\)) that shields underlying metal.

2. **Wootz Steel (Ukku / Damascus Steel):**
   Ultra-high carbon crucible steel (\\( 1.0 - 1.9\\% \\text{ C} \\)) developed in southern India (modern Tamil Nadu, Telangana, Karnataka) exported globally since antiquity.
   - Produced in closed refractory clay crucibles packed with wrought iron, wood chips, and carbonaceous leaves.
   - Exhibited microstructural bandings of cementite particles (\\( Fe_3C \\)) within a martensitic or pearlitic matrix, creating the legendary watering Damascus pattern with extraordinary toughness and edge retention.`
      }
    ]
  },

  // =========================================================================
  // SUBJECT 9: INTEGRATED PERSONALITY DEVELOPMENT (24AF1000CC212A)
  // =========================================================================
  {
    subjectCode: '24AF1000CC212A',
    topicTitle: 'Begin with the End in Mind & Being Addiction-Free',
    materialTitle: 'SMART Goal Visualization, Personal Mission Statements & Freedom from Addiction',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IPDC Workbook Unit 1 (BAPS Swaminarayan Sanstha)',
    chunks: [
      {
        sectionTitle: 'Begin with the End in Mind & Goal Structuring',
        pageNumber: 1,
        content: `### 1. Visioning Life Direction
Based on Stephen Covey's fundamental Habit 2: "Begin with the End in Mind."
All things are created twice: first mentally (in thought, planning, and architectural design), and second physically (in tangible execution).

**SMART Goals Architecture:**
- **Specific:** Clear, well-defined goal devoid of ambiguity.
- **Measurable:** Concrete criteria for measuring progress and completion metrics.
- **Achievable:** Realistic within current resource constraints while stretching capabilities.
- **Relevant:** Aligned with overarching long-term career and character vision.
- **Time-bound:** Defined deadline to create healthy urgency and prevent procrastination.`
      },
      {
        sectionTitle: 'Overcoming Addiction and Habit Loop Rewiring',
        pageNumber: 2,
        content: `### 2. Science of Addiction & Behavioral Mastery
Addiction is a chronic neuropsychological condition characterized by compulsive engagement in rewarding stimuli despite adverse consequences.

**The Neurological Habit Loop:**
1. **Cue (Trigger):** Environmental or emotional prompt (e.g. stress, boredom, peer pressure).
2. **Routine:** The habituated behavioral response (e.g. substance abuse, doom-scrolling, gaming).
3. **Reward:** The transient dopamine surge reinforcing the neurological pathway.

**Strategies for Personal Transformation:**
- **Identify the Cue:** Keep a trigger diary to pinpoint emotional and social catalysts.
- **Substitute the Routine:** Keep the same cue and reward, but replace the destructive routine with an empowering alternative (e.g. exercise, meditation, peer group study).
- **Commit to Accountability:** Surround oneself with high-integrity mentors and supportive peers.`
      }
    ]
  }
];

async function main() {
  console.log('--- Populating Deep Syllabus-Grounded Study Materials for DBATU Semester 1 ---');

  let totalMaterialsCreated = 0;
  let totalChunksCreated = 0;

  const extraDataset = require('./materials-dataset');
  const part2Dataset = require('./materials-dataset-part2');
  const COMBINED_MATERIALS = [...ALL_STUDY_MATERIALS, ...extraDataset, ...part2Dataset];

  for (const item of COMBINED_MATERIALS) {
    const subject = await prisma.subject.findFirst({
      where: { code: item.subjectCode },
    });

    if (!subject) {
      console.warn(`Subject code ${item.subjectCode} not found in DB! Skipping...`);
      continue;
    }

    // Find topic
    const topic = await prisma.topic.findFirst({
      where: {
        unit: { subjectId: subject.id },
        title: { contains: item.topicTitle },
      },
    });

    if (!topic) {
      console.warn(`Topic matching "${item.topicTitle}" under ${item.subjectCode} not found!`);
      continue;
    }

    console.log(`Ingesting Material for: [${subject.code}] ${topic.title}...`);

    // Check if material already exists for this topic to avoid duplicate seeding
    let material = await prisma.studyMaterial.findFirst({
      where: {
        subjectId: subject.id,
        topicId: topic.id,
        title: item.materialTitle,
      },
    });

    if (!material) {
      const fullText = item.chunks.map(c => c.content).join('\n\n');
      const byteSize = Buffer.byteLength(fullText, 'utf8');

      material = await prisma.studyMaterial.create({
        data: {
          subjectId: subject.id,
          topicId: topic.id,
          title: item.materialTitle,
          originalFilename: `${subject.code}_${topic.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`,
          fileType: item.materialType,
          filePath: `/materials/dbatu_curriculum/${subject.code}/${topic.id}`,
          fileSize: byteSize,
          status: 'INDEXED',
          extractedPages: Math.max(1, item.chunks.length),
          ocrQuality: 1.0,
        },
      });
      totalMaterialsCreated++;
    }

    // Create chunks
    for (const chunkData of item.chunks) {
      const existingChunk = await prisma.documentChunk.findFirst({
        where: {
          materialId: material.id,
          sectionTitle: chunkData.sectionTitle,
        },
      });

      if (!existingChunk) {
        await prisma.documentChunk.create({
          data: {
            materialId: material.id,
            topicId: topic.id,
            pageNumber: chunkData.pageNumber,
            sectionTitle: chunkData.sectionTitle,
            content: chunkData.content,
            tokenCount: Math.max(30, Math.round(chunkData.content.length / 4)),
            confidenceScore: 1.0,
          },
        });
        totalChunksCreated++;
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`✅ SEEDING COMPLETE: Created ${totalMaterialsCreated} Study Materials and ${totalChunksCreated} Grounded Document Chunks!`);
  console.log(`======================================================`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
