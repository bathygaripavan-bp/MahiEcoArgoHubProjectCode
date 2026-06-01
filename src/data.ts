import { Product, Address, User, Order, Review, SalesReport } from './types';

export const SEEDED_PRODUCTS: Product[] = [
  // Cow farming
  {
    id: 'cow-milk-gir',
    name: 'A2 Gir Cow Milk',
    description: '100% pure, unadulterated A2 milk from indigenous Gir cows fed on organic pasture crops.',
    price: 85,
    stock: 45,
    category: 'cow-farming',
    subCategory: 'Fresh Milk',
    unit: 'Ltr',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyumDv1cZdj46DRtJpsJjzStQMcQSl1Vz6k4VjlgUNE32P4n3_1NKUxer93Ims_Yx_Pj8rqclJNKsHXzg-g5IaYMAkuMaiQua_ofy6LMkeIiY0U1USZa82XZfkLReTVFLfXJxOHekjmoDXNdeUjenGTJlaa3-4FuqRmul7peHSmhFg06S5jiRJ7j2SAqX9whBRQ-QHM2nZPqVeQyXEH5IfW2rHEPQZyzHyMZ4MK08JXjKbuhGAfqZtlyWqo5Tw8q0gL6Mbsik05Mk',
    fatPercentage: '4.8% fat',
    farmSource: 'MahiEco Pasture #2',
    rating: 4.9,
    reviewsCount: 22,
    variants: [
      { name: '1 Litre', price: 85 },
      { name: '2 Litres', price: 165 },
      { name: '5 Litres', price: 400 }
    ]
  },
  {
    id: 'cow-ghee-bilona',
    name: 'A2 Desi Cow Ghee (Bilona)',
    description: 'Medicinal grade Bilona ghee, traditionally churned in clay pots from curd of A2 grass-fed cow milk. Golden, granular texture, rich aroma.',
    price: 850,
    stock: 18,
    category: 'cow-farming',
    subCategory: 'Pure Ghee',
    unit: '500ml glass jar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiFq3zjK4n__1n9NemSXXfR5BVWcWn6uRHUS1f3GZn_BVqTTO5N-qJuFaAQGK4qV5HUZrNFRLe9pdxs0MM7DjqH0c21YxNPGwOozFy_dYji-gDMm5Ymt3xIn-NfpeEw8sJCgbR2wMVnVYuosOwtA4JE_YVfSvh-7r8Pso9wR-hmRz5HSS8IV0YECjEsAw8vdQyBWrIE32RxLcvCM6iybcE1LSwI8Yr5_kf9xpmksFy7jirgJ-_iU-Rt_7Tf0p_FxgfGoIk2y2MJ-4',
    fatPercentage: '99.9% pure fat',
    farmSource: 'MahiEco Farm #3',
    rating: 4.8,
    reviewsCount: 42,
    variants: [
      { name: '250ml', price: 450 },
      { name: '500ml', price: 850 },
      { name: '1 Litre', price: 1600 }
    ]
  },
  {
    id: 'cow-curd-earthen',
    name: 'Farm Fresh Curd',
    description: 'Thick, probiotic-rich probiotic curd set traditionally in sterile earthen pots for natural cooling and alkaline sweetness.',
    price: 60,
    stock: 30,
    category: 'cow-farming',
    subCategory: 'Curd & Yogurt',
    unit: '500g clay pot',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEg-TKuwfZorOGHuXApGS5lQyFBEK05JLFWRi871LWL-ooBr4tbL-JyH0Tm_RchGoOv8sKpR6ayqNE6moBP8HGG8g6iF9HMnhAy1_QL_3pYwBabJckhQuvlxCYNillmJRLPylt1bKLCshmFb-axwyFTHvfH4CvQcHk_Lj9N4zHbMtqpXvcF6BYS9x_Qy0siRtQBtKx1ZOhWCFvz1Vq1Ej1myMlk24NM5RELjnI0L-i4cOlOYN41kzGdeIfBKvsxbrUcCaEeyAjN6s',
    fatPercentage: '3.6% fat',
    farmSource: 'MahiEco Dairy Plant',
    rating: 4.7,
    reviewsCount: 15
  },
  {
    id: 'cow-paneer-malai',
    name: 'Soft Malai Paneer',
    description: 'Incredibly soft and melt-in-mouth cottage paneer cuboid blocks prep-crafted directly from full cream organic milk daily.',
    price: 120,
    stock: 25,
    category: 'cow-farming',
    subCategory: 'Paneer & Cheese',
    unit: '250g pack',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2_th-PnDTxK41Xd8vGVJzoE_fvYAKYUcntGw4ERta8jABqGDjHpNRdyBANR11TqGCKk_dHi7Lqt4kqqvoxY0eYK4Q-J7zQ1ZqVXo283Ct5uMtV6TBH8ZdenorGG0rjXHbn8rFPjn8LPzWgFaRvUfcbPEF8q128SM5rAjMFBQpISIDOpK5ZRe1VQP4vz627DcORrNWhFrzAGZm4Dl6eAan-elLtvHEfW548IHYmswflGZ7xXLJiMRurR9pldB2CDPoDEslGTA_Ros',
    fatPercentage: '45% dry fat',
    farmSource: 'MahiEco Dairy Plant',
    rating: 4.9,
    reviewsCount: 19
  },

  // Vegetable farming
  {
    id: 'veg-tomatoes-heirloom',
    name: 'Organic Heirloom Tomatoes',
    description: 'Rich, fully vine-ripened organic heirloom tomatoes grown carefully in compost-rich soils without synthetic pesticides. Incredible for sauces or raw salads.',
    price: 120,
    stock: 55,
    category: 'vegetable-farming',
    subCategory: 'Root Vegetables',
    unit: 'kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJAbDlKVFVTnW57_2GKTuBDHr8Xld1pV2nktLVKEL9LjwtEdC2P163YWD9aHB_DpafuqTaBZhOeqlemc4QSu-H-YmJwb966gZfG2K7vJOdlGTU78u1mpFVF6Wq-LXooMmqFziXQokjj_sfVzqgJzbfaD1eXNz5r1PyBEUZi6tTQs5SBsDB6mK3YuWhAFGebs43e_C1NSf8PkZNQlkJEdVSVtuupM6V1r_2fHePMqP-H2I_u_W_U4hRvW6-fXT70_ahTFDJ6R0H3RA',
    freshnessIndicator: 'Harvested Today morning',
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: 'veg-spinach-bunch',
    name: 'Farm Fresh Spinach',
    description: 'Nutrient-dense, crisp and sand-free hydroponic spinaches bound in biological natural fiber ropes. Clean source of raw iron.',
    price: 45,
    stock: 40,
    category: 'vegetable-farming',
    subCategory: 'Leafy Greens',
    unit: 'bunch (250g)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw6StXjJPZ_wTsOfI-PDhQ6gG_UM5az8PH3s20D6Nq4VDzGaDBpG8OeHnW62BBC-aKg7jV2pj3ftFZpbfgLTGsQkweS3oJIOdaFu3tMV9vPLzybfpqPJTxx7x2j31chxJaLOSMZqegBq-j6UZpaHrlneIWD3x2RQznUtf46uq6a708euo_E4beGBR7iOgKKkRJm7Ko2IaqWJklT5dNQCx4oDPnESISItcZZ8CeWxsHJYu9_qpU0-I4DYFntzJUPz0zMrjawve4YQQ',
    freshnessIndicator: '99% moisture retention',
    rating: 4.6,
    reviewsCount: 14
  },
  {
    id: 'veg-carrots-crunchy',
    name: 'Organic Crunchy Carrots',
    description: 'High carotenoid orange farm carrots. Crispy, sweet, and pulled directly out of loamy beds at the Hyderabad green precinct.',
    price: 80,
    stock: 12, // Trigger low stock alert
    category: 'vegetable-farming',
    subCategory: 'Root Vegetables',
    unit: 'kg',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt_TjoJgNTwNvM3mdv_VGe4aUuzweKlpRcN3-U-rXVNBgUHNnYKy0ZQZ4udgsQNfbfj2wytPkMeEb-xElwYPkHAIfbp3UbNpzgQz65_vA-ypD4nyc5xXgHgg4GwRMY81i1X4DvLwvSX1IZ_ygwRb6Kw7Dfez5uKyhNSDKkuoQ_Jm0_Mj38UWFcgez68r_dZt9mk7tw1OT9ZsJMJxfKrhVuNTNTo4Z3Yjg-nYbfQwN0PQnOy6bVrAaNA-9II1L3m7hbpSvRtnwmM2c',
    freshnessIndicator: 'Soil washed & chilled',
    rating: 4.9,
    reviewsCount: 18
  },

  // Kamju Pittala (Quails)
  {
    id: 'quail-live-std',
    name: 'Kamju Standard Grade (Live)',
    description: 'Ethically, free-ranched quail birds raised under sanitary climate conditions. Rich source of hypoallergenic proteins.',
    price: 350,
    stock: 60,
    category: 'kamju-pittala',
    subCategory: 'Live Quails',
    unit: 'kg (live count)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVl1K4RxNykTI2pKqLojCMShrrBwZmoQo-XJwzdV6FXG6GXoGqq7xhSovPvp3iJaCwCQTjIR7OnpS3HOJ9FcxiVl2idxgjI4qEQst1prpWKwrMgnp1XKeWU8RV-F7K3KYxLHZOg1bY8rO9Gtb-H3CRg-6qoy8T1hKABC-Ux7MHJI5KGIaHjCpvDFh7KJh6nzHM5oiVJ9p_HdWKUVjTADO4B_zpdJXg3DXKfPD3svT30lsZO51S5Zba8QduRrtJEKodhdppjxI2fDQ',
    liveWeight: '150g - 200g per bird',
    rating: 4.7,
    reviewsCount: 11
  },
  {
    id: 'quail-live-prem',
    name: 'Kamju Premium Grade (Live)',
    description: 'Sturdy, elite-bred quails meticulously chose for high tender crop yield. Certified biosecurity verified.',
    price: 420,
    stock: 35,
    category: 'kamju-pittala',
    subCategory: 'Live Quails',
    unit: 'kg (live weight)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuYJrxFbfRxXf6bG_ItDS8-OCFWsmwAuAEfbcr4qXot4aEF6KYM9dgmu9kdpIM9EkbK8HvvIlwBvhw-7T1dJ7v7SNLnT657vHF_xTFUmJ9sc-v1V23O2gHLH9EwfrMXkFRmE48f6sxf-Bb20-jgktFZkumkhwToAtG71w2HZ_YOQ0kjENAzxKdGRmtaEsA9k-bItR2hlN9eqRI401IQjOh08yvDuGAHzk79Yoj2qSWU5W8ZZx6j64jXxgCwzR5JvXl-5vACfqj74A',
    liveWeight: '200g+ per bird',
    rating: 4.9,
    reviewsCount: 26
  },
  {
    id: 'quail-eggs-dozen',
    name: 'Free-Range Quail Eggs',
    description: 'High-nutrient, speckled small quail eggs packed with healthy fatty acids, mineral deposits and proteins.',
    price: 120,
    stock: 5, // Trigger low stock alert
    category: 'kamju-pittala',
    subCategory: 'Quail Eggs',
    unit: 'Dozen Pack',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd7lL5dEVbgxEbrM-Z-DFFL5vFtvPd03xEuIGt-YWMz3KDQGSvOmPhSjPNUmF6nQ3SL0mEjnS57G-uv-5cLPl1GVUt0ImDuJPnaat98igthJmhbY3on7eaiznppuCfo51zYXohJnFh8W6ar4XC4tzjEVICTi9TseUzscn_Hm880CXUTBk1SKcLuSpD1i-e3jHvGRO39aQu-kMkaGVmRfHE3GRb-FQYlFe0iLRUr8e_SsGwOEUiIFWxjRyZfPfdeM_SxRUdQclbdRo',
    eggGrade: 'Grade AA Certified Size',
    rating: 4.8,
    reviewsCount: 33
  }
];

export const SEEDED_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Alex Carter',
    phone: '+91 96765 43210',
    addressLine: 'Flat 402, Green View Apartments, Road No. 12, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500034',
    type: 'HOME'
  },
  {
    id: 'addr-2',
    name: 'Alex Carter (Office)',
    phone: '+91 96765 43211',
    addressLine: 'Plot 45, Agro-Tech Lab, HITEC City',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500081',
    type: 'WORK'
  }
];

export const SEEDED_USERS: User[] = [
  {
    id: 'user-customer',
    name: 'Alex Carter',
    email: 'alex.carter@ecoargo.com',
    phone: '9676543210',
    role: 'user',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJcMxd6K6xlhdfN727xXCMOiLttzyO7IhJ8V93XOZ_TZxNbhYS4sdeOAuCIfz4jGC1tSXtIhjrTJh1w0j2wRSppBrGZjPx8jSIzduVzWlQlg0MS0BhIeB_-5H7z_aLTikoYIfoZ-eYlZkva6UrFIO0AYU4YulKcDRwnbRaCDBuo4yOAQrfdO7ViHGgfCKnXjWZBHfrrivQbaD6hzAkc8AUy3WtIL6-qSVK4X47u97-Rf1x_hAjRO_tzIzW-yYqHXxp1wEG_H85MME',
    createdAt: '2023-08-15',
    addresses: SEEDED_ADDRESSES
  },
  {
    id: 'user-manager',
    name: 'Venu Gopal',
    email: 'manager@mahieco.com',
    phone: '9876543210',
    role: 'manager',
    createdAt: '2024-01-10',
    addresses: []
  },
  {
    id: 'user-admin',
    name: 'Aishwarya Rao',
    email: 'admin@mahieco.com',
    phone: '9676543212',
    role: 'admin',
    createdAt: '2024-01-01',
    addresses: []
  }
];

export const SEEDED_ORDERS: Order[] = [
  {
    id: 'MHE-2024-00842',
    date: '2026-05-31',
    time: '10:23 AM',
    customerName: 'Alex Carter',
    customerEmail: 'alex.carter@ecoargo.com',
    customerPhone: '+91 96765 43210',
    status: 'shipped',
    items: [
      {
        productId: 'cow-ghee-bilona',
        name: 'A2 Desi Cow Ghee (Bilona)',
        price: 850,
        quantity: 1,
        unit: '500ml glass jar',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiFq3zjK4n__1n9NemSXXfR5BVWcWn6uRHUS1f3GZn_BVqTTO5N-qJuFaAQGK4qV5HUZrNFRLe9pdxs0MM7DjqH0c21YxNPGwOozFy_dYji-gDMm5Ymt3xIn-NfpeEw8sJCgbR2wMVnVYuosOwtA4JE_YVfSvh-7r8Pso9wR-hmRz5HSS8IV0YECjEsAw8vdQyBWrIE32RxLcvCM6iybcE1LSwI8Yr5_kf9xpmksFy7jirgJ-_iU-Rt_7Tf0p_FxgfGoIk2y2MJ-4'
      },
      {
        productId: 'veg-tomatoes-heirloom',
        name: 'Organic Heirloom Tomatoes',
        price: 120,
        quantity: 2,
        unit: 'kg',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJAbDlKVFVTnW57_2GKTuBDHr8Xld1pV2nktLVKEL9LjwtEdC2P163YWD9aHB_DpafuqTaBZhOeqlemc4QSu-H-YmJwb966gZfG2K7vJOdlGTU78u1mpFVF6Wq-LXooMmqFziXQokjj_sfVzqgJzbfaD1eXNz5r1PyBEUZi6tTQs5SBsDB6mK3YuWhAFGebs43e_C1NSf8PkZNQlkJEdVSVtuupM6V1r_2fHePMqP-H2I_u_W_U4hRvW6-fXT70_ahTFDJ6R0H3RA'
      },
      {
        productId: 'quail-eggs-dozen',
        name: 'Free-Range Quail Eggs',
        price: 120,
        quantity: 1,
        unit: 'Dozen Pack',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd7lL5dEVbgxEbrM-Z-DFFL5vFtvPd03xEuIGt-YWMz3KDQGSvOmPhSjPNUmF6nQ3SL0mEjnS57G-uv-5cLPl1GVUt0ImDuJPnaat98igthJmhbY3on7eaiznppuCfo51zYXohJnFh8W6ar4XC4tzjEVICTi9TseUzscn_Hm880CXUTBk1SKcLuSpD1i-e3jHvGRO39aQu-kMkaGVmRfHE3GRb-FQYlFe0iLRUr8e_SsGwOEUiIFWxjRyZfPfdeM_SxRUdQclbdRo'
      }
    ],
    subtotal: 1090,
    deliveryFee: 50,
    discount: 60,
    totalAmount: 1080,
    paymentMethod: 'online',
    paymentStatus: 'paid',
    deliverySlot: '4:00 PM – 7:00 PM (Evening Deliveries)',
    deliveryDate: '2026-06-01',
    address: SEEDED_ADDRESSES[0],
    deliveryNotes: 'Please call before ringing the doorbell.'
  },
  {
    id: 'ORD-8821',
    date: '2026-06-01',
    time: '12:15 AM',
    customerName: 'Suresh Kumar',
    customerEmail: 'suresh.kumar@gmail.com',
    customerPhone: '+91 91234 56789',
    status: 'placed',
    items: [
      {
        productId: 'cow-milk-gir',
        name: 'A2 Gir Cow Milk',
        price: 85,
        quantity: 5,
        unit: 'Ltr',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyumDv1cZdj46DRtJpsJjzStQMcQSl1Vz6k4VjlgUNE32P4n3_1NKUxer93Ims_Yx_Pj8rqclJNKsHXzg-g5IaYMAkuMaiQua_ofy6LMkeIiY0U1USZa82XZfkLReTVFLfXJxOHekjmoDXNdeUjenGTJlaa3-4FuqRmul7peHSmhFg06S5jiRJ7j2SAqX9whBRQ-QHM2nZPqVeQyXEH5IfW2rHEPQZyzHyMZ4MK08JXjKbuhGAfqZtlyWqo5Tw8q0gL6Mbsik05Mk'
      }
    ],
    subtotal: 425,
    deliveryFee: 40,
    discount: 0,
    totalAmount: 465,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    deliverySlot: '7:00 AM – 10:00 AM (Morning Fresh)',
    deliveryDate: '2026-06-02',
    address: {
      id: 'addr-ext1',
      name: 'Suresh Kumar',
      phone: '+91 91234 56789',
      addressLine: 'House No 34, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
      type: 'HOME'
    }
  }
];

export const SEEDED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'cow-ghee-bilona',
    userName: 'Priya R.',
    rating: 5,
    comment: 'The aroma and granular texture is incredibly authentic. Reminds me of traditional home-made bilona ghee from childhood. Will absolutely buy again!',
    date: '2026-05-20',
    isModerated: true
  },
  {
    id: 'rev-2',
    productId: 'cow-ghee-bilona',
    userName: 'Suresh M.',
    rating: 5,
    comment: 'Superb quality A2 cow ghee. My kids digest it so easily and love the pure butter-like fragrance on warm parathas. Same-day delivery was incredibly fast!',
    date: '2026-05-25',
    isModerated: true
  }
];

export const SALES_OVERVIEW: SalesReport = {
  revenueTrend: [
    { month: 'Jan', amount: 150000 },
    { month: 'Feb', amount: 180000 },
    { month: 'Mar', amount: 160000 },
    { month: 'Apr', amount: 210000 },
    { month: 'May', amount: 240000 },
    { month: 'Jun', amount: 220000 },
    { month: 'Jul', amount: 280000 },
    { month: 'Aug', amount: 310000 },
    { month: 'Sep', amount: 290000 },
    { month: 'Oct', amount: 350000 },
    { month: 'Nov', amount: 380000 },
    { month: 'Dec', amount: 452300 }
  ],
  distribution: [
    { category: 'Vegetable Farming', value: 45 },
    { category: 'Cow Farming', value: 35 },
    { category: 'Kamju Pittala', value: 20 }
  ],
  totalRevenue: 452300,
  activeOrdersCount: 2,
  totalUsersCount: 8902,
  totalProductsCount: 11,
  topSellingProducts: [
    { name: 'A2 Desi Cow Ghee (Bilona)', quantity: 240, revenue: 204000 },
    { name: 'Organic Heirloom Tomatoes', quantity: 1200, revenue: 144000 },
    { name: 'A2 Gir Cow Milk', quantity: 980, revenue: 83300 },
    { name: 'Free-Range Quail Eggs', quantity: 180, revenue: 21000 }
  ]
};
