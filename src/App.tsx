import { useState } from 'react';
import { Search, Settings, ArrowUpDown, Filter } from 'lucide-react';
import { type Miniature } from './types';

// Моковые данные (как на твоем скриншоте)
const MOCK_DATA: Miniature[] = [
  {
    id: '1',
    name: 'The Witcher - Yennefer of Vengerberg',
    imagePath: 'https://placehold.co/150x200/262626/FFF?text=Miniature', // Заглушка
    tags: ['#Ведьмак', '#Йенифер', '#Девушки', '#Фигурки'],
    fileSize: '1 гб',
    compressedSize: '560 мб',
    cost: '20 рублей',
    resinConsumption: '100 грамм',
    dateAdded: '15.01.2026',
    dateEdited: '15.01.2026',
  },
  // ... можно добавить больше
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'date' | 'name'>('date');

  // Логика фильтрации
  const filteredData = MOCK_DATA.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => item.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  // Получаем все уникальные теги для фильтров
  const allTags = Array.from(new Set(MOCK_DATA.flatMap(m => m.tags)));

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-200 font-sans p-6">
      
      {/* --- ВЕРХНЯЯ ПАНЕЛЬ --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        
        {/* Сортировка */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-400">Сортировка по</span>
          <button className="flex items-center gap-2 bg-dark-800 px-4 py-2 rounded-lg hover:bg-dark-700 transition">
            <ArrowUpDown size={16} />
            <span>По дате добавления</span>
          </button>
        </div>

        {/* Теги (глобальные фильтры) */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-400 ml-1">Теги</span>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  selectedTags.includes(tag)
                    ? 'bg-accent-purple text-white'
                    : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Поиск */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-800 border border-dark-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent-purple"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* --- СПИСОК МИНИАТЮР --- */}
      <div className="flex flex-col gap-4">
        {filteredData.map((item) => (
          <MiniatureRow key={item.id} data={item} />
        ))}
        
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 py-10">Ничего не найдено</div>
        )}
      </div>
    </div>
  );
}

// Компонент одной строки (карточки)
function MiniatureRow({ data }: { data: Miniature }) {
  return (
    <div className="bg-dark-800 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-center border border-dark-700 hover:border-gray-600 transition group">
      
      {/* 1. Изображение */}
      <div className="relative w-full md:w-40 h-32 md:h-40 rounded-lg overflow-hidden bg-black shrink-0">
        <img src={data.imagePath} alt={data.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
        <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-xs font-bold">
          +4
        </div>
      </div>

      {/* 2. Имя и Теги */}
      <div className="flex-1 flex flex-col justify-center gap-3 w-full">
        <h3 className="text-xl font-bold text-center md:text-left">{data.name}</h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {data.tags.map(tag => (
            <span key={tag} className="bg-accent-purple/20 text-accent-purple border border-accent-purple/30 px-2 py-0.5 rounded-md text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Инфо (Сетка данных) */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm w-full md:w-auto">
        <div className="text-gray-400">Добавлена</div>
        <div className="text-gray-200 text-right">{data.dateAdded}</div>
        
        <div className="text-gray-400">Редактирована</div>
        <div className="text-gray-200 text-right">{data.dateEdited}</div>

        <div className="text-gray-400">Вес файла</div>
        <div className="text-gray-200 text-right">{data.fileSize}</div>

        <div className="text-gray-400">Вес файла сжатый</div>
        <div className="text-gray-200 text-right">{data.compressedSize}</div>

        <div className="text-gray-400">Стоимость</div>
        <div className="text-gray-200 text-right">{data.cost}</div>

        <div className="text-gray-400">Расход смолы</div>
        <div className="text-gray-200 text-right">{data.resinConsumption}</div>
      </div>

      {/* 4. Кнопка настроек */}
      <button className="p-2 text-gray-500 hover:text-white hover:bg-dark-700 rounded-lg transition">
        <Settings size={24} />
      </button>
    </div>
  );
}

export default App;