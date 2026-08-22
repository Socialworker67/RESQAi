import { DatasetInfo } from '../types';

export const datasetsInfo: DatasetInfo[] = [
  {
    name: 'D-Fire',
    disasterType: 'FIRE',
    task: 'Fire + Smoke Detection',
    images: '21,000+ Images',
    description: 'D-Fire is an image dataset specifically designed for fire and smoke detection, providing bounding boxes for both classes to train CV models to recognize early-stage fire and smoke in varying lighting and indoor/outdoor conditions.',
    sourceUrl: 'https://github.com/astephen25/d-fire-dataset',
    modelStatus: 'Operational (YOLOv8-based)'
  },
  {
    name: 'BDD100K + HWID12',
    disasterType: 'ROAD_ACCIDENT',
    task: 'Road Scene / Vehicle / Person Understanding',
    images: '100,000 Driving Videos / Images',
    description: 'BDD100K provides diverse driving scenarios across different weather, time-of-day, and lane configurations, combined with HWID12 to recognize accident events. Used for road environment analysis and vehicle/person detection in emergency planning.',
    sourceUrl: 'https://www.bdd100k.com/',
    modelStatus: 'Operational (Faster R-CNN)'
  },
  {
    name: 'MVTec AD',
    disasterType: 'INDUSTRIAL_ACCIDENT',
    task: 'Industrial Anomaly Detection',
    images: '5,354 Images (15 categories)',
    description: 'MVTec AD (Anomaly Detection) is a benchmark dataset for unsupervised anomaly detection. It is utilized to detect structural anomalies, physical defects, or machine malfunctions in industrial settings, combined with worker/person tracking.',
    sourceUrl: 'https://www.mvtec.com/company/research/datasets/mvtec-ad',
    modelStatus: 'Operational (PatchCore / Autoencoder)'
  },
  {
    name: 'xBD / xView2',
    disasterType: 'BUILDING_COLLAPSE',
    task: 'Building Damage Assessment',
    images: '22,000+ Satellite Images',
    description: 'xBD is a large-scale dataset for building damage assessment from satellite imagery. It contains pre- and post-disaster pairs annotated with building polygons and damage levels (no damage, minor damage, major damage, or destroyed).',
    sourceUrl: 'https://xview2.org/',
    modelStatus: 'Operational (U-Net + ResNet50)'
  },
  {
    name: 'ShanghaiTech',
    disasterType: 'CROWD',
    task: 'Crowd Counting + Density Estimation',
    images: '1,198 Images (Part A & B)',
    description: 'ShanghaiTech contains a total of 330,165 annotated people heads. Used to estimate crowd sizes and density maps in high-congestion situations like stadium gates, exits, or public squares to prevent crowd crush incidents.',
    sourceUrl: 'https://github.com/gjy3038/ShanghaiTech-CSD',
    modelStatus: 'Operational (CSRNet)'
  }
];
