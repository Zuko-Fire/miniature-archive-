export interface Miniature {
  id: string;
  name: string;
  imagePath: string; // Путь к скриншоту
  tags: string[];
  
  // Метаданные из колонки "Инфо"
  fileSize: string;       // Вес файла (1 гб)
  compressedSize: string; // Вес сжатого (560 мб)
  cost: string;           // Стоимость (20 рублей)
  resinConsumption: string; // Расход смолы (100 грамм)
  
  // Даты
  dateAdded: string;
  dateEdited: string;
}