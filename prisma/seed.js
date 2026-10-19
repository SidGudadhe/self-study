const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting CogniStudy Database Seeding with DBATU Semester 1 Timetable Subjects ---');

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
      name: 'Prof. Akshay Kate (Class Teacher - Div C)',
      role: 'admin',
    },
  });

  console.log(`Users created: ${student.email} and ${admin.email}`);

  // Delete all existing subjects to ensure ONLY Semester 1 timetable subjects exist
  console.log('Clearing old subjects not in Semester 1 timetable...');
  await prisma.subject.deleteMany({});

  // 2. Syllabus Data extracted directly from DBATU NEP 2024-2025 curriculum matching the Semester 1 Timetable (Div C - Group B)
  const semester1Subjects = [
    {
      code: '24AF1000BS101',
      name: 'Engineering Mathematics – I',
      abbreviation: 'EM-I',
      category: 'BSC',
      credits: 3,
      teachingScheme: '3L-0T-0P (Theory: 4h/week)',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Ms. Ahilya Vishnu Narsale',
      description: 'Foundations of Linear Algebra, Matrices, Partial Differentiation, Applications, Reduction Formulae and Multiple Integrals.',
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
              subtopics: ['Rouché-Capelli Theorem', 'Non-homogeneous systems AX=B', 'Homogeneous systems AX=0'],
              objectives: [
                { code: 'M1-U1-LO3', description: 'Determine consistency and unique, infinite, or no-solution conditions for linear systems', bloomLevel: 'APPLY' }
              ]
            },
            {
              title: 'Eigen values and Eigen vectors',
              subtopics: ['Characteristic equation', 'Eigenvector determination', 'Properties of eigenvalues'],
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
              subtopics: ['Definition of Jacobian determinant', 'Chain rule for Jacobians', 'Functional dependency test'],
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
              subtopics: ['Cartesian curve tracing rules (symmetry, origin, tangents, asymptotes, regions)', 'Parametric curves', 'Polar curves (Cardioid, Lemniscate)'],
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
              subtopics: ['Volume as triple integral', 'Surface area as double integral', 'Cylindrical coordinate conversions'],
              objectives: [{ code: 'M1-U5-LO3', description: 'Calculate physical volumes and surface areas using multiple integrals', bloomLevel: 'APPLY' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF2PHYBS202',
      name: 'Engineering Physics',
      abbreviation: 'PHY',
      category: 'BSC',
      credits: 3,
      teachingScheme: '3L-0T-2P (Theory: 3h, Lab: 6h/week)',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Dr. Vishal Kamathe',
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
              subtopics: ['Magnetostriction oscillator method', 'Piezoelectric quartz crystal method', 'Applications: NDT flaw detection, SONAR, ultrasonic cleaning'],
              objectives: [{ code: 'PHY-U1-LO2', description: 'Explain piezoelectric production of high-frequency ultrasound and its industrial NDT testing', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Dielectrics and Polarization Mechanisms',
              subtopics: ['Polar vs non-polar dielectrics', 'Electronic, ionic, orientational, and space-charge polarizations', 'Dielectric constant and breakdown'],
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
              subtopics: ['Cosine law for thin film 2mu t cos r = n lambda', 'Wedge-shaped thin film fringe spacing', 'Newton’s rings apparatus, ring diameter formulas, wavelength and refractive index determination'],
              objectives: [{ code: 'PHY-U2-LO1', description: 'Calculate thin film thicknesses and optical wavelengths from Newton’s rings diameter measurements', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Lasers and Fiber Optics',
              subtopics: ['Stimulated emission, spontaneous emission, population inversion, optical pumping', 'He-Ne Gas Laser and Semiconductor Diode Laser', 'Total internal reflection, acceptance angle, Numerical Aperture NA = sqrt(n1^2 - n2^2)'],
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
      abbreviation: 'EG',
      category: 'ESC',
      credits: 2,
      teachingScheme: '2L-0T-2P (Theory: 4h, Lab: 6h/week)',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Mr. Akshay Kate',
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
      abbreviation: 'BEE',
      category: 'ESC',
      credits: 3,
      teachingScheme: '3L-0T-2P (Theory: 3h, Lab: 6h/week)',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Mrs. Sheetal Hotkar',
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
              subtopics: ['Voltage divider (self) bias circuit and stability factor S', 'Transistor operation as small-signal amplifier', 'Circuit diagram and frequency response curve of RC coupled amplifier'],
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
      abbreviation: 'BCME',
      category: 'ESC',
      credits: 3,
      teachingScheme: '3L-0T-0P (Theory: 4h/week)',
      evaluationScheme: 'CA: 20, MSE: 20, ESE: 60',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Mr. Ankush Patil',
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
      abbreviation: 'EEE',
      category: 'BSC',
      credits: 2,
      teachingScheme: '2L-0T-0P (Theory: 1h/week)',
      evaluationScheme: 'CA: 50 (Audit Course)',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Mr. Ankush Patil',
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
              subtopics: ['Primary vs secondary pollutants (SOx, NOx, CO, PM2.5/PM10)', 'Automobile emissions and catalytic converters', 'Mechanism of acid rain and greenhouse effect', 'Electrostatic precipitators and scrubbers for pollution control'],
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
      abbreviation: 'DT',
      category: 'VSEC',
      credits: 2,
      teachingScheme: '2L-0T-0P (Theory: 2h/week)',
      evaluationScheme: 'CA: 60, ESE: 40',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Dr. Amruta Surana',
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
    },
    {
      code: '24AF1000IK210',
      name: 'Indian Knowledge System',
      abbreviation: 'IKS',
      category: 'IKS',
      credits: 2,
      teachingScheme: '2L-0T-0P (Theory: 2h/week)',
      evaluationScheme: 'CA: 60, ESE: 40',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Mr. Hrishikesh Chitrakar',
      description: 'Historical scientific heritage of India: Ancient mathematics, astronomy, metallurgy, town planning, and environmental ethics.',
      textbooks: [
        { title: 'Introduction to Indian Knowledge System: Concepts and Applications', author: 'B. Mahadevan, V. R. Bhat, Nagendra Pavana R. N.', publisher: 'PHI Learning' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Introduction to Indian Knowledge System & Philosophical Foundations',
          hours: '04 Hours',
          topics: [
            {
              title: 'Overview of Vedic & Scientific Heritage of Ancient India',
              subtopics: ['Vedas, Vedangas, Upavedas overview', 'Epistemology (Pramana Sastra: Pratyaksha, Anumana, Sabda)', 'Holistic scientific world-view'],
              objectives: [{ code: 'IKS-U1-LO1', description: 'Explain the epistemological basis and structure of ancient Indian knowledge traditions', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Mathematics and Astronomy in Ancient India',
          hours: '06 Hours',
          topics: [
            {
              title: 'Sulba Sutras, Decimal System & Calculus Origins',
              subtopics: ['Sulba Sutras geometry (Baudhayana theorem)', 'Decimal place-value system and zero (Sunya)', 'Aryabhata (trigonometric sine tables, Earth rotation)', 'Madhava of Sangamagrama (infinite series for pi, sine, cosine)'],
              objectives: [{ code: 'IKS-U2-LO1', description: 'Trace historical mathematical developments and infinite series in the Kerala School of Astronomy', bloomLevel: 'ANALYZE' }]
            }
          ]
        },
        {
          unitNumber: 3,
          title: 'Engineering, Metallurgy & Architectural Heritage',
          hours: '06 Hours',
          topics: [
            {
              title: 'Civil Town Planning, Stepwells and Corrosion-Resistant Metallurgy',
              subtopics: ['Indus Valley / Harappan water management & sanitation', 'Traditional stepwells (Vavs) of western India', 'Wootz steel and the rustless Iron Pillar of Delhi', 'Vastu Sastra principles in temple architecture'],
              objectives: [{ code: 'IKS-U3-LO1', description: 'Analyze metallurgical and structural civil engineering feats of ancient India', bloomLevel: 'UNDERSTAND' }]
            }
          ]
        },
        {
          unitNumber: 4,
          title: 'Health, Wellness, Yoga & Environmental Sustainability',
          hours: '04 Hours',
          topics: [
            {
              title: 'Ayurvedic Principles & Sustainable Ecological Living',
              subtopics: ['Ayurvedic fundamentals: Tridosha theory (Vata, Pitta, Kapha) and Dinacharya', 'Patanjali Ashtanga Yoga principles', 'Ecological reverence in ancient Indian texts (Vrikshayurveda)'],
              objectives: [{ code: 'IKS-U4-LO1', description: 'Synthesize traditional holistic health models with sustainable engineering practices', bloomLevel: 'APPLY' }]
            }
          ]
        }
      ]
    },
    {
      code: '24AF1000CC212A',
      name: 'Integrated Personality Development',
      abbreviation: 'CC-IPD',
      category: 'CC',
      credits: 2,
      teachingScheme: '1L-0T-2P (Theory: 1h/week)',
      evaluationScheme: 'CA: 60, Presentation: 40',
      semester: 'I',
      group: 'GROUP B',
      faculty: 'Mr. Ankush Patil',
      description: 'Values, soft skills, character building, stress management, disaster relief case studies, and civic responsibility.',
      textbooks: [
        { title: 'IPDC Workbook-1 & 2', author: 'BAPS IPDC Team', publisher: 'B.A.P.S. Swaminarayan Sanstha' }
      ],
      units: [
        {
          unitNumber: 1,
          title: 'Remaking Yourself, Values & Civic Responsibility',
          hours: '06 Hours',
          topics: [
            {
              title: 'Begin with the End in Mind & Being Addiction-Free',
              subtopics: ['SMART goals visualization', 'Detrimental effects of addictions on health and career', 'Habit transformation frameworks'],
              objectives: [{ code: 'IPD-U1-LO1', description: 'Formulate SMART career milestones and establish personal health disciplines', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Selfless Service & Disaster Relief Case Study',
              subtopics: ['Lessons of Seva (Selfless service)', 'Case study: 2001 Bhuj earthquake relief operations', 'Youth volunteerism in emergency response'],
              objectives: [{ code: 'IPD-U1-LO2', description: 'Analyze emergency disaster mobilization and empathetic civic service delivery', bloomLevel: 'ANALYZE' }]
            },
            {
              title: 'Teamwork, Soft Skills & An Ideal Citizen',
              subtopics: ['Six steps of effective teamwork and harmony', 'Leadership through humility (Leading without Leading)', 'Core civic values: Integrity, responsibility, loyalty, and punctuality'],
              objectives: [{ code: 'IPD-U1-LO3', description: 'Demonstrate collaborative teamwork principles and ethical decision making in professional settings', bloomLevel: 'APPLY' }]
            }
          ]
        },
        {
          unitNumber: 2,
          title: 'Emotional Resilience, Stress Management & Financial Skills',
          hours: '06 Hours',
          topics: [
            {
              title: 'Facing Failures & Timeless Wisdom for Daily Life',
              subtopics: ['Overcoming academic and career setbacks', 'Ancient wisdom applied to modern mental stability', 'Principles of forgiveness and emotional reconciliation'],
              objectives: [{ code: 'IPD-U2-LO1', description: 'Build emotional resilience to withstand failure and resolve interpersonal conflicts constructively', bloomLevel: 'UNDERSTAND' }]
            },
            {
              title: 'Stress Management & Health Optimization',
              subtopics: ['Root causes of student stress', 'Coping strategies: Exercise, nutrition, sleep cycles', 'Mindfulness and mental clarity'],
              objectives: [{ code: 'IPD-U2-LO2', description: 'Apply physiological and psychological stress alleviation routines', bloomLevel: 'APPLY' }]
            },
            {
              title: 'Financial Planning & Social Circle Influence',
              subtopics: ['Budgeting basics and early saving discipline', 'Avoiding debt traps', 'Impact of company/peer group on long-term character'],
              objectives: [{ code: 'IPD-U2-LO3', description: 'Draft personal financial budgets and cultivate positive professional peer networks', bloomLevel: 'EVALUATE' }]
            }
          ]
        }
      ]
    }
  ];

  for (const subj of semester1Subjects) {
    console.log(`Seeding Semester 1 subject: [${subj.abbreviation}] ${subj.code} - ${subj.name}...`);
    const createdSubj = await prisma.subject.create({
      data: {
        id: `subj-${subj.code}`,
        code: subj.code,
        name: `${subj.name} (${subj.abbreviation})`,
        category: subj.category,
        credits: subj.credits,
        teachingScheme: subj.teachingScheme,
        evaluationScheme: subj.evaluationScheme,
        semester: 'I',
        group: subj.group,
        description: `${subj.description} • Faculty: ${subj.faculty}`,
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
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            status: 'PENDING',
          },
        });
      }
    }
  }

  // 3. Seed Sample Grounded Study Notes & Chunks for EM-I & Physics
  console.log('Seeding Sample Grounded Notes for Semester 1 Subjects...');
  const mathsTopic = await prisma.topic.findFirst({
    where: { title: { contains: 'Eigen values' } },
  });

  if (mathsTopic) {
    const mathsMaterial = await prisma.studyMaterial.create({
      data: {
        subjectId: 'subj-24AF1000BS101',
        topicId: mathsTopic.id,
        title: 'DBATU Sem 1 Notes: Eigenvalues, Eigenvectors & Cayley-Hamilton Theorem',
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

    // Seed Sample Validated Test
    const sampleTest = await prisma.test.create({
      data: {
        userId: student.id,
        subjectId: 'subj-24AF1000BS101',
        title: 'Diagnostic Test: Linear Algebra & Eigenvalues (EM-I Unit 1)',
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
        explanation: 'By the fundamental properties of eigenvalues: Sum of eigenvalues = Trace = 7, and Product of eigenvalues = Determinant = 12. Solving lambda^2 - 7lambda + 12 = 0 gives eigenvalues 3 and 4.',
        maxMarks: 4.0,
        sourceReference: 'DBATU EM-I Unit 1',
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
        explanation: 'Statements A, B, and C are correct mathematical theorems. Statement D is false because non-singular matrices cannot have zero eigenvalues.',
        maxMarks: 4.0,
        sourceReference: 'DBATU EM-I Unit 1 Grewal Sec 2.14',
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
        explanation: 'The eigenvalues of upper triangular A are 2 and 3. The eigenvalues of A^3 are 2^3=8 and 3^3=27. Trace(A^3) = 8 + 27 = 35.',
        maxMarks: 4.0,
        sourceReference: 'DBATU EM-I Unit 1 Kreyszig Sec 8.4',
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
        correctKey: 'Every square matrix satisfies its characteristic polynomial. Multiplying by A^-1 allows expressing A^-1 in terms of powers of A.',
        explanation: 'The Cayley-Hamilton theorem states that P(A) = 0. Multiplying through by A^-1 yields A^-1 in terms of degree n-1 polynomial powers.',
        maxMarks: 4.0,
        sourceReference: 'DBATU EM-I Unit 1',
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
        explanation: 'True. Multiplying A*x = lambda*x by A^-1 produces A^-1*x = (1/lambda)*x.',
        maxMarks: 4.0,
        sourceReference: 'DBATU EM-I Unit 1',
        validationStatus: 'VALID',
      },
    });

    for (const q of [q1, q2, q3, q4, q5]) {
      await prisma.questionValidation.create({
        data: {
          questionId: q.id,
          syllabusAligned: true,
          factuallySupported: true,
          unambiguous: true,
          evaluatorRemarks: 'Verified against DBATU First Year Semester 1 Timetable Curriculum.',
        },
      });
    }
  }

  console.log('--- DBATU Semester 1 Timetable Subjects Seeded Successfully! ---');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
