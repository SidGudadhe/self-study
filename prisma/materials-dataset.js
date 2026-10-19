// Comprehensive syllabus-grounded educational study dataset for DBATU Semester 1 Engineering (Group B / Div C)
// Contains exact mathematical derivations, formulas in KaTeX, engineering schematics/working principles, and solved numerical problems

module.exports = [
  // -------------------------------------------------------------
  // EM-I: Partial Differentiation & Homogeneous Functions
  // -------------------------------------------------------------
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Homogeneous Functions & Euler’s Theorem',
    materialTitle: 'Euler’s Theorem on Homogeneous Functions, Extended Second-Order Forms & DBATU Proofs',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Sec 9.3 & B.S. Grewal Chapter 5',
    chunks: [
      {
        sectionTitle: 'Definition of Homogeneous Function & Euler’s Theorem (2 Variables)',
        pageNumber: 1,
        content: `### 1. Homogeneous Function Definition
A function \\( f(x, y) \\) is said to be a homogeneous function of degree \\( n \\) in \\( x \\) and \\( y \\) if:
\\[ f(tx, ty) = t^n f(x, y) \\quad \\forall t > 0 \\]
Equivalently, \\( f(x, y) \\) can be expressed in the standard form:
\\[ f(x, y) = x^n \\phi\\left(\\frac{y}{x}\\right) \\quad \\text{or} \\quad f(x, y) = y^n \\psi\\left(\\frac{x}{y}\\right) \\]

### 2. Statement & Proof of Euler’s Theorem (Two Variables)
**Theorem:** If \\( u = f(x, y) \\) is a homogeneous function of degree \\( n \\) possessing continuous first-order partial derivatives, then:
\\[ x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u \\]

**Analytical Proof:**
Let \\( u = x^n \\phi(v) \\) where \\( v = \\frac{y}{x} \\).
Differentiating partially with respect to \\( x \\):
\\[ \\frac{\\partial u}{\\partial x} = n x^{n-1} \\phi(v) + x^n \\phi'(v) \\left(-\\frac{y}{x^2}\\right) = n x^{n-1} \\phi(v) - y x^{n-2} \\phi'(v) \\]
Multiplying by \\( x \\):
\\[ x \\frac{\\partial u}{\\partial x} = n x^n \\phi(v) - y x^{n-1} \\phi'(v) \\quad \\text{--- (Equation 1)} \\]

Differentiating partially with respect to \\( y \\):
\\[ \\frac{\\partial u}{\\partial y} = x^n \\phi'(v) \\left(\\frac{1}{x}\\right) = x^{n-1} \\phi'(v) \\]
Multiplying by \\( y \\):
\\[ y \\frac{\\partial u}{\\partial y} = y x^{n-1} \\phi'(v) \\quad \\text{--- (Equation 2)} \\]

Adding Equations (1) and (2):
\\[ x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n x^n \\phi(v) = n u \\]
Hence proved.`
      },
      {
        sectionTitle: 'Extended Euler’s Theorem for Second Derivatives & Composite Functions',
        pageNumber: 2,
        content: `### 3. Second-Order Extended Euler’s Theorem
If \\( u = f(x, y) \\) is a homogeneous function of degree \\( n \\), then:
\\[ x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2} = n(n - 1) u \\]

### 4. Euler’s Theorem for Composite Functions
If \\( u = f(x, y) \\) is NOT homogeneous, but \\( z = g(u) \\) is homogeneous of degree \\( n \\), then:
\\[ x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\frac{g(u)}{g'(u)} = F(u) \\]
Furthermore, the second derivative relation becomes:
\\[ x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2} = F(u)[F'(u) - 1] \\]

**Solved Example (Frequent DBATU Exam Question):**
If \\( u = \\sin^{-1}\\left(\\frac{x + y}{\\sqrt{x} + \\sqrt{y}}\\right) \\), prove that:
\\[ x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\frac{1}{2} \\tan u \\]
*Solution:*
Let \\( z = \\sin u = \\frac{x + y}{\\sqrt{x} + \\sqrt{y}} \\).
Degree of numerator = 1, degree of denominator = \\( 1/2 \\).
Thus \\( z \\) is homogeneous of degree \\( n = 1 - 1/2 = 1/2 \\).
Applying Euler's theorem to \\( z \\):
\\[ x \\frac{\\partial z}{\\partial x} + y \\frac{\\partial z}{\\partial y} = n z = \\frac{1}{2} z \\]
Since \\( z = \\sin u \\implies \\frac{\\partial z}{\\partial x} = \\cos u \\frac{\\partial u}{\\partial x} \\) and \\( \\frac{\\partial z}{\\partial y} = \\cos u \\frac{\\partial u}{\\partial y} \\):
\\[ \\cos u \\left( x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} \\right) = \\frac{1}{2} \\sin u \\implies x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\frac{1}{2} \\tan u \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Jacobians and Properties',
    materialTitle: 'Jacobians of Transformations, Chain Rule, Functional Dependence and Coordinate Systems',
    materialType: 'text_documentary',
    sourceReference: 'B.S. Grewal Higher Engineering Mathematics Chapter 5 Sec 5.7',
    chunks: [
      {
        sectionTitle: 'Definition & Fundamental Properties of Jacobians',
        pageNumber: 1,
        content: `### 1. Definition of the Jacobian
If \\( u \\) and \\( v \\) are continuous functions of two independent variables \\( x \\) and \\( y \\), the Jacobian of \\( (u, v) \\) with respect to \\( (x, y) \\) is the determinant:
\\[ J = \\frac{\\partial(u, v)}{\\partial(x, y)} = \\begin{vmatrix} \\frac{\\partial u}{\\partial x} & \\frac{\\partial u}{\\partial y} \\\\[6pt] \\frac{\\partial v}{\\partial x} & \\frac{\\partial v}{\\partial y} \\end{vmatrix} = u_x v_y - u_y v_x \\]
For three variables \\( u(x, y, z), v(x, y, z), w(x, y, z) \\):
\\[ \\frac{\\partial(u, v, w)}{\\partial(x, y, z)} = \\begin{vmatrix} u_x & u_y & u_z \\\\ v_x & v_y & v_z \\\\ w_x & w_y & w_z \\end{vmatrix} \\]

### 2. Fundamental Properties of Jacobians
1. **Reciprocal Property:**
   If \\( J = \\frac{\\partial(u, v)}{\\partial(x, y)} \\) and \\( J' = \\frac{\\partial(x, y)}{\\partial(u, v)} \\), then:
   \\[ J \\cdot J' = 1 \\iff \\frac{\\partial(u, v)}{\\partial(x, y)} \\cdot \\frac{\\partial(x, y)}{\\partial(u, v)} = 1 \\]
2. **Chain Rule for Jacobians:**
   If \\( u, v \\) are functions of \\( r, s \\) and \\( r, s \\) are functions of \\( x, y \\):
   \\[ \\frac{\\partial(u, v)}{\\partial(x, y)} = \\frac{\\partial(u, v)}{\\partial(r, s)} \\cdot \\frac{\\partial(r, s)}{\\partial(x, y)} \\]
3. **Condition for Functional Dependence:**
   The functions \\( u(x, y) \\) and \\( v(x, y) \\) are functionally dependent (i.e. there exists a relation \\( f(u, v) = 0 \\)) if and only if:
   \\[ \\frac{\\partial(u, v)}{\\partial(x, y)} = 0 \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Maxima and Minima of Functions of Two Variables',
    materialTitle: 'Stationary Points, Hessian Discriminant Test rt - s^2, and Constrained Extremum',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Mathematics I Unit 3',
    chunks: [
      {
        sectionTitle: 'Necessary and Sufficient Conditions for Local Extrema',
        pageNumber: 1,
        content: `### 1. Conditions for Maxima and Minima
Let \\( z = f(x, y) \\) be a real function defined on domain \\( D \\subset \\mathbb{R}^2 \\).
**Necessary Condition:**
At an extremum \\( (a, b) \\), the first partial derivatives must vanish simultaneously:
\\[ f_x(a, b) = 0 \\quad \\text{and} \\quad f_y(a, b) = 0 \\]
Points satisfying these equations are called **stationary points** or critical points.

**Sufficient Conditions (Discriminant Test):**
Evaluate higher partial derivatives at each stationary point \\( (a, b) \\):
\\[ r = f_{xx} = \\frac{\\partial^2 f}{\\partial x^2}, \\quad s = f_{xy} = \\frac{\\partial^2 f}{\\partial x \\partial y}, \\quad t = f_{yy} = \\frac{\\partial^2 f}{\\partial y^2} \\]
Define the Hessian determinant discriminant: \\( \\Delta = rt - s^2 \\).

1. **Local Maximum:** If \\( rt - s^2 > 0 \\) and \\( r < 0 \\) (or \\( t < 0 \\)), \\( f(a, b) \\) is a maximum value.
2. **Local Minimum:** If \\( rt - s^2 > 0 \\) and \\( r > 0 \\) (or \\( t > 0 \\)), \\( f(a, b) \\) is a minimum value.
3. **Saddle Point:** If \\( rt - s^2 < 0 \\), \\( (a, b) \\) is a saddle point (neither maximum nor minimum).
4. **Inconclusive Test:** If \\( rt - s^2 = 0 \\), the test fails and higher-order terms must be investigated.`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Double Integration in Cartesian and Polar Coordinates',
    materialTitle: 'Double Integrals over Planar Regions, Area Computations & Polar Transformations',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Sec 10.3 & B.S. Grewal Chapter 7',
    chunks: [
      {
        sectionTitle: 'Evaluation of Double Integrals & Coordinate Transformation',
        pageNumber: 1,
        content: `### 1. Double Integral in Cartesian Coordinates
The double integral of continuous function \\( f(x, y) \\) over region \\( R \\) is defined as:
\\[ I = \\iint_R f(x, y) dx dy = \\int_{x=a}^{x=b} \\left[ \\int_{y=\\phi_1(x)}^{y=\\phi_2(x)} f(x, y) dy \\right] dx \\]
When \\( f(x, y) = 1 \\), the integral directly yields the planar area of region \\( R \\):
\\[ \\text{Area}(R) = \\iint_R dx dy \\]

### 2. Double Integrals in Polar Coordinates
By applying the transformation \\( x = r \\cos\\theta, y = r \\sin\\theta \\), the area element becomes:
\\[ dA = dx dy = |J| dr d\\theta = r dr d\\theta \\]
where the Jacobian \\( J = \\frac{\\partial(x, y)}{\\partial(r, \\theta)} = \\begin{vmatrix} \\cos\\theta & -r\\sin\\theta \\\\ \\sin\\theta & r\\cos\\theta \\end{vmatrix} = r \\).
Hence:
\\[ \\iint_R f(x, y) dx dy = \\iint_R f(r\\cos\\theta, r\\sin\\theta) r dr d\\theta \\]`
      }
    ]
  },

  // -------------------------------------------------------------
  // PHYSICS: Engineering Optics, Quantum, Crystals, Materials
  // -------------------------------------------------------------
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Lasers and Fiber Optics',
    materialTitle: 'Stimulated Emission, Population Inversion, He-Ne Laser & Fiber Numerical Aperture',
    materialType: 'text_documentary',
    sourceReference: 'Ajoy Ghatak Optics & M.N. Avadhanulu Engineering Physics',
    chunks: [
      {
        sectionTitle: 'Laser Fundamentals & Einstein’s Relations',
        pageNumber: 1,
        content: `### 1. Laser Principle (Light Amplification by Stimulated Emission of Radiation)
Three fundamental quantum transitions occur between energy levels \\( E_1 \\) and \\( E_2 \\):
1. **Induced Absorption:** \\( R_{12} = B_{12} N_1 \\rho(\\nu) \\)
2. **Spontaneous Emission:** \\( R_{21,\\text{sp}} = A_{21} N_2 \\) (incoherent, random phase)
3. **Stimulated Emission:** \\( R_{21,\\text{st}} = B_{21} N_2 \\rho(\\nu) \\) (coherent, identical frequency, phase, polarization, and direction)

**Einstein's Coefficients Relations:**
\\[ B_{12} = B_{21}, \\quad \\frac{A_{21}}{B_{21}} = \\frac{8\\pi h \\nu^3}{c^3} \\]
**Population Inversion (\\( N_2 > N_1 \\)):**
Under thermal equilibrium, Boltzmann statistics dictates \\( N_2 = N_1 e^{-(E_2 - E_1)/kT} < N_1 \\). To achieve optical amplification, population inversion is established in a **metastable state** (lifetime \\( \\approx 10^{-3} \\text{ s} \\) vs \\( 10^{-8} \\text{ s} \\) for ordinary states) via external pumping (electrical discharge, optical, or chemical).`
      },
      {
        sectionTitle: 'Optical Fiber Numerical Aperture & Acceptance Angle',
        pageNumber: 2,
        content: `### 2. Fiber Optics Waveguiding
Light propagates through optical fibers via continuous **Total Internal Reflection (TIR)** at the core-cladding boundary, requiring core index \\( n_1 > n_2 \\) (cladding index).

**Acceptance Angle (\\( \\theta_a \\)):**
The maximum angle of incidence at the fiber entrance face for which light undergoes TIR:
\\[ \\sin \\theta_a = \\frac{\\sqrt{n_1^2 - n_2^2}}{n_0} \\]
For launching from air (\\( n_0 = 1 \\)):
\\[ \\theta_a = \\sin^{-1}\\left(\\sqrt{n_1^2 - n_2^2}\\right) \\]

**Numerical Aperture (NA):**
The light-gathering capacity of the optical fiber:
\\[ \\text{NA} = \\sin \\theta_a = \\sqrt{n_1^2 - n_2^2} \\approx n_1 \\sqrt{2\\Delta} \\]
where \\( \\Delta = \\frac{n_1 - n_2}{n_1} \\) is the fractional refractive index difference.`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Schrödinger Equations and Quantum Computing Intro',
    materialTitle: 'Time-Independent Schrödinger Equation, 1D Infinite Well & Qubits vs Classical Bits',
    materialType: 'text_documentary',
    sourceReference: 'Arthur Beizer Concepts of Modern Physics & DBATU Unit 3',
    chunks: [
      {
        sectionTitle: 'Schrödinger Wave Equations & Particle in a Box',
        pageNumber: 1,
        content: `### 1. Schrödinger Equations
- **Time-Dependent Equation:**
  \\[ -\\frac{\\hbar^2}{2m} \\nabla^2 \\Psi(r, t) + V(r, t) \\Psi(r, t) = i\\hbar \\frac{\\partial \\Psi(r, t)}{\\partial t} \\]
- **Time-Independent Equation (Stationary States):**
  \\[ \\frac{d^2 \\psi(x)}{dx^2} + \\frac{2m}{\\hbar^2} (E - V(x)) \\psi(x) = 0 \\]

### 2. Particle in an Infinite 1D Potential Box (\\( 0 \\le x \\le L \\))
Potential: \\( V(x) = 0 \\) for \\( 0 < x < L \\), and \\( V(x) = \\infty \\) elsewhere.
Boundary conditions: \\( \\psi(0) = 0 \\) and \\( \\psi(L) = 0 \\).
- **Energy Eigenvalues (Quantized):**
  \\[ E_n = \\frac{n^2 h^2}{8 m L^2} = \\frac{n^2 \\pi^2 \\hbar^2}{2 m L^2}, \\quad n = 1, 2, 3, \\dots \\]
- **Zero-Point Energy:** \\( E_1 = \\frac{h^2}{8mL^2} > 0 \\) (particle can never be at absolute rest, adhering to Heisenberg's Uncertainty Principle).
- **Normalized Wavefunction:**
  \\[ \\psi_n(x) = \\sqrt{\\frac{2}{L}} \\sin\\left(\\frac{n \\pi x}{L}\\right) \\]`
      },
      {
        sectionTitle: 'Introduction to Quantum Computing (Bits vs Qubits)',
        pageNumber: 2,
        content: `### 3. Quantum Computing Foundations
- **Classical Bit:** Binary unit existing deterministically as either state \\( 0 \\) or state \\( 1 \\).
- **Quantum Qubit:** A two-level quantum mechanical state represented via Dirac bra-ket notation as a coherent linear superposition:
  \\[ |\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle \\]
  where \\( \\alpha, \\beta \\in \\mathbb{C} \\) are probability amplitudes satisfying the normalization constraint:
  \\[ |\\alpha|^2 + |\\beta|^2 = 1 \\]
  Here \\( |\\alpha|^2 \\) is probability of measuring state \\( 0 \\), and \\( |\\beta|^2 \\) is probability of measuring state \\( 1 \\).

- **Exponential State Space Scaling:**
  While \\( n \\) classical bits hold exactly 1 of \\( 2^n \\) numbers at any single instant, \\( n \\) entangled qubits hold all \\( 2^n \\) states simultaneously in superposition, enabling massive quantum parallelism (Shor's algorithm for factoring, Grover's algorithm for database searching).`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Semiconductors and Hall Effect',
    materialTitle: 'Intrinsic/Extrinsic Conductivity, Hall Voltage Derivation & Carrier Measurement',
    materialType: 'text_documentary',
    sourceReference: 'Charles Kittel Solid State Physics & DBATU Unit 5',
    chunks: [
      {
        sectionTitle: 'Hall Effect Principle & Hall Coefficient Derivation',
        pageNumber: 1,
        content: `### 1. The Hall Effect
When a current-carrying conductor or semiconductor is placed in a transverse magnetic field, a potential difference (the **Hall Voltage** \\( V_H \\)) is generated across the specimen in a direction perpendicular to both the electric current and the magnetic field.

### 2. Mathematical Derivation of Hall Coefficient
Let a semiconductor slab of thickness \\( t \\) and width \\( w \\) carry current \\( I \\) along the X-direction while subjected to uniform magnetic field \\( B \\) along the Z-direction.
Charge carriers moving with drift velocity \\( v_d \\) experience a Lorentz force:
\\[ F_m = -e (v_d \\times B) \\]
Accumulation of charges creates a transverse electric field \\( E_H \\) (Hall field) exerting an opposing electrostatic force \\( F_e = -e E_H \\).
At steady state equilibrium:
\\[ e E_H = e v_d B \\implies E_H = v_d B \\]

Current density is \\( J = n e v_d \\implies v_d = \\frac{J}{ne} \\).
Substituting into the equilibrium condition:
\\[ E_H = \\frac{J B}{ne} = R_H J B \\]
where \\( R_H = \\frac{1}{ne} \\) is the **Hall Coefficient**.

Since \\( V_H = E_H w \\) and \\( J = \\frac{I}{w \\cdot t} \\):
\\[ V_H = \\frac{R_H I B}{t} \\implies R_H = \\frac{V_H t}{I B} \\]

### 3. Engineering Applications of Hall Effect
1. Determination of semiconductor carrier type: \\( R_H > 0 \\implies \\text{P-type (holes)} \\); \\( R_H < 0 \\implies \\text{N-type (electrons)} \\).
2. Calculation of carrier concentration: \\( n = \\frac{1}{e |R_H|} \\).
3. Measurement of carrier mobility: \\( \\mu = \\sigma |R_H| \\).
4. Non-contact Hall effect magnetic field sensors and brushless DC motor commutators.`
      }
    ]
  },

  // -------------------------------------------------------------
  // BEE: AC Circuits, Diodes, BJT, Instrumentation
  // -------------------------------------------------------------
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'AC Circuits and Series RLC Resonance',
    materialTitle: 'Sinusoidal Steady State, Impedance Phasor, Series RLC Resonance and Q-Factor',
    materialType: 'text_documentary',
    sourceReference: 'D.P. Kothari & I.J. Nagrath Basic Electrical Engineering Chapter 3',
    chunks: [
      {
        sectionTitle: 'Series RLC Impedance & Power Factor',
        pageNumber: 1,
        content: `### 1. Series RLC Circuit Phasor Analysis
When a sinusoidal voltage \\( v(t) = V_m \\sin(\\omega t) \\) is applied to a series combination of Resistor \\( R \\), Inductor \\( L \\), and Capacitor \\( C \\):
- Inductive Reactance: \\( X_L = \\omega L = 2\\pi f L \\) (voltage leads current by \\( 90^{\\circ} \\))
- Capacitive Reactance: \\( X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C} \\) (voltage lags current by \\( 90^{\\circ} \\))

**Complex Impedance:**
\\[ Z = R + j(X_L - X_C) = |Z| \\angle \\phi \\]
\\[ |Z| = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\phi = \\tan^{-1}\\left(\\frac{X_L - X_C}{R}\\right) \\]

**Power in AC Circuits:**
- Real / Active Power: \\( P = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi \\) (Watts)
- Reactive Power: \\( Q = V_{\\text{rms}} I_{\\text{rms}} \\sin\\phi \\) (VAR)
- Apparent Power: \\( S = V_{\\text{rms}} I_{\\text{rms}} \\) (VA)
- Power Factor: \\( \\text{PF} = \\cos\\phi = \\frac{R}{|Z|} \\)`
      },
      {
        sectionTitle: 'Series Resonance, Quality Factor & Bandwidth',
        pageNumber: 2,
        content: `### 2. Series Resonance Condition
Resonance occurs when the net reactive impedance is zero, meaning voltage and current are in phase:
\\[ X_L = X_C \\implies \\omega_r L = \\frac{1}{\\omega_r C} \\implies \\omega_r^2 = \\frac{1}{LC} \\]
**Resonant Frequency:**
\\[ f_r = \\frac{1}{2\\pi \\sqrt{LC}} \\quad (\\text{Hz}) \\]

**Characteristics at Series Resonance:**
1. Impedance is purely resistive and minimum: \\( Z_{\\min} = R \\).
2. Circuit current is maximum: \\( I_{\\max} = \\frac{V}{R} \\).
3. Power factor is unity (\\( \\cos\\phi = 1.0 \\)).

**Quality Factor (Q-Factor):**
Voltage magnification factor at resonance:
\\[ Q = \\frac{V_L}{V} = \\frac{\\omega_r L}{R} = \\frac{1}{\\omega_r C R} = \\frac{1}{R} \\sqrt{\\frac{L}{C}} \\]
**Bandwidth (BW):** \\( \\text{BW} = f_2 - f_1 = \\frac{f_r}{Q} = \\frac{R}{2\\pi L} \\).`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'PN Junction Diodes and Bridge Rectifiers',
    materialTitle: 'PN Diode Operation, Full-Wave Bridge Rectifier Performance & Ripple Factor',
    materialType: 'text_documentary',
    sourceReference: 'Boylestad Electronic Devices and Circuit Theory Chapter 2',
    chunks: [
      {
        sectionTitle: 'Full-Wave Bridge Rectifier Circuit Analysis',
        pageNumber: 1,
        content: `### 1. Full-Wave Bridge Rectifier
A bridge rectifier uses four diodes (\\( D_1, D_2, D_3, D_4 \\)) arranged in a bridge network across a step-down transformer secondary.

**Working Principle:**
- **Positive Half-Cycle (0 to \\(\\pi\\)):** Terminal A is positive relative to B. Diodes \\( D_1 \\) and \\( D_3 \\) are forward biased and conduct, while \\( D_2 \\) and \\( D_4 \\) are reverse biased. Current flows through load resistor \\( R_L \\) from top to bottom.
- **Negative Half-Cycle (\\(\\pi\\) to \\(2\\pi\\)):** Terminal B is positive relative to A. Diodes \\( D_2 \\) and \\( D_4 \\) are forward biased and conduct, while \\( D_1 \\) and \\( D_3 \\) are reverse biased. Current continues to flow through load resistor \\( R_L \\) in the exact same direction.

### 2. Quantitative Performance Metrics
1. **Average DC Output Voltage:**
   \\[ V_{dc} = \\frac{2 V_m}{\\pi} \\approx 0.636 V_m \\]
2. **Average DC Output Current:**
   \\[ I_{dc} = \\frac{2 I_m}{\\pi} \\]
3. **RMS Output Voltage:**
   \\[ V_{\\text{rms}} = \\frac{V_m}{\\sqrt{2}} \\approx 0.707 V_m \\]
4. **Ripple Factor (\\( r \\)):**
   \\[ r = \\sqrt{\\left(\\frac{V_{\\text{rms}}}{V_{dc}}\\right)^2 - 1} = \\sqrt{\\left(\\frac{\\pi}{2\\sqrt{2}}\\right)^2 - 1} = \\sqrt{1.233 - 1} = 0.482 \\quad (48.2\\%) \\]
5. **Rectification Efficiency (\\( \\eta \\)):**
   \\[ \\eta = \\frac{P_{dc}}{P_{ac}} = \\frac{8}{\\pi^2} \\times 100 \\% = 81.2 \\% \\]
6. **Peak Inverse Voltage (PIV):** \\( \\text{PIV} = V_m \\) (half the PIV requirement of center-tapped rectifiers).`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'Bipolar Junction Transistors (BJT) Characteristics',
    materialTitle: 'BJT Working, CE Input/Output Characteristics, DC Load Line & Q-Point',
    materialType: 'text_documentary',
    sourceReference: 'Millman Halkias Electronic Devices and Circuits',
    chunks: [
      {
        sectionTitle: 'BJT Current Amplification & CE Output Characteristics',
        pageNumber: 1,
        content: `### 1. Transistor Configurations & Current Relations
In an NPN transistor, total emitter current equals sum of base and collector currents:
\\[ I_E = I_B + I_C \\]
- Common Base current gain: \\( \\alpha = \\frac{I_C}{I_E} \\) (typically 0.95 - 0.998)
- Common Emitter current gain: \\( \\beta = \\frac{I_C}{I_B} \\) (typically 20 - 500)
- Relationship: \\( \\beta = \\frac{\\alpha}{1 - \\alpha}, \\quad \\alpha = \\frac{\\beta}{1 + \\beta} \\)

### 2. Common Emitter (CE) Output Characteristics
Plot of \\( I_C \\) vs \\( V_{CE} \\) for discrete values of constant base current \\( I_B \\):
1. **Active Region (Linear Amplification):** Emitter-Base junction forward biased, Collector-Base junction reverse biased. Collector current depends almost solely on \\( I_B \\): \\( I_C = \\beta I_B \\).
2. **Saturation Region:** Both junctions forward biased (\\( V_{CE} < 0.2 \\text{ V} \\)). Transistor acts as an ON switch.
3. **Cutoff Region:** Both junctions reverse biased (\\( I_B = 0, I_C = I_{CEO} \\)). Transistor acts as an OFF switch.

### 3. DC Load Line and Q-Point
Applying KVL to the collector-emitter loop:
\\[ V_{CC} - I_C R_C - V_{CE} = 0 \\implies I_C = -\\frac{1}{R_C} V_{CE} + \\frac{V_{CC}}{R_C} \\]
- **Y-Intercept (Saturation):** \\( V_{CE} = 0 \\implies I_C = \\frac{V_{CC}}{R_C} \\)
- **X-Intercept (Cutoff):** \\( I_C = 0 \\implies V_{CE} = V_{CC} \\)
The intersection of the DC load line with the specified \\( I_B \\) curve establishes the quiescent **Operating Point (Q-Point)** \\( (V_{CEQ}, I_{CQ}) \\).`
      }
    ]
  },

  // -------------------------------------------------------------
  // BCME: Surveying & Machine Elements
  // -------------------------------------------------------------
  {
    subjectCode: '24AF2CMEES208',
    topicTitle: 'Surveying Principles, Levelling and Contours',
    materialTitle: 'Principles of Surveying, Differential Levelling, Reduced Level (RL) & Contours',
    materialType: 'text_documentary',
    sourceReference: 'Kanetkar & Kulkarni Surveying and Levelling & B.C. Punmia',
    chunks: [
      {
        sectionTitle: 'Principles of Surveying and Height of Instrument Levelling',
        pageNumber: 1,
        content: `### 1. Fundamental Principles of Surveying
1. **To work from the whole to the part:** Establish a primary framework of highly accurate control stations, then detail interior features to localize and prevent accumulation of errors.
2. **To fix the position of new stations by at least two independent measurements:** Either two linear distances, two angular bearings, or one distance and one angle.

### 2. Differential Levelling & Computation of Reduced Levels (RL)
**Levelling Terms:**
- **Datum:** Reference arbitrary surface from which heights are measured (Mean Sea Level MSL).
- **Bench Mark (BM):** Fixed reference point of known Reduced Level.
- **Back Sight (BS):** First staff reading taken after setting up instrument.
- **Fore Sight (FS):** Last staff reading taken before moving instrument.
- **Intermediate Sight (IS):** Any staff reading between BS and FS.

**Height of Instrument (HI) Method Equations:**
\\[ \\text{HI} = \\text{RL of BM} + \\text{BS} \\]
\\[ \\text{RL of intermediate point} = \\text{HI} - \\text{IS} \\]
\\[ \\text{RL of change point} = \\text{HI} - \\text{FS} \\]
**Arithmetic Check:**
\\[ \\sum \\text{BS} - \\sum \\text{FS} = \\text{Last RL} - \\text{First RL} \\]`
      }
    ]
  },

  // -------------------------------------------------------------
  // EG: Projections of Planes & Isometric Views
  // -------------------------------------------------------------
  {
    subjectCode: '24AF2EGRES204',
    topicTitle: 'Orthographic Views & Isometric Drawings',
    materialTitle: 'First-Angle Orthographic Principles, Isometric Scale Derivation and 3D Construction',
    materialType: 'text_documentary',
    sourceReference: 'N.D. Bhatt Engineering Drawing Chapter 15 & 17',
    chunks: [
      {
        sectionTitle: 'Derivation of Isometric Scale',
        pageNumber: 1,
        content: `### 1. Isometric Projection Principles
In isometric projection, all three principal axes making mutually equal angles of \\( 120^{\\circ} \\) with each other are foreshortened equally.

**Derivation of Isometric Scale:**
Let a square face be tilted so its edges make equal angles with the projection plane.
In the true scale construction triangle \\( \\triangle OAB \\), the angle with horizontal is \\( 45^{\\circ} \\).
In the isometric projection triangle \\( \\triangle OA'B \\), the angle with horizontal is \\( 30^{\\circ} \\).
Since edge \\( OB \\) is common:
\\[ \\cos 45^{\\circ} = \\frac{OB}{\\text{True Length (TL)}} = \\frac{1}{\\sqrt{2}} \\implies \\text{TL} = \\sqrt{2} \\cdot OB \\]
\\[ \\cos 30^{\\circ} = \\frac{OB}{\\text{Isometric Length (IL)}} = \\frac{\\sqrt{3}}{2} \\implies \\text{IL} = \\frac{2}{\\sqrt{3}} \\cdot OB \\]
Ratio:
\\[ \\frac{\\text{Isometric Length}}{\\text{True Length}} = \\frac{2/\\sqrt{3}}{\\sqrt{2}} = \\sqrt{\\frac{2}{3}} = \\frac{\\sqrt{2}}{\\sqrt{3}} \\approx 0.816 \\quad (81.6\\%) \\]

- **Isometric Projection:** Uses foreshortened Isometric Length (\\( 0.816 \\times TL \\)).
- **Isometric View / Drawing:** Drawn directly using full True Length (\\( 100\\% \\)) for drafting convenience.`
      }
    ]
  },

  // -------------------------------------------------------------
  // EEE: Renewable Energy & Power Plants
  // -------------------------------------------------------------
  {
    subjectCode: '24AF1EEEES209',
    topicTitle: 'Solar, Wind, Tidal, Biomass and Geothermal Energy',
    materialTitle: 'Renewable Power Systems: Solar PV IV Curve, Wind Betz Limit, and Biogas Digesters',
    materialType: 'text_documentary',
    sourceReference: 'A. Chakrabarti Power System Engineering & DBATU Unit 3 EEE',
    chunks: [
      {
        sectionTitle: 'Solar Photovoltaics and Wind Power Betz Limit',
        pageNumber: 1,
        content: `### 1. Solar Photovoltaic (PV) Technology
Solar cells convert sunlight directly into DC electricity via the photovoltaic effect at semiconductor P-N junctions.
- **Maximum Power Point (MPP):** The operating point on the I-V curve where product \\( P = V \\times I \\) reaches peak value \\( P_{\\max} \\).
- **Fill Factor (FF):**
  \\[ \\text{FF} = \\frac{V_{mp} I_{mp}}{V_{oc} I_{sc}} \\]
  where \\( V_{oc} \\) is open-circuit voltage and \\( I_{sc} \\) is short-circuit current.
- **Conversion Efficiency:** \\( \\eta = \\frac{P_{\\max}}{P_{\\text{in}} \\cdot A} \\times 100\\% \\).

### 2. Wind Power & Betz Limit
Kinetic energy of air mass \\( m \\) moving with velocity \\( v \\) through rotor area \\( A \\):
\\[ P_{\\text{wind}} = \\frac{1}{2} \\rho A v^3 \\]
where \\( \\rho \\approx 1.225 \\text{ kg/m}^3 \\) is air density.
**The Betz Limit:** No wind turbine can capture more than \\( \\frac{16}{27} \\approx 59.3\\% \\) of the kinetic energy in wind.`
      }
    ]
  },

  // -------------------------------------------------------------
  // DT: Kolb's Learning & Prototyping
  // -------------------------------------------------------------
  {
    subjectCode: '24AF1000VS211',
    topicTitle: 'Kolb’s Learning Styles & Memory Processes',
    materialTitle: 'Experiential Learning Cycle, Cognitive Architecture, and Retention Optimization',
    materialType: 'text_documentary',
    sourceReference: 'David Kolb Experiential Learning & DBATU Design Thinking Unit 1',
    chunks: [
      {
        sectionTitle: 'Kolb’s 4-Stage Learning Cycle and Student Learning Styles',
        pageNumber: 1,
        content: `### 1. Kolb's Experiential Learning Theory
Learning is the process whereby knowledge is created through the transformation of experience across two axes: Grasping Experience (Concrete vs Abstract) and Transforming Experience (Reflective vs Active).

**The 4-Stage Cycle:**
1. **Concrete Experience (CE):** Experiencing or feeling an activity firsthand.
2. **Reflective Observation (RO):** Reflecting on and analyzing the experience.
3. **Abstract Conceptualization (AC):** Concluding, theorizing, and forming models.
4. **Active Experimentation (AE):** Planning and testing newly formed concepts in practical situations.

**The Four Learning Styles:**
- **Diverging (CE + RO):** Imaginative, sees multiple perspectives, brainstorms effectively.
- **Assimilating (AC + RO):** Logically sound theories, inductive reasoning, values conceptual accuracy.
- **Converging (AC + AE):** Practical application of ideas, problem solving, decision making.
- **Accommodating (CE + AE):** Hands-on trial and error, action-oriented, adapts to changing facts.`
      }
    ]
  },

  // -------------------------------------------------------------
  // IKS: Mathematics, Astronomy & Metallurgy
  // -------------------------------------------------------------
  {
    subjectCode: '24AF1000IK210',
    topicTitle: 'Sulba Sutras, Decimal System & Calculus Origins',
    materialTitle: 'Ancient Indian Mathematical Contributions: Sulba Geometry, Zero, and Madhava Series',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IKS Unit 2 Curriculum & Bibhutibhusan Datta History of Hindu Mathematics',
    chunks: [
      {
        sectionTitle: 'Sulba Sutras Geometry and Baudhayana Theorem',
        pageNumber: 1,
        content: `### 1. Sulba Sutra Geometry (800 - 500 BCE)
The Sulba Sutras (Baudhayana, Apastamba, Katyayana) are mathematical texts specifying geometric constructions for Vedic sacrificial altars (Yajna Vedis).

**Baudhayana's Theorem (Pythagorean Theorem):**
\\[ d^2 = l^2 + b^2 \\]
Stated centuries before Pythagoras in Baudhayana Sulba Sutra 1.48:
*"The rope stretched across the diagonal of a rectangle produces by itself what the lengths and breadths of its two sides produce together."*

**Approximation of \\( \\sqrt{2} \\):**
Baudhayana gave the approximation:
\\[ \\sqrt{2} \\approx 1 + \\frac{1}{3} + \\frac{1}{3 \\times 4} - \\frac{1}{3 \\times 4 \\times 34} = \\frac{577}{408} \\approx 1.4142156 \\dots \\]
accurate to 5 decimal places.`
      },
      {
        sectionTitle: 'Madhava of Sangamagrama & Kerala School Calculus Origins',
        pageNumber: 2,
        content: `### 2. Madhava's Infinite Power Series (14th Century CE)
Over 250 years before Gregory, Leibniz, and Newton, Madhava of Sangamagrama developed infinite series expansions for trigonometric functions:

**Madhava-Leibniz Series for \\( \\pi \\):**
\\[ \\frac{\\pi}{4} = 1 - \\frac{1}{3} + \\frac{1}{5} - \\frac{1}{7} + \\dots = \\sum_{n=0}^{\\infty} \\frac{(-1)^n}{2n + 1} \\]

**Madhava-Taylor Series for Sine and Cosine:**
\\[ \\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\dots \\]
\\[ \\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\dots \\]
These formulations used infinitesimals and limiting summation processes (Yukti), constituting the true historical genesis of modern calculus.`
      }
    ]
  },

  // -------------------------------------------------------------
  // CC-IPD: Service, Failures & Life Mastery
  // -------------------------------------------------------------
  {
    subjectCode: '24AF1000CC212A',
    topicTitle: 'Selfless Service & Disaster Relief Case Study',
    materialTitle: 'Civic Character, Altruism (Seva), and Gujarat 2001 Bhuj Earthquake Relief Case Study',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IPDC Workbook Unit 1 BAPS Swaminarayan Sanstha',
    chunks: [
      {
        sectionTitle: 'Principles of Selfless Service & Disaster Management Case Study',
        pageNumber: 1,
        content: `### 1. Philosophy of Seva (Selfless Action)
Service without expectation of personal recognition or material return (Nishkama Karma) transforms individual character, cultivates empathy, and builds social resilience.

### 2. Case Study: 2001 Bhuj (Gujarat) Earthquake Relief
On January 26, 2001, a catastrophic 7.7 magnitude earthquake struck Kutch, Gujarat, causing over 20,000 deaths and widespread destruction.
**Volunteer Mobilization & Disaster Response Framework:**
1. **Immediate First Response (0 - 48 Hours):** Mobilization of over 5,000 disciplined volunteers. Setting up community kitchens serving 40,000 hot meals daily, rapid first-aid triage, and clearing collapsed debris.
2. **Medical & Trauma Relief:** Establishing makeshift field operating theaters and distributing emergency medical kits. Providing psychological trauma counseling to displaced families.
3. **Reconstruction & Holistic Rehabilitation:** Rebuilding entire model villages (e.g. Bhuj, Anjar) with earthquake-resistant RCC structures, schools, and solar community lighting with absolute transparency and zero corruption.`
      }
    ]
  },
  {
    subjectCode: '24AF1000CC212A',
    topicTitle: 'Stress Management & Health Optimization',
    materialTitle: 'Neurobiology of Stress, Cortisol Regulation, Cognitive Restructuring, and Sleep Hygiene',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IPDC Workbook Unit 2 BAPS Swaminarayan Sanstha',
    chunks: [
      {
        sectionTitle: 'Physiology of Stress and Evidence-Based Mitigation',
        pageNumber: 1,
        content: `### 1. Neurobiology of Stress
Under perceived academic or life pressure, the Hypothalamic-Pituitary-Adrenal (HPA) axis activates, releasing epinephrine and cortisol. While acute stress enhances alertness, chronic cortisol elevation impairs neurogenesis in the hippocampus, degrading working memory and executive cognitive performance.

### 2. Comprehensive Stress Mitigation Toolkit
1. **Physiological Sigh Breathing:** Two quick nasal inhalations followed by a slow, prolonged oral exhalation activates the parasympathetic nervous system via the vagus nerve, rapidly lowering heart rate within 30 seconds.
2. **Cognitive Restructuring:** Identifying cognitive distortions (catastrophizing, all-or-nothing thinking) and reframing obstacles into solvable micro-steps.
3. **Sleep Architecture & Circadian Hygiene:** Maintaining 7 to 8 hours of consistent sleep ensures complete Non-REM slow-wave sleep and REM cycles, which are critical for neural consolidation of engineering mathematical concepts and emotional reset.`
      }
    ]
  }
];
