import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/Loading.jsx';
import { useTranslation } from 'react-i18next';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const { t } = useTranslation();

  // Fetch work experiences from translations
  const workExperiences = t('workExperiences.list', { returnObjects: true }) || [];
  const workExperienceTitle = t('workExperiences.title', 'My Work Experience');

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <p className="head-text">{workExperienceTitle}</p>

        {workExperiences.length > 0 ? (
          <div className="work-container">
            <div className="work-canvas">
              <Canvas>
                <ambientLight intensity={7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />

                <Suspense fallback={<CanvasLoader />}>
                  <Developer position-y={-3} scale={3} animationName={animationName} />
                </Suspense>
              </Canvas>
            </div>

            <div className="work-content">
              <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                {workExperiences.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setAnimationName(item.animation.toLowerCase())}
                    onPointerOver={() => setAnimationName(item.animation.toLowerCase())}
                    onPointerOut={() => setAnimationName('idle')}
                    className="work-content_container group">
                    <div className="flex flex-col h-full justify-start items-center py-2">
                      <div className="work-content_logo">
                        <img className="w-full h-full" src={item.icon} alt={item.name} />
                      </div>

                      <div className="work-content_bar" />
                    </div>

                    <div className="sm:p-5 px-2.5 py-5">
                      <p className="font-bold text-white-800">{item.name}</p>
                      <p className="text-sm mb-5">
                        {item.pos} -- <span>{item.duration}</span>
                      </p>
                      <p className="group-hover:text-white transition-all ease-in-out duration-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white-500 text-center mt-10">No work experience data available.</p>
        )}
      </div>
    </section>
  );
};

export default WorkExperience;
