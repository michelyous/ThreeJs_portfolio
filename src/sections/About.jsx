import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../components/Button.jsx';
import Globe from 'react-globe.gl';

const About = () => {
  const { t } = useTranslation();
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(t('about.contact.email'));
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        {/* Introduction */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">{t('about.introduction.title')}</p>
              <p className="grid-subtext">{t('about.introduction.description')}</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">{t('about.techStack.title')}</p>
              <p className="grid-subtext">{t('about.techStack.description')}</p>
            </div>
          </div>
        </div>

        {/* Globe & Remote Work */}
        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
              />
            </div>
            <div>
              <p className="grid-headtext">{t('about.remoteReady.title')}</p>
              <p className="grid-subtext">{t('about.remoteReady.description')}</p>
              <Button name={t('about.remoteReady.button')} isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        {/* Passion for Development */}
        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />
            <div>
              <p className="grid-headtext">{t('about.passion.title')}</p>
              <p className="grid-subtext">{t('about.passion.description')}</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />
            <div className="space-y-2">
              <p className="grid-subtext text-center">{t('about.contact.title')}</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-xl md:text-xl font-medium text-gray_gradient text-white">
                  {t('about.contact.email')}
                </p>
              </div>
              {hasCopied && <p className="text-sm text-green-500 text-center">{t('about.contact.copied')}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
