// 全站内容数据 —— 后续修改文案只需改这里
export const profile = {
  name: '蔡杰',
  nameEn: 'CAI JIE',
  title: '3D 设计师 / AI 设计师',
  titleEn: '3D & AI Designer',
  tagline: '以 3D 可视化与实时渲染，重塑智能出行的每一个像素。',
  taglineEn:
    'Bridging industrial design and real-time rendering to shape the future of smart mobility.',
  phone: '17614308993',
  email: 'cj17614308993@163.com',
  location: '中国 · 深圳',
  bio: [
    '8 年 3D 设计经验，深耕智能汽车领域 7 年，现任比亚迪 3D 设计师。',
    '从 DiLink 3.0 到 6.0，主导 3D ADAS、360° 全景倒车、NOA 智能驾驶可视化等量产项目，作品登陆比亚迪发布会。',
    '精通硬表面建模、PBR 材质与实时渲染管线（UE / Unity HDRP / Octane），擅长在车规级性能限制下追求离线级画质，并以工作流优化与技术文档驱动团队交付。',
  ],
  stats: [
    { value: '8+', label: '年行业经验', en: 'Years Experience' },
    { value: '20+', label: '量产与自研项目', en: 'Projects Delivered' },
    { value: '30+', label: '车型模型库', en: 'Vehicle Models' },
    { value: '60', label: 'FPS 实时渲染', en: 'FPS Real-time' },
  ],
  contacts: [
    { label: '电话', value: '17614308993', href: 'tel:17614308993' },
    { label: '邮箱', value: 'cj17614308993@163.com', href: 'mailto:cj17614308993@163.com' },
    { label: '坐标', value: '中国 · 深圳', href: null },
  ],
  experience: [
    { period: '2025.06 — 至今', role: '3D 设计师', company: '比亚迪 · 泊车影像项目' },
    { period: '2021.01 — 2024.06', role: '3D 设计师', company: '比亚迪 · DiLink 3D ADAS 项目' },
    { period: '2019.06 — 2020.12', role: '3D 设计师', company: '比亚迪 · 3D 全景倒车项目' },
    { period: '2018.12 — 至今', role: '3D 设计师', company: '比亚迪精密制造有限公司' },
    { period: '2017.12 — 2018.07', role: '游戏场景美术', company: '成都维塔士 ·《使命召唤：黑色行动》' },
  ],
}

export const projects = [
  {
    id: 'octane-amg',
    index: '01',
    title: 'Octane 影视级汽车渲染',
    titleEn: 'Octane Render · Mercedes-AMG GT',
    category: '离线渲染 / Offline Rendering',
    images: [
      '/images/projects/p01_01.webp',
      '/images/projects/p01_02.webp',
      '/images/projects/p01_03.webp',
    ],
    description:
      '使用 Octane Render 完成奔驰 AMG GT 高精度离线渲染。路径追踪实现物理正确的全局光照，配合 HDRI 与区域光，精准还原金属漆颗粒感、碳纤维纹理与玻璃折射，在实时帧率之外追求影视级画面品质。',
    tags: ['Octane Render', '路径追踪 4096spp', '4K 输出', 'PBR 材质'],
    metrics: '多视角批量输出 · 单帧约 15 分钟',
    size: 'large',
  },
  {
    id: 'hdrp-realtime',
    index: '02',
    title: '汽车实时渲染 · UE4 / Unity HDRP',
    titleEn: 'Real-time Automotive Rendering · UE4 / Unity HDRP',
    category: '实时渲染 / Real-time Rendering',
    images: [
      '/images/projects/p02_01.webp',
      '/images/projects/p02_02.webp',
      '/images/projects/p02_03.webp',
      '/images/projects/p02_04.webp',
    ],
    description:
      '基于 UE4 与 Unity 高清渲染管线（HDRP）打造汽车可视化方案，解决传统离线渲染无法实时交互、修改成本高、出图周期长的痛点。以 PBR 工作流重建车漆、金属、玻璃材质，配合光线追踪、体积光与后处理栈，实现车漆颜色切换、轮毂更换、环境切换等实时交互，在车机端稳定 60FPS。',
    tags: ['UE4 / Unity HDRP', 'PBR 材质', '实时光追 / 体积光', '60FPS 交互'],
    metrics: '材质还原度 95%+ · 渲染延迟 < 16ms · 出图效率提升 10 倍',
    size: 'medium',
  },
  {
    id: 'creature-modeling',
    index: '03',
    title: '次世代生物建模全流程',
    titleEn: 'Next-gen Creature Modeling Pipeline',
    category: '硬表面 / 生物建模',
    images: [
      '/images/projects/p03_01.webp',
      '/images/projects/p03_02.webp',
      '/images/projects/p03_03.webp',
    ],
    description:
      '从 ZBrush 高模雕刻出发，经拓扑重建、UV 展开、法线 / AO 烘焙，到 Substance Painter 绘制 PBR 材质，最终在 Marmoset Toolbag 实时渲染。独角仙、瓢虫、叩头虫三个案例覆盖甲壳、半透明翅膀与绒毛等材质挑战。',
    tags: ['ZBrush', 'Maya / SP', '4K PBR 贴图', '500 万面高模'],
    metrics: '高模 500 万+ · 低模 1.5 万面',
    size: 'wide',
  },
  {
    id: 'dilink-adas',
    index: '04',
    title: 'DiLink 3D ADAS 智能驾驶可视化',
    titleEn: 'DiLink 3D ADAS · From 5.0 to 6.0',
    category: '智能驾驶 / HMI 3D',
    images: [
      '/images/projects/p04_01.webp',
      '/images/projects/p04_02.webp',
      '/images/projects/p04_03.webp',
      '/images/projects/p04_04.webp',
      '/images/projects/p04_05.webp',
    ],
    description:
      'DiLink 从 5.0 迭代到 6.0，3D 可视化完成从"有模型"到"还原真实路况"的跨越。建立标准化车辆模型库覆盖 30+ 车型，6.0 引入实车级模型与实时环境渲染，将摄像头画面与 3D 车模融合，ACC、车道保持、自动变道、盲区监测均以 3D 场景直接呈现，登陆比亚迪发布会。',
    tags: ['UE / Unity', '3D 车模库', '传感器数据可视化', '虚实融合'],
    metrics: '模型面数提升 5 倍 · 融合延迟 < 50ms',
    size: 'medium',
  },
  {
    id: 'surround-view',
    index: '05',
    title: '360° 全景倒车影像系统',
    titleEn: '360° Surround View · Parking Assistance',
    category: '量产项目 / Production',
    images: [
      '/images/projects/p05_01.webp',
      '/images/projects/p05_02.webp',
      '/images/projects/p05_03.webp',
      '/images/projects/p05_04.webp',
      '/images/projects/p05_05.webp',
      '/images/projects/p05_06.webp',
    ],
    description:
      '主导高精度车模视觉优化，从 CAD 模型重构、PBR 材质与物理级光影调校，到协同算法端优化畸变校正与虚实融合逻辑，在车规级低功耗芯片下实现虚拟车模与真实环境的毫米级贴合，彻底消除 2D 影像的视角盲区与距离误判。',
    tags: ['四目 1080P 拼接', 'PBR 车模', '畸变校正', '动态轨迹线'],
    metrics: '四目 1920×1080 · 毫秒级 ISP 拼接',
    size: 'wide',
  },
  {
    id: 'unity-scenes',
    index: '06',
    title: 'Unity 多场景 3D 可视化',
    titleEn: 'Unity Multi-scene 3D Visualization',
    category: '场景搭建 / Environment',
    images: [
      '/images/projects/p06_01.webp',
      '/images/projects/p06_02.webp',
      '/images/projects/p06_03.webp',
    ],
    description:
      '基于 Unity 打造覆盖现代办公、多元居住、生态农业的多场景 3D 可视化项目。PBR 材质与实时光照还原真实空间质感，支持第一人称漫游、物体交互与材质切换，让客户在虚拟空间中自由体验，缩短方案确认周期。',
    tags: ['Unity', '光影烘焙', '第一人称漫游', 'PC / VR 双平台'],
    metrics: '单场景 Draw Call < 500 · 交互延迟 < 100ms',
    size: 'large',
  },
  {
    id: 'noa-navigation',
    index: '07',
    title: '高德导航 NOA 智能驾驶',
    titleEn: 'Amap NOA · Navigation & Smart Driving',
    category: '智能驾驶 / HMI 3D',
    images: [
      '/images/projects/p07_01.webp',
      '/images/projects/p07_02.webp',
      '/images/projects/p07_03.webp',
    ],
    description:
      '依托高精地图与多传感器融合，实现高速到城区全场景智能驾驶覆盖。3D 导航画面与实车视角实时联动，车道级引导精准到具体车道，变道、转弯、汇出时机一目了然，毫秒级环境感知与 AI 决策规划呈现于车机屏幕。',
    tags: ['高精地图', '车道级渲染', '高速 / 城市 NOA', 'AI 决策'],
    metrics: '感知距离 200m+ · 决策延迟 < 100ms',
    size: 'tall',
  },
  {
    id: 'hard-surface',
    index: '08',
    title: '汽车硬表面建模 · 内饰与引擎',
    titleEn: 'Automotive Hard-surface · Interior & Engine',
    category: '硬表面建模 / Hard-surface',
    images: [
      '/images/projects/p08_01.webp',
      '/images/projects/p08_02.webp',
      '/images/projects/p08_03.webp',
      '/images/projects/p08_04.webp',
    ],
    description:
      '完整跑车硬表面建模项目，覆盖发动机舱动力总成与整车内饰座舱两大模块。引擎舱在保障机械结构完整度前提下精细化控制面数，全部依靠模型布线实现结构细节与光影，不依赖法线贴图，对结构观察与硬表面功底要求极高。',
    tags: ['Blender / Maya', '引擎舱布线', '内饰装配', '低面数优化'],
    metrics: '全硬表面工作流 · 结构零法线贴图',
    size: 'medium',
  },
]

export const strengths = [
  {
    no: '01',
    title: '硬表面高精度建模',
    titleEn: 'Hard-surface Modeling',
    desc: '汽车、机械、生物全品类高模雕刻到低模拓扑，ZBrush / Maya / Blender 工作流，布线规范、面数可控，直接对接引擎与车机。',
    icon: 'cube',
  },
  {
    no: '02',
    title: '实时渲染与性能优化',
    titleEn: 'Real-time Rendering',
    desc: '精通 UE 光线追踪与 Unity HDRP，PBR 材质实例、SSR、体积光与后处理；在车规芯片上稳定 60FPS，Draw Call 与 Shader 复杂度双重优化。',
    icon: 'bolt',
  },
  {
    no: '03',
    title: '离线影视级渲染',
    titleEn: 'Offline Rendering',
    desc: 'Octane 路径追踪 4096spp，精准还原金属漆、碳纤维、玻璃折射与焦散，4K 多视角批量输出，达到照片级商业画面品质。',
    icon: 'aperture',
  },
  {
    no: '04',
    title: '智能驾驶 3D HMI',
    titleEn: 'ADAS 3D Visualization',
    desc: 'DiLink 3.0–6.0、360° 全景、NOA 导航等量产经验，熟悉摄像头画面与 3D 车模融合、传感器数据可视化与车机端交互呈现。',
    icon: 'car',
  },
  {
    no: '05',
    title: '工作流与团队交付',
    titleEn: 'Pipeline & Delivery',
    desc: '擅长制定工作流程、编写技术手册与检查规范，合理排期与资源整合，曾带组完成全景倒车等项目，按时按量交付并反哺团队效率。',
    icon: 'flow',
  },
  {
    no: '06',
    title: 'AI 辅助设计探索',
    titleEn: 'AI-augmented Design',
    desc: '将 AIGC 图像 / 视频生成融入 3D 概念设计与视觉提案，快速产出氛围图与参考，结合传统管线提升迭代速度与方案表现力。',
    icon: 'spark',
  },
]

export const navLinks = [
  { label: '关于', en: 'About', href: '#about' },
  { label: '作品', en: 'Works', href: '#works' },
  { label: '能力', en: 'Skills', href: '#skills' },
  { label: '联系', en: 'Contact', href: '#contact' },
]
