import type React from 'react';
import {
  AwsArt,
  DockerArt,
  FastApiArt,
  K8sArt,
  LlmArt,
  NodeArt,
  PostgresArt,
  PyTorchArt,
  PythonArt,
  RagArt,
  ReactArt,
  TensorFlowArt,
  TypeScriptArt,
  VisionArt,
} from './stickers';
import {
  AgileArt,
  AiModelsArt,
  AngularArt,
  BitbucketArt,
  CicdArt,
  CnnArt,
  ContextApiArt,
  CssArt,
  DebugArt,
  DeepLearningArt,
  FeaturesArt,
  GanArt,
  GcfArt,
  GcpArt,
  GitLabArt,
  GithubActionsArt,
  GraphqlArt,
  HtmlArt,
  IntegrationTestArt,
  JavaScriptArt,
  JenkinsArt,
  JestArt,
  JupyterArt,
  JwtArt,
  KerasArt,
  LambdaArt,
  MaskRcnnArt,
  MicroservicesArt,
  MongoArt,
  NestJsArt,
  NumpyArt,
  OAuthArt,
  OpenCvArt,
  PandasArt,
  RabbitMqArt,
  ReactNativeArt,
  ReactQueryArt,
  RedisArt,
  ReduxArt,
  RestArt,
  ServerlessArt,
  SklearnArt,
  SqlArt,
  TransferArt,
  WebSocketsArt,
} from './stickers-extra';

export type SkillId =
  | 'react'
  | 'typescript'
  | 'node'
  | 'fastapi'
  | 'python'
  | 'postgres'
  | 'docker'
  | 'aws'
  | 'pytorch'
  | 'llm'
  | 'tensorflow'
  | 'vision'
  | 'rag'
  | 'k8s'
  | 'reactnative'
  | 'javascript'
  | 'html'
  | 'css'
  | 'angular'
  | 'redux'
  | 'contextapi'
  | 'reactquery'
  | 'nestjs'
  | 'rest'
  | 'graphql'
  | 'rabbitmq'
  | 'lambda'
  | 'gcf'
  | 'websockets'
  | 'oauth'
  | 'jwt'
  | 'microservices'
  | 'sql'
  | 'mongodb'
  | 'redis'
  | 'gitlab'
  | 'bitbucket'
  | 'agile'
  | 'debugging'
  | 'jupyter'
  | 'gcp'
  | 'serverless'
  | 'cicd'
  | 'jenkins'
  | 'githubactions'
  | 'jest'
  | 'integrationtesting'
  | 'aimodels'
  | 'deeplearning'
  | 'gan'
  | 'features'
  | 'opencv'
  | 'keras'
  | 'sklearn'
  | 'numpy'
  | 'pandas'
  | 'maskrcnn'
  | 'transfer'
  | 'cnn';

/** A = most prominent, C = smallest. Purely a composition choice. */
export type StickerLevel = 'A' | 'B' | 'C';

export type SkillMeta = {
  label: string;
  /** Accessible name if the sticker is ever used non-decoratively */
  name: string;
  color: string;
  level: StickerLevel;
  Art: React.FC;
};

// All skills are backed by the CV (skills list, experience or projects).
export const SKILLS: Record<SkillId, SkillMeta> = {
  react: { label: 'REACT', name: 'React', color: '#5cc3e6', level: 'A', Art: ReactArt },
  python: { label: 'PYTHON', name: 'Python', color: '#f0b93a', level: 'A', Art: PythonArt },
  node: { label: 'NODE.JS', name: 'Node.js', color: '#62b45c', level: 'A', Art: NodeArt },
  llm: { label: 'LLM', name: 'LLM integrations', color: '#9a7fe0', level: 'A', Art: LlmArt },
  pytorch: { label: 'PYTORCH', name: 'PyTorch', color: '#ef7358', level: 'A', Art: PyTorchArt },
  typescript: { label: 'TYPESCRIPT', name: 'TypeScript', color: '#5b8fdc', level: 'B', Art: TypeScriptArt },
  fastapi: { label: 'FASTAPI', name: 'FastAPI', color: '#35b497', level: 'B', Art: FastApiArt },
  docker: { label: 'DOCKER', name: 'Docker', color: '#4f93d6', level: 'B', Art: DockerArt },
  postgres: { label: 'POSTGRESQL', name: 'PostgreSQL', color: '#6f88c4', level: 'B', Art: PostgresArt },
  aws: { label: 'AWS', name: 'AWS', color: '#f08f3e', level: 'B', Art: AwsArt },
  tensorflow: { label: 'TENSORFLOW', name: 'TensorFlow', color: '#f28c33', level: 'C', Art: TensorFlowArt },
  vision: { label: 'VISION', name: 'Computer vision', color: '#d774a8', level: 'C', Art: VisionArt },
  rag: { label: 'RAG', name: 'RAG', color: '#e0a52e', level: 'C', Art: RagArt },
  k8s: { label: 'K8S', name: 'Kubernetes', color: '#5b86d6', level: 'C', Art: K8sArt },
  // Skills section
  reactnative: { label: 'REACT NATIVE', name: 'React Native', color: '#8f76d8', level: 'C', Art: ReactNativeArt },
  javascript: { label: 'JAVASCRIPT', name: 'JavaScript', color: '#e2b52a', level: 'C', Art: JavaScriptArt },
  html: { label: 'HTML', name: 'HTML', color: '#f08a55', level: 'C', Art: HtmlArt },
  css: { label: 'CSS', name: 'CSS', color: '#6f8fe0', level: 'C', Art: CssArt },
  angular: { label: 'ANGULAR', name: 'Angular', color: '#e46a86', level: 'C', Art: AngularArt },
  redux: { label: 'REDUX', name: 'Redux', color: '#9a7fe0', level: 'C', Art: ReduxArt },
  contextapi: { label: 'CONTEXT', name: 'Context API', color: '#45b58e', level: 'C', Art: ContextApiArt },
  reactquery: { label: 'REACT QUERY', name: 'React Query', color: '#ec7898', level: 'C', Art: ReactQueryArt },
  nestjs: { label: 'NESTJS', name: 'NestJS', color: '#e46a86', level: 'C', Art: NestJsArt },
  rest: { label: 'REST', name: 'REST APIs', color: '#5fb15a', level: 'C', Art: RestArt },
  graphql: { label: 'GRAPHQL', name: 'GraphQL', color: '#e064b4', level: 'C', Art: GraphqlArt },
  rabbitmq: { label: 'RABBITMQ', name: 'RabbitMQ', color: '#f08f3e', level: 'C', Art: RabbitMqArt },
  lambda: { label: 'LAMBDA', name: 'AWS Lambda', color: '#f08f3e', level: 'C', Art: LambdaArt },
  gcf: { label: 'CLOUD FN', name: 'Google Cloud Functions', color: '#5b8fdc', level: 'C', Art: GcfArt },
  websockets: { label: 'SOCKETS', name: 'WebSockets', color: '#4fb6d8', level: 'C', Art: WebSocketsArt },
  oauth: { label: 'OAUTH', name: 'OAuth', color: '#e0a52e', level: 'C', Art: OAuthArt },
  jwt: { label: 'JWT', name: 'JWT', color: '#9a7fe0', level: 'C', Art: JwtArt },
  microservices: { label: 'SERVICES', name: 'Microservices architecture', color: '#e0a52e', level: 'C', Art: MicroservicesArt },
  sql: { label: 'SQL', name: 'SQL', color: '#e0a52e', level: 'C', Art: SqlArt },
  mongodb: { label: 'MONGODB', name: 'MongoDB', color: '#5fb15a', level: 'C', Art: MongoArt },
  redis: { label: 'REDIS', name: 'Redis', color: '#e8665a', level: 'C', Art: RedisArt },
  gitlab: { label: 'GITLAB', name: 'GitLab', color: '#f08a3e', level: 'C', Art: GitLabArt },
  bitbucket: { label: 'BITBUCKET', name: 'Bitbucket', color: '#5b86d6', level: 'C', Art: BitbucketArt },
  agile: { label: 'AGILE', name: 'Agile development', color: '#9a7fe0', level: 'C', Art: AgileArt },
  debugging: { label: 'DEBUG', name: 'Debugging', color: '#e8665a', level: 'C', Art: DebugArt },
  jupyter: { label: 'JUPYTER', name: 'Jupyter Notebook', color: '#f08a3e', level: 'C', Art: JupyterArt },
  gcp: { label: 'GCP', name: 'Google Cloud', color: '#5b8fdc', level: 'C', Art: GcpArt },
  serverless: { label: 'SERVERLESS', name: 'Serverless architecture', color: '#9a7fe0', level: 'C', Art: ServerlessArt },
  cicd: { label: 'CI/CD', name: 'CI/CD pipelines', color: '#5b86d6', level: 'C', Art: CicdArt },
  jenkins: { label: 'JENKINS', name: 'Jenkins', color: '#7a67a8', level: 'C', Art: JenkinsArt },
  githubactions: { label: 'ACTIONS', name: 'GitHub Actions', color: '#e8665a', level: 'C', Art: GithubActionsArt },
  jest: { label: 'JEST', name: 'Jest', color: '#e46a86', level: 'C', Art: JestArt },
  integrationtesting: { label: 'TESTING', name: 'Integration testing', color: '#5fb15a', level: 'C', Art: IntegrationTestArt },
  aimodels: { label: 'AI', name: 'AI models', color: '#ec7898', level: 'C', Art: AiModelsArt },
  deeplearning: { label: 'DEEP LEARNING', name: 'Deep learning', color: '#9a7fe0', level: 'C', Art: DeepLearningArt },
  gan: { label: 'GANS', name: 'Generative adversarial networks', color: '#e064b4', level: 'C', Art: GanArt },
  features: { label: 'FEATURES', name: 'Feature extraction', color: '#45b58e', level: 'C', Art: FeaturesArt },
  opencv: { label: 'OPENCV', name: 'OpenCV', color: '#e8665a', level: 'C', Art: OpenCvArt },
  keras: { label: 'KERAS', name: 'Keras', color: '#e8665a', level: 'C', Art: KerasArt },
  sklearn: { label: 'SKLEARN', name: 'Scikit-learn', color: '#f08a3e', level: 'C', Art: SklearnArt },
  numpy: { label: 'NUMPY', name: 'NumPy', color: '#4fb6d8', level: 'C', Art: NumpyArt },
  pandas: { label: 'PANDAS', name: 'Pandas', color: '#7a67a8', level: 'C', Art: PandasArt },
  maskrcnn: { label: 'MASK R-CNN', name: 'Mask R-CNN', color: '#e064b4', level: 'C', Art: MaskRcnnArt },
  transfer: { label: 'TRANSFER', name: 'Transfer learning', color: '#e0a52e', level: 'C', Art: TransferArt },
  cnn: { label: 'CNNS', name: 'CNNs', color: '#5b8fdc', level: 'C', Art: CnnArt },
};

/** Order stickers leave the box in: strongest technologies first. */
export const BURST_ORDER: SkillId[] = [
  'python', 'react', 'node',
  'typescript', 'pytorch', 'llm',
  'fastapi', 'docker', 'postgres',
  'aws', 'tensorflow', 'vision', 'rag', 'k8s',
  'javascript', 'reactnative', 'nestjs', 'graphql', 'mongodb', 'redis', 'githubactions', 'sklearn', 'opencv',
];

/** Sticker for each skill name in data/skills.json */
export const SKILL_STICKERS: Record<string, SkillId> = {
  'React': 'react',
  'React Native': 'reactnative',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'HTML': 'html',
  'CSS': 'css',
  'Angular': 'angular',
  'Redux': 'redux',
  'React Query': 'reactquery',
  'Context API': 'contextapi',
  'Node.js': 'node',
  'NestJS': 'nestjs',
  'FastAPI': 'fastapi',
  'REST APIs': 'rest',
  'GraphQL': 'graphql',
  'RabbitMQ': 'rabbitmq',
  'AWS Lambdas': 'lambda',
  'Google Cloud Functions': 'gcf',
  'WebSockets': 'websockets',
  'OAuth': 'oauth',
  'JWT': 'jwt',
  'Microservices Architecture': 'microservices',
  'SQL': 'sql',
  'MongoDB': 'mongodb',
  'PostgreSQL': 'postgres',
  'Redis': 'redis',
  'GitLab': 'gitlab',
  'Bitbucket': 'bitbucket',
  'Agile Development': 'agile',
  'Debugging': 'debugging',
  'Jupyter Notebook': 'jupyter',
  'AWS': 'aws',
  'Google Cloud': 'gcp',
  'Kubernetes': 'k8s',
  'Serverless Architecture': 'serverless',
  'CI/CD Pipelines': 'cicd',
  'Jenkins': 'jenkins',
  'Github Actions': 'githubactions',
  'Docker': 'docker',
  'Jest': 'jest',
  'integration testing': 'integrationtesting',
  'AI Models': 'aimodels',
  'Deep Learning': 'deeplearning',
  'Generative Adversarial Networks (GAN)': 'gan',
  'Computer Vision': 'vision',
  'Feature Extraction': 'features',
  'OpenCV': 'opencv',
  'TensorFlow': 'tensorflow',
  'Pytorch': 'pytorch',
  'Keras': 'keras',
  'Scikit-learn': 'sklearn',
  'NumPy': 'numpy',
  'Pandas': 'pandas',
  'Python': 'python',
  'Mask R-CNN': 'maskrcnn',
  'Transfer Learning': 'transfer',
  'CNNs': 'cnn',
};
