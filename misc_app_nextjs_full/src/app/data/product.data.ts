export interface ProductCategories {
  id: string;
  name: string;
  title: string;
  image: string;
}

export interface Products {
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

export const prod_list = {
  "cameras": [
    {
      "id": "C2001",
      "image": "img/5.jpg",
      "name": "Cannon EOS",
      "price": "36000.00"
    },
    {
      "id": "C2002",
      "image": "img/2.jpg",
      "name": "Nikon EOS",
      "price": "40000.00"
    },
    {
      "id": "C2003",
      "image": "img/3.jpg",
      "name": "Sony DSLR",
      "price": "36000.00"
    },
    {
      "id": "C2004",
      "image": "img/4.jpg",
      "name": "Olympus DSLR",
      "price": "50000.00"
    }
  ],
  "products": [
    {
      "id": "P1001",
      "image": "img/1.jpg",
      "name": "Cameras",
      "title": "Choose among the best available in the world."
    },
    {
      "id": "P1002",
      "image": "img/10.jpg",
      "name": "Watches",
      "title": "Original watches from the best brands."
    },
    {
      "id": "P1003",
      "image": "img/22.jpg",
      "name": "Shirts",
      "title": "Our exquisite collection of shirts at best price."
    },
    {
      "id": "P1004",
      "image": "img/sm.jpg",
      "name": "Smartphones",
      "title": "The best Smartphones you can buy today."
    }
  ],
  "shirts": [
    {
      "id": "S4001",
      "image": "img/22.jpg",
      "name": "H&W",
      "price": "800.00"
    },
    {
      "id": "S4002",
      "image": "img/23.jpg",
      "name": "Luis Phil",
      "price": "1000.00"
    },
    {
      "id": "S4003",
      "image": "img/24.jpg",
      "name": "John Zok",
      "price": "1500.00"
    },
    {
      "id": "S4004",
      "image": "img/25.jpg",
      "name": "Jhalsani",
      "price": "1300.00"
    }
  ],
  "smartphones": [
    {
      "id": "SM001",
      "image": "img/nokiag20.jpg",
      "name": "Nokia G20 64GB, 4GB RAM",
      "price": "13499.00"
    },
    {
      "id": "SM002",
      "image": "img/jionext.jpg",
      "name": "JioPhone Next 32GB, 2GB RAM",
      "price": "6499.00"
    },
    {
      "id": "SM003",
      "image": "img/sama22_1.jpg",
      "name": "Samsung Galaxy A22 5G 128GB, 6GB RAM",
      "price": "19999.00"
    },
    {
      "id": "SM004",
      "image": "img/Vivo-Y51A.jpg",
      "name": "Vivo Y51A 128GB, 6GB RAM",
      "price": "16990.00"
    }
  ],
  "watches": [
    {
      "id": "W3001",
      "image": "img/18.jpg",
      "name": "Titan Model #301",
      "price": "13000.00"
    },
    {
      "id": "W3002",
      "image": "img/19.jpg",
      "name": "Titan Model #201",
      "price": "3000.00"
    },
    {
      "id": "W3003",
      "image": "img/20.jpg",
      "name": "HMT Milan",
      "price": "8000.00"
    },
    {
      "id": "W3004",
      "image": "img/21.jpg",
      "name": "Faber Luba #111",
      "price": "18000.00"
    }
  ]
}

export const cart_orders = {
  "-O8VqGL4d-udcOQI5pdH": {
    "id": "C2001",
    "image": "img/5.jpg",
    "name": "Cannon EOS",
    "price": "36000.00",
    "qty": 1,
    "totalamt": "36000.00"
  },
  "-O8VqL57lVOZwj-xpacg": {
    "id": "C2004",
    "image": "img/4.jpg",
    "name": "Olympus DSLR",
    "price": "50000.00",
    "qty": 1,
    "totalamt": "50000.00"
  }
}

export const user_orders = {
  "-MwvqLphunVhecaebcxI": {
    "items": [
      {
        "id": "C2003",
        "image": "img/3.jpg",
        "name": "Sony DSLR",
        "price": "36000.00"
      },
      {
        "id": "S4002",
        "image": "img/23.jpg",
        "name": "Luis Phil",
        "price": "1000.00"
      },
      {
        "id": "W3004",
        "image": "img/21.jpg",
        "name": "Faber Luba #111",
        "price": "18000.00"
      }
    ],
    "orddate": "Feb 27, 2022, 9:12:28 PM"
  },
  "-MwvriuQ7wEEac8v29Pn": {
    "items": [
      {
        "id": "S4003",
        "image": "img/24.jpg",
        "name": "John Zok",
        "price": "1500.00"
      },
      {
        "id": "SM002",
        "image": "img/jionext.jpg",
        "name": "JioPhone Next 32GB, 2GB RAM",
        "price": "6499.00"
      },
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00"
      },
      {
        "id": "W3001",
        "image": "img/18.jpg",
        "name": "Titan Model #301",
        "price": "13000.00"
      }
    ],
    "orddate": "Feb 27, 2022, 9:18:02 PM"
  },
  "-Mww6siQTKoUXgCbgH-5": {
    "items": [
      {
        "id": "C2003",
        "image": "img/3.jpg",
        "name": "Sony DSLR",
        "price": "36000.00"
      },
      {
        "id": "S4003",
        "image": "img/24.jpg",
        "name": "John Zok",
        "price": "1500.00"
      }
    ],
    "orddate": "Feb 27, 2022, 10:28:17 PM"
  },
  "-MwwIi3XMpBp2TXrldk3": {
    "items": [
      {
        "id": "C2003",
        "image": "img/3.jpg",
        "name": "Sony DSLR",
        "price": "36000.00"
      },
      {
        "id": "SM004",
        "image": "img/Vivo-Y51A.jpg",
        "name": "Vivo Y51A 128GB, 6GB RAM",
        "price": "16990.00"
      },
      {
        "id": "W3001",
        "image": "img/18.jpg",
        "name": "Titan Model #301",
        "price": "13000.00"
      }
    ],
    "orddate": "Feb 27, 2022, 11:19:36 PM"
  },
  "-Mx-PZPIQBXES2BKxc_P": {
    "items": [
      {
        "id": "C2002",
        "image": "img/2.jpg",
        "name": "Nikon EOS",
        "price": "40000.00"
      },
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00"
      },
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00"
      }
    ],
    "orddate": "Feb 28, 2022, 6:28:20 PM"
  },
  "-Mx-XqRCyU1Lkft7TkGU": {
    "items": [
      {
        "id": "C2003",
        "image": "img/3.jpg",
        "name": "Sony DSLR",
        "price": "36000.00"
      },
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00"
      },
      {
        "id": "SM003",
        "image": "img/sama22_1.jpg",
        "name": "Samsung Galaxy A22 5G 128GB, 6GB RAM",
        "price": "19999.00"
      },
      {
        "id": "SM001",
        "image": "img/nokiag20.jpg",
        "name": "Nokia G20 64GB, 4GB RAM",
        "price": "13499.00"
      }
    ],
    "orddate": "Feb 28, 2022, 7:04:51 PM"
  },
  "-Mx0VdYGK52I7CGhkeDi": {
    "items": [
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00"
      },
      {
        "id": "S4004",
        "image": "img/25.jpg",
        "name": "Jhalsani",
        "price": "1300.00"
      }
    ],
    "orddate": "Feb 28, 2022, 11:24:21 PM"
  },
  "-NTFBDnbfbe9swWLOrAp": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00"
      },
      {
        "id": "SM003",
        "image": "img/sama22_1.jpg",
        "name": "Samsung Galaxy A22 5G 128GB, 6GB RAM",
        "price": "19999.00"
      }
    ],
    "orddate": "Apr 17, 2023, 10:38:11 PM"
  },
  "-NTFFUDfiUUJqlnm6pfT": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00"
      },
      {
        "id": "W3004",
        "image": "img/21.jpg",
        "name": "Faber Luba #111",
        "price": "18000.00"
      }
    ],
    "orddate": "Apr 17, 2023, 10:57:31 PM"
  },
  "-NTFFjn2GcbkYmf7bYeE": {
    "items": [
      {
        "id": "C2003",
        "image": "img/3.jpg",
        "name": "Sony DSLR",
        "price": "36000.00"
      },
      {
        "id": "SM003",
        "image": "img/sama22_1.jpg",
        "name": "Samsung Galaxy A22 5G 128GB, 6GB RAM",
        "price": "19999.00"
      }
    ],
    "orddate": "Apr 17, 2023, 10:58:39 PM"
  },
  "-NwNoDj35iDyPY6H2FGA": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00",
        "qty": "1"
      },
      {
        "id": "C2002",
        "image": "img/2.jpg",
        "name": "Nikon EOS",
        "price": "40000.00",
        "qty": "5"
      },
      {
        "id": "C2003",
        "image": "img/3.jpg",
        "name": "Sony DSLR",
        "price": "36000.00",
        "qty": 0
      },
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00",
        "qty": "1"
      },
      {
        "id": "W3003",
        "image": "img/20.jpg",
        "name": "HMT Milan",
        "price": "8000.00",
        "qty": "4"
      }
    ],
    "orddate": "Apr 26, 2024, 10:41:04 AM"
  },
  "-NwVPQePzQHQjUEyjTor": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00",
        "qty": "5",
        "totalamt": 180000
      },
      {
        "id": "S4001",
        "image": "img/22.jpg",
        "name": "H&W",
        "price": "800.00",
        "qty": 0,
        "totalamt": 0
      }
    ],
    "orddate": "Apr 27, 2024, 10:05:17 PM"
  },
  "-NwVQRGfXEdq4g63Vwrv": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00",
        "qty": "1",
        "totalamt": 36000
      },
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00",
        "qty": "2",
        "totalamt": 100000
      }
    ],
    "orddate": "Apr 27, 2024, 10:09:52 PM"
  },
  "-NwZlvLwugkbtzTjE1sh": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00",
        "qty": "2",
        "totalamt": 72000
      },
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00",
        "qty": 0,
        "totalamt": 0
      },
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00",
        "qty": "1",
        "totalamt": 36000
      }
    ],
    "orddate": "Apr 28, 2024, 6:26:41 PM"
  },
  "-O5EkgIuOmDYEOK0Cr2B": {
    "items": [
      {
        "id": "C2001",
        "image": "img/5.jpg",
        "name": "Cannon EOS",
        "price": "36000.00",
        "qty": "1",
        "totalamt": 36000
      },
      {
        "id": "C2004",
        "image": "img/4.jpg",
        "name": "Olympus DSLR",
        "price": "50000.00",
        "qty": "2",
        "totalamt": 100000
      },
      {
        "id": "C2002",
        "image": "img/2.jpg",
        "name": "Nikon EOS",
        "price": "40000.00",
        "qty": "3",
        "totalamt": 120000
      }
    ],
    "orddate": "Aug 26, 2024, 11:03:01 PM"
  }
}