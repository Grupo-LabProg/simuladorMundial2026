// Confederación AFC (Asia)
// Confederación AFC (Asia)
//8
const AFC = [
  { name: "Qatar", flag: "https://flagcdn.com/w20/qa.png" },
  { name: "Australia", flag: "https://flagcdn.com/w20/au.png" },
  { name: "Japón", flag: "https://flagcdn.com/w20/jp.png" },
  { name: "Corea del Sur", flag: "https://flagcdn.com/w20/kr.png" },
  { name: "Irán", flag: "https://flagcdn.com/w20/ir.png" },
  { name: "Arabia Saudita", flag: "https://flagcdn.com/w20/sa.png" },
  { name: "Omán", flag: "https://flagcdn.com/w20/om.png" },
  { name: "Emiratos Árabes", flag: "https://flagcdn.com/w20/ae.png" },
];

// Confederación CAF (África)
//9
const CAF = [
  { name: "Camerún", flag: "https://flagcdn.com/w20/cm.png" },
  { name: "Senegal", flag: "https://flagcdn.com/w20/sn.png" },
  { name: "Marruecos", flag: "https://flagcdn.com/w20/ma.png" },
  { name: "Túnez", flag: "https://flagcdn.com/w20/tn.png" },
  { name: "Ghana", flag: "https://flagcdn.com/w20/gh.png" },
  { name: "Nigeria", flag: "https://flagcdn.com/w20/ng.png" },
  { name: "Argelia", flag: "https://flagcdn.com/w20/dz.png" },
  { name: "Costa de Marfil", flag: "https://flagcdn.com/w20/ci.png" },
  { name: "Egipto", flag: "https://flagcdn.com/w20/eg.png" },
];

// Confederación CONCACAF (Norteamérica, Centroamérica y el Caribe)
//7
const CONCACAF = [
    { name: "México", flag: "https://flagcdn.com/w20/mx.png" },
    { name: "Estados Unidos", flag: "https://flagcdn.com/w20/us.png" },
    { name: "Canadá", flag: "https://flagcdn.com/w20/ca.png" },
    { name: "Costa Rica", flag: "https://flagcdn.com/w20/cr.png" },
    { name: "Jamaica", flag: "https://flagcdn.com/w20/jm.png" },
    { name: "Honduras", flag: "https://flagcdn.com/w20/hn.png" },
    { name: "El Salvador", flag: "https://flagcdn.com/w20/sv.png" }
];

// Confederación UEFA (Europa)
//16
const UEFA = [
  { name: "Francia", flag: "https://flagcdn.com/w20/fr.png" },
  { name: "Bélgica", flag: "https://flagcdn.com/w20/be.png" },
  { name: "España", flag: "https://flagcdn.com/w20/es.png" },
  { name: "Portugal", flag: "https://flagcdn.com/w20/pt.png" },
  { name: "Inglaterra", flag: "https://flagcdn.com/w20/gb-eng.png" },
  { name: "Países Bajos", flag: "https://flagcdn.com/w20/nl.png" },
  { name: "Dinamarca", flag: "https://flagcdn.com/w20/dk.png" },
  { name: "Suiza", flag: "https://flagcdn.com/w20/ch.png" },
  { name: "Croacia", flag: "https://flagcdn.com/w20/hr.png" },
  { name: "Gales", flag: "https://flagcdn.com/w20/gb-wls.png" },
  { name: "Serbia", flag: "https://flagcdn.com/w20/rs.png" },
  { name: "Polonia", flag: "https://flagcdn.com/w20/pl.png" },
  { name: "Turquía", flag: "https://flagcdn.com/w20/tr.png" },
  { name: "Escocia", flag: "https://flagcdn.com/w20/gb-sct.png" },
  { name: "Rumanía", flag: "https://flagcdn.com/w20/ro.png" },
  { name: "Austria", flag: "https://flagcdn.com/w20/at.png" },
  { name: "Islandia", flag: "https://flagcdn.com/w20/is.png" },
];

// Confederación CONMEBOL (Sudamérica)
//7
const CONMEBOL = [
  { name: "Argentina", flag: "https://flagcdn.com/w20/ar.png" },
  { name: "Brasil", flag: "https://flagcdn.com/w20/br.png" },
  { name: "Uruguay", flag: "https://flagcdn.com/w20/uy.png" },
  { name: "Perú", flag: "https://flagcdn.com/w20/pe.png" },
  { name: "Chile", flag: "https://flagcdn.com/w20/cl.png" },
  { name: "Colombia", flag: "https://flagcdn.com/w20/co.png" },
  { name: "Ecuador", flag: "https://flagcdn.com/w20/ec.png" },
];

// Confederación OFC (Oceanía)
//1
const OFC = [{ name: "Nueva Zelanda", flag: "https://flagcdn.com/w20/nz.png" }];

// Unir todos los equipos en un solo arreglo
const equiposMundial2022 = [
    ...AFC,
    ...CAF,
    ...CONCACAF,
    ...UEFA,
    ...CONMEBOL,
    ...OFC
];

// Exportar los arreglos
export {equiposMundial2022, AFC, CAF, CONCACAF, UEFA, CONMEBOL, OFC };

