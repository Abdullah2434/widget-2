import React from 'react';

interface PoweredByProps {
  logoSrc: string;
  altText?: string;
  text?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const PoweredBy: React.FC<PoweredByProps> = ({
  logoSrc,
  altText = 'Logo',
  text = 'Powered by',
  logoWidth = 20,
  logoHeight = 20,
}) => {
  return (
    <div className="mt-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
      <span className="font-bold text-lg text-[12px] text-black dark:text-white mr-2">
        {text}
      </span>
      <img src={logoSrc} alt={altText} width={logoWidth} height={logoHeight} />
    </div>
  );
};

export default PoweredBy;
