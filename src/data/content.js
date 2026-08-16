// 全站内容数据 —— 后续修改文案只需改这里
export const profile = {
  name: '蔡杰',
  nameEn: 'CAI JIE',
  title: '3D 设计师 / AI 设计师',
  titleEn: '3D & AI Designer',
  heroTitle: ['DESIGN', 'PORTFOLIO'],
  heroKeywords: '建模 · 材质 · 渲染 · 动画',
  tagline: '建模 · 材质 · 渲染 · 动画',
  taglineEn: '',
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
    {
      period: '2025.06 — 至今',
      role: '3D 设计师',
      company: '泊车影像项目',
      description: [
        '优化车辆模型以完全符合泊车项目规格要求，通过调整模型参数与结构，显著提升模型在泊车场景下的精确度与稳定性。',
        '修订车灯控制逻辑并同步更新相关模型命名规范，确保软硬件协同一致。',
        '编写详细工作文档，为团队提供清晰的技术指导与参考，降低跨角色沟通成本。',
      ],
    },
    {
      period: '2022.05 — 2022.12',
      role: '3D 设计师',
      company: '软件可售智能驾驶答题项目',
      description: [
        '与产品、开发协同确定需求并提出视觉优化建议，提升效果完成度。',
        '独立搭建仿真场景并渲染效果图，交付 2D 团队用于界面制作。',
        '项目最终在比亚迪发布会公开展示。',
      ],
    },
    {
      period: '2021.01 — 2024.06',
      role: '3D 设计师',
      company: 'DiLink 3.0–6.0 3D ADAS 项目',
      description: [
        '协助产品经理推进项目，与开发、产品多方沟通确定需求并提出视觉优化建议。',
        '项目最终在比亚迪 2024 年发布会公开展示。',
      ],
    },
    {
      period: '2019.06 — 2020.12',
      role: '3D 设计师',
      company: '3D 全景倒车项目',
      description: [
        '负责项目对接、组内人员工作安排与制作流程制定（工时规划、模型检查等）。',
        '按时按量完成交付，获得广泛好评。',
      ],
    },
    {
      period: '2018.12 — 2019.04',
      role: '3D 设计师',
      company: '上海车展 · 比亚迪唐车模',
      description: [
        '为汽车 HMI 制作比亚迪唐高精度车模，供 UI 与开发团队共同使用。',
        '负责模型制作与开发对接，按工程要求规范模型坐标与命名体系。',
      ],
    },
    {
      period: '2018.04 — 2018.07',
      role: '游戏场景美术',
      company: '《使命召唤：黑色行动》游戏场景',
      description: [
        '协助组长完成游戏场景模型制作，沟通确认甲方需求与制作规范，梳理工作流程。',
        '项目最终《使命召唤16：现代战争》全球销量超 3000 万套。',
      ],
    },
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
    id: 'ue4-realtime',
    index: '02',
    title: 'UE4 汽车实时渲染',
    titleEn: 'UE4 Real-time Automotive Rendering',
    category: '实时渲染 / Real-time Rendering',
    images: [
      '/images/projects/ue4_silver.webp',
      '/images/projects/ue4_red.webp',
      '/images/projects/ue4_blue.webp',
      '/images/projects/ue4_black.webp',
    ],
    description:
      '基于虚幻引擎 4 打造汽车实时渲染与交互方案，解决传统离线渲染无法实时交互、修改成本高、出图周期长的痛点。通过光线追踪、PBR 材质实例与 Sequencer 动画系统，实现车漆颜色切换、轮毂更换、环境切换等实时交互。完成银、红、蓝、黑四款车型的高品质渲染，定制化车漆 Shader 还原金属漆层次感与清漆反射，深色款重点解决暗部死黑问题，在实时帧率下达到接近离线渲染的画质。',
    tags: ['UE4 / 光线追踪', 'PBR 材质实例', '车漆 Shader', 'Sequencer 动画'],
    metrics: '四款车型 · 渲染延迟 < 16ms · 出图效率提升 10 倍',
    size: 'large',
  },
  {
    id: 'unity-hdrp-realtime',
    index: '03',
    title: 'Unity HDRP 汽车实时渲染',
    titleEn: 'Unity HDRP Automotive Rendering',
    category: '实时渲染 / Real-time Rendering',
    images: [
      '/images/projects/p02_01.webp',
      '/images/projects/p02_02.webp',
    ],
    description:
      '基于 Unity 高清渲染管线（HDRP）打造汽车可视化方案，以 PBR 工作流重建车漆、金属、玻璃材质，配合体积光与后处理栈，实现车漆颜色切换、环境切换等实时交互。在车规级性能限制下稳定运行，兼顾离线级画质与实时帧率。',
    tags: ['Unity HDRP', 'PBR 材质', '体积光 / 后处理', '60FPS 交互'],
    metrics: '材质还原度 95%+ · 渲染延迟 < 16ms · 车规级稳定运行',
    size: 'medium',
  },
  {
    id: 'auto-parking-test',
    index: '04',
    title: '自动泊车测试',
    titleEn: 'Automatic Parking Test',
    category: '泊车功能 / Parking HMI',
    images: [
      '/images/projects/auto_parking_01.webp',
      '/images/projects/auto_parking_02.webp',
    ],
    description:
      '自动泊车技术深度融合毫米波雷达、高清视觉感知与 AI 决策算法，构建起全方位的环境感知网络。系统可实时捕捉车位轮廓、障碍物距离及周边动态，通过车载计算平台快速完成车位检测、路径规划与车辆动力学控制。无论是垂直、侧方还是斜向车位，都能精准识别并自主完成泊车动作，无需人工干预即可平稳入位，彻底解决狭窄空间停车难、新手泊车易剐蹭的痛点。',
    tags: ['毫米波雷达', '视觉感知', 'AI 决策', '路径规划'],
    metrics: '车位识别 99.2% · 平均入位 38 秒 · 最小间距 2.4 米',
    size: 'medium',
  },
  {
    id: 'dilink-adas',
    index: '05',
    title: 'DiLink 3D ADAS 智能驾驶可视化',
    titleEn: 'DiLink 3D ADAS · From 5.0 to 6.0',
    category: '智能驾驶 / HMI 3D',
    images: [
      '/images/projects/adas_grid.webp',
      '/images/projects/adas_lineup_01.webp',
      '/images/projects/adas_lineup_02.webp',
      '/images/projects/adas_dashboard_01.webp',
      '/images/projects/adas_dashboard_02.webp',
      '/images/projects/adas_parking.webp',
    ],
    description:
      'DiLink 从 4.0 迭代到 6.0，车机 3D 可视化完成了从"有模型"到"还原真实路况"的跨越。5.0 阶段建立标准化车辆模型库，覆盖轿车、SUV、卡车等 50+ 车型，解决旧版模型粗糙、场景还原度低的问题；6.0 引入实车级 3D 模型与实时环境渲染，将摄像头画面与 3D 车模虚实融合，轻量化车模叠加实时传感器数据，在车机端渲染周边车辆、行人、车道线与障碍物。配合全场景仿真建模库，支持昼夜 / 雨雪 / 雾天切换与交通流灵活配置，为感知算法训练与 HIL 测试提供虚拟验证环境。ACC、车道保持、自动变道、盲区监测均以 3D 场景直接呈现，相比传统 2D 仪表做到所见即所得，驾驶员能直观感知系统状态与下一步动作。',
    tags: ['UE / Unity', '3D 模型库 50+', '全场景仿真', '虚实融合'],
    metrics: '车辆模型 50+ · 场景类型 20+ · 测试效率提升 300%',
    size: 'large',
  },
  {
    id: 'noa-navigation',
    index: '06',
    title: '高德导航 NOA 智能驾驶',
    titleEn: 'Amap NOA · Navigation & Smart Driving',
    category: '智能驾驶 / HMI 3D',
    images: [
      '/images/projects/noa_main.webp',
      '/images/projects/noa_tunnel.webp',
    ],
    description:
      '依托高精地图与多传感器融合，实现高速到城区全场景智能驾驶覆盖。3D 导航画面与实车视角实时联动，车道级引导精准到具体车道，变道、转弯、汇出时机一目了然，毫秒级环境感知与 AI 决策规划呈现于车机屏幕。',
    tags: ['高精地图', '车道级渲染', '高速 / 城市 NOA', 'AI 决策'],
    metrics: '感知距离 200m+ · 决策延迟 < 100ms',
    size: 'medium',
  },
  {
    id: 'parking-quiz',
    index: '07',
    title: '泊车考试题设计',
    titleEn: 'Parking Test Question Design',
    category: '泊车功能 / Parking HMI',
    images: [
      '/images/projects/parking_quiz_01.webp',
      '/images/projects/parking_quiz_02.webp',
      '/images/projects/parking_quiz_03.webp',
    ],
    description:
      '为记忆泊车功能设计标准化考题体系，解决泊车功能测试中场景覆盖不全、评分标准不统一、用户体验难以量化的痛点。基于真实泊车场景分析，涵盖垂直车位、平行车位、斜列车位、窄泊位等典型工况，设计从简单到复杂的分级考题。通过车机端可视化界面呈现考题流程与操作指引，支持自动评分与数据记录，为算法迭代提供可复现的测试基准，同时帮助用户理解功能边界与安全操作规范。',
    tags: ['记忆泊车', '考题体系', '车机可视化', '分级考题'],
    metrics: '考题覆盖 20+ 泊车场景 · 明确功能边界 · 规范操作行为',
    size: 'medium',
  },
  {
    id: 'surround-view',
    index: '08',
    title: '360° 全景倒车影像系统',
    titleEn: '360° Surround View · Parking Assistance',
    category: '量产项目 / Production',
    images: [
      '/images/projects/surround_3d_ui.webp',
      '/images/projects/surround_real_effect.webp',
    ],
    description:
      '主导高精度车模视觉优化，从 CAD 模型重构、PBR 材质与物理级光影调校，到协同算法端优化畸变校正与虚实融合逻辑，在车规级低功耗芯片下实现虚拟车模与真实环境的毫米级贴合，彻底消除 2D 影像的视角盲区与距离误判。',
    tags: ['四目 1080P 拼接', 'PBR 车模', '畸变校正', '动态轨迹线'],
    metrics: '四目 1920×1080 · 毫秒级 ISP 拼接',
    size: 'medium',
  },
  {
    id: 'unity-scenes',
    index: '09',
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
    id: 'creature-modeling',
    index: '10',
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
    id: 'hard-surface',
    index: '11',
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
  { label: '作品', en: 'Works', href: '#gallery' },
  { label: '能力', en: 'Skills', href: '#skills' },
  { label: '联系', en: 'Contact', href: '#contact' },
]

// 视频展示模块
export const videos = [
  {
    id: 'boot-animation',
    title: '车机开机动画',
    titleEn: 'Boot Animation',
    description: 'DiLink 车机系统启动动画，品牌视觉与动效节奏的完整呈现。',
    src: '/videos/boot-animation.mp4',
    size: 'small',
  },
  {
    id: 'demo-01',
    title: 'UI 动效与交互演示',
    titleEn: 'UI Motion & Interaction',
    description: '车机界面动效设计与交互流程演示，涵盖转场、反馈与状态切换。',
    src: '/videos/demo-01.mp4',
    size: 'medium',
  },
  {
    id: 'demo-02',
    title: '3D 可视化作品演示',
    titleEn: '3D Visualization Reel',
    description: '实时渲染与 3D 交互作品合集，展示动态画面与操作体验。',
    src: '/videos/demo-02.mp4',
    size: 'large',
  },
]
