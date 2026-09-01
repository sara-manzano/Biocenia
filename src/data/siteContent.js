import antartidaImage from '../assets/habitats/Antartida.jpeg'
import arrecifeImage from '../assets/habitats/Arrecife.jpeg'
import bosqueAfricanoImage from '../assets/habitats/Bosque africano.jpeg'
import bosqueTempladoImage from '../assets/habitats/Bosque templado.jpeg'
import junglaImage from '../assets/habitats/Jungla.jpeg'
import sabanaImage from '../assets/habitats/Sabana.jpeg'

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
    title: 'Sabana',
    image: sabanaImage,
    imageAlt: 'Paisaje de sabana con vegetacion abierta y clima seco.',
    description: 'Un paisaje abierto y soleado, con especies adaptadas a la sequía y la exposición.',
    meta: 'La zona muestra como la desertificación y la presión humana afectan a la biodiversidad.',
  },
  {
    title: 'Costa y arrecife',
    image: arrecifeImage,
    imageAlt: 'Ecosistema marino de costa y arrecife con aguas claras.',
    description: 'La zona más frágil del conjunto: corrientes, temperatura y presión humana se sienten enseguida.',
    meta: 'Hace falta un recorrido pausado y observación de especies indicadoras para entender la fragilidad del ecosistema.',
  },
  {
    title: 'Bosque templado',
    image: bosqueTempladoImage,
    imageAlt: 'Bosque templado frondoso con sombra y vegetacion densa.',
    description: 'Un paisaje de pausa: sombra, trayecto largo y especies que obligan a mirar dos veces.',
    meta: 'Es un hábitat útil para explicar adaptación, migración y relaciones entre especies.',
  },
  {
    title: 'Jungla',
    image: junglaImage,
    imageAlt: 'Jungla humeda con vegetacion cerrada y abundante.',
    description: 'Vegetación cerrada, humedad alta y recorridos que priorizan especies adaptadas a la cobertura densa.',
    meta: 'Es una zona útil para enfocar la visita en observación pausada y biodiversidad vertical.',
  },
  {
    title: 'Polo Sur',
    image: antartidaImage,
    imageAlt: 'Paisaje helado de la Antartida con nieve y agua fria.',
    description: 'Ambiente extremo pensado para explicar frío, aislamiento y estrategias de supervivencia.',
    meta: 'El hábitat muestra especies adaptadas a la vida en hielo y nieve, con estrategias de supervivencia únicas.',
  },
  {
    title: 'Bosque africano',
    image: bosqueAfricanoImage,
    imageAlt: 'Bosque africano con vegetacion espesa y ambiente sombreado.',
    description: 'Un hábitat de sombra irregular y actividad constante, con lectura clara de relaciones entre especies.',
    meta: 'Visitas que buscan comparar comportamientos y dinámicas de gran fauna.',
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
    status: 'En peligro crítico',
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
    status: 'Preocupación menor',
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
    id: 'canguro-rojo',
    name: 'Canguro rojo',
    wikipediaTitle: 'Red_kangaroo',
    habitat: 'Australia',
    status: 'Preocupación menor',
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