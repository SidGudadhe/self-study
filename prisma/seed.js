const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting CogniStudy Database Seeding with DBATU First Year Syllabus ---');

  // 1. Create Default Demo Student & Demo Admin
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@dbatu.ac.in' },
    update: {},
    create: {
      email: 'student@dbatu.ac.in',
      passwordHash: studentPassword,
      name: 'Rohan Sharma',
      role: 'student',
    },
  });

  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@dbatu.ac.in' },
    update: {},
    create: {
      email: 'admin@dbatu.ac.in',
      passwordHash: adminPassword,
      name: 'Prof. DBATU Academic Dean',
      role: 'admin',
    },
  });

  console.log(`Users created: ${student.email} and ${admin.email}`);

  // 2. Syllabus Data extracted directly from DBATU NEP 2024-2025 curriculum
  const syllabusData = [
    {
      code: '24AF1000BS101',
      name: 'Engineering Mathematics – I',
      category: 'BSC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP A',
      description: 'Foundations of Linear Algebra, Matrices, Partial Differentiation, Multiple Integrals and Curve Tracing.',
      textbooks: [
        { title: 'Higher Engineering Mathematics', author: 'B. S. Grewal', publisher: 'Khanna Publishers, New Delhi' },
        { title: 'Advanced Engineering Mathematics', author: 'Erwin Kreyszig', publisher: 'John Wiley & Sons' },
        { title: 'A Course in Engineering Mathematics (Vol I)', author: 'Dr. B. B. Singh', publisher: 'Synergy Knowledgeware' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Linear Algebra - Matrices',
          hours: '08 Hours',
          topics: [
            {
              title: 'Inverse of a matrix by Gauss-Jordan method',
              subtopics: ['Elementary row transformations', 'Augmented matrix [A|I]', 'Invertibility conditions'],
              objectives: [
                { code: 'M1-U1-LO1', description: 'Compute inverse of non-singular square matrices using Gauss-Jordan row operations', bloomLevel: 'APPLY' }
              ]
            },
            {
              title: 'Rank and Normal form of a matrix',
              subtopics: ['Echelon form', 'Canonical / Normal form [Ir 0; 0 0]', 'Rank invariance under row/col operations'],
              objectives: [
                { code: 'M1-U1-LO2', description: 'Reduce matrices to normal form and evaluate rank', bloomLevel: 'ANALYZE' }
              ]
            },
            {
              title: 'Consistency of Linear Systems',
              subtopics: ['Rouché-Capelli Theorem', 'Non-homogeneous systems AX=B', 'Homogeneous systems AX=0 and trivial/non-trivial solutions'],
              objectives: [
                { code: 'M1-U1-LO3', description: 'Determine consistency and unique, infinite, or no-solution conditions for linear systems', bloomLevel: 'APPLY' }
              ]
            },
            {
              title: 'Eigen values and Eigen vectors',
              subtopics: ['Characteristic equation', 'Eigenvector determination', 'Properties of eigenvalues (trace, determinant, triangular matrices)'],
              objectives: [
                { code: 'M1-U1-LO4', description: 'Calculate eigenvalues and corresponding eigenvectors of matrices', bloomLevel: 'APPLY' }
              ]
            },
            {
              title: 'Cayley-Hamilton Theorem and Applications',
              subtopics: ['Statement of Cayley-Hamilton', 'Matrix polynomial evaluation', 'Computation of A^-1 and higher matrix powers A^n'],
              objectives: [
                { code: 'M1-U1-LO5', description: 'Apply Cayley-Hamilton theorem to evaluate inverse and high powers of matrices', bloomLevel: 'APPLY' }
              ]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Partial Differentiation',
          hours: '08 Hours',
          topics: [
            {
              title: 'First and Higher Order Partial Derivatives',
              subtopics: ['Definition of limit & partial derivative', 'Mixed partial derivatives equality (Schwarz theorem)'],
              objectives: [{ code: 'M1-U2-LO1', description: 'Compute successive partial derivatives of multivariable functions', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Homogeneous Functions & Euler’s Theorem',
              subtopics: ['Degree of homogeneity', 'Euler theorem for 2 and 3 variables with proofs', 'Second-order Euler theorem extensions'],
              objectives: [{ code: 'M1-U2-LO2', description: 'Prove and apply Euler’s theorem for homogeneous multivariable functions', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Total Derivatives and Change of Variables',
              subtopics: ['Chain rule for several variables', 'Composite functions', 'Implicit differentiation using partial derivatives'],
              objectives: [{ code: 'M1-U2-LO3', description: 'Calculate total derivatives and transform variables using multivariable chain rule', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Applications of Partial Differentiation',
          hours: '08 Hours',
          topics: [
            {
              title: 'Jacobians and Properties',
              subtopics: ['Definition of Jacobian determinant', 'Chain rule for Jacobians', 'Functional dependency & Jacobian vanishing test'],
              objectives: [{ code: 'M1-U3-LO1', description: 'Evaluate Jacobians and establish functional dependency between multivariable expressions', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Taylor’s and Maclaurin’s Theorems for Two Variables',
              subtopics: ['Expansion of f(x,y)', 'Higher order differential operators', 'Approximations and series truncations'],
              objectives: [{ code: 'M1-U3-LO2', description: 'Expand two-variable functions in Taylor and Maclaurin series', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Maxima and Minima of Functions of Two Variables',
              subtopics: ['Stationary points', 'Second derivative discriminant test (rt - s^2)', 'Saddle points'],
              objectives: [{ code: 'M1-U3-LO3', description: 'Locate and classify extreme values of bivariate functions', bloomLevel: 'EVALUATE' }]
            },
            {
              title: 'Lagrange’s Method of Undetermined Multipliers',
              subtopics: ['Constrained optimization', 'Lagrangian function', 'Multiple constraint formulation'],
              objectives: [{ code: 'M1-U3-LO4', description: 'Solve constrained optimization problems with undetermined multipliers', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Reduction Formulae and Tracing of Curves',
          hours: '08 Hours',
          topics: [
            {
              title: 'Wallis and Reduction Formulae',
              subtopics: ['Reduction of sin^n(x) and cos^n(x)', 'Reduction of sin^m(x) cos^n(x) on [0, pi/2]', 'Definite integral evaluations'],
              objectives: [{ code: 'M1-U4-LO1', description: 'Derive and compute reduction formulae for trigonometric definite integrals', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Tracing of Standard Curves',
              subtopics: ['Cartesian curve tracing rules (symmetry, origin, tangents, asymptotes, regions)', 'Parametric curves (Cycloid, Astroid)', 'Polar curves (Cardioid, Lemniscate, Rose petals)'],
              objectives: [{ code: 'M1-U4-LO2', description: 'Identify symmetries, asymptotes and sketch standard curves in Cartesian, parametric, and polar coordinates', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Multiple Integrals',
          hours: '08 Hours',
          topics: [
            {
              title: 'Double Integration in Cartesian and Polar Coordinates',
              subtopics: ['Double integral over rectangular & general domains', 'Polar coordinate transformation dx dy = r dr dtheta'],
              objectives: [{ code: 'M1-U5-LO1', description: 'Evaluate double integrals in Cartesian and polar coordinate systems', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Change of Order of Integration',
              subtopics: ['Re-sketching bounding region', 'Flipping integration strips from vertical to horizontal'],
              objectives: [{ code: 'M1-U5-LO2', description: 'Transform limits and evaluate complicated double integrals by reversing order of integration', bloomLevel: 'EVALUATE' }]
            },
            {
              title: 'Triple Integrals and Geometric Applications',
              subtopics: ['Volume as triple integral', 'Surface area as double integral', 'Cylindrical & Spherical coordinate conversions'],
              objectives: [{ code: 'M1-U5-LO3', description: 'Calculate physical volumes and surface areas using multiple integrals', bloomLevel: 'APPLY' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1CHEBS102',
      name: 'Engineering Chemistry',
      category: 'BSC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP A',
      description: 'Chemical principles in engineering: Water treatment, fuels, electrochemistry, instrumental methods, and engineering materials.',
      textbooks: [
        { title: 'Engineering Chemistry', author: 'P. C. Jain & Monica Jain', publisher: 'Dhanpat Rai & Sons' },
        { title: 'Engineering Chemistry- Fundamentals and applications', author: 'Shikha Agarwal', publisher: 'Cambridge Publishers' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Water Treatment',
          hours: '07 Hours',
          topics: [
            {
              title: 'Hard and Soft Water & Disadvantages',
              subtopics: ['Types of hardness (temporary vs permanent)', 'Boiler troubles: sludge & scale, priming & foaming, caustic embrittlement'],
              objectives: [{ code: 'CH-U1-LO1', description: 'Classify water hardness and diagnose industrial boiler issues caused by impurities', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Softening Processes: Ion Exchange, Lime-Soda & RO',
              subtopics: ['Zeolite process', 'Synthetic ion exchange resins (cation & anion)', 'Hot Lime-Soda process stoichiometry', 'Reverse Osmosis membrane separation'],
              objectives: [{ code: 'CH-U1-LO2', description: 'Compare water softening mechanisms and select optimal treatment for industrial feedwater', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Hardness and Dissolved Oxygen Determinations',
              subtopics: ['EDTA complexometric titration with EBT indicator', 'Winkler’s iodometric titration for DO', 'Hardness numericals in ppm CaCO3 equivalents'],
              objectives: [{ code: 'CH-U1-LO3', description: 'Perform quantitative calculations of water hardness and dissolved oxygen', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Domestic Water Treatment',
              subtopics: ['Aeration', 'Sedimentation & Coagulation', 'Disinfection methods (Chlorination, Breakpoint chlorination, UV treatment)'],
              objectives: [{ code: 'CH-U1-LO4', description: 'Explain step-by-step municipal potable water purification', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Fuels and Lubricants',
          hours: '08 Hours',
          topics: [
            {
              title: 'Fuels & Calorific Value Measurements',
              subtopics: ['Gross vs Net Calorific Value (GCV & NCV)', 'Bomb Calorimeter construction, working and numericals', 'Boy’s Gas Calorimeter'],
              objectives: [{ code: 'CH-U2-LO1', description: 'Determine fuel calorific value experimentally and numerically using bomb and Boy’s calorimeters', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Analysis of Coal & Petroleum Refining',
              subtopics: ['Proximate analysis (moisture, volatile matter, ash, fixed carbon)', 'Ultimate analysis (C, H, N, S, O)', 'Fractional distillation of crude oil'],
              objectives: [{ code: 'CH-U2-LO2', description: 'Assess coal industrial quality from proximate/ultimate data and describe crude oil fractions', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Lubricant Classification & Properties',
              subtopics: ['Solid, semi-solid, and liquid lubricants', 'Viscosity and Viscosity Index', 'Flash point and Fire point (Pensky-Martens)', 'Acid value and Saponification value numericals'],
              objectives: [{ code: 'CH-U2-LO3', description: 'Select appropriate industrial lubricants based on physical and chemical testing parameters', bloomLevel: 'EVALUATE' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Electrochemistry and Energy Storage',
          hours: '07 Hours',
          topics: [
            {
              title: 'Electrical Conductance & Conductometric Titrations',
              subtopics: ['Specific, equivalent, and molar conductance', 'Cell constant determination via Wheatstone bridge', 'Titration curves: strong acid-strong base, weak acid-strong base'],
              objectives: [{ code: 'CH-U3-LO1', description: 'Analyze conductometric titration curves and calculate cell constants', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'pH Measurement & Indicator Theory',
              subtopics: ['Glass electrode potential & construction', 'Ostwald’s theory and Quinonoid theory of acid-base indicators'],
              objectives: [{ code: 'CH-U3-LO2', description: 'Explain potentiometric pH determination using glass electrodes and color change mechanisms', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Fuel Cells & Rechargeable Lithium Batteries',
              subtopics: ['Hydrogen-Oxygen fuel cell reactions and efficiency', 'Lithium-ion battery: intercalation mechanisms, cathode/anode materials, safety'],
              objectives: [{ code: 'CH-U3-LO3', description: 'Examine electrochemical redox mechanisms in fuel cells and modern lithium-ion batteries', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Instrumental Methods of Analysis',
          hours: '07 Hours',
          topics: [
            {
              title: 'UV-Visible Spectroscopy',
              subtopics: ['Beer-Lambert’s Law & derivation', 'Double beam spectrophotometer optics & detector', 'Electronic transitions (sigma-sigma*, pi-pi*, n-pi*)'],
              objectives: [{ code: 'CH-U4-LO1', description: 'Apply Beer-Lambert’s law to quantitative spectrophotometric concentration determinations', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Flame Photometry & Chromatography',
              subtopics: ['Flame photometry principle (excitation of alkali metals Na, K)', 'Thin Layer Chromatography (TLC): stationary phase, mobile phase, Rf value'],
              objectives: [{ code: 'CH-U4-LO2', description: 'Interpret emission spectroscopy for alkali metals and chromatographic separation parameters', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Infrared (IR) Spectroscopy',
              subtopics: ['Vibrational modes (stretching & bending)', 'Fingerprint region vs functional group region', 'Double beam IR spectrophotometer applications'],
              objectives: [{ code: 'CH-U4-LO3', description: 'Identify characteristic organic functional groups from infrared vibrational absorption frequencies', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Engineering Materials',
          hours: '07 Hours',
          topics: [
            {
              title: 'Cement and Gypsum',
              subtopics: ['Portland cement chemical composition (Bogue compounds C3S, C2S, C3A, C4AF)', 'Setting and hardening reactions', 'Plaster of Paris manufacture, properties, and uses'],
              objectives: [{ code: 'CH-U5-LO1', description: 'Describe chemical hydration and setting chemistry of Portland cement and gypsum', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Polymers and Plastics',
              subtopics: ['Addition vs Condensation polymerization', 'Thermoplastic vs Thermosetting resins', 'Synthesis, properties and uses of Urea-formaldehyde'],
              objectives: [{ code: 'CH-U5-LO2', description: 'Differentiate polymer classifications and synthesize thermosetting urea-formaldehyde resin', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Natural & Synthetic Rubbers',
              subtopics: ['Natural rubber (cis-1,4-polyisoprene) & vulcanization with sulfur', 'Synthesis and applications of Styrene-Butadiene Rubber (SBR)'],
              objectives: [{ code: 'CH-U5-LO3', description: 'Explain vulcanization chemistry and evaluate industrial elastomer applications', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1EMES104',
      name: 'Engineering Mechanics',
      category: 'ESC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP A',
      description: 'Statics, force systems, trusses, friction, centroids, particle kinematics, and kinetics.',
      textbooks: [
        { title: 'Engineering Mechanics', author: 'S. Timoshenko, D. H. Young', publisher: 'McGraw Hill' },
        { title: 'Engineering Mechanics', author: 'Tayal A. K.', publisher: 'Umesh Publications' },
        { title: 'Engineering Mechanics', author: 'Bhavikatti S. S.', publisher: 'New Age International' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Introduction and Fundamental Principles',
          hours: '06 Hours',
          topics: [
            {
              title: 'Force Systems, Resolution and Composition',
              subtopics: ['Coplanar force systems', 'Resolution into rectangular components', 'Resultant of concurrent and non-concurrent force systems'],
              objectives: [{ code: 'EM-M1-LO1', description: 'Resolve complex force systems and calculate resultant magnitude, direction and point of application', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Moments, Couples and Varignon’s Theorem',
              subtopics: ['Moment of a force about a point', 'Couple properties', 'Varignon’s principle of moments'],
              objectives: [{ code: 'EM-M1-LO2', description: 'Apply Varignon’s theorem to determine line of action and resultant moment of non-concurrent forces', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Free Body Diagrams & Lami’s Theorem',
              subtopics: ['Types of supports (roller, hinged, fixed)', 'Drawing accurate FBDs', 'Lami’s theorem for 3 concurrent equilibrium forces'],
              objectives: [{ code: 'EM-M1-LO3', description: 'Construct accurate free body diagrams and apply Lami’s theorem to solve static particle equilibria', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Equilibrium, Centroid and Friction',
          hours: '06 Hours',
          topics: [
            {
              title: 'Static Equilibrium Conditions',
              subtopics: ['Analytical equations sigma Fx=0, sigma Fy=0, sigma M=0', 'Equilibrium of parallel and non-concurrent forces'],
              objectives: [{ code: 'EM-M2-LO1', description: 'Solve equations of static equilibrium for coplanar structural bodies', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Centroid and Moment of Inertia of Composite Shapes',
              subtopics: ['Centroid formulas for T-sections, I-sections, and L-angles', 'Parallel axis theorem & perpendicular axis theorem', 'Moment of inertia of standard planer shapes'],
              objectives: [{ code: 'EM-M2-LO2', description: 'Calculate centroid coordinates and second moment of area for composite structural cross-sections', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Coulomb’s Laws of Friction and Applications',
              subtopics: ['Limiting friction, coefficient of friction mu', 'Angle of friction and angle of repose', 'Wedge friction and ladder friction equilibrium'],
              objectives: [{ code: 'EM-M2-LO3', description: 'Analyze dry friction in wedges, blocks on inclined planes, and ladder problems', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Beams and Trusses',
          hours: '06 Hours',
          topics: [
            {
              title: 'Beam Reactions for Simply Supported and Continuous Beams',
              subtopics: ['Point loads, Uniformly Distributed Loads (UDL), Uniformly Varying Loads (UVL)', 'Support reaction calculations for simply supported beams'],
              objectives: [{ code: 'EM-M3-LO1', description: 'Compute support reactions for statically determinate beams under combined UDL, UVL, and point loads', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Analysis of Plane Trusses by Method of Joints and Sections',
              subtopics: ['Perfect, deficient, and redundant trusses', 'Zero-force member identification', 'Method of joints equilibrium', 'Method of sections cutting planes'],
              objectives: [{ code: 'EM-M3-LO2', description: 'Calculate axial member forces in pin-jointed trusses using method of joints and method of sections', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Kinematics of Particles',
          hours: '06 Hours',
          topics: [
            {
              title: 'Rectilinear Motion & Motion Diagrams',
              subtopics: ['Position, velocity, and acceleration relations', 'Constant vs variable acceleration differential equations', 's-t, v-t, and a-t curves interpretation'],
              objectives: [{ code: 'EM-M4-LO1', description: 'Analyze rectilinear motion under variable acceleration and sketch motion diagrams', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Curvilinear Motion: Projectile & Relative Velocity',
              subtopics: ['Motion under gravity', 'Projectile trajectory, maximum height, time of flight, horizontal range', 'Relative velocity vector analysis'],
              objectives: [{ code: 'EM-M4-LO2', description: 'Calculate trajectory parameters of projectiles and solve relative velocity problems', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Kinetics and Work, Power, Energy',
          hours: '06 Hours',
          topics: [
            {
              title: 'D’Alembert’s Principle in Linear Translation',
              subtopics: ['Inertia force concept (-ma)', 'Dynamic equilibrium equations for translating particles and connected bodies'],
              objectives: [{ code: 'EM-M5-LO1', description: 'Apply D’Alembert’s principle to analyze accelerating connected bodies on inclined planes', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Work-Energy Principle & Conservation of Energy',
              subtopics: ['Work done by gravity, spring, and friction forces', 'Kinetic energy and potential energy', 'Work-energy theorem for particles'],
              objectives: [{ code: 'EM-M5-LO2', description: 'Solve kinetic problems using work-energy theorem and conservation of mechanical energy', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Impulse, Momentum and Collision of Elastic Bodies',
              subtopics: ['Linear impulse-momentum equation', 'Direct central impact', 'Coefficient of restitution e', 'Loss of kinetic energy during impact'],
              objectives: [{ code: 'EM-M5-LO3', description: 'Evaluate velocities and energy dissipation during elastic and inelastic collisions', bloomLevel: 'ANALYZE' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1000ES106',
      name: 'Programming for Problem Solving',
      category: 'ESC',
      credits: 2,
      teachingScheme: '2L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP A',
      description: 'Fundamentals of computing, C programming language, control flow, functions, arrays, pointers, structures, and files.',
      textbooks: [
        { title: 'Programming with C', author: 'R. S. Bichkar', publisher: 'Orient Blackswan' },
        { title: 'Programming in ANSI C', author: 'E. Balagurusamy', publisher: 'Tata McGraw-Hill' },
        { title: 'The C Programming Language', author: 'Brian W. Kernighan, Dennis M. Ritchie', publisher: 'PHI' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Fundamentals of Computers and Programming Process',
          hours: '05 Hours',
          topics: [
            {
              title: 'Computer Anatomy, Memory & OS Overview',
              subtopics: ['Von Neumann architecture: CPU, ALU, CU, Registers', 'Primary memory (RAM, ROM) vs Secondary memory', 'System software vs Application software'],
              objectives: [{ code: 'PPS-U1-LO1', description: 'Explain computer architectural hierarchy, memory management, and operating system functions', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Algorithms, Flowcharts & Compilation Process',
              subtopics: ['Algorithm design properties', 'Flowchart symbols and constructs', 'C translation pipeline: Preprocessing, Compiling, Assembling, Linking, Loading'],
              objectives: [{ code: 'PPS-U1-LO2', description: 'Design algorithmic flowcharts and trace the multi-stage C compilation and execution pipeline', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Types, Operators and Expressions',
          hours: '06 Hours',
          topics: [
            {
              title: 'C Tokens, Data Types and Variable Declarations',
              subtopics: ['Keywords, Identifiers, Literals', 'Primitive data types (int, float, double, char) and qualifiers (signed, unsigned, short, long)', 'Constants and variable scope initialization'],
              objectives: [{ code: 'PPS-U2-LO1', description: 'Select appropriate data types and evaluate storage size and memory representation of C primitives', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Operators, Precedence and Type Conversions',
              subtopics: ['Arithmetic, Relational, Logical operators', 'Bitwise operators (&, |, ^, ~, <<, >>)', 'Increment/Decrement (++a vs a++)', 'Operator precedence and associativity table', 'Implicit vs Explicit type casting'],
              objectives: [{ code: 'PPS-U2-LO2', description: 'Evaluate complex C expressions adhering strictly to precedence rules and type casting behaviors', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Control Flow and Functions',
          hours: '07 Hours',
          topics: [
            {
              title: 'Conditional Branching Statements',
              subtopics: ['If-else statement and nested if-else', 'Else-if ladder', 'Switch-case statement with break, default and fallthrough'],
              objectives: [{ code: 'PPS-U3-LO1', description: 'Implement decision-making algorithms using if-else ladders and switch statements', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Iterative Loops and Jump Statements',
              subtopics: ['Entry controlled: while, for loops', 'Exit controlled: do-while loop', 'break, continue, and goto jump labels'],
              objectives: [{ code: 'PPS-U3-LO2', description: 'Construct iterative loops for sequence generation, summation, and pattern printing', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Functions, Variable Scope and Recursion',
              subtopics: ['Function declaration, definition, and calling', 'Call by value vs Call by reference intro', 'Storage classes (auto, register, static, extern)', 'Recursive functions (Factorial, Fibonacci, GCD)'],
              objectives: [{ code: 'PPS-U3-LO3', description: 'Decompose software into modular functions and formulate recursive call stacks', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Arrays and Pointers in C',
          hours: '06 Hours',
          topics: [
            {
              title: 'One-Dimensional and Multidimensional Arrays',
              subtopics: ['Array indexing, memory layout, bounds checking', 'Character arrays and null-terminated strings', '2D arrays for matrix addition and multiplication'],
              objectives: [{ code: 'PPS-U4-LO1', description: 'Manipulate linear and multi-dimensional matrices and strings in memory', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Pointers and Pointer Arithmetic',
              subtopics: ['Address-of operator (&) and dereference operator (*)', 'Pointer declarations and initialization', 'Pointer arithmetic and array-pointer equivalence', 'Pointers to int, float, char'],
              objectives: [{ code: 'PPS-U4-LO2', description: 'Explain pointer memory addresses and traverse array buffers using pointer arithmetic', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Structures and File Management',
          hours: '06 Hours',
          topics: [
            {
              title: 'Structures and Arrays of Structures',
              subtopics: ['struct declaration and member access (.)', 'Memory alignment and padding', 'Array of structures (student database)', 'Pointers to structures and arrow operator (->)'],
              objectives: [{ code: 'PPS-U5-LO1', description: 'Model real-world heterogeneous records using C structures and structure pointers', bloomLevel: 'APPLY' }]
            },
            {
              title: 'File I/O Operations',
              subtopics: ['FILE pointer, fopen() modes ("r", "w", "a", "rb", "wb")', 'Character I/O (fgetc, fputc)', 'Formatted I/O (fscanf, fprintf)', 'Block I/O (fread, fwrite) and fclose()'],
              objectives: [{ code: 'PPS-U5-LO2', description: 'Persist and retrieve structured data records from external text and binary files', bloomLevel: 'APPLY' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1000VS109',
      name: 'Communication Skills',
      category: 'AEC-01',
      credits: 2,
      teachingScheme: '2L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP A',
      description: 'Linguistic proficiency, LSRW skills, phonetics, grammar, public speaking, and technical report writing.',
      textbooks: [
        { title: 'Communication Skills for Engineers', author: 'Mohd. Ashraf Rizvi', publisher: 'Tata McGraw Hill' },
        { title: 'Communication Skills', author: 'Sanjay Kumar, Pushp Lata', publisher: 'Oxford University Press' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Communication and Communication Processes',
          hours: '04 Hours',
          topics: [
            {
              title: 'Elements and Barriers to Communication',
              subtopics: ['Sender, encoding, channel, receiver, decoding, feedback loop', 'Psychological, mechanical, physical, and linguistic barriers', 'Strategies to overcome barriers'],
              objectives: [{ code: 'CS-U1-LO1', description: 'Identify communication models and eliminate interpersonal and organizational transmission barriers', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Reading and Listening Skills',
              subtopics: ['Skimming, scanning, extensive and intensive reading', 'Active vs passive listening', 'Barriers to effective listening'],
              objectives: [{ code: 'CS-U1-LO2', description: 'Demonstrate comprehension via active listening and strategic reading techniques', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Speaking, Verbal and Non-verbal Communication',
          hours: '04 Hours',
          topics: [
            {
              title: 'Spoken Communication & Group Discussions',
              subtopics: ['Public speaking anxiety management', 'Principles and dynamics of Group Discussion (GD)', 'Leadership, moderation, and conflict mitigation in GD'],
              objectives: [{ code: 'CS-U2-LO1', description: 'Participate constructively in professional group discussions and deliver structured public speeches', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Non-verbal Communication & Body Language',
              subtopics: ['Kinesics (gestures, postures, facial expressions)', 'Proxemics (personal space)', 'Paralanguage (pitch, pace, tone, modulation)'],
              objectives: [{ code: 'CS-U2-LO2', description: 'Interpret and employ appropriate non-verbal cues and vocal modulation during presentations', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Study of Sounds in English',
          hours: '02 Hours',
          topics: [
            {
              title: 'Phonetics and Phonemic Transcription',
              subtopics: ['Speech organs and articulation mechanism', '44 English phonemes: 20 vowels (monophthongs & diphthongs) and 24 consonants', 'IPA transcription and syllable stress'],
              objectives: [{ code: 'CS-U3-LO1', description: 'Transcribe words using standard International Phonetic Alphabet (IPA) and mark word stress', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'English Grammar in Engineering Practice',
          hours: '05 Hours',
          topics: [
            {
              title: 'Tenses, Articles and Prepositions',
              subtopics: ['12 verb tenses and their contextual usage in technical reports', 'Definite and indefinite articles (a, an, the)', 'Prepositions of time, place, and direction'],
              objectives: [{ code: 'CS-U4-LO1', description: 'Apply correct grammatical tenses, articles, and prepositions in technical prose', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Auxiliary Verbs and Common Syntactic Errors',
              subtopics: ['Modal auxiliaries (can, could, should, must, might)', 'Subject-verb agreement rules', 'Dangling modifiers and run-on sentences'],
              objectives: [{ code: 'CS-U4-LO2', description: 'Detect and correct common sentence structure and subject-verb concord errors', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Technical Writing Skills',
          hours: '04 Hours',
          topics: [
            {
              title: 'Technical Report Writing',
              subtopics: ['Report formats and structures (Title, Abstract, Introduction, Methodology, Results, Conclusion)', 'Formal technical style and objectivity'],
              objectives: [{ code: 'CS-U5-LO1', description: 'Draft comprehensive, logically structured engineering and technical reports', bloomLevel: 'CREATE' }]
            },
            {
              title: 'Professional Correspondence & Resumes',
              subtopics: ['Official email etiquette and conventions', 'Job application letters (cover letters)', 'Chronological vs Functional resume design'],
              objectives: [{ code: 'CS-U5-LO2', description: 'Compose professional emails, job application letters, and ATS-friendly resumes', bloomLevel: 'CREATE' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1000BS201',
      name: 'Engineering Mathematics – II',
      category: 'BSC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'II',
      group: 'GROUP A',
      description: 'Complex numbers, ODEs, higher-order differential equations, Fourier series, and Vector Calculus.',
      textbooks: [
        { title: 'Higher Engineering Mathematics', author: 'B. S. Grewal', publisher: 'Khanna Publishers' },
        { title: 'Advanced Engineering Mathematics', author: 'Erwin Kreyszig', publisher: 'John Wiley & Sons' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Complex Numbers and Functions',
          hours: '08 Hours',
          topics: [
            {
              title: 'De-Moivre’s Theorem and Roots of Complex Numbers',
              subtopics: ['Polar form r(cos theta + i sin theta)', 'De-Moivre’s theorem expansion', 'Finding nth roots of unity and complex values'],
              objectives: [{ code: 'M2-U1-LO1', description: 'Apply De-Moivre’s theorem to evaluate complex roots and trigonometric polynomial identities', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Circular and Hyperbolic Functions',
              subtopics: ['Definitions: sinh x, cosh x, tanh x', 'Relations between circular and hyperbolic functions (cos(ix) = cosh x, sin(ix) = i sinh x)', 'Separation of u + iv real and imaginary parts'],
              objectives: [{ code: 'M2-U1-LO2', description: 'Separate transcendental functions into real and imaginary parts', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Ordinary Differential Equations of First Order and First Degree',
          hours: '08 Hours',
          topics: [
            {
              title: 'Linear and Bernoulli’s Differential Equations',
              subtopics: ['First order linear DE dy/dx + Py = Q', 'Integrating factor IF = e^(integral P dx)', 'Bernoulli’s non-linear reduction dy/dx + Py = Q y^n'],
              objectives: [{ code: 'M2-U2-LO1', description: 'Solve first order linear and reducible Bernoulli differential equations', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Exact Differential Equations and Integrating Factors',
              subtopics: ['Condition of exactness dM/dy = dN/dx', 'Integrating factor inspection and rules', 'Orthogonal trajectories in Cartesian and polar'],
              objectives: [{ code: 'M2-U2-LO2', description: 'Identify exact equations and determine orthogonal trajectories of geometric families', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Engineering Applications of First Order ODEs',
              subtopics: ['Newton’s Law of Cooling', 'RL and RC electrical circuits transient responses', 'Mechanical damping models'],
              objectives: [{ code: 'M2-U2-LO3', description: 'Model electrical circuits and thermal cooling systems using first order ODEs', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Linear Differential Equations with Constant Coefficients',
          hours: '08 Hours',
          topics: [
            {
              title: 'Complementary Functions and Particular Integrals',
              subtopics: ['Auxiliary equation with real, repeated, and complex roots', 'Short-cut methods for PI with e^(ax), sin(ax), cos(ax), x^m, e^(ax)V'],
              objectives: [{ code: 'M2-U3-LO1', description: 'Compute general solutions of higher order LDEs with constant coefficients', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Method of Variation of Parameters',
              subtopics: ['Wronskian determinant W(y1, y2)', 'General particular integral formulation for sec x, tan x, 1/x'],
              objectives: [{ code: 'M2-U3-LO2', description: 'Apply method of variation of parameters to solve non-homogeneous LDEs where shortcut rules fail', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Cauchy’s and Legendre’s Linear Equations',
              subtopics: ['Transformation x = e^z', 'Reduction of variable coefficient equations to constant coefficient form'],
              objectives: [{ code: 'M2-U3-LO3', description: 'Solve Cauchy-Euler homogeneous differential equations via logarithmic variable substitution', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Fourier Series',
          hours: '08 Hours',
          topics: [
            {
              title: 'Euler’s Formulae & Dirichlet’s Conditions',
              subtopics: ['Dirichlet’s criteria for convergence', 'Fourier coefficients a0, an, bn over [-pi, pi] and [0, 2pi]', 'Piecewise continuous functions and jump discontinuities'],
              objectives: [{ code: 'M2-U4-LO1', description: 'Expand periodic waveforms into full-range trigonometric Fourier series', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Half-Range Expansions and Arbitrary Intervals',
              subtopics: ['Even and odd function symmetries', 'Half-range cosine series and sine series over [0, L]', 'Parseval’s identity for series sum evaluation'],
              objectives: [{ code: 'M2-U4-LO2', description: 'Formulate half-range Fourier sine and cosine series for engineering boundary problems', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Vector Calculus',
          hours: '08 Hours',
          topics: [
            {
              title: 'Gradient, Divergence and Curl',
              subtopics: ['Del operator nabla', 'Directional derivative and gradient of scalar field', 'Divergence, curl, solenoidal (div V = 0) and irrotational (curl V = 0) vector fields', 'Scalar potential function phi'],
              objectives: [{ code: 'M2-U5-LO1', description: 'Compute gradient, divergence, curl, and verify irrotational conservative force fields', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Vector Integral Theorems: Green, Gauss and Stokes',
              subtopics: ['Line integrals and circulation', 'Green’s theorem in the plane', 'Gauss Divergence theorem (flux surface to volume)', 'Stokes’ theorem (circulation to curl flux)'],
              objectives: [{ code: 'M2-U5-LO2', description: 'Evaluate vector surface, flux, and contour integrals using Gauss divergence and Stokes theorems', bloomLevel: 'EVALUATE' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF2PHYBS202',
      name: 'Engineering Physics',
      category: 'BSC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'II',
      group: 'GROUP A',
      description: 'Acoustics, ultrasonics, optics, lasers, quantum mechanics, crystal structures, and physics of advanced materials.',
      textbooks: [
        { title: 'Engineering Physics', author: 'M. N. Avadhanulu and P. G. Kshirsagar', publisher: 'S. Chand' },
        { title: 'Engineering Physics', author: 'R. K. Gaur and S. L. Gupta', publisher: 'Dhanpat Rai' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Acoustics, Ultrasonics and Dielectrics',
          hours: '08 Hours',
          topics: [
            {
              title: 'Acoustics of Buildings & Sabine’s Formula',
              subtopics: ['Reverberation and echo', 'Reverberation time T = 0.161 V / sum(a S)', 'Sound absorption coefficients and architectural acoustic planning'],
              objectives: [{ code: 'PHY-U1-LO1', description: 'Calculate hall reverberation times using Sabine’s equation and prescribe acoustic remediation', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Ultrasonic Wave Generation and Applications',
              subtopics: ['Magnetostriction oscillator method', 'Piezoelectric quartz crystal method (resonance frequency)', 'Applications: NDT flaw detection, SONAR, ultrasonic cleaning'],
              objectives: [{ code: 'PHY-U1-LO2', description: 'Explain piezoelectric production of high-frequency ultrasound and its industrial NDT testing', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Dielectrics and Polarization Mechanisms',
              subtopics: ['Polar vs non-polar dielectrics', 'Electronic, ionic, orientational, and space-charge polarizations', 'Dielectric constant and dielectric breakdown'],
              objectives: [{ code: 'PHY-U1-LO3', description: 'Analyze dielectric polarization types and frequency response curves', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Engineering Optics and Lasers',
          hours: '08 Hours',
          topics: [
            {
              title: 'Interference in Thin Films & Newton’s Rings',
              subtopics: ['Cosine law for thin parallel film 2mu t cos r = n lambda', 'Wedge-shaped thin film fringe spacing', 'Newton’s rings apparatus, ring diameter formulas, wavelength and refractive index determination'],
              objectives: [{ code: 'PHY-U2-LO1', description: 'Calculate thin film thicknesses and optical wavelengths from Newton’s rings diameter measurements', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Lasers and Fiber Optics',
              subtopics: ['Stimulated emission, spontaneous emission, population inversion, optical pumping', 'He-Ne Gas Laser and Semiconductor Diode Laser construction', 'Total internal reflection, acceptance angle, Numerical Aperture NA = sqrt(n1^2 - n2^2)'],
              objectives: [{ code: 'PHY-U2-LO2', description: 'Explain laser population inversion dynamics and calculate optical fiber light gathering power', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Quantum Mechanics and Quantum Computing',
          hours: '07 Hours',
          topics: [
            {
              title: 'Wave-Particle Duality & Heisenberg’s Principle',
              subtopics: ['De Broglie matter wavelength lambda = h/p', 'Heisenberg’s uncertainty principle Delta x Delta p >= h-bar / 2', 'Physical interpretation of wave function Psi and probability density |Psi|^2'],
              objectives: [{ code: 'PHY-U3-LO1', description: 'Calculate de Broglie wavelengths and apply uncertainty limits to subatomic particles', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Schrödinger Equations and Quantum Computing Intro',
              subtopics: ['Time-dependent and time-independent Schrödinger wave equations', 'Particle trapped in an infinite 1D potential well (eigenvalues En = n^2 h^2 / 8m L^2)', 'Introduction to qubits vs classical bits, superposition, and quantum computing basics'],
              objectives: [{ code: 'PHY-U3-LO2', description: 'Derive quantized energy levels for a particle in a 1D box and differentiate classical bits from qubits', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Crystal Structure and Nuclear Physics',
          hours: '07 Hours',
          topics: [
            {
              title: 'Crystallography and Miller Indices',
              subtopics: ['Lattice, basis, unit cell, 7 crystal systems, 14 Bravais lattices', 'Cubic crystals: SC, BCC, FCC lattice parameters, coordination number, Atomic Packing Factor (APF)', 'Miller indices (hkl), interplanar spacing d = a / sqrt(h^2 + k^2 + l^2)'],
              objectives: [{ code: 'PHY-U4-LO1', description: 'Determine Miller indices of crystal planes and calculate atomic packing efficiency in SC, BCC, and FCC structures', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Nuclear Physics and GM Counter',
              subtopics: ['Nuclear binding energy and mass defect Delta m', 'Q-value of nuclear reactions (exoergic vs endoergic)', 'Geiger-Müller (GM) counter: construction, ionization, quenching, plateau curve'],
              objectives: [{ code: 'PHY-U4-LO2', description: 'Compute nuclear Q-values and explain radiation detection characteristics of GM counters', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Physics of Advanced Materials',
          hours: '07 Hours',
          topics: [
            {
              title: 'Magnetic Materials and Hysteresis',
              subtopics: ['Dia, para, and ferromagnetic materials', 'Domain theory of ferromagnetism', 'B-H Hysteresis loop: retentivity, coercivity, hysteresis energy loss'],
              objectives: [{ code: 'PHY-U5-LO1', description: 'Evaluate magnetic materials for transformer cores and permanent magnets using B-H hysteresis parameters', bloomLevel: 'EVALUATE' }]
            },
            {
              title: 'Semiconductors and Hall Effect',
              subtopics: ['Intrinsic and extrinsic semiconductor carrier concentrations', 'Hall Effect: Hall voltage VH, Hall coefficient RH = 1/(n e), experimental derivation', 'Applications: determining carrier type, density, and magnetic field sensing'],
              objectives: [{ code: 'PHY-U5-LO2', description: 'Derive Hall coefficient formula and calculate charge carrier concentration and mobility', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Superconductors and Nanomaterials',
              subtopics: ['Critical temperature Tc, critical magnetic field Hc', 'Meissner effect and perfect diamagnetism', 'Type I vs Type II superconductors, BCS Cooper pairs intro', 'Nanomaterials: Top-down vs Bottom-up synthesis, CNTs, XRD characterization'],
              objectives: [{ code: 'PHY-U5-LO3', description: 'Differentiate superconductor types, explain Meissner levitation, and categorize nanomaterial synthesis methods', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF2EGRES204',
      name: 'Engineering Graphics',
      category: 'ESC',
      credits: 2,
      teachingScheme: '2L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'II',
      group: 'GROUP A',
      description: 'Orthographic projections, points, lines, planes, solids, sections, development, and isometric drawings.',
      textbooks: [
        { title: 'Engineering Drawing', author: 'N. D. Bhatt', publisher: 'Charotar Publishing House' },
        { title: 'Engineering Graphics', author: 'K. Venugopal', publisher: 'New Age International' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Introduction to Engineering Drawing and Scales',
          hours: '04 Hours',
          topics: [
            {
              title: 'Drawing Standards, Lettering and Scales',
              subtopics: ['BIS conventions, lines and lettering', 'Representative Fraction (RF)', 'Plain Scales, Diagonal Scales, and Vernier Scales'],
              objectives: [{ code: 'EG-U1-LO1', description: 'Construct plain and diagonal scales with calculated RF and measure lengths accurately', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Projection of Points and Straight Lines',
          hours: '04 Hours',
          topics: [
            {
              title: 'Projections of Lines in Various Quadrants',
              subtopics: ['Quadrant systems (1st angle vs 3rd angle projection)', 'Line inclined to HP and VP', 'True length, true inclinations (theta, phi), apparent angles (alpha, beta), traces (HT, VT)'],
              objectives: [{ code: 'EG-U2-LO1', description: 'Project straight lines inclined to both reference planes and find true lengths and traces', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Projection of Planes and Solids',
          hours: '04 Hours',
          topics: [
            {
              title: 'Projection of Planes and Solids with Inclined Axes',
              subtopics: ['Projections of circular, triangular, and regular polygonal planes', 'Prisms, pyramids, cylinders, and cones with axis inclined to HP/VP', 'Auxiliary plane projection method'],
              objectives: [{ code: 'EG-U3-LO1', description: 'Draw orthographic views of polyhedra and solids of revolution with inclined axes', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Sections of Solids & Development of Lateral Surfaces',
          hours: '04 Hours',
          topics: [
            {
              title: 'Cutting Planes, True Shape of Section & Surface Development',
              subtopics: ['Section planes parallel, perpendicular, or inclined to HP/VP', 'True shape of section', 'Development of lateral surfaces of prisms, cylinders, pyramids, and cones'],
              objectives: [{ code: 'EG-U4-LO1', description: 'Construct sectioned views of solids and draft flat sheet-metal developments of lateral surfaces', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Orthographic and Isometric Projections',
          hours: '04 Hours',
          topics: [
            {
              title: 'Orthographic Views & Isometric Drawings',
              subtopics: ['First angle projection of 3D machine blocks (Front, Top, and Side views)', 'Isometric scale construction: True length * sqrt(2/3) = 0.816', 'Isometric views of objects with circular holes, slots, and inclined faces'],
              objectives: [{ code: 'EG-U5-LO1', description: 'Convert pictorial machine blocks into 2D orthographic projections and reconstruct isometric 3D models', bloomLevel: 'CREATE' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1000ES206',
      name: 'Basic Electrical and Electronics Engineering',
      category: 'ESC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'II',
      group: 'GROUP A',
      description: 'DC & AC circuit laws, electrical machines, transformers, diodes, BJT amplifiers, and measuring instruments.',
      textbooks: [
        { title: 'Basic Electrical and Electronics Engineering', author: 'D. P. Kothari and I. J. Nagrath', publisher: 'McGraw Hill' },
        { title: 'Electronic Devices and Circuit Theory', author: 'Boylestad', publisher: 'Pearson' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Electrical Circuits (DC and AC)',
          hours: '08 Hours',
          topics: [
            {
              title: 'DC Circuit Analysis: KCL, KVL, Mesh, Nodal & Star-Delta',
              subtopics: ['Ohm’s law and circuit parameters R, L, C', 'Kirchhoff’s Current Law (KCL) and Voltage Law (KVL)', 'Mesh loop analysis and Nodal analysis with independent sources', 'Star-Delta and Delta-Star equivalence transformations'],
              objectives: [{ code: 'BEEE-U1-LO1', description: 'Calculate node voltages and branch currents in complex DC networks using KCL, KVL, and Star-Delta conversions', bloomLevel: 'APPLY' }]
            },
            {
              title: 'AC Circuits and Series RLC Resonance',
              subtopics: ['Sinusoidal alternating waveforms: peak, average, and RMS values', 'Form factor and peak factor', 'Active power P, reactive power Q, apparent power S, power factor cos phi', 'Series RLC resonance frequency fr = 1 / (2 pi sqrt(LC))'],
              objectives: [{ code: 'BEEE-U1-LO2', description: 'Analyze series RLC circuits and calculate power factor, impedance, and resonant frequencies', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Electrical Machines and Transformers',
          hours: '08 Hours',
          topics: [
            {
              title: 'DC Motors and 3-Phase Induction Motors',
              subtopics: ['DC motor construction and working principle', 'Back EMF Eb = (P phi Z N) / (60 A) and torque equation', 'Characteristics of DC shunt and series motors', 'Working principle of 3-phase squirrel cage induction motor'],
              objectives: [{ code: 'BEEE-U2-LO1', description: 'Derive torque equations of DC motors and explain rotating magnetic field induction principles', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Single Phase Transformer',
              subtopics: ['Transformer core and winding construction', 'EMF equation E = 4.44 f N phi_m', 'Transformation ratio K, iron losses and copper losses', 'Efficiency and voltage regulation calculations'],
              objectives: [{ code: 'BEEE-U2-LO2', description: 'Calculate single-phase transformer EMF, efficiency, and regulation from open/short circuit parameters', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Rectifiers and Power Supplies',
          hours: '07 Hours',
          topics: [
            {
              title: 'PN Junction Diodes and Bridge Rectifiers',
              subtopics: ['Forward and reverse V-I characteristics of PN junction diode', 'Avalanche vs Zener breakdown', 'Full wave bridge rectifier operation, PIV, and efficiency (81.2%)', 'Capacitor smoothing filter action'],
              objectives: [{ code: 'BEEE-U3-LO1', description: 'Analyze bridge rectifier rectification efficiency and ripple reduction through capacitor filtering', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Zener Diode & IC Voltage Regulators (78xx / 79xx)',
              subtopics: ['Zener diode as shunt voltage regulator', 'Block diagram of regulated DC power supply', 'Three-terminal fixed positive 78xx and negative 79xx regulators'],
              objectives: [{ code: 'BEEE-U3-LO2', description: 'Design regulated DC power supplies utilizing Zener diodes and 78xx/79xx ICs', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'BJT and Transistor Amplifiers',
          hours: '07 Hours',
          topics: [
            {
              title: 'Bipolar Junction Transistors (BJT) Characteristics',
              subtopics: ['PNP and NPN physical configurations', 'Input and output characteristics of Common Emitter (CE) configuration', 'Current gain relationships between alpha, beta, and gamma', 'DC Load line and Q-point (quiescent point)'],
              objectives: [{ code: 'BEEE-U4-LO1', description: 'Plot CE transistor output characteristics and establish stable Q-point on DC load line', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Biasing and Single Stage RC Coupled Amplifier',
              subtopics: ['Voltage divider (self) bias circuit and stability factor S', 'Transistor operation as small-signal amplifier', 'Circuit diagram and frequency response curve of RC coupled amplifier (bandwidth, 3dB cutoff frequencies)'],
              objectives: [{ code: 'BEEE-U4-LO2', description: 'Analyze voltage amplification and frequency response of RC coupled amplifiers', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Measurements and Instrumentation',
          hours: '06 Hours',
          topics: [
            {
              title: 'Analog Indicating Instruments (PMMC and MI)',
              subtopics: ['Deflecting, controlling (spring), and damping (eddy current) torques', 'Permanent Magnet Moving Coil (PMMC) instrument (DC only)', 'Moving Iron (MI) instrument attraction and repulsion types (AC & DC)', 'Ammeter shunts and voltmeter multipliers'],
              objectives: [{ code: 'BEEE-U5-LO1', description: 'Compare operating principles of PMMC and Moving Iron instruments and extend instrument ranges', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Electronic Measurement Instruments (DSO & Multimeters)',
              subtopics: ['Digital Multimeter block diagram and operation', 'Function generator block diagram (sine, square, triangular waves)', 'Digital Storage Oscilloscope (DSO): voltage, frequency, phase measurement, sampling rate'],
              objectives: [{ code: 'BEEE-U5-LO2', description: 'Measure waveform amplitude, frequency, and phase shift using Digital Storage Oscilloscopes', bloomLevel: 'APPLY' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF2CMEES208',
      name: 'Basic Civil and Mechanical Engineering',
      category: 'ESC',
      credits: 3,
      teachingScheme: '3L-0T-0P',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'II',
      group: 'GROUP A',
      description: 'Introduction to civil engineering materials, building planning, surveying, thermodynamics, IC engines, and manufacturing processes.',
      textbooks: [
        { title: 'Elements of Civil Engineering', author: 'Anurag Kandya', publisher: 'Charotar Publishing' },
        { title: 'Engineering Thermodynamics', author: 'P. K. Nag', publisher: 'Tata McGraw Hill' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Civil: Materials & Construction',
          hours: '04 Hours',
          topics: [
            {
              title: 'Engineering Properties and Uses of Civil Materials',
              subtopics: ['Bricks, timber, stone classification', 'Cement, sand, aggregates, and mortar mixes', 'Concrete, structural steel, bitumen, FRP composites'],
              objectives: [{ code: 'BCME-U1-LO1', description: 'Select suitable construction materials based on compressive strength, durability, and cost', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Civil: Building Components & Planning',
          hours: '04 Hours',
          topics: [
            {
              title: 'Foundations and Superstructure Elements',
              subtopics: ['Shallow vs deep foundations (isolated footing, combined footing, pile foundations)', 'Plinth, lintels, columns, beams, slabs, staircases', 'Building bylaws: ventilation, lighting, plumbing and sanitation'],
              objectives: [{ code: 'BCME-U2-LO1', description: 'Identify structural load paths and building planning architectural principles', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Civil: Surveying and Levelling',
          hours: '04 Hours',
          topics: [
            {
              title: 'Surveying Principles, Levelling and Contours',
              subtopics: ['Working from whole to part principle', 'Plane table surveying methods (radiation, intersection)', 'Direct levelling, bench marks, Height of Instrument (HI) vs Rise and Fall methods', 'Contour lines, interval, and interpretation'],
              objectives: [{ code: 'BCME-U3-LO1', description: 'Calculate reduced levels using Height of Instrument and Rise & Fall surveying methods', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Mechanical: Thermodynamics and IC Engines',
          hours: '04 Hours',
          topics: [
            {
              title: 'Laws of Thermodynamics & IC Engines',
              subtopics: ['Zeroth, First, and Second laws of thermodynamics', '2-stroke vs 4-stroke petrol (SI) and diesel (CI) engine cycles', 'Power plants: Thermal, Hydroelectric, Gas turbine, and Nuclear generation schemes'],
              objectives: [{ code: 'BCME-U4-LO1', description: 'Contrast 2-stroke and 4-stroke IC engines and trace thermodynamic energy conversion cycles', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Mechanical: Machine Design & Manufacturing',
          hours: '04 Hours',
          topics: [
            {
              title: 'Mechanisms, Factor of Safety and Machining Operations',
              subtopics: ['Kinematic links and mechanisms', 'Factor of safety definition and criteria', 'Lathe machine operations (turning, facing, threading)', 'Drilling, milling, and sand casting processes'],
              objectives: [{ code: 'BCME-U5-LO1', description: 'Identify conventional machining operations on lathe, drilling, and milling machine tools', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1EEEES209',
      name: 'Energy and Environmental Engineering',
      category: 'BSC',
      credits: 2,
      teachingScheme: '2L-0T-0P',
      evaluationScheme: 'CA: 50 (Audit Course)',
      semester: 'II',
      group: 'GROUP A',
      description: 'Ecosystems, conventional and renewable energy sources, air pollution, and wastewater treatment technologies.',
      textbooks: [
        { title: 'A Textbook on Power System Engineering', author: 'A. Chakrabarti', publisher: 'Dhanpat Rai' },
        { title: 'Environmental Chemistry', author: 'V. K. Ahluwalia', publisher: 'Ane Books' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Ecosystems and Environment',
          hours: '05 Hours',
          topics: [
            {
              title: 'Structure and Segments of the Environment',
              subtopics: ['Atmosphere, Hydrosphere, Lithosphere, Biosphere', 'Biotic and abiotic ecosystem components', 'Food chains, food webs, ecological pyramids'],
              objectives: [{ code: 'EEE-U1-LO1', description: 'Explain ecological interactions and energy flow across trophic levels', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Conventional Power Generation',
          hours: '07 Hours',
          topics: [
            {
              title: 'Thermal, Gas Turbine, Hydro and Nuclear Power Plants',
              subtopics: ['Simple gas turbine open and closed cycles', 'Hydroelectric site selection and storage layout', 'Nuclear reactor components: fuel rods, moderator, control rods, coolant, containment'],
              objectives: [{ code: 'EEE-U2-LO1', description: 'Compare thermodynamic operating layouts of thermal, nuclear, and hydroelectric power plants', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Renewable Energy Sources',
          hours: '06 Hours',
          topics: [
            {
              title: 'Solar, Wind, Tidal, Biomass and Geothermal Energy',
              subtopics: ['Solar photovoltaic and solar thermal collectors', 'Wind turbine aerodynamics and Betz limit', 'Tidal barrages, biomass gasification, geothermal steam extraction'],
              objectives: [{ code: 'EEE-U3-LO1', description: 'Evaluate renewable power generation feasibility and clean energy conversion techniques', bloomLevel: 'EVALUATE' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Air Pollution and Climate Change',
          hours: '05 Hours',
          topics: [
            {
              title: 'Air Pollutants, Acid Rain and Global Warming',
              subtopics: ['Primary vs secondary pollutants (SOx, NOx, CO, particulate matter PM2.5/PM10)', 'Automobile emissions and catalytic converters', 'Mechanism of acid rain and greenhouse effect', 'Electrostatic precipitators and scrubbers for pollution control'],
              objectives: [{ code: 'EEE-U4-LO1', description: 'Analyze chemical mechanisms of atmospheric pollutants, acid rain, and flue gas scrubbing technologies', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Water and Soil Pollution Treatment',
          hours: '07 Hours',
          topics: [
            {
              title: 'Wastewater Treatment and Soil Contamination',
              subtopics: ['Biological Oxygen Demand (BOD) and Chemical Oxygen Demand (COD)', 'Activated Sludge Process (ASP) biological oxidation', 'Soil contamination by heavy metals, pesticides, and remediation techniques'],
              objectives: [{ code: 'EEE-U5-LO1', description: 'Design secondary biological wastewater treatment processes using activated sludge', bloomLevel: 'APPLY' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1000VS211',
      name: 'Design Thinking',
      category: 'VSEC',
      credits: 2,
      teachingScheme: '2L-0T-0P',
      evaluationScheme: 'CA: 60, ESE: 40',
      semester: 'II',
      group: 'GROUP A',
      description: 'Creative problem solving, empathy, Kolb’s learning styles, iterative prototyping, and customer-centric product design.',
      textbooks: [
        { title: 'Karmic Design Thinking', author: 'Prof. Bala Ramadurai', publisher: 'Self-published' },
        { title: 'Change by Design', author: 'Tim Brown', publisher: 'HarperCollins' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'An Insight to Learning and Remembering',
          hours: '04 Hours',
          topics: [
            {
              title: 'Kolb’s Learning Styles & Memory Processes',
              subtopics: ['Experiential learning cycle (Concrete Experience, Reflective Observation, Abstract Conceptualization, Active Experimentation)', 'Working memory vs long-term memory encoding', 'Memory enhancement techniques (mnemonics, chunking, spaced recall)'],
              objectives: [{ code: 'DT-U1-LO1', description: 'Assess individual learning styles via Kolb’s model and apply cognitive memory enhancement strategies', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Emotions and the 5 Stages of Design Thinking',
          hours: '05 Hours',
          topics: [
            {
              title: 'The Five Stages: Empathize, Define, Ideate, Prototype, Test',
              subtopics: ['Emotional intelligence and stakeholder empathy interviews', 'Point of View (POV) problem framing', 'Brainstorming rules and divergent thinking', 'Rapid low-fidelity prototyping and user testing cycles'],
              objectives: [{ code: 'DT-U2-LO1', description: 'Apply the 5-phase Stanford d.school Design Thinking framework to open-ended human problems', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Problem Fixing and Engineering Product Design',
          hours: '05 Hours',
          topics: [
            {
              title: 'Creative Problem Solving and Product Synthesis',
              subtopics: ['Convergent vs divergent thinking tools', 'SCAMPER ideation technique', 'Morphological analysis for engineering mechanism design', 'Case studies of breakthrough consumer products'],
              objectives: [{ code: 'DT-U3-LO1', description: 'Formulate novel product architectures using structured creative problem solving methods', bloomLevel: 'CREATE' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Rapid Prototyping & Testing',
          hours: '04 Hours',
          topics: [
            {
              title: 'Prototype Fidelity, Testing and Focus Groups',
              subtopics: ['Paper prototypes, wireframes, 3D mockups', 'A/B testing, user usability observation, think-aloud protocols', 'Test group marketing and feedback matrix'],
              objectives: [{ code: 'DT-U4-LO1', description: 'Develop rapid testable prototypes and conduct structured usability evaluations', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 5,
          title: 'Customer Centricity and Product Experience',
          hours: '04 Hours',
          topics: [
            {
              title: 'Customer Journey Mapping & Value Alignment',
              subtopics: ['Customer persona creation and touchpoint empathy maps', 'Net Promoter Score (NPS) and customer effort score', 'Aligning user functional and emotional expectations with engineered solutions'],
              objectives: [{ code: 'DT-U5-LO1', description: 'Map customer journey touchpoints and calibrate product design parameters to real customer expectations', bloomLevel: 'EVALUATE' }]
            }
          ]
        }
      ]
    }
  ];

  for (const subj of syllabusData) {
    console.log(`Seeding subject: ${subj.code} - ${subj.name}...`);
    const createdSubj = await prisma.subject.upsert({
      where: { id: `subj-${subj.code}` },
      update: {
        name: subj.name,
        category: subj.category,
        credits: subj.credits,
        teachingScheme: subj.teachingScheme,
        evaluationScheme: subj.evaluationScheme,
        semester: subj.semester,
        group: subj.group,
        description: subj.description,
      },
      create: {
        id: `subj-${subj.code}`,
        code: subj.code,
        name: subj.name,
        category: subj.category,
        credits: subj.credits,
        teachingScheme: subj.teachingScheme,
        evaluationScheme: subj.evaluationScheme,
        semester: subj.semester,
        group: subj.group,
        description: subj.description,
        userId: student.id,
      },
    });

    // Seed Textbooks
    if (subj.textbooks) {
      for (const tb of subj.textbooks) {
        await prisma.textBook.create({
          data: {
            subjectId: createdSubj.id,
            title: tb.title,
            author: tb.author,
            publisher: tb.publisher,
            isReference: false,
          },
        });
      }
    }

    // Seed Units & Topics
    for (const unit of subj.units) {
      const createdUnit = await prisma.unit.create({
        data: {
          subjectId: createdSubj.id,
          unitNumber: unit.unitNumber,
          title: unit.title,
          hours: unit.hours,
          orderIndex: unit.unitNumber,
        },
      });

      let topicIndex = 1;
      for (const topic of unit.topics) {
        const createdTopic = await prisma.topic.create({
          data: {
            unitId: createdUnit.id,
            title: topic.title,
            orderIndex: topicIndex++,
            importanceWeight: 1.0,
            status: 'compulsory',
          },
        });

        // Seed Subtopics
        if (topic.subtopics) {
          let stIndex = 1;
          for (const st of topic.subtopics) {
            await prisma.subtopic.create({
              data: {
                topicId: createdTopic.id,
                title: st,
                orderIndex: stIndex++,
              },
            });
          }
        }

        // Seed Learning Objectives
        if (topic.objectives) {
          for (const obj of topic.objectives) {
            await prisma.learningObjective.create({
              data: {
                topicId: createdTopic.id,
                code: obj.code,
                description: obj.description,
                bloomLevel: obj.bloomLevel,
              },
            });
          }
        }

        // Initialize Topic Mastery for Demo Student
        await prisma.topicMastery.create({
          data: {
            userId: student.id,
            topicId: createdTopic.id,
            currentMastery: 0.0,
            retentionScore: 0.0,
            evidenceConfidence: 0.0,
            totalAttempts: 0,
            correctAttempts: 0,
            recentAccuracy: 0.0,
            consecutiveCorrect: 0,
            primaryErrorCategory: 'NONE',
            errorDistributionJson: JSON.stringify({}),
          },
        });

        // Initialize Spaced Review Schedule for Demo Student
        await prisma.spacedReviewSchedule.create({
          data: {
            userId: student.id,
            topicId: createdTopic.id,
            intervalDays: 1.0,
            repetitionNumber: 0,
            easeFactor: 2.5,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // due tomorrow
            status: 'PENDING',
          },
        });
      }
    }
  }

  // 3. Seed Sample Official Study Materials & Grounded RAG Chunks for Maths-I, Chemistry, and PPS
  console.log('Seeding Sample Grounded Study Notes & Chunks...');
  const mathsTopic = await prisma.topic.findFirst({
    where: { title: { contains: 'Eigen values' } },
  });

  if (mathsTopic) {
    const mathsMaterial = await prisma.studyMaterial.create({
      data: {
        subjectId: 'subj-24AF1000BS101',
        topicId: mathsTopic.id,
        title: 'DBATU Unit 1 Notes: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
        originalFilename: 'DBATU_Maths1_Unit1_Eigenvalues.pdf',
        fileType: 'pdf',
        filePath: '/uploads/DBATU_Maths1_Unit1_Eigenvalues.pdf',
        fileSize: 2450000,
        status: 'INDEXED',
        extractedPages: 14,
        ocrQuality: 0.98,
      },
    });

    await prisma.documentChunk.createMany({
      data: [
        {
          materialId: mathsMaterial.id,
          topicId: mathsTopic.id,
          pageNumber: 3,
          sectionTitle: 'Characteristic Equation and Eigenvalues',
          content: 'For an n x n square matrix A, the characteristic equation is given by det(A - lambda*I) = 0. The roots lambda_1, lambda_2, ... lambda_n of this polynomial equation of degree n are the eigenvalues (latent roots or characteristic roots) of matrix A. Key Properties: 1) The sum of the eigenvalues equals the trace (sum of main diagonal elements) of A. 2) The product of the eigenvalues equals the determinant det(A). 3) For a triangular or diagonal matrix, eigenvalues are simply the diagonal entries.',
          confidenceScore: 0.99,
        },
        {
          materialId: mathsMaterial.id,
          topicId: mathsTopic.id,
          pageNumber: 7,
          sectionTitle: 'Cayley-Hamilton Theorem and Inversion',
          content: 'Statement: Every square matrix satisfies its own characteristic equation. If the characteristic polynomial of A is P(lambda) = (-1)^n lambda^n + k_{n-1} lambda^{n-1} + ... + k_0 = 0, then P(A) = (-1)^n A^n + k_{n-1} A^{n-1} + ... + k_0 I = 0. Application to Matrix Inversion: Multiplying through by A^-1 yields A^-1 = (-1/k_0) [(-1)^n A^{n-1} + k_{n-1} A^{n-2} + ... + k_1 I], provided det(A) != 0.',
          confidenceScore: 0.98,
        }
      ],
    });
  }

  // 4. Seed Exemplar Multi-Type Questions & Test Blueprint for Mathematics-I Unit 1
  console.log('Seeding Sample Test & Validated Questions...');
  if (mathsTopic) {
    const sampleTest = await prisma.test.create({
      data: {
        userId: student.id,
        subjectId: 'subj-24AF1000BS101',
        title: 'Diagnostic Test: Linear Algebra & Eigenvalues (Unit 1)',
        scopeType: 'UNIT',
        scopeConfigJson: JSON.stringify([mathsTopic.id]),
        difficulty: 'MEDIUM',
        timeLimitMinutes: 20,
        totalMarks: 20,
        totalQuestions: 5,
        showExplanationsImmediately: false,
        status: 'READY',
      },
    });

    const q1 = await prisma.question.create({
      data: {
        testId: sampleTest.id,
        topicId: mathsTopic.id,
        questionText: 'For a 2x2 matrix A, the trace is 7 and the determinant is 12. What are the eigenvalues of matrix A?',
        questionType: 'MCQ',
        difficulty: 'EASY',
        bloomLevel: 'UNDERSTAND',
        cognitiveSkill: 'conceptual',
        optionsJson: JSON.stringify(['3 and 4', '2 and 6', '1 and 12', '-3 and -4']),
        correctKey: '3 and 4',
        explanation: 'By the fundamental properties of eigenvalues: Sum of eigenvalues = Trace = 7, and Product of eigenvalues = Determinant = 12. Solving lambda^2 - (Trace)lambda + Det = 0 gives lambda^2 - 7lambda + 12 = 0, so (lambda - 3)(lambda - 4) = 0. The eigenvalues are 3 and 4.',
        maxMarks: 4.0,
        sourceReference: 'DBATU Maths-I Unit 1 (p. 15)',
        validationStatus: 'VALID',
      },
    });

    const q2 = await prisma.question.create({
      data: {
        testId: sampleTest.id,
        topicId: mathsTopic.id,
        questionText: 'Which of the following statements about eigenvalues and eigenvectors are correct? (Select all that apply)',
        questionType: 'MULTI_SELECT',
        difficulty: 'MEDIUM',
        bloomLevel: 'ANALYZE',
        cognitiveSkill: 'conceptual',
        optionsJson: JSON.stringify([
          'The sum of eigenvalues of a square matrix is always equal to its trace.',
          'Eigenvectors corresponding to distinct eigenvalues of a symmetric matrix are mutually orthogonal.',
          'The eigenvalues of an upper triangular matrix are its diagonal elements.',
          'A matrix is non-singular if and only if at least one of its eigenvalues is zero.'
        ]),
        correctKey: JSON.stringify([
          'The sum of eigenvalues of a square matrix is always equal to its trace.',
          'Eigenvectors corresponding to distinct eigenvalues of a symmetric matrix are mutually orthogonal.',
          'The eigenvalues of an upper triangular matrix are its diagonal elements.'
        ]),
        explanation: 'Statements A, B, and C are correct mathematical theorems. Statement D is false because a matrix is singular (det=0) if and only if zero is an eigenvalue; for non-singular matrices, all eigenvalues must be non-zero.',
        maxMarks: 4.0,
        sourceReference: 'DBATU Maths-I Unit 1 Grewal Sec 2.14',
        validationStatus: 'VALID',
      },
    });

    const q3 = await prisma.question.create({
      data: {
        testId: sampleTest.id,
        topicId: mathsTopic.id,
        questionText: 'Given the matrix A = [[2, 1], [0, 3]], calculate the trace of matrix A^3.',
        questionType: 'NUMERICAL',
        difficulty: 'HARD',
        bloomLevel: 'APPLY',
        cognitiveSkill: 'computation',
        correctKey: '35',
        toleranceMin: 35,
        toleranceMax: 35,
        explanation: 'Since A is an upper triangular matrix, its eigenvalues are lambda_1 = 2 and lambda_2 = 3. By spectral theorem properties, the eigenvalues of A^3 are lambda_1^3 = 2^3 = 8 and lambda_2^3 = 3^3 = 27. The trace of A^3 is the sum of its eigenvalues: 8 + 27 = 35.',
        maxMarks: 4.0,
        sourceReference: 'DBATU Maths-I Unit 1 Kreyszig Sec 8.4',
        validationStatus: 'VALID',
      },
    });

    const q4 = await prisma.question.create({
      data: {
        testId: sampleTest.id,
        topicId: mathsTopic.id,
        questionText: 'State Cayley-Hamilton theorem and explain how it is used to compute the inverse of a non-singular matrix A.',
        questionType: 'CONCEPTUAL_SHORT',
        difficulty: 'MEDIUM',
        bloomLevel: 'UNDERSTAND',
        cognitiveSkill: 'derivation',
        rubricJson: JSON.stringify({
          criteria: [
            { name: 'Statement of Cayley-Hamilton Theorem', weight: 40, description: 'Every square matrix satisfies its own characteristic equation P(A) = 0' },
            { name: 'Multiplication by A^-1', weight: 30, description: 'Multiplying through by inverse gives A^-1 isolated in terms of powers of A' },
            { name: 'Invertibility condition', weight: 30, description: 'Specifying det(A) != 0 or constant term k0 != 0' }
          ]
        }),
        correctKey: 'Every square matrix satisfies its characteristic polynomial: A^n + c_{n-1}A^{n-1} + ... + c_0 I = 0. Multiplying by A^-1 gives A^-1 = (-1/c_0)[A^{n-1} + ... + c_1 I] when det(A) != 0.',
        explanation: 'The Cayley-Hamilton theorem establishes that replacing lambda with matrix A in its characteristic equation produces the zero matrix. Premultiplying or postmultiplying by A^-1 allows isolating A^-1 as a polynomial in A of degree n-1.',
        maxMarks: 4.0,
        sourceReference: 'DBATU Maths-I Unit 1',
        validationStatus: 'VALID',
      },
    });

    const q5 = await prisma.question.create({
      data: {
        testId: sampleTest.id,
        topicId: mathsTopic.id,
        questionText: 'True or False: If lambda is an eigenvalue of matrix A, then 1/lambda is always an eigenvalue of A^-1, provided det(A) != 0.',
        questionType: 'TRUE_FALSE',
        difficulty: 'EASY',
        bloomLevel: 'REMEMBER',
        cognitiveSkill: 'recall',
        optionsJson: JSON.stringify(['True', 'False']),
        correctKey: 'True',
        explanation: 'If A*x = lambda*x with x != 0 and lambda != 0, multiplying both sides by A^-1 gives x = lambda*(A^-1*x) => A^-1*x = (1/lambda)*x. Thus 1/lambda is an eigenvalue of A^-1 with the same eigenvector x.',
        maxMarks: 4.0,
        sourceReference: 'DBATU Maths-I Unit 1',
        validationStatus: 'VALID',
      },
    });

    // Seed Validation records for these questions
    for (const q of [q1, q2, q3, q4, q5]) {
      await prisma.questionValidation.create({
        data: {
          questionId: q.id,
          syllabusAligned: true,
          factuallySupported: true,
          unambiguous: true,
          evaluatorRemarks: 'Verified against DBATU First Year Curriculum 2024-2025 and standard reference textbooks.',
        },
      });
    }
  }

  console.log('--- DBATU Syllabus Seeding Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
