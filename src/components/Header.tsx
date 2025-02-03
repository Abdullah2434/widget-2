import React from 'react';
import BackIcon from './../assets/BackIcon.svg';

interface HeaderProps {
    title: string;
    onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackClick }) => {
    return (
        <div className="flex items-center justify-between bg-white dark:bg-black w-full py-4">
            <div className="flex items-center" onClick={onBackClick}>
                <img src={BackIcon} alt="Back Icon" className="mr-3 h-6 w-6" />
            </div>
            <div className="flex-grow text-center font-bold text-lg text-[12px] text-black dark:text-white">
                {title}
            </div>
            <div></div>
        </div>
    );
};

export default Header;
