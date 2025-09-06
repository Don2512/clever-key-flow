export interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  coordinates: [number, number];
  type: string;
  description?: string;
  postedTime?: string;
}

export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'FPT Software',
    salary: '15-25 triệu',
    location: 'Quận 7, TP Hồ Chí Minh',
    coordinates: [106.7197, 10.7321],
    type: 'Toàn thời gian',
    description: 'Tìm kiếm Frontend Developer có kinh nghiệm với React, TypeScript và Tailwind CSS. Làm việc trong môi trường năng động với các dự án quốc tế.',
    postedTime: '2 ngày trước'
  },
  {
    id: '2',
    title: 'UI/UX Designer',
    company: 'VNG Corporation',
    salary: '18-30 triệu',
    location: 'Quận Bình Thạnh, TP Hồ Chí Minh',
    coordinates: [106.7056, 10.8031],
    type: 'Toàn thời gian',
    description: 'Thiết kế giao diện người dùng cho các sản phẩm di động và web. Yêu cầu có kinh nghiệm với Figma, Adobe Creative Suite.',
    postedTime: '1 ngày trước'
  },
  {
    id: '3',
    title: 'Backend Developer',
    company: 'Tiki Corporation',
    salary: '20-35 triệu',
    location: 'Quận 1, TP Hồ Chí Minh',
    coordinates: [106.6917, 10.7769],
    type: 'Toàn thời gian',
    description: 'Phát triển API và microservices cho nền tảng thương mại điện tử. Kinh nghiệm với Node.js, Python, và cloud services.',
    postedTime: '3 ngày trước'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Shopee Vietnam',
    salary: '25-40 triệu',
    location: 'Quận 4, TP Hồ Chí Minh',
    coordinates: [106.6914, 10.7594],
    type: 'Toàn thời gian',
    description: 'Quản lý sản phẩm từ ý tưởng đến triển khai. Làm việc với đội kỹ thuật và thiết kế để phát triển các tính năng mới.',
    postedTime: '1 tuần trước'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'Grab Vietnam',
    salary: '22-38 triệu',
    location: 'Quận 1, TP Hồ Chí Minh',
    coordinates: [106.6997, 10.7756],
    type: 'Toàn thời gian',
    description: 'Quản lý hạ tầng cloud và CI/CD pipelines. Kinh nghiệm với AWS, Docker, Kubernetes và monitoring tools.',
    postedTime: '2 ngày trước'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'Vingroup',
    salary: '20-32 triệu',
    location: 'Quận 3, TP Hồ Chí Minh',
    coordinates: [106.6889, 10.7869],
    type: 'Toàn thời gian',
    description: 'Phân tích dữ liệu và xây dựng mô hình machine learning. Yêu cầu Python, SQL, TensorFlow/PyTorch.',
    postedTime: '4 ngày trước'
  },
  {
    id: '7',
    title: 'Mobile Developer',
    company: 'Zalo',
    salary: '18-28 triệu',
    location: 'Quận 2, TP Hồ Chí Minh',
    coordinates: [106.7311, 10.7975],
    type: 'Toàn thời gian',
    description: 'Phát triển ứng dụng mobile cho iOS và Android. Kinh nghiệm với React Native hoặc Flutter.',
    postedTime: '1 ngày trước'
  },
  {
    id: '8',
    title: 'QA Engineer',
    company: 'MoMo',
    salary: '15-22 triệu',
    location: 'Quận 7, TP Hồ Chí Minh',
    coordinates: [106.7025, 10.7292],
    type: 'Toàn thời gian',
    description: 'Đảm bảo chất lượng sản phẩm thông qua testing manual và automation. Kinh nghiệm với Selenium, Jest.',
    postedTime: '3 ngày trước'
  },
  {
    id: '9',
    title: 'Full Stack Developer',
    company: 'Lazada',
    salary: '22-35 triệu',
    location: 'Quận 1, TP Hồ Chí Minh',
    coordinates: [106.6956, 10.7831],
    type: 'Toàn thời gian',
    description: 'Phát triển cả frontend và backend cho nền tảng e-commerce. Tech stack: React, Node.js, MongoDB.',
    postedTime: '2 ngày trước'
  },
  {
    id: '10',
    title: 'Security Engineer',
    company: 'ViettelPay',
    salary: '25-40 triệu',
    location: 'Quận 3, TP Hồ Chí Minh',
    coordinates: [106.6947, 10.7892],
    type: 'Toàn thời gian',
    description: 'Bảo mật hệ thống thanh toán và ứng dụng fintech. Kinh nghiệm với penetration testing và security frameworks.',
    postedTime: '5 ngày trước'
  }
];