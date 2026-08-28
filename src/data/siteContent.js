export const impactMetrics = [
  {
    title: 'Seguimientos activos',
    value: '12 rutas en observación',
    detail: 'No todas se abren al mismo tiempo: el tablero prioriza lo que cambia la visita de verdad.',
  },
  {
    title: 'Tiempo medio de recorrido',
    value: '95 minutos',
    detail: 'Lo bastante largo para detenerse, lo bastante corto para no agotar el recorrido.',
  },
  {
    title: 'Frentes de conservación',
    value: '8 programas enlazados',
    detail: 'Rescate, reproducción y mediación pública conviven sin convertirse en relleno institucional.',
  },
]

export const habitatsOverview = [
  {
    title: 'Selva húmeda',
    description: 'Un tramo denso, cálido y sonoro donde la observación pide bajar el ritmo.',
    meta: 'Aquí el recorrido gana si miras comportamiento y no solo fichas de especie.',
  },
  {
    title: 'Costa y arrecife',
    description: 'La zona más frágil del conjunto: corrientes, temperatura y presión humana se sienten enseguida.',
    meta: 'Funciona mejor cuando la visita entra con preguntas concretas y no solo a sacar fotos.',
  },
  {
    title: 'Bosque templado',
    description: 'Un paisaje de pausa: sombra, trayecto largo y especies que obligan a mirar dos veces.',
    meta: 'Es la mejor puerta de entrada si el grupo viene mezclado entre curiosidad y cansancio.',
  },
  {
    title: 'Jungla',
    description: 'Vegetación cerrada, humedad alta y recorridos que priorizan especies adaptadas a la cobertura densa.',
    meta: 'Es una zona útil para enfocar la visita en observación pausada y biodiversidad vertical.',
  },
  {
    title: 'Polo Sur',
    description: 'Ambiente extremo pensado para explicar frío, aislamiento y estrategias de supervivencia.',
    meta: 'Aporta contraste dentro del recorrido y abre conversaciones sobre adaptación climática.',
  },
  {
    title: 'Bosque africano',
    description: 'Un hábitat de sombra irregular y actividad constante, con lectura clara de relaciones entre especies.',
    meta: 'Funciona bien para visitas que buscan comparar comportamientos y dinámicas de gran fauna.',
  },
  {
    title: 'Australia',
    description: 'Paisaje de especies únicas y adaptaciones muy marcadas frente a sequía, calor y distancia.',
    meta: 'Sirve para introducir endemismos y recorridos con identidad propia dentro de la reserva.',
  },

]

export const visitHighlights = [
  {
    title: 'Horarios de visita',
    description: 'Lunes a domingo, de 9:00 a 20:30.',
    meta: 'El último acceso es a las 17:30.',
  },
  {
    title: 'Atención de grupos',
    description: 'Reservas escolares y guiadas para hasta 25 personas.',
    meta: 'Conviene llegar con una intención definida: observación, mediación o visita breve.',
  },
{
    title: 'Contacto operativo',
    description: 'visitas@biocenia.eco y +34 915 010 203.',
    meta: 'Confirmar reservas y afinar necesidades.',
  },
]

export const speciesCatalogSources = [
  {
    id: 'jaguar',
    name: 'Jaguar',
    wikipediaTitle: 'Jaguar',
    habitat: 'Selva húmeda',
    status: 'Vulnerable',
    region: 'Amazonia',
    fallbackDescription: 'Depredador clave para explicar equilibrio trófico y conservación de bosque continuo.',
  },
  {
    id: 'tortuga-carey',
    name: 'Tortuga carey',
    wikipediaTitle: 'Hawksbill_sea_turtle',
    habitat: 'Costa y arrecife',
    status: 'En peligro critico',
    region: 'Caribe',
    fallbackDescription: 'Indicadora de salud costera y de la fragilidad de los arrecifes coralinos.',
  },
  {
    id: 'rana-cristal',
    name: 'Rana de cristal',
    wikipediaTitle: 'Glass_frog',
    habitat: 'Selva húmeda',
    status: 'Casi amenazada',
    region: 'Andes tropicales',
    fallbackDescription: 'Excelente especie para mostrar sensibilidad a cambios de temperatura y humedad.',
  },
  {
    id: 'guacamaya-roja',
    name: 'Guacamaya roja',
    wikipediaTitle: 'Scarlet_macaw',
    habitat: 'Bosque templado',
    status: 'Preocupacion menor',
    region: 'Corredor mesoamericano',
    fallbackDescription: 'Ayuda a explicar movilidad, enriquecimiento ambiental y educación pública.',
  },
  {
    id: 'caballito-mar',
    name: 'Caballito de mar',
    wikipediaTitle: 'Seahorse',
    habitat: 'Costa y arrecife',
    status: 'Datos insuficientes',
    region: 'Mediterráneo occidental',
    fallbackDescription: 'Permite hablar de restauración marina y monitoreo de presión humana.',
  },
  {
    id: 'lince-iberico',
    name: 'Lince ibérico',
    wikipediaTitle: 'Iberian_lynx',
    habitat: 'Bosque templado',
    status: 'Vulnerable',
    region: 'Suroeste de Europa',
    fallbackDescription: 'Caso útil para mostrar recuperación poblacional sostenida y gestión coordinada.',
  },
  {
    id: 'gorila-occidental',
    name: 'Gorila occidental',
    wikipediaTitle: 'Western_gorilla',
    habitat: 'Bosque africano',
    status: 'En peligro crítico',
    region: 'África central',
    fallbackDescription: 'Especie clave para trabajar comportamiento social, presión humana y conservación de bosque africano.',
  },
  {
    id: 'pinguino-emperador',
    name: 'Pingüino emperador',
    wikipediaTitle: 'Emperor_penguin',
    habitat: 'Polo Sur',
    status: 'Casi amenazada',
    region: 'Antártida',
    fallbackDescription: 'Referencia directa para explicar adaptación al frío extremo y cambios en el hielo marino.',
  },
  {
    id: 'canguro-rojo',
    name: 'Canguro rojo',
    wikipediaTitle: 'Red_kangaroo',
    habitat: 'Australia',
    status: 'Preocupacion menor',
    region: 'Interior australiano',
    fallbackDescription: 'Permite hablar de locomoción, adaptación al calor y fauna endémica australiana.',
  },
  {
    id: 'orangutan-borneo',
    name: 'Orangutan de Borneo',
    wikipediaTitle: 'Bornean_orangutan',
    habitat: 'Jungla',
    status: 'En peligro crítico',
    region: 'Sudeste asiático',
    fallbackDescription: 'Muy útil para conectar biodiversidad vertical, pérdida de cobertura forestal y conservación activa.',
  },
]