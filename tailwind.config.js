module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Folosim variabile CSS pentru culori dinamice
        'primary': 'rgb(var(--color-primary) / <alpha-value>)',
        'secondary': 'rgb(var(--color-secondary) / <alpha-value>)',
        'accent': 'rgb(var(--color-accent) / <alpha-value>)',
        'background': 'rgb(var(--color-background) / <alpha-value>)',
        'surface': 'rgb(var(--color-surface) / <alpha-value>)',
        'text': 'rgb(var(--color-text) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'border': 'rgb(var(--color-border) / <alpha-value>)',
        
        // Clasele tale existente care se schimbă cu tema
        b1: 'rgb(var(--color-b1) / <alpha-value>)',
        b2: 'rgb(var(--color-b2) / <alpha-value>)',
        b3: 'rgb(var(--color-b3) / <alpha-value>)',
        b4: 'rgb(var(--color-b4) / <alpha-value>)',
        b5: 'rgb(var(--color-b5) / <alpha-value>)',
        d1: 'rgb(var(--color-d1) / <alpha-value>)',
        d2: 'rgb(var(--color-d2) / <alpha-value>)',
        d3: 'rgb(var(--color-d3) / <alpha-value>)',
        d4: 'rgb(var(--color-d4) / <alpha-value>)',


        'z1': 'rgb(var(--color-z-1))', // Galben deschis luminos
'z2': 'rgb(var(--color-z-2))', // Galben auriu intens  
'z3': 'rgb(var(--color-z-3))', // Albastru ocean
'z4': 'rgb(var(--color-z-4))', // Mov lavandă
      },
    },
  },
  plugins: [],
}