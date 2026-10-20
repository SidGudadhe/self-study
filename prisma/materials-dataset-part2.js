// Comprehensive study dataset Part 2 covering the remaining 33 topics across DBATU Semester 1 curriculum
// Brings syllabus coverage to 100% (69/69 topics)

module.exports = [
  // -------------------------------------------------------------------------
  // 1. ENGINEERING MATHEMATICS - I (24AF1000BS101)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'First and Higher Order Partial Derivatives',
    materialTitle: 'Limit Definition, Mixed Partials, Schwarz’s Theorem & Algebraic Reductions',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Sec 9.2 & B.S. Grewal Chapter 5',
    chunks: [
      {
        sectionTitle: 'Definition of Partial Derivatives & Schwarz’s Equality',
        pageNumber: 1,
        content: `### 1. Mathematical Definition of Partial Derivatives
Let \\( z = f(x, y) \\) be a function of two independent variables defined on an open region in \\( \\mathbb{R}^2 \\).
The first-order partial derivative of \\( f \\) with respect to \\( x \\) at point \\( (x, y) \\) is defined as:
\\[ \\frac{\\partial f}{\\partial x} = f_x(x, y) = \\lim_{h \\to 0} \\frac{f(x + h, y) - f(x, y)}{h} \\]
Similarly, with respect to \\( y \\):
\\[ \\frac{\\partial f}{\\partial y} = f_y(x, y) = \\lim_{k \\to 0} \\frac{f(x, y + k) - f(x, y)}{k} \\]

### 2. Higher Order Partial Derivatives & Schwarz’s Theorem
Second-order partial derivatives are obtained by successive differentiation:
\\[ f_{xx} = \\frac{\\partial^2 f}{\\partial x^2} = \\frac{\\partial}{\\partial x}\\left(\\frac{\\partial f}{\\partial x}\\right), \\quad f_{yy} = \\frac{\\partial^2 f}{\\partial y^2} = \\frac{\\partial}{\\partial y}\\left(\\frac{\\partial f}{\\partial y}\\right) \\]
**Schwarz’s Theorem (Clairaut’s Theorem on Mixed Partials):**
If the mixed partial derivatives \\( f_{xy} = \\frac{\\partial^2 f}{\\partial y \\partial x} \\) and \\( f_{yx} = \\frac{\\partial^2 f}{\\partial x \\partial y} \\) exist and are continuous on a neighborhood of \\( (a, b) \\), then they are identically equal:
\\[ \\frac{\\partial^2 f}{\\partial y \\partial x} = \\frac{\\partial^2 f}{\\partial x \\partial y} \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Total Derivatives and Change of Variables',
    materialTitle: 'Total Differential, Multivariable Chain Rule & Polar Coordinate Transformation',
    materialType: 'text_documentary',
    sourceReference: 'B.S. Grewal Chapter 5 Sec 5.4',
    chunks: [
      {
        sectionTitle: 'Total Differential & Chain Rule Formulations',
        pageNumber: 1,
        content: `### 1. Total Differential
The total differential of \\( u = f(x, y, z) \\) is the linear approximation:
\\[ du = \\frac{\\partial u}{\\partial x} dx + \\frac{\\partial u}{\\partial y} dy + \\frac{\\partial u}{\\partial z} dz \\]

### 2. Chain Rule for Composite Functions
- **Case 1 (Single Independent Parameter):** If \\( u = f(x, y) \\) where \\( x = \\phi(t), y = \\psi(t) \\):
  \\[ \\frac{du}{dt} = \\frac{\\partial u}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial u}{\\partial y} \\frac{dy}{dt} \\]
- **Case 2 (Multiple Independent Parameters):** If \\( u = f(x, y) \\) where \\( x = x(r, \\theta), y = y(r, \\theta) \\):
  \\[ \\frac{\\partial u}{\\partial r} = \\frac{\\partial u}{\\partial x} \\frac{\\partial x}{\\partial r} + \\frac{\\partial u}{\\partial y} \\frac{\\partial y}{\\partial r}, \\quad \\frac{\\partial u}{\\partial \\theta} = \\frac{\\partial u}{\\partial x} \\frac{\\partial x}{\\partial \\theta} + \\frac{\\partial u}{\\partial y} \\frac{\\partial y}{\\partial \\theta} \\]

### 3. Implicit Function Differentiation
If \\( F(x, y) = 0 \\), taking total differential gives \\( F_x dx + F_y dy = 0 \\):
\\[ \\frac{dy}{dx} = -\\frac{F_x}{F_y} \\quad (F_y \\neq 0) \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Taylor’s and Maclaurin’s Theorems for Two Variables',
    materialTitle: 'Bivariate Taylor Series Expansion, Polynomial Approximations & Maclaurin Forms',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Sec 9.4 & DBATU Unit 3',
    chunks: [
      {
        sectionTitle: 'Bivariate Taylor Theorem Statement and Formula',
        pageNumber: 1,
        content: `### 1. Statement of Taylor’s Theorem for Two Variables
Let \\( f(x, y) \\) possess continuous partial derivatives of order up to \\( n \\) in an open region containing point \\( (a, b) \\).
For increments \\( h = x - a \\) and \\( k = y - b \\):
\\[ f(a+h, b+k) = f(a, b) + \\left( h \\frac{\\partial}{\\partial x} + k \\frac{\\partial}{\\partial y} \\right) f(a, b) + \\frac{1}{2!} \\left( h \\frac{\\partial}{\\partial x} + k \\frac{\\partial}{\\partial y} \\right)^2 f(a, b) + \\dots + R_n \\]

Expanding the differential operator powers:
\\[ f(x, y) = f(a, b) + [h f_x + k f_y] + \\frac{1}{2!} [h^2 f_{xx} + 2hk f_{xy} + k^2 f_{yy}] + \\frac{1}{3!} [h^3 f_{xxx} + 3h^2k f_{xxy} + 3hk^2 f_{xyy} + k^3 f_{yyy}] + \\dots \\]

### 2. Maclaurin’s Theorem (Expansion about Origin \\( (0, 0) \\))
Setting \\( a = 0, b = 0 \\) (so \\( h = x, k = y \\)):
\\[ f(x, y) = f(0, 0) + [x f_x(0,0) + y f_y(0,0)] + \\frac{1}{2!} [x^2 f_{xx}(0,0) + 2xy f_{xy}(0,0) + y^2 f_{yy}(0,0)] + \\dots \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Lagrange’s Method of Undetermined Multipliers',
    materialTitle: 'Constrained Optimization of Multivariable Functions via Lagrange Multipliers',
    materialType: 'text_documentary',
    sourceReference: 'B.S. Grewal Chapter 5 Sec 5.11 & Kreyszig',
    chunks: [
      {
        sectionTitle: 'Lagrange Multiplier Formulation & Algorithmic Procedure',
        pageNumber: 1,
        content: `### 1. The Constrained Optimization Problem
To find the stationary values of objective function \\( u = f(x, y, z) \\) subject to constraint condition \\( \\phi(x, y, z) = 0 \\).

### 2. Lagrange Multiplier Formulation
Construct the auxiliary Lagrange function:
\\[ F(x, y, z, \\lambda) = f(x, y, z) + \\lambda \\phi(x, y, z) \\]
where \\( \\lambda \\) is an undetermined parameter called **Lagrange's Multiplier**.
Equating the first partial derivatives of \\( F \\) to zero yields the Lagrange stationary equations:
\\[ \\frac{\\partial F}{\\partial x} = \\frac{\\partial f}{\\partial x} + \\lambda \\frac{\\partial \\phi}{\\partial x} = 0 \\]
\\[ \\frac{\\partial F}{\\partial y} = \\frac{\\partial f}{\\partial y} + \\lambda \\frac{\\partial \\phi}{\\partial y} = 0 \\]
\\[ \\frac{\\partial F}{\\partial z} = \\frac{\\partial f}{\\partial z} + \\lambda \\frac{\\partial \\phi}{\\partial z} = 0 \\]
\\[ \\frac{\\partial F}{\\partial \\lambda} = \\phi(x, y, z) = 0 \\]

Solving these four simultaneous equations yields the optimal coordinates \\( (x, y, z) \\) and multiplier \\( \\lambda \\).`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Wallis and Reduction Formulae',
    materialTitle: 'Definite Integral Reduction Formulae & Wallis Theorem for Sin^n(x) and Cos^n(x)',
    materialType: 'text_documentary',
    sourceReference: 'B.S. Grewal Chapter 7 & P.N. Wartikar Applied Mathematics',
    chunks: [
      {
        sectionTitle: 'Reduction Formulae Derivation & Wallis Theorem',
        pageNumber: 1,
        content: `### 1. Reduction Formula for \\( \\int \\sin^n x dx \\)
Integrating by parts with \\( u = \\sin^{n-1}x \\) and \\( dv = \\sin x dx \\):
\\[ I_n = -\\sin^{n-1}x \\cos x + (n-1) \\int \\sin^{n-2}x \\cos^2 x dx \\]
Using \\( \\cos^2 x = 1 - \\sin^2 x \\):
\\[ I_n = -\\sin^{n-1}x \\cos x + (n-1) I_{n-2} - (n-1) I_n \\implies n I_n = -\\sin^{n-1}x \\cos x + (n-1) I_{n-2} \\]
\\[ \\int \\sin^n x dx = -\\frac{\\sin^{n-1}x \\cos x}{n} + \\frac{n-1}{n} \\int \\sin^{n-2}x dx \\]

### 2. Wallis’ Formula for Definite Integrals
Evaluating between limits \\( 0 \\) to \\( \\pi/2 \\):
\\[ \\int_0^{\\pi/2} \\sin^n x dx = \\int_0^{\\pi/2} \\cos^n x dx = \\begin{cases} \\frac{n-1}{n} \\cdot \\frac{n-3}{n-2} \\dots \\frac{1}{2} \\cdot \\frac{\\pi}{2} & \\text{if } n \\text{ is even} \\\\[6pt] \\frac{n-1}{n} \\cdot \\frac{n-3}{n-2} \\dots \\frac{2}{3} \\cdot 1 & \\text{if } n \\text{ is odd} \\end{cases} \\]

### 3. Combined Wallis Formula for \\( \\int_0^{\\pi/2} \\sin^m x \\cos^n x dx \\)
\\[ \\int_0^{\\pi/2} \\sin^m x \\cos^n x dx = \\frac{[(m-1)(m-3)\\dots(1 \\text{ or } 2)][(n-1)(n-3)\\dots(1 \\text{ or } 2)]}{(m+n)(m+n-2)\\dots(1 \\text{ or } 2)} \\times K \\]
where \\( K = \\frac{\\pi}{2} \\) if both \\( m \\) and \\( n \\) are even; \\( K = 1 \\) otherwise.`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Tracing of Standard Curves',
    materialTitle: 'Systematic Tracing of Cartesian, Parametric, and Polar Curves',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Mathematics I Unit 4 & B.S. Grewal',
    chunks: [
      {
        sectionTitle: 'Cartesian & Polar Curve Tracing Protocols',
        pageNumber: 1,
        content: `### 1. Protocol for Tracing Cartesian Curves \\( f(x, y) = 0 \\)
1. **Symmetry:**
   - Even powers of \\( y \\implies \\) Symmetric about X-axis.
   - Even powers of \\( x \\implies \\) Symmetric about Y-axis.
   - Opposite signs \\( f(-x, -y) = f(x, y) \\implies \\) Symmetric in opposite quadrants.
   - Interchanging \\( x \\leftrightarrow y \\) leaves equation unchanged \\( \\implies \\) Symmetric about line \\( y = x \\).
2. **Origin & Tangents at Origin:**
   - If no constant term exists, curve passes through origin \\( (0, 0) \\).
   - Tangents at origin are obtained by equating lowest degree terms to zero.
3. **Asymptotes:**
   - Parallel to X-axis: equate coefficient of highest power of \\( x \\) to zero.
   - Parallel to Y-axis: equate coefficient of highest power of \\( y \\) to zero.
4. **Region of Existence:** Determine intervals where \\( y \\) becomes imaginary or undefined.

### 2. Standard Benchmark Engineering Curves
- **Folium of Descartes:** \\( x^3 + y^3 = 3axy \\) (loop in first quadrant, asymptote \\( x + y + a = 0 \\)).
- **Cissoid of Diocles:** \\( y^2(2a - x) = x^3 \\) (cusp at origin, asymptote \\( x = 2a \\)).
- **Cardioid:** \\( r = a(1 + \\cos\\theta) \\) (heart-shaped, symmetric about initial polar line).
- **Lemniscate of Bernoulli:** \\( r^2 = a^2 \\cos 2\\theta \\) (figure-eight shaped, symmetric about pole and polar axis).`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Change of Order of Integration',
    materialTitle: 'Reversal of Integration Limits, Region Decomposition and Double Integrals',
    materialType: 'text_documentary',
    sourceReference: 'Erwin Kreyszig Sec 10.3 & B.S. Grewal Chapter 7',
    chunks: [
      {
        sectionTitle: 'Principles and Step-by-Step Procedure for Reversing Order',
        pageNumber: 1,
        content: `### 1. Concept of Changing the Order of Integration
In evaluating \\( \\int_a^b \\int_{\\phi_1(x)}^{\\phi_2(x)} f(x, y) dy dx \\), integration is performed first with respect to \\( y \\) (along vertical strip) from \\( y = \\phi_1(x) \\) to \\( y = \\phi_2(x) \\), and then with respect to \\( x \\) from \\( x = a \\) to \\( x = b \\).
When the integrand is difficult or impossible to integrate with respect to \\( y \\) first (e.g. \\( \\frac{\\sin y}{y} \\) or \\( e^{-y^2} \\)), reversing the order of integration allows integration with respect to \\( x \\) first (along horizontal strip).

### 2. Step-by-Step Execution Procedure
1. **Identify the Given Limits & Boundary Curves:**
   Extract inner limits \\( y = \\phi_1(x) \\) and \\( y = \\phi_2(x) \\), and outer limits \\( x = a \\) and \\( x = b \\).
2. **Sketch the Region of Integration \\( R \\):**
   Plot the bounding curves and find points of intersection to clearly delimit \\( R \\).
3. **Change the Strip Orientation:**
   Convert the vertical strip into a horizontal strip extending from left boundary curve \\( x = \\psi_1(y) \\) to right boundary curve \\( x = \\psi_2(y) \\).
4. **Determine New Range for \\( y \\):**
   Slide the horizontal strip from the lowest elevation \\( y = c \\) to the highest elevation \\( y = d \\) in region \\( R \\).
5. **Formulate the Reversed Integral:**
   \\[ \\int_a^b \\int_{\\phi_1(x)}^{\\phi_2(x)} f(x, y) dy dx = \\int_c^d \\int_{\\psi_1(y)}^{\\psi_2(y)} f(x, y) dx dy \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000BS101',
    topicTitle: 'Triple Integrals and Geometric Applications',
    materialTitle: 'Volume of Enclosed 3D Domains, Cylindrical Transformations & Surface Areas',
    materialType: 'text_documentary',
    sourceReference: 'B.S. Grewal Chapter 7 Sec 7.7 & Kreyszig',
    chunks: [
      {
        sectionTitle: 'Triple Integrals & Volume Formulation',
        pageNumber: 1,
        content: `### 1. Triple Integral Definition
The triple integral of a continuous function \\( f(x, y, z) \\) over bounded three-dimensional solid domain \\( V \\) is defined as:
\\[ I = \\iiint_V f(x, y, z) dV = \\int_{x=a}^{x=b} \\left[ \\int_{y=\\phi_1(x)}^{y=\\phi_2(x)} \\left( \\int_{z=\\psi_1(x, y)}^{z=\\psi_2(x, y)} f(x, y, z) dz \\right) dy \\right] dx \\]
When \\( f(x, y, z) = 1 \\), the triple integral directly evaluates the volume of solid \\( V \\):
\\[ \\text{Volume}(V) = \\iiint_V dx dy dz \\]

### 2. Cylindrical and Spherical Transformations
- **Cylindrical Polar Coordinates (\\( r, \\theta, z \\)):**
  \\[ x = r \\cos\\theta, \\quad y = r \\sin\\theta, \\quad z = z \\]
  Volume element: \\( dV = r dr d\\theta dz \\).
- **Spherical Polar Coordinates (\\( r, \\theta, \\phi \\)):**
  \\[ x = r \\sin\\theta \\cos\\phi, \\quad y = r \\sin\\theta \\sin\\phi, \\quad z = r \\cos\\theta \\]
  Volume element: \\( dV = r^2 \\sin\\theta dr d\\theta d\\phi \\).`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 2. ENGINEERING PHYSICS (24AF2PHYBS202)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Dielectrics and Polarization Mechanisms',
    materialTitle: 'Dielectrics, Electric Dipoles, Polarization Mechanisms & Clausius-Mossotti Equation',
    materialType: 'text_documentary',
    sourceReference: 'David J. Griffiths Electrodynamics & Charles Kittel Solid State Physics',
    chunks: [
      {
        sectionTitle: 'Dielectric Polarization & Four Physical Mechanisms',
        pageNumber: 1,
        content: `### 1. Fundamental Dielectric Parameters
Dielectrics are electrical insulating materials that store electrostatic energy through internal electric dipole alignment without continuous conduction current.
- **Electric Susceptibility (\\( \\chi_e \\)):** \\( P = \\epsilon_0 \\chi_e E \\)
- **Relative Permittivity (\\( \\epsilon_r \\)):** \\( \\epsilon_r = 1 + \\chi_e \\)
- **Electric Displacement (\\( D \\)):** \\( D = \\epsilon_0 E + P = \\epsilon_0 \\epsilon_r E \\)

### 2. Four Polarization Mechanisms
1. **Electronic Polarization (\\( \\alpha_e \\)):** Displacement of negatively charged electron cloud relative to positive atomic nucleus in an applied field. Fast response (\\( 10^{-15} \\text{ s} \\)), independent of temperature.
   \\[ P_e = N \\alpha_e E = 4\\pi \\epsilon_0 R^3 N E \\]
2. **Ionic Polarization (\\( \\alpha_i \\)):** Relative displacement of positive and negative sub-lattice ions in ionic crystals (e.g. NaCl). Response time \\( 10^{-13} \\text{ s} \\), temperature independent.
3. **Orientational / Dipolar Polarization (\\( \\alpha_o \\)):** Alignment of permanent electric dipoles against thermal agitation (e.g. \\( H_2O, HCl \\)). Inversely proportional to temperature (Langevin-Debye law):
   \\[ \\alpha_o = \\frac{\\mu^2}{3kT} \\]
4. **Space Charge Polarization (\\( \\alpha_s \\)):** Accumulation of mobile charge carriers at grain boundaries or electrodes in multiphase ceramics. Slow response (\\( 10^{-2} - 10^3 \\text{ Hz} \\)).

**Clausius-Mossotti Equation:**
Relates macroscopic dielectric constant \\( \\epsilon_r \\) to microscopic atomic polarizability \\( \\alpha \\):
\\[ \\frac{\\epsilon_r - 1}{\\epsilon_r + 2} = \\frac{N \\alpha}{3 \\epsilon_0} \\]`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Wave-Particle Duality & Heisenberg’s Principle',
    materialTitle: 'De-Broglie Hypothesis, Phase/Group Velocity, Uncertainty Principle & Applications',
    materialType: 'text_documentary',
    sourceReference: 'Arthur Beizer Concepts of Modern Physics Chapter 3',
    chunks: [
      {
        sectionTitle: 'De-Broglie Matter Waves & Heisenberg Uncertainty',
        pageNumber: 1,
        content: `### 1. De-Broglie Hypothesis
Louis de Broglie postulated that dual particle-wave nature applies to matter: moving particles possess wave properties.
Wavelength of matter wave:
\\[ \\lambda = \\frac{h}{p} = \\frac{h}{mv} \\]
For an electron accelerated through electric potential difference \\( V \\) volts:
\\[ E = \\frac{p^2}{2m} = e V \\implies p = \\sqrt{2m e V} \\implies \\lambda = \\frac{h}{\\sqrt{2me V}} = \\frac{1.227}{\\sqrt{V}} \\text{ nm} \\]

### 2. Heisenberg’s Uncertainty Principle
It is physically impossible to measure simultaneously both the exact position and exact momentum of a quantum particle with arbitrary precision:
\\[ \\Delta x \\Delta p_x \\ge \\frac{\\hbar}{2} = \\frac{h}{4\\pi} \\]
Energy-Time uncertainty conjugate relation:
\\[ \\Delta E \\Delta t \\ge \\frac{\\hbar}{2} \\]

**Application: Non-Existence of Free Electrons in the Nucleus:**
Nuclear radius \\( R \\approx 10^{-14} \\text{ m} \\implies \\Delta x \\approx 10^{-14} \\text{ m} \\).
\\[ \\Delta p \\ge \\frac{\\hbar}{2 \\Delta x} \\approx \\frac{1.054 \\times 10^{-34}}{2 \\times 10^{-14}} \\approx 5.27 \\times 10^{-21} \\text{ kg}\\cdot\\text{m/s} \\]
Relativistic kinetic energy \\( E \\approx p c \\approx 9.8 \\text{ MeV} \\). Since beta decay electrons exhibit energies \\( < 4 \\text{ MeV} \\), free electrons cannot permanently reside within the nucleus.`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Crystallography and Miller Indices',
    materialTitle: 'Unit Cells, Atomic Packing Fraction (BCC vs FCC), Miller Indices & Interplanar Spacing',
    materialType: 'text_documentary',
    sourceReference: 'Charles Kittel Solid State Physics & DBATU Unit 4',
    chunks: [
      {
        sectionTitle: 'Cubic Crystal Systems & Atomic Packing Efficiency',
        pageNumber: 1,
        content: `### 1. Cubic Crystal Structures
- **Simple Cubic (SC):** Atoms per unit cell \\( n = 8 \\times \\frac{1}{8} = 1 \\). Coordination number = 6. Radius \\( r = a/2 \\). Atomic Packing Fraction (APF) = \\( 52.4\\% \\).
- **Body-Centered Cubic (BCC):** Atoms per unit cell \\( n = 8 \\times \\frac{1}{8} + 1 = 2 \\). Coordination number = 8. Body diagonal: \\( 4r = a\\sqrt{3} \\implies r = \\frac{a\\sqrt{3}}{4} \\).
  \\[ \\text{APF} = \\frac{2 \\times \\frac{4}{3}\\pi r^3}{a^3} = \\frac{\\pi\\sqrt{3}}{8} \\approx 68.0\\% \\]
  Example: Alpha-Iron (\\( \\alpha\\text{-Fe} \\)) at room temperature.
- **Face-Centered Cubic (FCC):** Atoms per unit cell \\( n = 8 \\times \\frac{1}{8} + 6 \\times \\frac{1}{2} = 4 \\). Coordination number = 12. Face diagonal: \\( 4r = a\\sqrt{2} \\implies r = \\frac{a\\sqrt{2}}{4} \\).
  \\[ \\text{APF} = \\frac{4 \\times \\frac{4}{3}\\pi r^3}{a^3} = \\frac{\\pi\\sqrt{2}}{6} \\approx 74.0\\% \\]
  Example: Aluminium (\\( \\text{Al} \\)), Copper (\\( \\text{Cu} \\)).

### 2. Miller Indices \\( (hkl) \\) & Interplanar Spacing
**Determination Steps:**
1. Find intercepts on axes in terms of lattice constants: \\( pa, qb, rc \\).
2. Take reciprocals of coefficients: \\( \\frac{1}{p}, \\frac{1}{q}, \\frac{1}{r} \\).
3. Clear fractions to obtain smallest coprime integers: \\( (h k l) \\).

**Interplanar Spacing Formula for Cubic Lattice:**
\\[ d_{hkl} = \\frac{a}{\\sqrt{h^2 + k^2 + l^2}} \\]
**Theoretical Crystal Density:**
\\[ \\rho = \\frac{n M}{N_A a^3} \\]
where \\( M \\) is molar mass and \\( N_A = 6.022 \\times 10^{23} \\text{ mol}^{-1} \\).`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Nuclear Physics and GM Counter',
    materialTitle: 'Mass Defect, Nuclear Binding Energy, Radiation Properties & Geiger-Müller Counter',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Engineering Physics Unit 4 & Arthur Beizer',
    chunks: [
      {
        sectionTitle: 'Nuclear Binding Energy & Geiger-Müller (GM) Counter',
        pageNumber: 1,
        content: `### 1. Nuclear Binding Energy
Mass defect \\( \\Delta m \\):
\\[ \\Delta m = [Z m_p + (A - Z) m_n] - M_{\\text{nucleus}} \\]
Nuclear Binding Energy by Einstein's mass-energy equivalence:
\\[ BE = \\Delta m \\times 931.5 \\text{ MeV} \\]
The curve of binding energy per nucleon (\\( BE/A \\)) peaks at \\( \\approx 8.8 \\text{ MeV} \\) for \\( ^{56}\\text{Fe} \\), driving nuclear fusion in light nuclei and nuclear fission in heavy nuclei.

### 2. Geiger-Müller (GM) Counter
**Construction:**
A cylindrical metallic cathode filled with an inert gas (Argon at \\( 90\\% \\), 10 kPa) mixed with a halogen or alcohol quench gas (\\( 10\\% \\)). A thin central tungsten wire serves as the anode maintained at \\( +1000 \\text{ to } +1500 \\text{ V} \\).

**Working Principle & Avalanche:**
Ionizing radiation entering through the thin mica window creates electron-ion pairs. The high radial electric field accelerates electrons toward the anode wire, causing secondary Townsend avalanches and UV photon emission that ionize the entire cylindrical gas volume, producing a uniform large voltage pulse independent of initial particle energy.

**Quenching Mechanism:** Halogen molecules (e.g. \\( \\text{Br}_2 \\)) neutralize argon ions via charge transfer, dissociating harmlessly and preventing false secondary discharges.`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Magnetic Materials and Hysteresis',
    materialTitle: 'Dia-, Para-, and Ferromagnetism, Domain Theory, and B-H Hysteresis Energy Loss',
    materialType: 'text_documentary',
    sourceReference: 'Charles Kittel Solid State Physics Chapter 11',
    chunks: [
      {
        sectionTitle: 'Magnetic Classifications & B-H Hysteresis Loop',
        pageNumber: 1,
        content: `### 1. Classification of Magnetic Materials
- **Diamagnetic:** No permanent atomic dipole moments. External field induces opposing orbital magnetic moments. Susceptibility \\( \\chi < 0 \\) (negative and small \\( \\sim -10^{-5} \\)), temperature-independent (e.g. Bismuth, Copper, Silicon).
- **Paramagnetic:** Possesses permanent atomic dipole moments oriented randomly by thermal agitation. \\( \\chi > 0 \\), inversely proportional to absolute temperature (Curie's Law: \\( \\chi = C/T \\)) (e.g. Aluminium, Platinum).
- **Ferromagnetic:** Spontaneous parallel dipole alignment within microscopic magnetic domains below Curie temperature \\( T_c \\) due to quantum mechanical exchange interactions. \\( \\chi \\gg 1 \\) (e.g. Iron, Cobalt, Nickel).

### 2. B-H Hysteresis Loop
Plot of magnetic flux density \\( B \\) versus magnetizing field strength \\( H \\):
- **Saturation Magnetization (\\( B_s \\)):** State where all magnetic domains are fully aligned with the applied field.
- **Retentivity / Remanence (\\( B_r \\)):** The residual magnetic induction remaining in the material when external field \\( H \\) is reduced to zero.
- **Coercivity (\\( H_c \\)):** The magnitude of reverse magnetic field required to demagnetize the material completely (reduce \\( B \\) to zero).
- **Hysteresis Loss:** Energy dissipated per unit volume per cycle equals the area enclosed by the B-H loop:
  \\[ W_h = \\oint B \\cdot dH = \\eta B_{\\max}^{1.6} \\quad (\\text{Steinmetz Formula}) \\]
  - Soft magnetic materials (Silicon steel): narrow loop, small \\( H_c \\), used in transformer cores.
  - Hard magnetic materials (Alnico): wide loop, large \\( H_c \\), used in permanent magnets.`
      }
    ]
  },
  {
    subjectCode: '24AF2PHYBS202',
    topicTitle: 'Superconductors and Nanomaterials',
    materialTitle: 'Meissner Effect, BCS Cooper Pairs, Type I/II Superconductors & Carbon Nanotubes',
    materialType: 'text_documentary',
    sourceReference: 'Charles Kittel & Thomas Varghese Nanotechnology',
    chunks: [
      {
        sectionTitle: 'Superconductivity & The Meissner Effect',
        pageNumber: 1,
        content: `### 1. Superconductivity Phenomena
Certain metals and alloys transition below a **Critical Temperature (\\( T_c \\))** into a quantum state of zero electrical DC resistance (\\( \\rho = 0 \\)).
- **Critical Magnetic Field:**
  \\[ H_c(T) = H_0 \\left[ 1 - \\left(\\frac{T}{T_c}\\right)^2 \\right] \\]
- **The Meissner Effect (Perfect Diamagnetism):**
  When cooled below \\( T_c \\) in the presence of an applied magnetic field, a superconductor completely expels all magnetic flux lines from its interior:
  \\[ B = \\mu_0 (H + M) = 0 \\implies M = -H \\implies \\chi = -1 \\]
  This distinguishes true superconductors from hypothetical perfect conductors.

- **Type-I vs Type-II Superconductors:**
  - **Type-I (Soft):** Exhibits single critical field \\( H_c \\); complete transition from superconducting to normal state.
  - **Type-II (Hard):** Exhibits two critical fields \\( H_{c1} \\) and \\( H_{c2} \\). Between \\( H_{c1} \\) and \\( H_{c2} \\), exists in a **vortex / mixed state** permitting magnetic flux vortices, allowing superconductivity up to high fields (\\( > 30 \\text{ Tesla} \\), e.g. \\( Nb_3Sn \\), YBCO).`
      },
      {
        sectionTitle: 'Nanomaterials Synthesis & Carbon Nanotubes (CNTs)',
        pageNumber: 2,
        content: `### 2. Nanomaterials & Carbon Nanotubes
Materials having at least one dimension in the range \\( 1 - 100 \\text{ nm} \\) exhibit dramatic changes in physical properties due to high surface-area-to-volume ratio and quantum confinement effects.

**Carbon Nanotubes (CNTs):**
Cylindrical allotropes of carbon consisting of rolled-up graphene sheets:
- **Single-Walled Carbon Nanotubes (SWCNTs):** Single graphene cylinder of diameter \\( 1 - 2 \\text{ nm} \\).
- **Multi-Walled Carbon Nanotubes (MWCNTs):** Concentric nested cylinders with interlayer spacing of \\( 0.34 \\text{ nm} \\).
- **Properties:** Tensile strength exceeding steel by 100 times, thermal conductivity \\( > 3000 \\text{ W/m}\\cdot\\text{K} \\), ballistic electrical conduction.
- **Synthesis:** Chemical Vapor Deposition (CVD), Carbon Arc Discharge, Laser Ablation.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 3. BASIC ELECTRICAL & ELECTRONICS ENGINEERING (24AF1000ES206)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'DC Motors and 3-Phase Induction Motors',
    materialTitle: 'DC Motor Torque/Back EMF & 3-Phase Induction Rotating Magnetic Field',
    materialType: 'text_documentary',
    sourceReference: 'B.L. Theraja Electrical Technology Vol II & Kothari Nagrath',
    chunks: [
      {
        sectionTitle: 'DC Motor Principles, Back EMF & Torque Equation',
        pageNumber: 1,
        content: `### 1. DC Motor Working Principle
A DC motor converts direct current electrical energy into mechanical rotational energy based on Fleming's Left-Hand Rule.
- **Back EMF (\\( E_b \\)):**
  As armature conductors rotate in the magnetic field, an EMF is induced opposing the applied terminal voltage:
  \\[ E_b = \\frac{P \\phi Z N}{60 A} \\]
  Armature current: \\( I_a = \\frac{V - E_b}{R_a} \\).

- **Torque Equation Derivation:**
  Electrical power converted to mechanical form: \\( P_{\\text{mech}} = E_b I_a = T \\cdot \\omega = T \\cdot \\frac{2\\pi N}{60} \\).
  Substituting \\( E_b \\):
  \\[ T \\cdot \\frac{2\\pi N}{60} = \\left( \\frac{P \\phi Z N}{60 A} \\right) I_a \\implies T = \\frac{1}{2\\pi} \\cdot \\frac{P \\phi Z I_a}{A} = 0.159 \\frac{P \\phi Z I_a}{A} \\text{ N}\\cdot\\text{m} \\]

### 2. Three-Phase Induction Motor
**Rotating Magnetic Field (RMF):**
A balanced 3-phase stator winding supplied by 3-phase currents produces a magnetic field of constant amplitude \\( 1.5 \\Phi_m \\) rotating at synchronous speed:
\\[ N_s = \\frac{120 f}{P} \\text{ RPM} \\]
**Slip (\\( s \\)):** The relative difference between synchronous speed \\( N_s \\) and actual rotor speed \\( N \\):
\\[ s = \\frac{N_s - N}{N_s}, \\quad N = N_s(1 - s) \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'Zener Diode & IC Voltage Regulators (78xx / 79xx)',
    materialTitle: 'Zener Diode Voltage Regulation, Line/Load Regulation & Fixed IC Regulators',
    materialType: 'text_documentary',
    sourceReference: 'Boylestad Chapter 2 & Millman Halkias',
    chunks: [
      {
        sectionTitle: 'Zener Shunt Voltage Regulator Circuit Analysis',
        pageNumber: 1,
        content: `### 1. Zener Diode Regulation Principle
A heavily doped silicon P-N junction operating in the reverse breakdown region maintains a nearly constant voltage \\( V_Z \\) across its terminals over a wide variation in reverse current \\( I_Z \\).

**Circuit Design Equations:**
Input unregulated voltage \\( V_{in} \\), series current limiting resistor \\( R_s \\), load resistance \\( R_L \\):
\\[ I_s = I_Z + I_L \\]
\\[ V_{in} - I_s R_s - V_Z = 0 \\implies R_s = \\frac{V_{in} - V_Z}{I_s} = \\frac{V_{in} - V_Z}{I_Z + I_L} \\]
- **Minimum Value of \\( R_s \\) (Preventing Zener thermal burnout):**
  \\[ R_{s,\\min} = \\frac{V_{in,\\max} - V_Z}{I_{Z,\\max}} \\]
- **Maximum Value of \\( R_s \\) (Maintaining regulation at minimum input & full load):**
  \\[ R_{s,\\max} = \\frac{V_{in,\\min} - V_Z}{I_{Z,\\min} + I_{L,\\max}} \\]

### 2. Three-Terminal Fixed Voltage Regulators (78xx & 79xx)
- **78xx Series:** Positive regulated DC output (e.g. 7805 = +5V, 7812 = +12V, 7815 = +15V). Pin 1: Input, Pin 2: Ground, Pin 3: Output.
- **79xx Series:** Negative regulated DC output (e.g. 7905 = -5V, 7912 = -12V). Pin 1: Ground, Pin 2: Input, Pin 3: Output.`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'Biasing and Single Stage RC Coupled Amplifier',
    materialTitle: 'Transistor Voltage Divider Biasing, Stability Factor & Single Stage RC Amplifier',
    materialType: 'text_documentary',
    sourceReference: 'Millman Halkias Integrated Electronics & Boylestad',
    chunks: [
      {
        sectionTitle: 'Voltage Divider Biasing & RC Coupled CE Amplifier',
        pageNumber: 1,
        content: `### 1. Voltage Divider Bias (Self-Bias)
Thermal runaway in BJTs occurs because collector current \\( I_C = \\beta I_B + (1+\\beta)I_{CBO} \\) increases with temperature, raising collector dissipation and further escalating junction temperature.
Voltage divider biasing provides negative feedback through emitter resistor \\( R_E \\) to stabilize the Q-point:
\\[ V_{th} = V_{CC} \\left( \\frac{R_2}{R_1 + R_2} \\right), \\quad R_{th} = R_1 \\parallel R_2 = \\frac{R_1 R_2}{R_1 + R_2} \\]
Applying KVL to base loop:
\\[ V_{th} = I_B R_{th} + V_{BE} + I_E R_E \\approx I_B R_{th} + V_{BE} + I_C R_E \\]
Collector current: \\( I_C \\approx \\frac{V_{th} - V_{BE}}{R_E} \\) (independent of \\( \\beta \\) when \\( R_E \\gg R_{th}/\\beta \\)).

### 2. Single-Stage RC Coupled CE Amplifier
- **Components:** \\( C_{in} \\) blocks DC from signal source, \\( C_E \\) bypasses emitter resistor for AC signals to preserve voltage gain, \\( C_{out} \\) isolates DC collector voltage from load.
- **Midband Voltage Gain:** \\( A_v = -\\frac{h_{fe} (R_C \\parallel R_L)}{h_{ie}} \\). The negative sign signifies a \\( 180^{\\circ} \\) phase inversion between input and output.
- **Frequency Response:** Gain rolls off at low frequencies due to reactance of coupling capacitors \\( C_{in}, C_{out}, C_E \\), and rolls off at high frequencies due to transistor internal parasitic junction capacitances \\( C_{bc}, C_{be} \\).`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'Analog Indicating Instruments (PMMC and MI)',
    materialTitle: 'PMMC and Moving Iron Operating Principles, Deflecting Torques & Range Extension',
    materialType: 'text_documentary',
    sourceReference: 'A.K. Sawhney Electrical & Electronic Measurements Chapter 5',
    chunks: [
      {
        sectionTitle: 'Operating Principles of PMMC and Moving Iron (MI) Meters',
        pageNumber: 1,
        content: `### 1. PMMC (Permanent Magnet Moving Coil) Instrument
**Working Principle:** Based on motor effect. A light current-carrying rectangular coil suspended in the uniform radial magnetic field of a permanent magnet experiences electromagnetic deflecting torque:
\\[ T_d = B I N A \\]
Controlling torque provided by phosphor bronze hairsprings: \\( T_c = K \\theta \\).
At steady state balance:
\\[ T_c = T_d \\implies K \\theta = B I N A \\implies \\theta = \\left( \\frac{B N A}{K} \\right) I \\]
Because deflection \\( \\theta \\propto I \\), PMMC possesses a perfectly uniform linear scale.
*Limitation:* Deflection reverses with alternating current; PMMC indicates average value of zero on AC, making it strictly a **DC only** instrument.

### 2. Moving Iron (MI) Instrument (Attraction and Repulsion Types)
Operates on the principle that iron vanes placed in a magnetic field tend to move into regions of maximum flux density.
**Deflecting Torque:**
\\[ T_d = \\frac{1}{2} I^2 \\frac{dL}{d\\theta} \\]
Because \\( T_d \\propto I^2 \\), the deflection is in the same direction irrespective of current polarity, enabling MI instruments to measure **both AC and DC RMS values**. Scale is non-linear (cramped at lower end).`
      }
    ]
  },
  {
    subjectCode: '24AF1000ES206',
    topicTitle: 'Electronic Measurement Instruments (DSO & Multimeters)',
    materialTitle: 'Digital Storage Oscilloscopes (DSO Architecture) & Digital Multimeter ADC Operation',
    materialType: 'text_documentary',
    sourceReference: 'H.S. Kalsi Electronic Instrumentation Chapter 7 & A.K. Sawhney',
    chunks: [
      {
        sectionTitle: 'DSO Block Diagram, Sampling & Digital Multimeters',
        pageNumber: 1,
        content: `### 1. Digital Storage Oscilloscope (DSO) Architecture
Unlike analog CRTs that require continuous beam refreshing, a DSO digitizes incoming analog signals and stores waveform samples permanently in semiconductor RAM.
**Key Architectural Stages:**
1. **Vertical Attenuator & Preamplifier:** Scales input signal voltage to match ADC dynamic range.
2. **Flash Analog-to-Digital Converter (ADC):** High-speed sampling converting analog voltage into binary bytes at rates exceeding \\( 1 \\text{ GSa/s} \\).
3. **Acquisition Memory:** High-speed RAM storing digitized data points before and after trigger events.
4. **Microprocessor / DSP Engine:** Performs interpolation (sin(x)/x), Fast Fourier Transforms (FFT), and automated parameter measurements (rise time, peak-to-peak, frequency).
5. **Display System:** Renders waveform on LCD screen.

### 2. Digital Multimeter (DMM) Dual-Slope ADC
Uses dual-slope integration converting unknown voltage \\( V_x \\) into time interval \\( t_2 \\):
- Run-up period: Integrator integrates \\( V_x \\) for fixed time \\( T_1 \\).
- Run-down period: Reference voltage \\( -V_{ref} \\) discharges integrator to zero in variable time \\( t_2 \\).
\\[ t_2 = \\left( \\frac{V_x}{V_{ref}} \\right) T_1 \\]
Independent of integrator resistance \\( R \\), capacitance \\( C \\), and clock frequency, providing high noise immunity and 0.01% measurement accuracy.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 4. BASIC CIVIL AND MECHANICAL ENGINEERING (24AF2CMEES208)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF2CMEES208',
    topicTitle: 'Foundations and Superstructure Elements',
    materialTitle: 'Shallow vs Deep Foundations, Structural Superstructure & Building Planning Rules',
    materialType: 'text_documentary',
    sourceReference: 'Sushil Kumar Building Construction & M.G. Shah Building Drawing',
    chunks: [
      {
        sectionTitle: 'Foundation Engineering & Types of Footings',
        pageNumber: 1,
        content: `### 1. Foundation Engineering
The foundation is the lowest structural component of a building located below ground level that safely transmits the dead load, live load, and wind/seismic loads directly to the supporting subsoil without exceeding soil bearing capacity.

**Classification of Foundations:**
- **Shallow Foundations (Depth \\( D \\le \\) Width \\( B \\)):**
  1. *Isolated Pad / Spread Footing:* Individual column footing for framed structures.
  2. *Strip / Continuous Footing:* Supports continuous load-bearing masonry walls.
  3. *Combined Footing:* Common footing for two columns when property boundary restricts projection.
  4. *Raft / Mat Foundation:* Thick reinforced concrete slab covering entire building footprint; used when soil bearing capacity is low or column loads are high.
- **Deep Foundations (Depth \\( D > B \\)):**
  1. *Pile Foundations:* Slender vertical shafts driven or bored into ground. End-bearing piles transfer loads to bedrock; friction piles transfer loads through skin friction with surrounding soil.
  2. *Well / Caisson Foundations:* Large hollow cylindrical boxes sunk through water or alluvial soil; used in bridge piers and waterfront wharves.`
      }
    ]
  },
  {
    subjectCode: '24AF2CMEES208',
    topicTitle: 'Mechanisms, Factor of Safety and Machining Operations',
    materialTitle: 'Machine Inversions, Factor of Safety, Machine Tools (Lathe, Drilling) & Casting',
    materialType: 'text_documentary',
    sourceReference: 'A.K. Malik Theory of Mechanisms and Machines & Serope Kalpakjian',
    chunks: [
      {
        sectionTitle: 'Kinematic Mechanisms, Factor of Safety & Machine Tools',
        pageNumber: 1,
        content: `### 1. Machine vs Mechanism & Factor of Safety
- **Mechanism:** An assemblage of kinematic links connected by joints that transmits constrained relative motion.
- **Machine:** A combination of mechanisms capable of transmitting both motion and substantial mechanical energy to perform useful work.
- **Factor of Safety (FoS):**
  \\[ \\text{FoS} = \\frac{\\text{Yield Strength (\\(\\sigma_y\\))}}{\\text{Allowable Working Stress (\\(\\sigma_{\\text{allow}}\\))}} \\quad (\\text{for ductile materials}) \\]
  \\[ \\text{FoS} = \\frac{\\text{Ultimate Tensile Strength (\\(\\sigma_u\\))}}{\\text{Allowable Working Stress (\\(\\sigma_{\\text{allow}}\\))}} \\quad (\\text{for brittle materials}) \\]
  Typically ranges from \\( 1.5 \\) to \\( 4.0 \\) depending on load certainty, material homogeneity, and safety risks.

### 2. Basic Machine Tools & Operations
- **Center Lathe:** Workpiece held in chuck and rotated; single-point cutting tool traverses along or across workpiece. Operations: Facing (flat end), Cylindrical turning, Taper turning, Knurling, Thread cutting.
- **Drilling Machine:** Rotating multi-point twist drill fed axially into stationary workpiece to produce cylindrical holes.
- **Metal Casting:** Pouring molten metal into refractory sand mold cavity containing a pattern impression; solidifies into complex geometry with minimal machining allowance.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 5. ENGINEERING GRAPHICS (24AF2EGRES204)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF2EGRES204',
    topicTitle: 'Projection of Planes and Solids with Inclined Axes',
    materialTitle: 'Projections of 2D Planes and Regular 3D Solids (Prisms, Pyramids, Cylinders, Cones)',
    materialType: 'text_documentary',
    sourceReference: 'N.D. Bhatt Chapters 12, 13 & 14',
    chunks: [
      {
        sectionTitle: 'Projection of Planes and Regular Solids with Inclined Axis',
        pageNumber: 1,
        content: `### 1. Projection of Regular 2D Planes
When a plane surface (e.g. regular pentagon, hexagon, circle) is inclined to one reference plane and perpendicular to the other:
1. **Initial Assumption:** Place the plane parallel to the reference plane to which it is inclined, showing true shape in that view.
2. **Second Stage:** Tilt the reference view at the specified inclination angle (\\( \\theta \\) with HP or \\( \\phi \\) with VP), projecting apparent foreshortened shape in the other view.

### 2. Projection of Regular 3D Solids
Solids (Prisms, Pyramids, Cylinders, Cones) with axis inclined to reference planes:
- **Prism vs Pyramid:** Prism has two congruent parallel base polygons connected by rectangular lateral faces; Pyramid has a base polygon and triangular lateral faces meeting at an apex.
- **3-Stage Projection Method:**
  - Stage 1: Position solid with axis perpendicular to reference plane to show true base polygon.
  - Stage 2: Tilt solid so its axis makes specified angle \\( \\theta \\) with HP (or base makes \\( 90^{\\circ} - \\theta \\)).
  - Stage 3: Tilt solid so plan view axis makes specified angle \\( \\beta \\) with VP, projecting final 3D orthographic representations.`
      }
    ]
  },
  {
    subjectCode: '24AF2EGRES204',
    topicTitle: 'Cutting Planes, True Shape of Section & Surface Development',
    materialTitle: 'Section Planes, True Sectional Shapes & Parallel/Radial Line Surface Development',
    materialType: 'text_documentary',
    sourceReference: 'N.D. Bhatt Chapters 15 & 16',
    chunks: [
      {
        sectionTitle: 'Section of Solids & Surface Development Methods',
        pageNumber: 1,
        content: `### 1. Sections of Solids
Imaginary cutting planes passed through solids reveal internal features:
- **Auxiliary Inclined Plane (AIP):** Perpendicular to VP, inclined at angle \\( \\theta \\) to HP. Appears as a line inclined at \\( \\theta \\) to \\( XY \\) in front view.
- **Auxiliary Vertical Plane (AVP):** Perpendicular to HP, inclined at angle \\( \\phi \\) to VP. Appears as a line inclined at \\( \\phi \\) to \\( XY \\) in top view.
- **True Shape of Section:** The view projected onto an auxiliary plane oriented parallel to the cutting plane.

### 2. Development of Lateral Surfaces of Solids
Unfolding the 3D lateral boundaries of hollow solids onto a 2D planar sheet:
1. **Parallel-Line Method:** Used for prisms and cylinders where all lateral generators or edges are mutually parallel. Base perimeter length = \\( \\pi D \\) (cylinder) or \\( n \\times s \\) (prism).
2. **Radial-Line Method:** Used for pyramids and cones where lateral generators radiate from an apex. Subtended sector angle for right cone:
   \\[ \\theta = \\frac{R}{L} \\times 360^{\\circ} \\]
   where \\( R \\) is base radius and \\( L \\) is slant true length.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 6. ENERGY AND ENVIRONMENTAL ENGINEERING (24AF1EEEES209)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF1EEEES209',
    topicTitle: 'Thermal, Gas Turbine, Hydro and Nuclear Power Plants',
    materialTitle: 'Thermal Rankine Cycle, Hydro Turbines, Nuclear Fission & Gas Turbine CCGT',
    materialType: 'text_documentary',
    sourceReference: 'A. Chakrabarti Power System Engineering & P.K. Nag',
    chunks: [
      {
        sectionTitle: 'Thermal, Hydro, Gas Turbine and Nuclear Power Generation',
        pageNumber: 1,
        content: `### 1. Conventional Power Plant Architectures
1. **Thermal Power Plant (Rankine Cycle):**
   Coal pulverized and combusted in boiler generates superheated high-pressure steam (\\( 540^{\\circ}\\text{C}, 170 \\text{ bar} \\)) driving multi-stage steam turbines. Surface condensers convert exhaust steam to condensate, while cooling towers reject waste heat. Electrostatic precipitators (ESP) remove \\( > 99\\% \\) fly ash. Overall thermal efficiency \\( 32 - 38\\% \\).
2. **Hydroelectric Power Plant:**
   Water stored in high-altitude reservoirs flows through penstocks to hydraulic turbines:
   - Pelton Wheel: Impulse turbine for high heads (\\( > 300 \\text{ m} \\)).
   - Francis Turbine: Mixed-flow reaction turbine for medium heads (\\( 30 - 300 \\text{ m} \\)).
   - Kaplan Turbine: Axial-flow reaction turbine with adjustable propeller blades for low heads (\\( < 30 \\text{ m} \\)).
   Surge tanks absorb hydraulic water hammer shocks during sudden valve closure.
3. **Nuclear Power Plant (Fission Energy):**
   Thermal fission of Uranium-235: \\( ^{235}_{92}\\text{U} + ^1_0\\text{n} \\to ^{141}_{56}\\text{Ba} + ^{92}_{36}\\text{Kr} + 3 ^1_0\\text{n} + 200 \\text{ MeV} \\).
   Control rods (Cadmium, Boron) absorb excess neutrons to maintain criticality (multiplication factor \\( k = 1 \\)). Heavy water or graphite serves as moderator to slow fast neutrons.`
      }
    ]
  },
  {
    subjectCode: '24AF1EEEES209',
    topicTitle: 'Wastewater Treatment and Soil Contamination',
    materialTitle: 'BOD/COD Kinetics, Municipal Activated Sludge Process (ASP) & Heavy Metal Remediation',
    materialType: 'text_documentary',
    sourceReference: 'S.P. Mishra Essential Environmental Studies & V.K. Ahluwalia',
    chunks: [
      {
        sectionTitle: 'Wastewater Treatment Stages & Activated Sludge Process',
        pageNumber: 1,
        content: `### 1. Wastewater Quality Indicators
- **Biochemical Oxygen Demand (BOD):** Milligrams of dissolved oxygen consumed per liter of water by aerobic microorganisms to biochemically oxidize organic matter over 5 days at \\( 20^{\\circ}\\text{C} \\) (BOD5).
- **Chemical Oxygen Demand (COD):** Equivalent oxygen required to chemically oxidize all organic compounds using boiling potassium dichromate (\\( K_2Cr_2O_7 \\)) in sulfuric acid. Always \\( \\text{COD} > \\text{BOD} \\).

### 2. Activated Sludge Process (ASP) Municipal Treatment
1. **Preliminary Treatment:** Bar screens remove coarse floating rags and debris; grit chambers settle heavy mineral sand.
2. **Primary Sedimentation:** Gravity settling tanks remove \\( 50-70\\% \\) suspended solids and \\( 30-40\\% \\) raw BOD.
3. **Secondary Biological Treatment (Aeration Tank):** Aerobic bacterial flocs (activated sludge) digest dissolved organic carbon under intense compressed aeration. Mixed liquor suspended solids (MLSS) maintained at \\( 2000 - 4000 \\text{ mg/L} \\).
4. **Secondary Clarifier & Sludge Recirculation:** Biological flocs settle; a fraction of settled sludge is recycled to the aeration tank to maintain bacterial concentration, while surplus sludge is digested anaerobically to produce methane biogas.
5. **Tertiary Disinfection:** Chlorination or UV radiation destroys pathogenic pathogens before environmental river discharge.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 7. DESIGN THINKING (24AF1000VS211)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF1000VS211',
    topicTitle: 'Creative Problem Solving and Product Synthesis',
    materialTitle: 'Divergent/Convergent Ideation, SCAMPER Technique & How-Might-We Formulations',
    materialType: 'text_documentary',
    sourceReference: 'Tim Brown Change by Design & Michael Lewrick Design Thinking Toolbox',
    chunks: [
      {
        sectionTitle: 'Divergent Thinking, SCAMPER & Product Synthesis',
        pageNumber: 1,
        content: `### 1. Divergent and Convergent Thinking in Design
- **Divergent Thinking:** Expanding the solution space without premature criticism. Generates a large volume and variety of unconventional concepts.
- **Convergent Thinking:** Applying objective criteria (feasibility, viability, desirability) to prune, prioritize, and synthesize ideas into actionable prototypes.

### 2. The SCAMPER Ideation Toolkit
- **S (Substitute):** What materials, components, or steps can be swapped?
- **C (Combine):** Can separate functions be integrated into a unified product?
- **A (Adapt):** How can solutions from nature or other industries be repurposed?
- **M (Modify / Magnify):** What happens if features are exaggerated or miniaturized?
- **P (Put to Another Use):** Can the product solve an adjacent customer problem?
- **E (Eliminate):** What non-essential complexity can be removed to reduce friction?
- **R (Reverse / Rearrange):** How can the sequence or component layout be inverted?

**Formulating "How Might We" (HMW) Questions:**
Transforms user frustration insights into open-ended design springboards:
\\[ \\text{"How might we design a blood analysis device that rural clinics can operate without continuous grid electricity?"} \\]`
      }
    ]
  },
  {
    subjectCode: '24AF1000VS211',
    topicTitle: 'Prototype Fidelity, Testing and Focus Groups',
    materialTitle: 'Rapid Prototyping Spectrum, Think-Aloud Protocols and Feedback Capture Grids',
    materialType: 'text_documentary',
    sourceReference: 'Michael Lewrick Design Thinking Playbook & Gavin Ambrose',
    chunks: [
      {
        sectionTitle: 'Prototype Spectrum and User Testing Protocols',
        pageNumber: 1,
        content: `### 1. Prototype Fidelity Spectrum
Prototypes are tangible tools designed to answer specific questions:
- **Low-Fidelity (Paper, Cardboard, Storyboards):** Built in minutes at negligible cost. Useful for validating overarching user flows and basic structural concepts. Encourages candid user feedback because users feel comfortable critiquing unfinished artifacts.
- **Medium-Fidelity (3D foam mockups, clickable wireframes):** Validates ergonomics, layout, and basic dimensional proportions.
- **High-Fidelity (3D printed functional parts, production code):** Validates mechanical tolerances, user interface aesthetics, and manufacturing feasibility.

### 2. User Testing Protocol & Feedback Capture Grid
- **Thinking Aloud Protocol:** Users verbalize thoughts, confusions, and emotional reactions in real-time as they perform assigned tasks with the prototype.
- **Feedback Capture Grid (Quadrants):**
  1. *Likes (+):* What aspects did users praise or find intuitive?
  2. *Criticisms (\\(\\Delta\\)):* Where did users stumble, hesitate, or express frustration?
  3. *Questions (?):* What questions did the prototype raise for users?
  4. *Ideas (!):* What spontaneous improvement suggestions emerged during testing?`
      }
    ]
  },
  {
    subjectCode: '24AF1000VS211',
    topicTitle: 'Customer Journey Mapping & Value Alignment',
    materialTitle: 'Customer Journey Mapping (CJM), Value Proposition Canvas & Ergonomic Alignment',
    materialType: 'text_documentary',
    sourceReference: 'DBATU Unit 5 Design Thinking Syllabus & Muhammad Mashhood Alam',
    chunks: [
      {
        sectionTitle: 'Customer Journey Mapping & Value Proposition Alignment',
        pageNumber: 1,
        content: `### 1. Customer Journey Mapping (CJM)
A Customer Journey Map is a structured visual representation of every touchpoint a user experiences while interacting with a product or service over time.

**Key Journey Dimensions:**
1. **Phases:** Awareness \\( \\to \\) Consideration \\( \\to \\) Onboarding \\( \\to \\) Core Usage \\( \\to \\) Maintenance \\( \\to \\) Advocacy.
2. **User Actions:** Tangible steps the persona executes at each touchpoint.
3. **Pain Points:** Moments of friction, delays, cognitive overload, or physical inconvenience.
4. **Emotional Curve:** Tracking the user's emotional state from delight to frustration.

### 2. Value Proposition Canvas
- **Customer Profile:**
  - *Customer Jobs:* Functional, social, and emotional tasks users try to accomplish.
  - *Pains:* Negative emotions, undesired costs, and risks experienced before, during, or after completing a job.
  - *Gains:* Positive outcomes and concrete benefits the user aspires to achieve.
- **Value Map:**
  - *Products & Services:* The physical artifacts and features built.
  - *Pain Relievers:* Specific mechanisms addressing and eliminating customer pains.
  - *Gain Creators:* Concrete features producing tangible customer delight.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 8. INDIAN KNOWLEDGE SYSTEM (24AF1000IK210)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF1000IK210',
    topicTitle: 'Overview of Vedic & Scientific Heritage of Ancient India',
    materialTitle: 'Epistemology of Shad-Darshanas, Pramanas Logic & Vedic Scientific Method',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IKS Unit 1 Syllabus & Dr. Kapil Kapoor Indian Knowledge Systems',
    chunks: [
      {
        sectionTitle: 'Shad-Darshanas & Pramanas Epistemological Architecture',
        pageNumber: 1,
        content: `### 1. Shad-Darshanas (The Six Classical Philosophical Systems)
1. **Nyaya (Aksapada Gautama):** Formal system of logic, epistemology, and debate. Established rigorous criteria for evaluating truth through 16 categories (Padarthas).
2. **Vaisheshika (Kanada):** Ancient physical ontology and atomism (Paramanuvada). Proposed that all material reality is composed of indivisible atoms (Paramanu) interacting in space and time.
3. **Sankhya (Kapila):** Dualist metaphysics analyzing reality into Purusha (consciousness) and Prakriti (matter/nature) evolving through three Gunas (Sattva, Rajas, Tamas).
4. **Yoga (Patanjali):** Practical psychology and mental mastery through Ashtanga Yoga (8 limbs) to achieve mental clarity and freedom from cognitive afflictions (Kleshas).
5. **Purva Mimamsa (Jaimini):** Philosophy of language, hermeneutics, and principles of textual interpretation.
6. **Uttara Mimamsa / Vedanta (Badarayana):** Metaphysical inquiry into the non-dual nature of ultimate reality (Brahman) and human liberation.

### 2. The Pramanas (Valid Means of Scientific Knowledge)
- **Pratyaksha:** Direct empirical sensory perception.
- **Anumana:** Logical inference based on invariable universal concomitance (Vyapti), as demonstrated in the classic five-member syllogism (Pancha-Avayava).
- **Upamana:** Analogy and comparison.
- **Shabda:** Reliable verbal testimony of verified authorities (Aptavakya).`
      }
    ]
  },
  {
    subjectCode: '24AF1000IK210',
    topicTitle: 'Ayurvedic Principles & Sustainable Ecological Living',
    materialTitle: 'Tridosha Physiology, Sushruta Surgery, Sacred Groves & Traditional Rainwater Harvesting',
    materialType: 'text_documentary',
    sourceReference: 'Charaka Samhita, Sushruta Samhita & DBATU Unit 4 IKS',
    chunks: [
      {
        sectionTitle: 'Tridosha Principles & Traditional Water Systems',
        pageNumber: 1,
        content: `### 1. Fundamentals of Ayurvedic Physiology
Health (Swasthya) is defined as a dynamic state of physiological equilibrium between bodily humors, metabolic fire, tissues, and waste elimination:
- **Tridosha Dynamics:**
  - *Vata (Air + Space):* Regulates movement, respiration, nerve impulses, and circulation.
  - *Pitta (Fire + Water):* Governs enzymatic digestion, thermoregulation, and metabolism.
  - *Kapha (Water + Earth):* Provides structural cohesion, lubrication, and immune resilience.
- **Sushruta’s Surgical Prowess:** The *Sushruta Samhita* describes over 120 precision steel surgical instruments, techniques for cataract couching, lithotomy, bone setting, and the world's earliest documented rhinoplasty (nasal reconstruction using pedicled forehead skin flaps).

### 2. Traditional Sustainable Water Engineering
- **Tank Cascade Systems (Eris of Tamil Nadu):** Interconnected chains of reservoirs where excess monsoon runoff from one tank overflows into the next, maintaining groundwater tables across river basins.
- **Johads of Rajasthan:** Traditional earthen check dams built along natural contours to capture seasonal rain, turning arid zones into perennial streams through aquifer recharge.
- **Sacred Groves (Devrais):** Community-protected pristine climax forest patches preserved through spiritual taboos, serving as vital genetic seed banks and micro-watersheds.`
      }
    ]
  },

  // -------------------------------------------------------------------------
  // 9. INTEGRATED PERSONALITY DEVELOPMENT (24AF1000CC212A)
  // -------------------------------------------------------------------------
  {
    subjectCode: '24AF1000CC212A',
    topicTitle: 'Teamwork, Soft Skills & An Ideal Citizen',
    materialTitle: 'Six Pillars of Teamwork, Constructive Collaboration and Civic Responsibilities',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IPDC Workbook Unit 1 BAPS Swaminarayan Sanstha',
    chunks: [
      {
        sectionTitle: 'Six Steps of Teamwork & Attributes of an Ideal Citizen',
        pageNumber: 1,
        content: `### 1. Six Essential Steps of Effective Teamwork
1. **Shared Common Vision:** Every team member aligns their individual energy toward a clearly articulated shared objective.
2. **Mutual Trust & Respect:** Valuing diverse perspectives without condescension, establishing a safe psychological environment.
3. **Open & Transparent Communication:** Sharing ideas proactively, practicing active listening, and addressing misunderstandings directly before they escalate.
4. **Role Clarity:** Defining specific tasks based on individual strengths and competencies to eliminate duplication.
5. **Collective Accountability:** Celebrating team successes together while sharing responsibility for setbacks without blame-shifting.
6. **Constructive Conflict Resolution:** Depersonalizing debates by focusing on facts, goals, and principles rather than egos.

### 2. The Ideal Citizen Framework
- **Moral Integrity:** Practicing honesty and ethical consistency in public and private spheres.
- **Civic Accountability:** Respecting public property, paying dues on time, and voting with discernment.
- **Punctuality & Reliability:** Honoring commitments and recognizing the value of others' time.
- **Community Stewardship:** Contributing to local welfare, mentoring youth, and protecting national assets.`
      }
    ]
  },
  {
    subjectCode: '24AF1000CC212A',
    topicTitle: 'Facing Failures & Timeless Wisdom for Daily Life',
    materialTitle: 'Resilience Psychology, Carol Dweck Growth Mindset & Equanimity in Adversity',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IPDC Workbook Unit 2 BAPS Swaminarayan Sanstha',
    chunks: [
      {
        sectionTitle: 'Growth Mindset & Equanimity Amid Adversity',
        pageNumber: 1,
        content: `### 1. Psychology of Failure and Growth Mindset
Carol Dweck's research differentiates two core approaches to difficulty:
- **Fixed Mindset:** Views intelligence and ability as innate and static. Setbacks are perceived as proof of deficiency, leading to defensive retreat or avoidance of challenges.
- **Growth Mindset:** Understands that neural connectivity and cognitive capacity expand with deliberate effort, strategic revision, and perseverance. Setbacks are reframed as diagnostic milestones that reveal opportunities for skill refinement.

### 2. Timeless Wisdom for Emotional Equanimity
- **Samatvam (Inner Equilibrium):** Maintaining calm dignity and clarity of thought regardless of external highs (praise, success) or lows (criticism, temporary defeat).
- **Locus of Control:** Recognizing the distinction between things within our control (effort, attitude, preparation, ethics) and things outside our control (market conditions, exam outcomes, peer opinions). Investing 100% emotional energy into the internal locus of control reduces anxiety and maximizes performance.`
      }
    ]
  },
  {
    subjectCode: '24AF1000CC212A',
    topicTitle: 'Financial Planning & Social Circle Influence',
    materialTitle: '50/30/20 Budgeting Rule, Compound Interest & The Power of Peer Contagion',
    materialType: 'text_documentary',
    sourceReference: 'DBATU IPDC Workbook Unit 2 BAPS Swaminarayan Sanstha',
    chunks: [
      {
        sectionTitle: 'Foundations of Financial Planning & Peer Influence',
        pageNumber: 1,
        content: `### 1. Fundamental Financial Literacy for Engineers
1. **The 50/30/20 Budgeting Framework:**
   - \\( 50\\% \\) allocated to Essential Needs (rent, basic nutrition, utilities, mandatory course supplies).
   - \\( 30\\% \\) allocated to Discretionary Wants (entertainment, dining out, personal hobbies).
   - \\( 20\\% \\) preserved for Savings & Debt Elimination (emergency fund, systematic investment index funds).
2. **The Power of Compound Growth:**
   \\[ A = P \\left(1 + \\frac{r}{n}\\right)^{nt} \\]
   Investing early in youth leverages the exponential power of time (\\( t \\)), compounding wealth far more efficiently than attempting to invest larger sums later in life.
3. **The Rule of 72:** An approximate metric to determine the number of years required to double money at annual return \\( r\\% \\): \\( T \\approx \\frac{72}{r} \\).

### 2. Social Circle & Peer Contagion
Jim Rohn's insight: *"You are the average of the five people you spend the most time with."*
- **Behavioral Contagion:** Peer habits (study routines, sleep schedules, language, integrity, ambitions) are subconsciously absorbed through mirror neurons.
- **Proactive Boundary Setting:** Intentionally seeking friendships with peers who exhibit intellectual curiosity, emotional maturity, and high moral standards, while setting healthy boundaries against toxic habits.`
      }
    ]
  }
];
