export interface ProductCategories {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface ProductsList {
  cameras: Prodinfo[];
  products: Prodinfo[];
  shirts: Prodinfo[];
  smartphones: Prodinfo[];
  watches: Prodinfo[];
}

export interface Prodinfo {
  id: string;
  image: string;
  name: string;
  price?: string;
  title?: string;
}

export interface UserOrders {
  [orderId: string]: Order;
}

export interface Order {
  items: Item[];
  orddate: string;
}

export interface Item {
  id: string;
  image: string;
  name: string;
  price: string;
  qty?: string | number;
  totalamt?: number;
}


export const prod_cat = [
  {
    id: '1',
    name: 'Cameras',
    title: 'Choose among the best available in the world.',
    image: 'assets/img/1.jpg',
  },
  {
    id: '2',
    name: 'Watches',
    title: 'Original watches from the best brands.',
    image: 'assets/img/10.jpg',
  },
  {
    id: '3',
    name: 'Shirts',
    title: 'Our exquisite collection of shirts at best price.',
    image: 'assets/img/13.jpg',
  },
  {
    id: '4',
    name: 'SmartPhones',
    title: 'The best Smartphones you can buy today.',
    image: 'assets/img/sm.jpg',
  },
];