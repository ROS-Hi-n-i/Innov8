
import { User, Product, Category } from './types';

export const CATEGORIES: Category[] = [
  Category.ELECTRONICS,
  Category.FURNITURE,
  Category.CLOTHING,
  Category.BOOKS,
  Category.HOME_GOODS,
  Category.OTHER,
];

export const MOCK_USERS: User[] = [
  { id: 'user-1', username: 'SustainableSarah', email: 'sarah@test.com', password: 'password123' },
  { id: 'user-2', username: 'EcoEthan', email: 'ethan@test.com', password: 'password123' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Vintage Leather Armchair',
    description: 'A beautiful, well-kept armchair from the 1970s. Perfect for a reading nook. Minor wear and tear consistent with age.',
    price: 250,
    category: Category.FURNITURE,
    imageUrl: 'https://th.bing.com/th/id/R.f5d5bc5d575624d36ed5d7fcd94c701b?rik=NL5djmX0Z4ozXg&riu=http%3a%2f%2fimages.antiquesatlas.com%2fdealer-stock-images%2fpyrontique%2fArt_Deco_Leather_Club_Chair_as675a128z-2.jpg&ehk=tYt1PIONmq9bVgHMRa7%2fMGvue5XYj55BKwWzYmY8uFQ%3d&risl=&pid=ImgRaw&r=0',
    sellerId: 'user-2',
  },
  {
    id: 'prod-2',
    title: 'Retro Bluetooth Speaker',
    description: 'Classic look with modern technology. Great sound quality and long battery life. Connects via Bluetooth.',
    price: 75,
    category: Category.ELECTRONICS,
    imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.1dz3f_jpOpOfjGgISe0zOwHaIp?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    sellerId: 'user-1',
  },
  {
    id: 'prod-3',
    title: 'Collection of Classic Novels',
    description: 'A set of 10 classic literature books, including titles by Austen, Dickens, and Twain. Hardcover editions in good condition.',
    price: 45,
    category: Category.BOOKS,
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.Y7M_f7MzzlBuPlWwqVqUhgHaF7?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    sellerId: 'user-2',
  },
  {
    id: 'prod-4',
    title: 'Hand-knitted Wool Sweater',
    description: 'Cozy and warm 100% wool sweater. Size medium. Light grey color. Barely worn.',
    price: 60,
    category: Category.CLOTHING,
    imageUrl: 'https://i0.wp.com/edinburghcastle.com/wp-content/uploads/2019/12/Hand-Knit-Irish-Sweater-Natural.gif?fit=1024%2C1024&ssl=1',
    sellerId: 'user-1',
  },
  {
    id: 'prod-5',
    title: 'Minimalist Desk Lamp',
    description: 'Sleek and modern desk lamp with an adjustable arm. Provides excellent lighting for work or study. LED bulb included.',
    price: 30,
    category: Category.HOME_GOODS,
    imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.cNYajVoJoDzTc_9khdg_bQHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    sellerId: 'user-1',
  },
  {
    id: 'prod-6',
    title: 'Used Acoustic Guitar',
    description: 'A great beginner acoustic guitar. Has a few scratches but plays beautifully. Comes with a soft case.',
    price: 120,
    category: Category.OTHER,
    imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.KedbK8hQ6gZxKOKjflu0AAHaHa?r=0&cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    sellerId: 'user-2',
  },
];
