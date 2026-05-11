import { Outlet } from 'react-router-dom';
import PandaCompanion from '../components/PandaCompanion';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      <PandaCompanion />
    </div>
  );
};

export default MainLayout;