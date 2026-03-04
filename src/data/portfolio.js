/**
 * Как вставить свои фотографии в портфолио:
 *
 * 1) Положите изображения в папку public/portfolio/ (создайте её, если нет).
 *    Пример: public/portfolio/strizhka-1.jpg, public/portfolio/boroda-2.jpg
 *
 * 2) В массиве portfolioItems ниже замените поле image на путь к вашему файлу:
 *    image: '/portfolio/strizhka-1.jpg'
 *    (слэш в начале — это папка public на сайте)
 *
 * 3) Либо используйте внешние ссылки (хостинг, облако):
 *    image: 'https://ваш-сайт.ru/foto/rabota-1.jpg'
 *
 * 4) Поля barber и service — подпись к фото (кто делал, какая услуга).
 *    products — чем пользовались (по желанию).
 */

export const portfolioCategories = [
  { id: 'all', label: 'ВСЕ РАБОТЫ' },
  { id: 'hair', label: 'СТРИЖКИ' },
  { id: 'beard', label: 'БОРОДА' },
  { id: 'shave', label: 'БРИТЬЕ' },
];

export const portfolioItems = [
  { id: 1, category: 'hair', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop', barber: 'Александр', service: 'Фейд', products: 'Babyliss, American Crew' },
  { id: 2, category: 'hair', image: 'https://img.joomcdn.net/aaa88e0e43343649f8d08314f3edadba7b20f603_original.jpeg', barber: 'Дмитрий', service: 'Классическая стрижка', products: 'Ножницы, воск' },
  { id: 3, category: 'beard', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop', barber: 'Дмитрий', service: 'Оформление бороды', products: 'Масло для бороды' },
  { id: 4, category: 'shave', image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600&h=400&fit=crop', barber: 'Александр', service: 'Горячая бритва', products: 'Mühle, пена' },
  { id: 5, category: 'hair', image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=600&h=400&fit=crop', barber: 'Олег', service: 'Стрижка ножницами', products: 'Ножницы, гель' },
  { id: 6, category: 'beard', image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop', barber: 'Олег', service: 'Коррекция бороды', products: 'Триммер' },
  { id: 7, category: 'hair', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&h=400&fit=crop', barber: 'Александр', service: 'Стрижка + борода', products: 'Полный набор' },
  { id: 8, category: 'shave', image: 'https://images.unsplash.com/photo-1519500528352-2d1460418d41?w=600&h=400&fit=crop', barber: 'Дмитрий', service: 'Королевское бритьё', products: 'Dovo, маски' },
  { id: 9, category: 'hair', image: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&h=400&fit=crop', barber: 'Олег', service: 'Фейд', products: 'Машинка, ножницы' },
];
